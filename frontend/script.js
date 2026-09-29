// ======================================================
// AI CAREER DECISION SIMULATOR
// COMPLETE FRONTEND JAVASCRIPT
// ======================================================

// ======================================================
// 1. API CONFIGURATION
// ======================================================

const API_BASE_URL = "https://ai-career-decision-simulator.onrender.com";

// ======================================================
// 2. HELPER FUNCTIONS
// ======================================================

async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(options.headers || {})
        }
    });

    const text = await response.text();

    let data;

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}: ${
                typeof data === "string"
                    ? data
                    : JSON.stringify(data)
            }`
        );
    }

    return data;
}


function getProfileId() {
    const value = localStorage.getItem("profileId");

    if (!value) {
        return null;
    }

    const id = parseInt(value, 10);

    return Number.isInteger(id) && id > 0 ? id : null;
}


function getSkillValue(id) {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Skill field "${id}" was not found on the page.`);
    }

    const value = parseInt(element.value, 10);

    if (!Number.isInteger(value) || value < 1 || value > 5) {
        throw new Error(
            `Invalid value for ${id}. Please select a skill level from 1 to 5.`
        );
    }

    return value;
}


function formatCareerName(name) {
    if (!name) {
        return "Not available";
    }

    return String(name)
        .replace(/-/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}


function showApiError(title, error) {
    console.error(title, error);

    alert(
        `${title}\n\n${error.message}\n\n` +
        "Please check the browser console if you need more details."
    );
}


// ======================================================
// 3. HOME PAGE
// ======================================================

function startJourney() {
    window.location.href = "profile.html";
}


// ======================================================
// 4. PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // PROFILE
    // ==================================================

    const profileForm = document.getElementById("profileForm");

    if (profileForm) {

        profileForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const profile = {
                name: document.getElementById("name")?.value.trim() || "",
                education: document.getElementById("education")?.value.trim() || "",
                branch: document.getElementById("branch")?.value.trim() || "",
                year: document.getElementById("year")?.value.trim() || "",
                goal: document.getElementById("goal")?.value.trim() || "",
                interests: document.getElementById("interests")?.value.trim() || ""
            };

            if (!profile.name) {
                alert("Please enter your name.");
                return;
            }

            try {

                console.log("Sending profile:", profile);

                const data = await apiRequest("/api/profile", {
                    method: "POST",
                    body: JSON.stringify(profile)
                });

                console.log("Profile API response:", data);

                const profileId =
                    data.profile_id ??
                    data.id;

                if (!profileId) {
                    throw new Error(
                        "Backend saved the profile but did not return a profile ID."
                    );
                }

                localStorage.setItem(
                    "careerProfile",
                    JSON.stringify(data)
                );

                localStorage.setItem(
                    "profileId",
                    String(profileId)
                );

                console.log("Profile ID saved:", profileId);

                window.location.href = "skills.html";

            } catch (error) {

                showApiError(
                    "❌ Unable to save profile.",
                    error
                );
            }
        });
    }


    // ==================================================
    // SKILLS
    // ==================================================

    const skillsForm = document.getElementById("skillsForm");

    if (skillsForm) {

        skillsForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const profileId = getProfileId();

            if (!profileId) {

                alert(
                    "⚠️ Profile ID not found.\n\nPlease complete your profile first."
                );

                window.location.href = "profile.html";

                return;
            }

            try {

                // ------------------------------------------
                // READ AND VALIDATE SKILLS
                // ------------------------------------------

                const skills = {
                    profile_id: profileId,

                    python: getSkillValue("python"),
                    java: getSkillValue("java"),
                    sql: getSkillValue("sql"),
                    statistics: getSkillValue("statistics"),
                    data_analysis: getSkillValue("data_analysis"),
                    web_development: getSkillValue("web_development"),
                    communication: getSkillValue("communication")
                };

                console.log("Sending skills:", skills);

                // ------------------------------------------
                // SEND TO FASTAPI
                // ------------------------------------------

                const data = await apiRequest("/api/skills", {
                    method: "POST",
                    body: JSON.stringify(skills)
                });

                console.log("Skills API response:", data);

                // ------------------------------------------
                // SAVE LOCALLY
                // ------------------------------------------

                localStorage.setItem(
                    "careerSkills",
                    JSON.stringify(data)
                );

                console.log("Skills saved successfully.");

                // ------------------------------------------
                // GO TO CAREER PAGE
                // ------------------------------------------

                window.location.href = "career.html";

            } catch (error) {

                console.error("Skills Error:", error);

                alert(
                    "❌ Unable to save skills.\n\n" +
                    error.message
                );
            }
        });
    }


    // ==================================================
    // CAREER SELECTION
    // ==================================================

    const careerForm = document.getElementById("careerForm");

    if (careerForm) {

        careerForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const profileId = getProfileId();

            if (!profileId) {

                alert(
                    "⚠️ Profile ID not found.\n\nPlease complete your profile first."
                );

                window.location.href = "profile.html";

                return;
            }

            const careerElement =
                document.getElementById("career");

            const experienceElement =
                document.getElementById("experience");

            if (!careerElement || !experienceElement) {

                alert(
                    "Career form fields were not found."
                );

                return;
            }

            const targetCareer =
                careerElement.value;

            const experience =
                experienceElement.value;

            if (!targetCareer) {

                alert("Please select a career.");

                return;
            }

            if (!experience) {

                alert("Please select your experience level.");

                return;
            }

            const career = {
                profile_id: profileId,
                target_career: targetCareer,
                experience: experience
            };

            try {

                console.log("Sending career:", career);

                const data = await apiRequest("/api/career", {
                    method: "POST",
                    body: JSON.stringify(career)
                });

                console.log("Career API response:", data);

                localStorage.setItem(
                    "careerChoice",
                    JSON.stringify(career)
                );

                if (data.career_id) {

                    localStorage.setItem(
                        "careerId",
                        String(data.career_id)
                    );
                }

                window.location.href =
                    "simulation.html";

            } catch (error) {

                showApiError(
                    "❌ Unable to save career choice.",
                    error
                );
            }
        });
    }


    // ==================================================
    // SIMULATION PAGE
    // ==================================================

    const selectedCareer =
        document.getElementById("selectedCareer");

    const experienceLevel =
        document.getElementById("experienceLevel");

    if (selectedCareer || experienceLevel) {

        const savedCareer =
            localStorage.getItem("careerChoice");

        if (savedCareer) {

            try {

                const career =
                    JSON.parse(savedCareer);

                const careerName =
                    formatCareerName(
                        career.target_career ||
                        career.targetCareer
                    );

                if (selectedCareer) {

                    selectedCareer.textContent =
                        careerName;
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
    // RESULTS PAGE
    // ==================================================

    const resultCareer =
        document.getElementById("resultCareer");

    const skillGapContainer =
        document.getElementById("skillGapContainer");

    const roadmapContainer =
        document.getElementById("roadmapContainer");

    const aiRecommendation =
        document.getElementById("aiRecommendation");

    if (
        resultCareer ||
        skillGapContainer ||
        roadmapContainer ||
        aiRecommendation
    ) {

        const savedCareer =
            localStorage.getItem("careerChoice");

        if (savedCareer && resultCareer) {

            try {

                const career =
                    JSON.parse(savedCareer);

                resultCareer.textContent =
                    formatCareerName(
                        career.target_career ||
                        career.targetCareer
                    );

            } catch (error) {

                console.error(
                    "Career loading error:",
                    error
                );
            }
        }


        const savedSimulation =
            localStorage.getItem("simulationResult");

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
                    JSON.parse(savedSimulation);

                // ------------------------------------------
                // SKILL GAP
                // ------------------------------------------

                if (skillGapContainer) {

                    let html = `
                        <div class="readiness-score">
                            <h3>
                                📊 Readiness Score:
                                ${simulation.readiness_score ?? 0}%
                            </h3>
                        </div>
                    `;

                    if (
                        simulation.skill_gaps &&
                        simulation.skill_gaps.length > 0
                    ) {

                        simulation.skill_gaps.forEach(gap => {

                            html += `
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
                        });

                    } else {

                        html += `
                            <p>
                                🎉 No major skill gaps found.
                            </p>
                        `;
                    }

                    skillGapContainer.innerHTML =
                        html;
                }


                // ------------------------------------------
                // ROADMAP
                // ------------------------------------------

                if (roadmapContainer) {

                    let roadmapHTML = "";

                    if (
                        simulation.roadmap &&
                        simulation.roadmap.length > 0
                    ) {

                        simulation.roadmap.forEach(step => {

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
                        });
                    }

                    roadmapContainer.innerHTML =
                        roadmapHTML;
                }


                // ------------------------------------------
                // AI RECOMMENDATION
                // ------------------------------------------

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
    // HINDSIGHT MEMORY
    // ==================================================

    const memoryForm =
        document.getElementById("memoryForm");

    const memoryDisplay =
        document.getElementById("memoryDisplay");


    async function loadMemory() {

        if (!memoryDisplay) {
            return;
        }

        const profileId =
            getProfileId();

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
                JSON.stringify(memory)
            );

            displayMemory(memory);

        } catch (error) {

            console.error(
                "Memory loading error:",
                error
            );

            memoryDisplay.innerHTML = `
                <p>
                    ⚠️ Unable to load career memory.
                </p>
            `;
        }
    }


    function displayMemory(memory) {

        if (!memoryDisplay) {
            return;
        }

        memoryDisplay.innerHTML = `

            <div class="journey">

                <div class="journey-step">
                    <div class="journey-number">01</div>
                    <div>
                        <h3>Career</h3>
                        <p>${memory.career || ""}</p>
                    </div>
                </div>

                <div class="journey-step">
                    <div class="journey-number">02</div>
                    <div>
                        <h3>Decision</h3>
                        <p>${memory.decision || ""}</p>
                    </div>
                </div>

                <div class="journey-step">
                    <div class="journey-number">03</div>
                    <div>
                        <h3>Outcome</h3>
                        <p>${memory.outcome || ""}</p>
                    </div>
                </div>

                <div class="journey-step">
                    <div class="journey-number">04</div>
                    <div>
                        <h3>Lesson Learned</h3>
                        <p>${memory.lesson || ""}</p>
                    </div>
                </div>

            </div>
        `;
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
                    getProfileId();

                if (!profileId) {

                    alert(
                        "Profile not found. Please complete your profile first."
                    );

                    return;
                }

                const memoryData = {

                    profile_id: profileId,

                    career:
                        document.getElementById(
                            "memoryCareer"
                        )?.value || "",

                    decision:
                        document.getElementById(
                            "memoryDecision"
                        )?.value || "",

                    outcome:
                        document.getElementById(
                            "memoryOutcome"
                        )?.value || "",

                    lesson:
                        document.getElementById(
                            "memoryLesson"
                        )?.value || ""
                };

                try {

                    const data =
                        await apiRequest(
                            "/api/memory",
                            {
                                method: "POST",
                                body: JSON.stringify(
                                    memoryData
                                )
                            }
                        );

                    localStorage.setItem(
                        "careerMemory",
                        JSON.stringify(data)
                    );

                    displayMemory(data);

                    alert(
                        "✅ Career memory saved successfully!"
                    );

                    memoryForm.reset();

                } catch (error) {

                    showApiError(
                        "❌ Failed to save career memory.",
                        error
                    );
                }
            }
        );
    }


    loadMemory();


    // ==================================================
    // DASHBOARD
    // ==================================================

    const dashboardProfile =
        document.getElementById("dashboardProfile");

    const dashboardCareer =
        document.getElementById("dashboardCareer");

    const dashboardSkills =
        document.getElementById("dashboardSkills");

    const dashboardMemory =
        document.getElementById("dashboardMemory");


    if (
        dashboardProfile ||
        dashboardCareer ||
        dashboardSkills ||
        dashboardMemory
    ) {

        // ----------------------------------------------
        // PROFILE
        // ----------------------------------------------

        const savedProfile =
            localStorage.getItem("careerProfile");

        if (savedProfile && dashboardProfile) {

            try {

                const profile =
                    JSON.parse(savedProfile);

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
        // CAREER
        // ----------------------------------------------

        const savedCareer =
            localStorage.getItem("careerChoice");

        if (savedCareer && dashboardCareer) {

            try {

                const career =
                    JSON.parse(savedCareer);

                const careerName =
                    formatCareerName(
                        career.target_career ||
                        career.targetCareer
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
        // SKILLS
        // ----------------------------------------------

        const savedSkills =
            localStorage.getItem("careerSkills");

        if (savedSkills && dashboardSkills) {

            try {

                const skills =
                    JSON.parse(savedSkills);

                dashboardSkills.innerHTML = `

                    <p><strong>Python:</strong> ${skills.python || 0}/5</p>
                    <p><strong>Java:</strong> ${skills.java || 0}/5</p>
                    <p><strong>SQL:</strong> ${skills.sql || 0}/5</p>
                    <p><strong>Statistics:</strong> ${skills.statistics || 0}/5</p>
                    <p><strong>Data Analysis:</strong> ${skills.data_analysis || 0}/5</p>
                    <p><strong>Web Development:</strong> ${skills.web_development || 0}/5</p>
                    <p><strong>Communication:</strong> ${skills.communication || 0}/5</p>
                `;

            } catch (error) {

                console.error(
                    "Dashboard skills error:",
                    error
                );
            }
        }


        // ----------------------------------------------
        // MEMORY
        // ----------------------------------------------

        const savedMemory =
            localStorage.getItem("careerMemory");

        if (savedMemory && dashboardMemory) {

            try {

                const memory =
                    JSON.parse(savedMemory);

                dashboardMemory.innerHTML = `

                    <p>
                        <strong>Career:</strong>
                        ${memory.career || "Not available"}
                    </p>

                    <p>
                        <strong>Decision:</strong>
                        ${memory.decision || "Not available"}
                    </p>

                    <p>
                        <strong>Outcome:</strong>
                        ${memory.outcome || "Not available"}
                    </p>

                    <p>
                        <strong>Lesson:</strong>
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
// 5. SIMULATE 6-MONTH PROGRESS
// ======================================================

async function showScenario() {

    const result =
        document.getElementById("scenarioResult");

    if (!result) {
        return;
    }

    const profileId =
        getProfileId();

    const savedCareer =
        localStorage.getItem("careerChoice");

    const savedSkills =
        localStorage.getItem("careerSkills");

    const savedMemory =
        localStorage.getItem("careerMemory");


    if (
        !profileId ||
        !savedCareer ||
        !savedSkills
    ) {

        result.innerHTML = `
            <div class="simulation-card">
                <h3>⚠️ Missing Information</h3>

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
            JSON.parse(savedCareer);

        const skills =
            JSON.parse(savedSkills);


        let memory = {

            profile_id: profileId,

            career:
                career.target_career ||
                career.targetCareer ||
                "",

            decision: "",
            outcome: "",
            lesson: ""
        };


        if (savedMemory) {

            memory =
                JSON.parse(savedMemory);
        }


        const targetCareer =
            career.target_career ||
            career.targetCareer;


        result.innerHTML = `
            <div class="simulation-card">

                <h3>
                    ⏳ Running Career Simulation...
                </h3>

                <p>
                    Analyzing your skills,
                    career choice and previous decisions...
                </p>

            </div>
        `;


        const simulationData = {

            profile_id: profileId,

            target_career: targetCareer,

            experience:
                career.experience,

            skills: {

                profile_id: profileId,

                python:
                    parseInt(skills.python, 10),

                java:
                    parseInt(skills.java, 10),

                sql:
                    parseInt(skills.sql, 10),

                statistics:
                    parseInt(skills.statistics, 10),

                data_analysis:
                    parseInt(skills.data_analysis, 10),

                web_development:
                    parseInt(skills.web_development, 10),

                communication:
                    parseInt(skills.communication, 10)
            },

            memory: memory
        };


        console.log(
            "Sending simulation:",
            simulationData
        );


        const data =
            await apiRequest(
                "/api/simulation",
                {
                    method: "POST",
                    body: JSON.stringify(
                        simulationData
                    )
                }
            );


        console.log(
            "Simulation API response:",
            data
        );


        localStorage.setItem(
            "simulationResult",
            JSON.stringify(data)
        );


        result.innerHTML = `

            <div class="simulation-card">

                <h3>
                    📈 Simulated 6-Month Progress
                </h3>

                <p>
                    ${
                        data.simulation?.six_month_summary ||
                        "Simulation completed successfully."
                    }
                </p>


                <h3>
                    📊 Readiness Score
                </h3>

                <p>
                    <strong>
                        ${data.readiness_score ?? 0}%
                    </strong>
                </p>


                <h3>
                    🚀 Career Journey
                </h3>

                <div class="journey">

                    ${
                        (data.simulation?.steps || [])
                            .map(
                                (step, index) => `
                                    <div class="journey-step">

                                        <div class="journey-number">
                                            ${String(index + 1).padStart(2, "0")}
                                        </div>

                                        <div>
                                            <h3>
                                                ${step}
                                            </h3>
                                        </div>

                                    </div>
                                `
                            )
                            .join("")
                    }

                </div>


                <h3>
                    💡 AI Recommendation
                </h3>

                <p>
                    ${
                        data.ai_recommendation ||
                        "Continue improving your skills and follow the personalized roadmap."
                    }
                </p>

            </div>
        `;


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

            </div>
        `;
    }
}


// ======================================================
// 6. NAVIGATION
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