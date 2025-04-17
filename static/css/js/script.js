let currentTopic = "";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded, initializing application...");
    initMatrixRain(); // 🌧️ Initialize Matrix Rain

    const input = document.getElementById("topicInput");
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            fetchLinks();
        }
    });

    document.getElementById("searchBtn").addEventListener("click", () => {
        console.log("Search button clicked");
        fetchLinks();
    });
    
    document.getElementById("moreBtn").addEventListener("click", () => {
        console.log("More button clicked");
        fetchMore();
    });
    
    document.getElementById("showAllBtn").addEventListener("click", () => {
        console.log("Show all topics button clicked");
        showAllTopics();
    });

    document.querySelectorAll(".topic-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const topic = btn.getAttribute("data-topic");
            console.log(`Topic button clicked: ${topic}`);
            document.getElementById("topicInput").value = topic;
            fetchLinks();
        });
    });
    
    console.log("All event listeners have been attached");
});

// 📋 SHOW ALL TOPICS
function showAllTopics() {
    console.log("Fetching all topics...");
    fetch('/list_topics')
        .then(res => {
            console.log("Response received:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Topics data:", data);
            const topicsDiv = document.getElementById("allTopics");
            if (data.topics?.length) {
                const sortedTopics = data.topics.filter(t => t !== "nan").sort();
                topicsDiv.innerHTML = `
                    <div class='topic-grid'>
                        ${sortedTopics.map(topic => `<button class="topic-grid-btn" onclick="setTopic('${topic}')">${topic}</button>`).join("")}
                    </div>`;
                topicsDiv.style.display = "block";
                const btn = document.getElementById("showAllBtn");
                btn.textContent = "Hide Topics";
                btn.onclick = hideAllTopics;
            } else {
                topicsDiv.innerHTML = "<p>No topics available</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching topics:", error);
            document.getElementById("allTopics").innerHTML = "<p>Error loading topics</p>";
        });
}

function hideAllTopics() {
    document.getElementById("allTopics").style.display = "none";
    const btn = document.getElementById("showAllBtn");
    btn.textContent = "Show All Topics";
    btn.onclick = showAllTopics;
}

function setTopic(topic) {
    console.log(`Setting topic: ${topic}`);
    document.getElementById("topicInput").value = topic;
    fetchLinks();
}

// 🔗 FETCH LINKS
function fetchLinks() {
    const topic = document.getElementById("topicInput").value.trim();
    if (!topic) {
        console.log("No topic entered, skipping fetch");
        return;
    }

    console.log(`Fetching links for topic: ${topic}`);
    currentTopic = topic;
    
    fetch(`/get_links?topic=${encodeURIComponent(topic)}`)
        .then(res => {
            console.log(`Response status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log("Links data received:", data);
            const results = document.getElementById("results");
            results.innerHTML = "";

            if (data.status === "success") {
                if (!data.links.length) {
                    console.log("No links found for topic");
                    results.innerHTML = "<p>No links found for this topic.</p>";
                } else {
                    console.log(`Displaying ${data.links.length} links`);
                    results.innerHTML = data.links.map(link => `
                        <div class="link-card">
                            <a href="${link}" target="_blank">${link}</a>
                        </div>`).join("");
                }
                document.getElementById("moreBtn").style.display = data.more ? "inline-block" : "none";
            } else {
                console.log(`Error response: ${data.message}`);
                results.innerHTML = `<p>${data.message}</p>`;
                document.getElementById("moreBtn").style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error fetching links:", error);
            document.getElementById("results").innerHTML = "<p>An error occurred while fetching links. Please try again.</p>";
        });
}

function fetchMore() {
    if (!currentTopic) {
        console.log("No current topic, skipping fetch more");
        return;
    }
    
    console.log(`Fetching more links for topic: ${currentTopic}`);
    fetch(`/get_links?topic=${encodeURIComponent(currentTopic)}`)
        .then(res => res.json())
        .then(data => {
            console.log("More links data received:", data);
            const results = document.getElementById("results");
            if (data.status === "success") {
                data.links.forEach(link => {
                    const div = document.createElement("div");
                    div.className = "link-card";
                    div.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
                    results.appendChild(div);
                });
                document.getElementById("moreBtn").style.display = data.more ? "inline-block" : "none";
            }
        })
        .catch(error => console.error("Error fetching more links:", error));
}

// 🟢 MATRIX RAIN EFFECT
function initMatrixRain() {
    console.log("Initializing matrix rain effect");
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
    console.log("Matrix rain effect initialized");
}

// Add this to check if the JavaScript file is loading properly
console.log("Script.js loaded successfully");