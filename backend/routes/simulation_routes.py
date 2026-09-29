from fastapi import APIRouter

from models import SimulationRequest

from services.simulation_engine import simulate

from services.gemini_service import (
    gemini_available,
    generate_career_recommendation
)

router = APIRouter()


@router.post("")
def run_simulation(request: SimulationRequest):

    # Run the normal career simulation
    result = simulate(request)

    # Check whether Gemini is available
    result["gemini_available"] = gemini_available()

    # Generate personalized AI recommendation
    if gemini_available():
        try:
            ai_recommendation = generate_career_recommendation(
                career=request.target_career,
                skills=request.skills,
                skill_gaps=result["skill_gaps"],
                memory=request.memory
            )

            result["ai_recommendation"] = ai_recommendation

        except Exception as error:
            print("Gemini recommendation error:", error)

            result["ai_recommendation"] = (
                "Focus first on Python and then work through "
                "the personalized roadmap."
            )

    else:
        result["ai_recommendation"] = (
            "Focus first on Python and then work through "
            "the personalized roadmap."
        )

    return result


@router.post("/skill-gap")
def skill_gap(request: SimulationRequest):

    result = simulate(request)

    return {
        "target_career": result["target_career"],
        "readiness_score": result["readiness_score"],
        "skill_gaps": result["skill_gaps"]
    }


@router.post("/roadmap")
def roadmap(request: SimulationRequest):

    result = simulate(request)

    return {
        "target_career": result["target_career"],
        "roadmap": result["roadmap"]
    }