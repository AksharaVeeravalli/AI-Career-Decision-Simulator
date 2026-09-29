from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter()

@router.get("/{profile_id}")
def get_dashboard(profile_id: int):
    conn = get_connection()

    profile = conn.execute(
        "SELECT * FROM profiles WHERE id = ?", (profile_id,)
    ).fetchone()

    skills = conn.execute(
        "SELECT * FROM skills WHERE profile_id = ? ORDER BY id DESC LIMIT 1",
        (profile_id,)
    ).fetchone()

    career = conn.execute(
        "SELECT * FROM career_choices WHERE profile_id = ? ORDER BY id DESC LIMIT 1",
        (profile_id,)
    ).fetchone()

    memories = conn.execute(
        "SELECT * FROM memories WHERE profile_id = ? ORDER BY id DESC",
        (profile_id,)
    ).fetchall()

    conn.close()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "profile": dict(profile),
        "skills": dict(skills) if skills else None,
        "career": dict(career) if career else None,
        "memories": [dict(row) for row in memories]
    }
