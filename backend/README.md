# AI Career Decision Simulator - FastAPI Backend

This backend is designed to work with the frontend built using HTML, CSS and JavaScript.

## Technology

- Python
- FastAPI
- SQLite
- Pydantic
- CORS
- Gemini-ready integration

## Folder structure

backend/
├── main.py
├── database.py
├── models.py
├── requirements.txt
├── .env.example
├── routes/
└── services/

## Setup

Open a terminal in the backend folder:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

If PowerShell blocks activation, you can run:

```powershell
venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Run

From the backend folder:

```powershell
uvicorn main:app --reload
```

Open:

http://127.0.0.1:8000

Swagger documentation:

http://127.0.0.1:8000/docs

## Main API routes

POST /api/profile
POST /api/skills
POST /api/career
POST /api/simulation
POST /api/simulation/skill-gap
POST /api/simulation/roadmap
POST /api/memory
GET  /api/memory/{profile_id}
GET  /api/dashboard/{profile_id}

## Important

The current frontend uses localStorage. This backend is prepared for the next integration step.

Do not delete the frontend localStorage code until the frontend-to-backend connection has been tested.

Gemini is intentionally not called automatically. First make sure the FastAPI + SQLite connection works. Then connect Gemini using GEMINI_API_KEY.
