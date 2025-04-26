from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pandas as pd
from pathlib import Path

# ✅ Resolve BASE directory
BASE_DIR = Path(__file__).resolve().parent

# ✅ Setup FastAPI app
app = FastAPI()

# ✅ Define folders with ABSOLUTE paths
STATIC_DIR = BASE_DIR / "static"
TEMPLATES_DIR = BASE_DIR / "templates"
EXCEL_PATH = BASE_DIR / "data" / "Copy of merged(1).xlsx"

# ✅ Mount static with ABSOLUTE path
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# ✅ Setup templates
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

# ✅ Excel loading
if not EXCEL_PATH.exists():
    raise FileNotFoundError(f"Excel file not found at: {EXCEL_PATH}")

df = pd.read_excel(EXCEL_PATH)
topics_data = {}

# Preprocess links
for topic in df["Category"].unique():
    topic_str = str(topic).strip().lower()
    links = df[df["Category"] == topic]["URL"].dropna().tolist()
    topics_data[topic_str] = links

shown_links = {}

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/get_links")
def get_links(topic: str):
    topic = topic.strip().lower()
    if topic not in topics_data:
        return JSONResponse(content={"status": "error", "message": f"No links found for '{topic}'."})

    if topic not in shown_links:
        shown_links[topic] = 0

    all_links = topics_data[topic]
    start = shown_links[topic]
    end = min(start + 5, len(all_links))
    chunk = all_links[start:end]
    shown_links[topic] += len(chunk)

    return JSONResponse(content={
        "status": "success",
        "links": chunk,
        "more": shown_links[topic] < len(all_links)
    })

@app.get("/list_topics")
def list_topics():
    return JSONResponse(content={"topics": list(topics_data.keys())})

# ✅ Log routes
@app.on_event("startup")
def log_routes():
    print("\n✅ ROUTES REGISTERED:")
    for route in app.routes:
        print(f"{route.name}: {route.path}")
