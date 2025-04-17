from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pandas as pd
import os

app = FastAPI()

# Mount static folder
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Load Excel
excel_path = "data/Copy of merged(1).xlsx"
if not os.path.exists(excel_path):
    raise FileNotFoundError(f"Excel file not found at {excel_path}")

df = pd.read_excel(excel_path)
topics_data = {}

# Preprocess topics
for topic in df["Category"].unique():
    topic_str = str(topic).strip().lower()
    links = df[df["Category"] == topic]["URL"].dropna().tolist()
    topics_data[topic_str] = links

shown_links = {}

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
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
