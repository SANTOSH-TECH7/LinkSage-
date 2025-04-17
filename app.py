from flask import Flask, render_template, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Check if the file exists
excel_path = "data/Copy of merged(1).xlsx"
if not os.path.exists(excel_path):
    print(f"ERROR: Excel file not found at {excel_path}")
    # You might want to provide a fallback or exit gracefully

df = pd.read_excel(excel_path)
topics_data = {}

# Preprocess once to avoid repetitive filtering
for topic in df["Category"].unique():
    # Convert topic to string
    topic_str = str(topic).strip().lower()
    links = df[df["Category"] == topic]["URL"].dropna().tolist()
    topics_data[topic_str] = links
    print(f"Topic '{topic_str}' has {len(links)} links")

print("Available topics for searching:")
print(list(topics_data.keys()))

shown_links = {}  # To track which links were already shown per topic

@app.route("/")
def index():
    print("Serving index page")
    return render_template("index.html")

@app.route("/get_links")
def get_links():
    topic = request.args.get("topic", "").strip().lower()
    print(f"GET /get_links - Searching for topic: '{topic}'")
    
    if topic not in topics_data:
        print(f"Topic '{topic}' not found in available topics")
        return jsonify({"status": "error", "message": f"No links found for '{topic}'. Try one of these: spring ai, python, java, etc."})

    if topic not in shown_links:
        shown_links[topic] = 0

    all_links = topics_data[topic]
    start = shown_links[topic]
    end = min(start + 5, len(all_links))  # Ensure we don't go beyond the list length
    chunk = all_links[start:end]
    shown_links[topic] += len(chunk)  # Increment by actual number of links returned
    
    print(f"Returning {len(chunk)} links for topic '{topic}', more available: {shown_links[topic] < len(all_links)}")
    
    response = {
        "status": "success",
        "links": chunk,
        "more": shown_links[topic] < len(all_links)
    }
    return jsonify(response)

@app.route("/list_topics")
def list_topics():
    print("GET /list_topics - Returning all topics")
    return jsonify({"topics": list(topics_data.keys())})

if __name__ == "__main__":
    app.run(debug=True)