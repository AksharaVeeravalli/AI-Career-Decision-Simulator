import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


def gemini_available():
    """Check whether the Gemini API key is available."""
    return bool(GEMINI_API_KEY)


def generate_career_recommendation(
    career,
    skills,
    skill_gaps,
    memory
):
    """Generate a personalized career recommendation using Gemini."""

    # If Gemini API key is not available
    if not GEMINI_API_KEY:
        return create_fallback_recommendation(
            career,
            skill_gaps
        )

    try:

        client = genai.Client(
            api_key=GEMINI_API_KEY
        )

        prompt = f"""
You are an AI career advisor helping a beginner college student.

Target Career:
{career}

Current Skills:
{skills}

Skill Gaps:
{skill_gaps}

Previous Career Decision:
{memory}

Give a practical personalized career recommendation.

Include:
1. Skills to improve
2. Projects to build
3. Internship preparation
4. Interview preparation
5. A simple 6-month action plan

Keep the answer beginner-friendly and concise.
"""

        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt
        )

        if response.text:
            return response.text

        return create_fallback_recommendation(
            career,
            skill_gaps
        )

    except Exception as error:

        print("====================================")
        print("GEMINI API ERROR:")
        print(repr(error))
        print("====================================")

        # Use fallback instead of showing an API error to the user
        return create_fallback_recommendation(
            career,
            skill_gaps
        )


def create_fallback_recommendation(
    career,
    skill_gaps
):
    """Create a recommendation when Gemini is unavailable."""

    recommendation = []

    recommendation.append(
        f"Your target career is {career}."
    )

    recommendation.append(
        "\nFocus on the following skills first:"
    )

    # Add the largest skill gaps first
    sorted_gaps = sorted(
        skill_gaps,
        key=lambda item: item.get("gap", 0),
        reverse=True
    )

    for gap in sorted_gaps[:4]:

        skill = gap.get("skill", "Skill")
        current = gap.get("current", 0)
        required = gap.get("required", 0)

        recommendation.append(
            f"• {skill}: improve from "
            f"{current}/5 toward {required}/5"
        )

    recommendation.append(
        "\nRecommended 6-month plan:"
    )

    recommendation.append(
        "• Month 1: Strengthen technical fundamentals"
    )

    recommendation.append(
        "• Month 2: Practice DSA and coding problems"
    )

    recommendation.append(
        "• Month 3: Build 2–3 practical projects"
    )

    recommendation.append(
        "• Month 4: Prepare your resume and apply for internships"
    )

    recommendation.append(
        "• Month 5: Practice technical interviews and communication"
    )

    recommendation.append(
        "• Month 6: Reassess your skills and improve remaining gaps"
    )

    recommendation.append(
        "\nContinue improving your weakest skills consistently "
        "and track your progress through the career simulator."
    )

    return "\n".join(recommendation)