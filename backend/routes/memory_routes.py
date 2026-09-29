from fastapi import APIRouter
from models import MemoryCreate
from database import get_connection

router = APIRouter()

@router.post("")
def save_memory(memory: MemoryCreate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO memories (profile_id, career, decision, outcome, lesson)
        VALUES (?, ?, ?, ?, ?)
    """, (
        memory.profile_id, memory.career, memory.decision,
        memory.outcome, memory.lesson
    ))
    memory_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {"memory_id": memory_id, **memory.model_dump()}

@router.get("/{profile_id}")
def get_memories(profile_id: int):
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM memories WHERE profile_id = ? ORDER BY id DESC",
        (profile_id,)
    ).fetchall()
    conn.close()

    return {"memories": [dict(row) for row in rows]}
