from fastapi import APIRouter
from models import CareerCreate
from database import get_connection

router = APIRouter()

@router.post("")
def save_career(career: CareerCreate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO career_choices (profile_id, target_career, experience)
        VALUES (?, ?, ?)
    """, (career.profile_id, career.target_career, career.experience))
    career_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {"career_id": career_id, **career.model_dump()}
