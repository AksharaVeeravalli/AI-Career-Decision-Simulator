from fastapi import APIRouter
from models import SkillsCreate
from database import get_connection

router = APIRouter()

@router.post("")
def save_skills(skills: SkillsCreate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO skills
        (profile_id, python, java, sql, statistics, data_analysis, web_development, communication)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        skills.profile_id, skills.python, skills.java, skills.sql,
        skills.statistics, skills.data_analysis,
        skills.web_development, skills.communication
    ))
    skill_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {"skill_id": skill_id, **skills.model_dump()}
