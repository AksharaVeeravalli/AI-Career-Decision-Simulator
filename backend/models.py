from pydantic import BaseModel, Field
from typing import Optional

class ProfileCreate(BaseModel):
    name: str
    education: str = ""
    branch: str = ""
    year: str = ""
    goal: str = ""
    interests: str = ""

class SkillsCreate(BaseModel):
    profile_id: Optional[int] = None
    python: int = Field(ge=1, le=5)
    java: int = Field(ge=1, le=5)
    sql: int = Field(ge=1, le=5)
    statistics: int = Field(ge=1, le=5)
    data_analysis: int = Field(ge=1, le=5)
    web_development: int = Field(ge=1, le=5)
    communication: int = Field(ge=1, le=5)

class CareerCreate(BaseModel):
    profile_id: Optional[int] = None
    target_career: str
    experience: str

class MemoryCreate(BaseModel):
    profile_id: Optional[int] = None
    career: str
    decision: str
    outcome: str
    lesson: str

class SimulationRequest(BaseModel):
    profile_id: Optional[int] = None
    target_career: str
    experience: str
    skills: SkillsCreate
    memory: Optional[MemoryCreate] = None
