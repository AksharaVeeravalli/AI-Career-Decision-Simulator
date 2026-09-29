from fastapi import APIRouter, HTTPException
from models import ProfileCreate
from database import get_connection

router = APIRouter()

@router.post("")
def create_profile(profile: ProfileCreate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO profiles (name, education, branch, year, goal, interests)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        profile.name, profile.education, profile.branch,
        profile.year, profile.goal, profile.interests
    ))
    profile_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"profile_id": profile_id, **profile.model_dump()}

@router.get("/{profile_id}")
def get_profile(profile_id: int):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM profiles WHERE id = ?", (profile_id,)
    ).fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Profile not found")

    return dict(row)
