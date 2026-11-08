"""
FastAPI Microservice Backend — Sharanya Portfolio
Production-ready API for inquiry intake, lead routing, and dynamic data ingestion.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import datetime
import os

app = FastAPI(
    title="Sharanya Portfolio Backend Microservice",
    description="Asynchronous API for client inquiry intake and project telemetry",
    version="1.0.0",
)

# CORS configuration to allow local and production Next.js clients
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://sharanya.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProjectInquiry(BaseModel):
    fullName: str = Field(..., min_length=2, max_length=100, description="Full name of client")
    email: EmailStr = Field(..., description="Direct contact email")
    company: Optional[str] = Field(None, max_length=100, description="Organization or startup name")
    projectType: str = Field(..., description="Selected engagement type")
    budget: str = Field(..., description="Estimated project budget bracket")
    timeline: str = Field(..., description="Expected delivery timeline")
    description: str = Field(..., min_length=10, max_length=5000, description="Detailed problem or scope")


@app.get("/health", tags=["System"])
async def health_check():
    """Health check endpoint for container uptime monitoring."""
    return {
        "status": "healthy",
        "service": "portfolio-backend",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }


@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED, tags=["Inquiries"])
async def create_inquiry(inquiry: ProjectInquiry):
    """
    Ingest, validate, score, and forward a client project inquiry.
    Can be hooked into Supabase PostgreSQL or a notifications webhook.
    """
    timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    # Lead scoring logic
    priority = "High" if ("10,000" in inquiry.budget or "AI" in inquiry.projectType) else "Standard"

    inquiry_record = {
        **inquiry.model_dump(),
        "received_at": timestamp,
        "lead_priority": priority,
    }

    # Log structured inquiry
    print(f"[FASTAPI_INQUIRY_RECEIVED] Lead={inquiry.fullName} | Priority={priority} | Type={inquiry.projectType}")

    return {
        "success": True,
        "message": f"Inquiry from {inquiry.fullName} successfully processed.",
        "inquiry_id": f"INQ-{int(datetime.datetime.now().timestamp())}",
        "lead_priority": priority,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
