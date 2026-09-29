from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from routes.profile_routes import router as profile_router
from routes.skills_routes import router as skills_router
from routes.career_routes import router as career_router
from routes.simulation_routes import router as simulation_router
from routes.memory_routes import router as memory_router
from routes.dashboard_routes import router as dashboard_router


app = FastAPI(
    title="AI Career Decision Simulator API",
    description="Backend for the AI Career Decision Simulator",
    version="1.0.0"
)


# Allow frontend applications to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://ai-career-decision-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def home():
    return {
        "message": "AI Career Decision Simulator Backend is running!",
        "docs": "/docs"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"]
)

app.include_router(
    skills_router,
    prefix="/api/skills",
    tags=["Skills"]
)

app.include_router(
    career_router,
    prefix="/api/career",
    tags=["Career"]
)

app.include_router(
    simulation_router,
    prefix="/api/simulation",
    tags=["Simulation"]
)

app.include_router(
    memory_router,
    prefix="/api/memory",
    tags=["Hindsight Memory"]
)

app.include_router(
    dashboard_router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)