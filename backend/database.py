import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "career_simulator.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            education TEXT,
            branch TEXT,
            year TEXT,
            goal TEXT,
            interests TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id INTEGER,
            python INTEGER,
            java INTEGER,
            sql INTEGER,
            statistics INTEGER,
            data_analysis INTEGER,
            web_development INTEGER,
            communication INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(profile_id) REFERENCES profiles(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS career_choices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id INTEGER,
            target_career TEXT NOT NULL,
            experience TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(profile_id) REFERENCES profiles(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id INTEGER,
            career TEXT NOT NULL,
            decision TEXT NOT NULL,
            outcome TEXT NOT NULL,
            lesson TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(profile_id) REFERENCES profiles(id)
        )
    """)

    conn.commit()
    conn.close()
