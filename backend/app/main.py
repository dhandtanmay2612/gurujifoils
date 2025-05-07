from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import auth, users, driving

app = FastAPI(
    title="DriveSafeAI API",
    description="Backend API for DriveSafeAI - Smart Driver Behavior Analysis",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(driving.router, prefix="/driving", tags=["driving"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to DriveSafeAI API",
        "version": "1.0.0",
        "docs_url": "/docs"
    } 