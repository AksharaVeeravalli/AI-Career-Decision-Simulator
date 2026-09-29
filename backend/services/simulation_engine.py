from services.career_engine import analyze_skill_gap, create_roadmap

def simulate(request):
    skills = request.skills.model_dump()
    analysis = analyze_skill_gap(request.target_career, skills)
    roadmap = create_roadmap(request.target_career, analysis["skill_gaps"])

    return {
        "target_career": request.target_career,
        "experience": request.experience,
        "readiness_score": analysis["readiness_score"],
        "skill_gaps": analysis["skill_gaps"],
        "roadmap": roadmap,
        "simulation": {
            "six_month_summary": (
                f"With consistent learning, projects and interview preparation, "
                f"you can improve your readiness for {request.target_career} over the next six months."
            ),
            "steps": [
                "Build required skills",
                "Build practical projects",
                "Apply for internships",
                "Prepare for placements"
            ]
        },
        "ai_recommendation": (
            f"Focus first on {analysis['skill_gaps'][0]['skill']} "
            f"and then work through the personalized roadmap."
            if analysis["skill_gaps"]
            else "Your current skill profile meets the basic requirements. Focus on projects and interview preparation."
        )
    }
