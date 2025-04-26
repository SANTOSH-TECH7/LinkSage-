# 🌟 **LinkSage Project**

## 📑 **Project Overview**
LinkSage is an intelligent, dynamic, and web-based project designed to retrieve and display categorized links for various topics related to development, machine learning, data science, and more. It fetches data from an Excel sheet and uses a Flask API to serve this data through a beautifully designed interface.

## 🛠 **Technologies Used**
- **Flask** - Web framework for building APIs and rendering the web page
- **Pandas** - For data manipulation and reading the Excel file
- **OpenPyXL** - A library to read/write Excel files
- **FastAPI & Uvicorn** - FastAPI used for high-performance asynchronous API support
- **Gunicorn** - WSGI HTTP Server for Python web apps
- **Render.com** - Cloud platform for hosting the project
- **Excel** - Holds the categorized links data

## 🚀 **Getting Started**

### 1️⃣ **Clone the Repository**
Clone the repository to your local machine:
```bash
git clone https://github.com/SANTOSH-TECH7/LinkSage.git
```
Navigate to the project directory:
```bash
cd LinkSage
```

### 2️⃣ **Set up a Virtual Environment**
It is recommended to create a virtual environment for your project to manage dependencies.
```bash
python -m venv venv
```

### 3️⃣ **Install Dependencies**
Activate the virtual environment and install the necessary Python dependencies.
```bash
source venv/bin/activate   # For Mac/Linux
venv\Scripts\activate      # For Windows
pip install -r requirements.txt
```

### 4️⃣ **Setup Excel File**
The project depends on an Excel file (stored as `data.xlsx`) to retrieve links for various topics. Ensure that your Excel file is in the correct format:
- **Sheet Name**: `LinksData`
- **Columns**: `Topic Name`, `Link`

### 5️⃣ **Run the Application Locally**
To run the project locally and check if everything works as expected:
```bash
python app.py
```
Open your browser and go to [http://localhost:5000](http://localhost:5000) to see the project in action.

## 🌐 **Deploying on Render.com**

### 1️⃣ **Create a Render Account**
- Go to [Render.com](https://render.com/) and sign up or log in
- Create a **new Web Service** and select **"Web Service"**
- Connect your **GitHub repository** (LinkSage) to Render

### 2️⃣ **Link the GitHub Repository**
- Once your GitHub is connected, select the `LinkSage` repository from the list of repositories

### 3️⃣ **Deploy the Project**
- Render will automatically detect the **Flask** app in your project and ask for a **Build Command**. Leave it as default (Render automatically detects the necessary build commands)
- Set the **Start Command** as:
  ```bash
  gunicorn app:app
  ```
- **Deploy!**

Render will now pull your repository, install dependencies, and deploy your Flask app.

## 📝 **Updating the Excel File and Committing Changes**

### 1️⃣ **Modify the Excel File**
Whenever you want to update the data (add more links or update existing ones):
- Open `data.xlsx` and make the necessary changes to the topics or links
- Save the updated Excel file

### 2️⃣ **Commit Changes to GitHub**
Once the Excel file is updated:
```bash
git add data.xlsx
git commit -m "Updated Excel data"
git push origin main
```

### 3️⃣ **Deploy the Changes on Render**
Once the changes are pushed to GitHub:
- Go to your Render dashboard
- Find your deployed service
- Click **Manual Deploy** to redeploy with the latest commit

### 4️⃣ **Auto Deployment Setup (Optional)**
You can enable **Auto Deployment** in Render:
- Every time you push a change to GitHub, Render will automatically redeploy the project with the latest commit

## 🔄 **How to Access the Project Online**

### 1️⃣ **Access the Render Deployment URL**
- After successful deployment, Render will give you a **live URL** to access the project
- Visit the URL like: `https://your-app-name.onrender.com`
- Here, you will see the available topics and their respective links displayed dynamically

### 2️⃣ **Custom Domain (Optional)**
To assign a custom domain to your app:
- You can link a custom domain (e.g., `www.yourdomain.com`) via Render settings
- Follow the instructions in Render to set up the custom domain and link it to your project

## 💡 **Troubleshooting**

- **App not loading?** Ensure that all dependencies are installed correctly and that `app.py` is running on Render
- **Excel not updating?** Double-check the Excel file format and commit the file changes before deploying

## ⚙ **Technical Specifications**

- **Backend Framework**: Flask for web serving and FastAPI for high-performance async API
- **Frontend**: Basic HTML/CSS rendering links dynamically fetched from the Excel file
- **Database**: Excel file for storing data (easy to update)

## 🧑‍💻 **Author**
**SANTOSH-TECH7**  
Artificial Intelligence and Data Science Representative, V.S.B Engineering College, Karur  
GitHub: [SANTOSH-TECH7](https://github.com/SANTOSH-TECH7)  

