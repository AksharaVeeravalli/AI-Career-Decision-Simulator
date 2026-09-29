// ======================================================
// AI CAREER DECISION SIMULATOR
// COMPLETE FRONTEND JAVASCRIPT
// ======================================================


// ======================================================
// 1. API CONFIGURATION
// ======================================================

const API_BASE_URL = "http://127.0.0.1:8000";


// ======================================================
// 2. HOME PAGE
// ======================================================

function startJourney() {

    window.location.href = "profile.html";

}


// ======================================================
// 3. PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", function () {


    // ==================================================
    // 1. PROFILE CONNECTED TO FASTAPI
    // ==================================================

    const profileForm =
        document.getElementById("profileForm");

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                const profile = {

                    name:
                        document.getElementById(
                            "name"
                        ).value,

                    education:
                        document.getElementById(
                            "education"
                        ).value,

                    branch:
                        document.getElementById(
                            "branch"
                        ).value,

                    year:
                        document.getElementById(
                            "year"
                        ).value,

                    goal:
                        document.getElementById(
                            "goal"
                        ).value,

                    interests:
                        document.getElementById(
                            "interests"
                        ).value
                };


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/profile`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(profile)
                            }
                        );


                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        throw new Error(
                            `Profile save failed: ${response.status} ${errorText}`
                        );
                    }


                    const data =
                        await response.json();


                    // Save profile information
                    localStorage.setItem(
                        "careerProfile",
                        JSON.stringify(data)
                    );


                    // Save profile ID
                    localStorage.setItem(
                        "profileId",
                        data.profile_id
                    );


                    console.log(
                        "Profile saved:",
                        data
                    );


                    window.location.href =
                        "skills.html";


                } catch (error) {

                    console.error(
                        "Profile Error:",
                        error
                    );

                    alert(
                        "❌ Unable to save profile. Please make sure the backend is running."
                    );
                }
            }
        );
    }



    // ==================================================
    // 2. SKILLS CONNECTED TO FASTAPI
    // ==================================================

    const skillsForm =
        document.getElementById("skillsForm");


    if (skillsForm) {

        skillsForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const profileId =
                    localStorage.getItem(
                        "profileId"
                    );


                if (!profileId) {

                    alert(
                        "⚠️ Profile ID not found. Please complete your profile first."
                    );

                    window.location.href =
                        "profile.html";

                    return;
                }


                const skills = {

                    profile_id:
                        parseInt(profileId),

                    python:
                        parseInt(
                            document.getElementById(
                                "python"
                            ).value
                        ),

                    java:
                        parseInt(
                            document.getElementById(
                                "java"
                            ).value
                        ),

                    sql:
                        parseInt(
                            document.getElementById(
                                "sql"
                            ).value
                        ),

                    statistics:
                        parseInt(
                            document.getElementById(
                                "statistics"
                            ).value
                        ),

                    data_analysis:
                        parseInt(
                            document.getElementById(
                                "data_analysis"
                            ).value
                        ),

                    web_development:
                        parseInt(
                            document.getElementById(
                                "web_development"
                            ).value
                        ),

                    communication:
                        parseInt(
                            document.getElementById(
                                "communication"
                            ).value
                        )
                };


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/skills`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        skills
                                    )
                            }
                        );


                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        throw new Error(
                            `Skills save failed: ${response.status} ${errorText}`
                        );
                    }


                    const data =
                        await response.json();


                    localStorage.setItem(
                        "careerSkills",
                        JSON.stringify(
                            data
                        )
                    );


                    console.log(
                        "Skills saved:",
                        data
                    );


                    window.location.href =
                        "career.html";


                } catch (error) {

                    console.error(
                        "Skills Error:",
                        error
                    );

                    alert(
                        "❌ Unable to save skills. Please make sure the backend is running."
                    );
                }
            }
        );
    }



    // ==================================================
    // 3. CAREER SELECTION CONNECTED TO FASTAPI
    // ==================================================

    const careerForm =
        document.getElementById("careerForm");


    if (careerForm) {

        careerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const profileId =
                    localStorage.getItem(
                        "profileId"
                    );


                if (!profileId) {

                    alert(
                        "⚠️ Profile ID not found. Please complete your profile first."
                    );

                    window.location.href =
                        "profile.html";

                    return;
                }


                const targetCareer =
                    document.getElementById(
                        "career"
                    ).value;


                const experience =
                    document.getElementById(
                        "experience"
                    ).value;


                const career = {

                    profile_id:
                        parseInt(profileId),

                    target_career:
                        targetCareer,

                    experience:
                        experience
                };


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/career`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        career
                                    )
                            }
                        );


                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        throw new Error(
                            `Career save failed: ${response.status} ${errorText}`
                        );
                    }


                    const data =
                        await response.json();


                    localStorage.setItem(
                        "careerChoice",
                        JSON.stringify(
                            career
                        )
                    );


                    localStorage.setItem(
                        "careerId",
                        data.career_id
                    );


                    console.log(
                        "Career saved:",
                        data
                    );


                    window.location.href =
                        "simulation.html";


                } catch (error) {

                    console.error(
                        "Career Error:",
                        error
                    );

                    alert(
                        "❌ Unable to save career choice. Please make sure the backend is running."
                    );
                }
            }
        );
    }



    // ==================================================
    // 4. SIMULATION PAGE
    // ==================================================

    const selectedCareer =
        document.getElementById(
            "selectedCareer"
        );

    const experienceLevel =
        document.getElementById(
            "experienceLevel"
        );


    if (
        selectedCareer ||
        experienceLevel
    ) {

        const savedCareer =
            localStorage.getItem(
                "careerChoice"
            );


        if (savedCareer) {

            try {

                const career =
                    JSON.parse(
                        savedCareer
                    );


                let careerName =
                    career.target_career ||
                    career.targetCareer;


                if (careerName) {

                    careerName =
                        careerName.replace(
                            /-/g,
                            " "
                        );


                    careerName =
                        careerName.replace(
                            /\b\w/g,
                            function (letter) {

                                return letter.toUpperCase();

                            }
                        );


                    if (selectedCareer) {

                        selectedCareer.textContent =
                            careerName;

                    }
                }


                if (
                    experienceLevel &&
                    career.experience
                ) {

                    experienceLevel.textContent =
                        "Experience Level: " +
                        career.experience;

                }


            } catch (error) {

                console.error(
                    "Simulation career loading error:",
                    error
                );

            }
        }
    }



    // ==================================================
    // 5. RESULTS PAGE
    // ==================================================

    const resultCareer =
        document.getElementById(
            "resultCareer"
        );


    const skillGapContainer =
        document.getElementById(
            "skillGapContainer"
        );


    const roadmapContainer =
        document.getElementById(
            "roadmapContainer"
        );


    const aiRecommendation =
        document.getElementById(
            "aiRecommendation"
        );


    if (
        resultCareer ||
        skillGapContainer ||
        roadmapContainer ||
        aiRecommendation
    ) {


        // ----------------------------------------------
        // LOAD CAREER
        // ----------------------------------------------

        const savedCareer =
            localStorage.getItem(
                "careerChoice"
            );


        if (
            savedCareer &&
            resultCareer
        ) {

            try {

                const career =
                    JSON.parse(
                        savedCareer
                    );


                let careerName =
                    career.target_career ||
                    career.targetCareer;


                if (careerName) {

                    careerName =
                        careerName.replace(
                            /-/g,
                            " "
                        );


                    careerName =
                        careerName.replace(
                            /\b\w/g,
                            function (letter) {

                                return letter.toUpperCase();

                            }
                        );


                    resultCareer.textContent =
                        careerName;

                }


            } catch (error) {

                console.error(
                    "Career loading error:",
                    error
                );

            }
        }



        // ----------------------------------------------
        // LOAD SIMULATION RESULT
        // ----------------------------------------------

        const savedSimulation =
            localStorage.getItem(
                "simulationResult"
            );


        if (!savedSimulation) {


            if (skillGapContainer) {

                skillGapContainer.innerHTML = `
                    <p>
                        ⚠️ No simulation result found.
                        Please complete the career simulation first.
                    </p>
                `;

            }


            if (roadmapContainer) {

                roadmapContainer.innerHTML = `
                    <p>
                        Please run the simulation first.
                    </p>
                `;

            }


            if (aiRecommendation) {

                aiRecommendation.textContent =
                    "Please complete the career simulation first.";

            }


        } else {

            try {

                const simulation =
                    JSON.parse(
                        savedSimulation
                    );


                // --------------------------------------
                // SKILL GAP
                // --------------------------------------

                if (skillGapContainer) {

                    let skillGapHTML = `
                        <div class="readiness-score">

                            <h3>
                                📊 Readiness Score:
                                ${simulation.readiness_score}%
                            </h3>

                        </div>
                    `;


                    if (
                        simulation.skill_gaps &&
                        simulation.skill_gaps.length > 0
                    ) {

                        simulation.skill_gaps.forEach(
                            function (gap) {

                                skillGapHTML += `
                                    <div class="gap-item">

                                        <strong>
                                            ${gap.skill}
                                        </strong>

                                        <span>

                                            ${gap.status}

                                            <br>

                                            Current:
                                            ${gap.current}
                                            /
                                            Required:
                                            ${gap.required}

                                        </span>

                                    </div>
                                `;

                            }
                        );


                    } else {

                        skillGapHTML += `
                            <p>
                                🎉 No major skill gaps found.
                            </p>
                        `;

                    }


                    skillGapContainer.innerHTML =
                        skillGapHTML;

                }



                // --------------------------------------
                // ROADMAP
                // --------------------------------------

                if (roadmapContainer) {

                    let roadmapHTML = "";


                    if (
                        simulation.roadmap &&
                        simulation.roadmap.length > 0
                    ) {

                        simulation.roadmap.forEach(
                            function (step) {

                                roadmapHTML += `
                                    <div class="roadmap-step">

                                        <div class="journey-number">
                                            ${step.month}
                                        </div>

                                        <div>

                                            <h3>
                                                ${step.title}
                                            </h3>

                                            <p>
                                                ${step.description}
                                            </p>

                                        </div>

                                    </div>
                                `;

                            }
                        );

                    }


                    roadmapContainer.innerHTML =
                        roadmapHTML;

                }



                // --------------------------------------
                // AI RECOMMENDATION
                // --------------------------------------

                if (aiRecommendation) {

                    aiRecommendation.textContent =
                        simulation.ai_recommendation ||
                        "Continue improving your skills and follow the personalized roadmap.";

                }


            } catch (error) {

                console.error(
                    "Simulation result loading error:",
                    error
                );

            }
        }

    }



    // ==================================================
    // 6. HINDSIGHT MEMORY
    // ==================================================

    const memoryForm =
        document.getElementById(
            "memoryForm"
        );


    const memoryDisplay =
        document.getElementById(
            "memoryDisplay"
        );



    // --------------------------------------------------
    // LOAD MEMORY
    // --------------------------------------------------

    async function loadMemory() {

        if (!memoryDisplay) {

            return;

        }


        const profileId =
            localStorage.getItem(
                "profileId"
            );


        if (!profileId) {

            memoryDisplay.innerHTML = `
                <p>
                    ⚠️ Profile not found.
                    Please complete your profile first.
                </p>
            `;

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/memory/${profileId}`
                );


            if (!response.ok) {

                memoryDisplay.innerHTML = `
                    <p>
                        No previous career decision recorded yet.
                    </p>
                `;

                return;

            }


            const data =
                await response.json();


            if (
                !data ||
                (
                    Array.isArray(data) &&
                    data.length === 0
                )
            ) {

                memoryDisplay.innerHTML = `
                    <p>
                        No previous career decision recorded yet.
                    </p>
                `;

                return;

            }


            const memory =
                Array.isArray(data)
                    ? data[data.length - 1]
                    : data;


            localStorage.setItem(
                "careerMemory",
                JSON.stringify(
                    memory
                )
            );


            memoryDisplay.innerHTML = `

                <div class="journey">

                    <div class="journey-step">

                        <div class="journey-number">
                            01
                        </div>

                        <div>

                            <h3>
                                Career
                            </h3>

                            <p>
                                ${memory.career}
                            </p>

                        </div>

                    </div>


                    <div class="journey-step">

                        <div class="journey-number">
                            02
                        </div>

                        <div>

                            <h3>
                                Decision
                            </h3>

                            <p>
                                ${memory.decision}
                            </p>

                        </div>

                    </div>


                    <div class="journey-step">

                        <div class="journey-number">
                            03
                        </div>

                        <div>

                            <h3>
                                Outcome
                            </h3>

                            <p>
                                ${memory.outcome}
                            </p>

                        </div>

                    </div>


                    <div class="journey-step">

                        <div class="journey-number">
                            04
                        </div>

                        <div>

                            <h3>
                                Lesson Learned
                            </h3>

                            <p>
                                ${memory.lesson}
                            </p>

                        </div>

                    </div>

                </div>

            `;


        } catch (error) {

            console.error(
                "Memory loading error:",
                error
            );


            memoryDisplay.innerHTML = `
                <p>
                    ⚠️ Unable to load career memory.
                    Please make sure the backend is running.
                </p>
            `;

        }

    }



    // --------------------------------------------------
    // SAVE MEMORY
    // --------------------------------------------------

    if (memoryForm) {

        memoryForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const profileId =
                    localStorage.getItem(
                        "profileId"
                    );


                if (!profileId) {

                    alert(
                        "Profile not found. Please complete your profile first."
                    );

                    return;

                }


                const memoryData = {

                    profile_id:
                        parseInt(
                            profileId
                        ),

                    career:
                        document.getElementById(
                            "memoryCareer"
                        ).value,

                    decision:
                        document.getElementById(
                            "memoryDecision"
                        ).value,

                    outcome:
                        document.getElementById(
                            "memoryOutcome"
                        ).value,

                    lesson:
                        document.getElementById(
                            "memoryLesson"
                        ).value

                };


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/memory`,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify(
                                        memoryData
                                    )

                            }
                        );


                    if (!response.ok) {

                        const errorText =
                            await response.text();


                        throw new Error(
                            `Memory save failed: ${response.status} ${errorText}`
                        );

                    }


                    const data =
                        await response.json();


                    // Save memory locally
                    localStorage.setItem(
                        "careerMemory",
                        JSON.stringify(
                            data
                        )
                    );


                    // Display saved memory
                    if (memoryDisplay) {

                        memoryDisplay.innerHTML = `

                            <div class="journey">

                                <div class="journey-step">

                                    <div class="journey-number">
                                        01
                                    </div>

                                    <div>

                                        <h3>
                                            Career
                                        </h3>

                                        <p>
                                            ${data.career}
                                        </p>

                                    </div>

                                </div>


                                <div class="journey-step">

                                    <div class="journey-number">
                                        02
                                    </div>

                                    <div>

                                        <h3>
                                            Decision
                                        </h3>

                                        <p>
                                            ${data.decision}
                                        </p>

                                    </div>

                                </div>


                                <div class="journey-step">

                                    <div class="journey-number">
                                        03
                                    </div>

                                    <div>

                                        <h3>
                                            Outcome
                                        </h3>

                                        <p>
                                            ${data.outcome}
                                        </p>

                                    </div>

                                </div>


                                <div class="journey-step">

                                    <div class="journey-number">
                                        04
                                    </div>

                                    <div>

                                        <h3>
                                            Lesson Learned
                                        </h3>

                                        <p>
                                            ${data.lesson}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        `;

                    }


                    alert(
                        "✅ Career memory saved successfully!"
                    );


                    // Clear form
                    memoryForm.reset();


                } catch (error) {

                    console.error(
                        "Memory save error:",
                        error
                    );


                    alert(
                        "❌ Failed to save career memory. Make sure the backend is running."
                    );

                }

            }
        );

    }


    // Load memory when memory page opens
    loadMemory();



    // ==================================================
    // 7. DASHBOARD
    // ==================================================

    const dashboardProfile =
        document.getElementById(
            "dashboardProfile"
        );


    const dashboardCareer =
        document.getElementById(
            "dashboardCareer"
        );


    const dashboardSkills =
        document.getElementById(
            "dashboardSkills"
        );


    const dashboardMemory =
        document.getElementById(
            "dashboardMemory"
        );


    if (
        dashboardProfile ||
        dashboardCareer ||
        dashboardSkills ||
        dashboardMemory
    ) {


        // ----------------------------------------------
        // PROFILE DATA
        // ----------------------------------------------

        const savedProfile =
            localStorage.getItem(
                "careerProfile"
            );


        if (
            savedProfile &&
            dashboardProfile
        ) {

            try {

                const profile =
                    JSON.parse(
                        savedProfile
                    );


                dashboardProfile.innerHTML = `

                    <p>
                        <strong>Name:</strong>
                        ${profile.name || "Not available"}
                    </p>

                    <p>
                        <strong>Education:</strong>
                        ${profile.education || "Not available"}
                    </p>

                    <p>
                        <strong>Branch:</strong>
                        ${profile.branch || "Not available"}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${profile.year || "Not available"}
                    </p>

                    <p>
                        <strong>Career Goal:</strong>
                        ${profile.goal || "Not available"}
                    </p>

                `;

            } catch (error) {

                console.error(
                    "Dashboard profile error:",
                    error
                );

            }

        }



        // ----------------------------------------------
        // CAREER DATA
        // ----------------------------------------------

        const savedCareer =
            localStorage.getItem(
                "careerChoice"
            );


        if (
            savedCareer &&
            dashboardCareer
        ) {

            try {

                const career =
                    JSON.parse(
                        savedCareer
                    );


                let careerName =
                    career.target_career ||
                    career.targetCareer ||
                    "Not available";


                careerName =
                    careerName.replace(
                        /-/g,
                        " "
                    );


                careerName =
                    careerName.replace(
                        /\b\w/g,
                        function (letter) {

                            return letter.toUpperCase();

                        }
                    );


                dashboardCareer.innerHTML = `

                    <p>
                        <strong>
                            Target Career:
                        </strong>

                        ${careerName}

                    </p>

                    <p>
                        <strong>
                            Experience:
                        </strong>

                        ${career.experience || "Not available"}

                    </p>

                `;

            } catch (error) {

                console.error(
                    "Dashboard career error:",
                    error
                );

            }

        }



        // ----------------------------------------------
        // SKILLS DATA
        // ----------------------------------------------

        const savedSkills =
            localStorage.getItem(
                "careerSkills"
            );


        if (
            savedSkills &&
            dashboardSkills
        ) {

            try {

                const skills =
                    JSON.parse(
                        savedSkills
                    );


                dashboardSkills.innerHTML = `

                    <p>
                        <strong>
                            Python:
                        </strong>

                        ${skills.python || 0}/5
                    </p>

                    <p>
                        <strong>
                            Java:
                        </strong>

                        ${skills.java || 0}/5
                    </p>

                    <p>
                        <strong>
                            SQL:
                        </strong>

                        ${skills.sql || 0}/5
                    </p>

                    <p>
                        <strong>
                            Statistics:
                        </strong>

                        ${skills.statistics || 0}/5
                    </p>

                    <p>
                        <strong>
                            Data Analysis:
                        </strong>

                        ${skills.data_analysis || 0}/5
                    </p>

                    <p>
                        <strong>
                            Web Development:
                        </strong>

                        ${skills.web_development || 0}/5
                    </p>

                    <p>
                        <strong>
                            Communication:
                        </strong>

                        ${skills.communication || 0}/5
                    </p>

                `;

            } catch (error) {

                console.error(
                    "Dashboard skills error:",
                    error
                );

            }

        }



        // ----------------------------------------------
        // MEMORY DATA
        // ----------------------------------------------

        const savedMemory =
            localStorage.getItem(
                "careerMemory"
            );


        if (
            savedMemory &&
            dashboardMemory
        ) {

            try {

                const memory =
                    JSON.parse(
                        savedMemory
                    );


                dashboardMemory.innerHTML = `

                    <p>
                        <strong>
                            Career:
                        </strong>

                        ${memory.career || "Not available"}

                    </p>

                    <p>
                        <strong>
                            Decision:
                        </strong>

                        ${memory.decision || "Not available"}

                    </p>

                    <p>
                        <strong>
                            Outcome:
                        </strong>

                        ${memory.outcome || "Not available"}

                    </p>

                    <p>
                        <strong>
                            Lesson:
                        </strong>

                        ${memory.lesson || "Not available"}

                    </p>

                `;

            } catch (error) {

                console.error(
                    "Dashboard memory error:",
                    error
                );

            }

        }

    }

});


// ======================================================
// 8. SIMULATE 6-MONTH PROGRESS
// ======================================================

async function showScenario() {

    const result =
        document.getElementById(
            "scenarioResult"
        );


    if (!result) {

        return;

    }


    const profileId =
        localStorage.getItem(
            "profileId"
        );


    const savedCareer =
        localStorage.getItem(
            "careerChoice"
        );


    const savedSkills =
        localStorage.getItem(
            "careerSkills"
        );


    const savedMemory =
        localStorage.getItem(
            "careerMemory"
        );


    if (
        !profileId ||
        !savedCareer ||
        !savedSkills
    ) {

        result.innerHTML = `

            <div class="simulation-card">

                <h3>
                    ⚠️ Missing Information
                </h3>

                <p>
                    Please complete your profile,
                    skills and career selection
                    before running the simulation.
                </p>

            </div>

        `;

        return;

    }


    try {

        const career =
            JSON.parse(
                savedCareer
            );


        const skills =
            JSON.parse(
                savedSkills
            );


        // Default memory
        let memory = {

            profile_id:
                parseInt(
                    profileId
                ),

            career:
                career.target_career ||
                career.targetCareer,

            decision:
                "",

            outcome:
                "",

            lesson:
                ""

        };


        // Use saved memory if available
        if (savedMemory) {

            memory =
                JSON.parse(
                    savedMemory
                );

        }


        const targetCareer =
            career.target_career ||
            career.targetCareer;


        // Show loading message
        result.innerHTML = `

            <div class="simulation-card">

                <h3>
                    ⏳ Running Career Simulation...
                </h3>

                <p>
                    Analyzing your skills,
                    career choice and
                    previous decisions...
                </p>

            </div>

        `;


        // ----------------------------------------------
        // SIMULATION REQUEST
        // ----------------------------------------------

        const simulationData = {

            profile_id:
                parseInt(
                    profileId
                ),

            target_career:
                targetCareer,

            experience:
                career.experience,

            skills: {

                profile_id:
                    parseInt(
                        profileId
                    ),

                python:
                    parseInt(
                        skills.python || 1
                    ),

                java:
                    parseInt(
                        skills.java || 1
                    ),

                sql:
                    parseInt(
                        skills.sql || 1
                    ),

                statistics:
                    parseInt(
                        skills.statistics || 1
                    ),

                data_analysis:
                    parseInt(
                        skills.data_analysis || 1
                    ),

                web_development:
                    parseInt(
                        skills.web_development || 1
                    ),

                communication:
                    parseInt(
                        skills.communication || 1
                    )

            },

            memory:
                memory

        };


        const response =
            await fetch(
                `${API_BASE_URL}/api/simulation`,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "*/*"

                    },

                    body:
                        JSON.stringify(
                            simulationData
                        )

                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();


            throw new Error(
                `Simulation failed: ${response.status} ${errorText}`
            );

        }


        const data =
            await response.json();


        // Save simulation result
        localStorage.setItem(
            "simulationResult",
            JSON.stringify(
                data
            )
        );


        // ----------------------------------------------
        // DISPLAY RESULT
        // ----------------------------------------------

        result.innerHTML = `

            <div class="simulation-card">

                <h3>
                    📈 Simulated 6-Month Progress
                </h3>

                <p>
                    ${data.simulation.six_month_summary}
                </p>


                <h3>
                    📊 Readiness Score
                </h3>

                <p>

                    <strong>
                        ${data.readiness_score}%
                    </strong>

                </p>


                <h3>
                    🚀 Career Journey
                </h3>


                <div class="journey">

                    ${data.simulation.steps
                        .map(
                            (step, index) => `

                                <div class="journey-step">

                                    <div class="journey-number">

                                        0${index + 1}

                                    </div>

                                    <div>

                                        <h3>
                                            ${step}
                                        </h3>

                                    </div>

                                </div>

                            `
                        )
                        .join("")}

                </div>


                <h3>
                    💡 AI Recommendation
                </h3>

                <p>
                    ${data.ai_recommendation}
                </p>

            </div>

        `;


        console.log(
            "Simulation API response:",
            data
        );


    } catch (error) {

        console.error(
            "Simulation Error:",
            error
        );


        result.innerHTML = `

            <div class="simulation-card">

                <h3>
                    ❌ Simulation Failed
                </h3>

                <p>
                    ${error.message}
                </p>

                <p>
                    Please make sure the
                    FastAPI backend is running.
                </p>

            </div>

        `;

    }

}


// ======================================================
// 9. NAVIGATION
// ======================================================

function goToResults() {

    window.location.href =
        "results.html";

}


function goToMemory() {

    window.location.href =
        "memory.html";

}


function goToDashboard() {

    window.location.href =
        "dashboard.html";

}


function goToNewSimulation() {

    window.location.href =
        "career.html";

}