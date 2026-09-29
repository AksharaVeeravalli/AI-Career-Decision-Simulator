CAREER_REQUIREMENTS = {
    "software-developer": {
        "python": 4, "java": 4, "sql": 3, "statistics": 2,
        "data_analysis": 2, "web_development": 3, "communication": 3
    },
    "data-analyst": {
        "python": 3, "java": 2, "sql": 4, "statistics": 4,
        "data_analysis": 5, "web_development": 2, "communication": 4
    },
    "data-scientist": {
        "python": 5, "java": 2, "sql": 4, "statistics": 5,
        "data_analysis": 5, "web_development": 2, "communication": 4
    },
    "ai-ml-engineer": {
        "python": 5, "java": 3, "sql": 3, "statistics": 4,
        "data_analysis": 4, "web_development": 2, "communication": 3
    },
    "web-developer": {
        "python": 3, "java": 3, "sql": 3, "statistics": 2,
        "data_analysis": 2, "web_development": 5, "communication": 3
    },
    "cloud-engineer": {
        "python": 3, "java": 3, "sql": 3, "statistics": 2,
        "data_analysis": 2, "web_development": 3, "communication": 4
    }
}

SKILL_LABELS = {
    "python": "Python",
    "java": "Java",
    "sql": "SQL",
    "statistics": "Statistics",
    "data_analysis": "Data Analysis",
    "web_development": "Web Development",
    "communication": "Communication"
}

def normalize_career(career: str) -> str:
    return career.strip().lower().replace(" ", "-").replace("/", "-")

def analyze_skill_gap(career: str, skills: dict):
    key = normalize_career(career)
    requirements = CAREER_REQUIREMENTS.get(key, CAREER_REQUIREMENTS["software-developer"])

    gaps = []
    for skill, required in requirements.items():
        current = int(skills.get(skill, 1))
        if current < required:
            gaps.append({
                "skill": SKILL_LABELS[skill],
                "current": current,
                "required": required,
                "gap": required - current,
                "status": "Needs Improvement"
            })

    gaps.sort(key=lambda x: x["gap"], reverse=True)

    total_required = sum(requirements.values())
    total_current = sum(min(int(skills.get(s, 1)), r) for s, r in requirements.items())
    readiness = round((total_current / total_required) * 100) if total_required else 0

    return {
        "career": career,
        "readiness_score": readiness,
        "skill_gaps": gaps
    }

def create_roadmap(career: str, gaps: list):
    top = [g["skill"] for g in gaps[:3]]
    focus = ", ".join(top) if top else "your core skills"

    return [
        {
            "month": "01",
            "title": "Learn Fundamentals",
            "description": f"Strengthen {focus} and the technical fundamentals required for {career}."
        },
        {
            "month": "02",
            "title": "Practice DSA & Core Skills",
            "description": "Solve coding problems and practice the core technical skills regularly."
        },
        {
            "month": "03",
            "title": "Build Projects",
            "description": f"Create 2–3 practical projects related to {career}."
        },
        {
            "month": "04",
            "title": "Apply for Internships",
            "description": "Build your resume and start applying for relevant internship opportunities."
        },
        {
            "month": "05",
            "title": "Interview Preparation",
            "description": "Practice technical interviews, aptitude and communication."
        },
        {
            "month": "06",
            "title": "Review & Improve",
            "description": "Reassess your skills and improve the remaining gaps."
        }
    ]
