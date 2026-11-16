// ============================================
// FITTRACK FRONTEND
// ============================================


// Sample workout library
const workouts = [

    {
        name: "Chest Strength",
        bodyPart: "Chest",
        difficulty: "Intermediate",
        duration: "45 min",
        calories: "300 kcal"
    },

    {
        name: "Back Builder",
        bodyPart: "Back",
        difficulty: "Intermediate",
        duration: "50 min",
        calories: "350 kcal"
    },

    {
        name: "Leg Power",
        bodyPart: "Legs",
        difficulty: "Advanced",
        duration: "60 min",
        calories: "450 kcal"
    },

    {
        name: "Biceps Focus",
        bodyPart: "Biceps",
        difficulty: "Beginner",
        duration: "35 min",
        calories: "220 kcal"
    },

    {
        name: "Triceps Strength",
        bodyPart: "Triceps",
        difficulty: "Beginner",
        duration: "35 min",
        calories: "220 kcal"
    },

    {
        name: "Shoulder Builder",
        bodyPart: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 min",
        calories: "280 kcal"
    },

    {
        name: "Core Workout",
        bodyPart: "Core",
        difficulty: "Beginner",
        duration: "30 min",
        calories: "200 kcal"
    }

];


// ============================================
// DATA
// ============================================

let workoutHistory =
    JSON.parse(localStorage.getItem("fitTrackWorkouts")) || [];

let profile =
    JSON.parse(localStorage.getItem("fitTrackProfile")) || {
        name: "User",
        email: "",
        age: "",
        weight: "",
        height: "",
        goal: ""
    };


// ============================================
// PAGE NAVIGATION
// ============================================

function showPage(pageId, button) {

    // Hide all pages

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });


    // Show selected page

    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    // Remove active navigation

    const navButtons =
        document.querySelectorAll(".nav-btn");

    navButtons.forEach(btn => {
        btn.classList.remove("active");
    });


    // Activate clicked button

    if (button) {
        button.classList.add("active");
    }


    // Change title

    const titles = {

        dashboard: "Dashboard",

        workouts: "Workouts",

        progress: "Progress",

        history: "Workout History",

        profile: "Profile"

    };

    document.getElementById("pageTitle").textContent =
        titles[pageId] || "FitTrack";


    // Update information

    updateDashboard();

    updateProgress();

    updateHistory();

    loadProfile();

}


// Used when navigation happens from another place

function showPageByName(pageId) {

    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        const text =
            button.textContent.toLowerCase();

        if (text.includes(pageId)) {

            showPage(pageId, button);

        }

    });

}


// ============================================
// WORKOUT LIBRARY
// ============================================

function displayWorkouts(filter = "All", clickedButton = null) {

    const container =
        document.getElementById("workoutLibrary");


    container.innerHTML = "";


    // Active filter button

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    const filteredWorkouts =
        filter === "All"
            ? workouts
            : workouts.filter(
                workout => workout.bodyPart === filter
            );


    filteredWorkouts.forEach(workout => {

        const card =
            document.createElement("div");

        card.className = "workout-card";


        card.innerHTML = `

            <span class="workout-tag">
                ${workout.bodyPart}
            </span>

            <h3>${workout.name}</h3>

            <p>
                Difficulty: ${workout.difficulty}
            </p>

            <p>
                ⏱️ ${workout.duration}
                &nbsp;&nbsp;
                🔥 ${workout.calories}
            </p>

            <button
                class="primary-btn"
                onclick="startWorkout('${workout.name}')"
            >
                Start Workout
            </button>

        `;


        container.appendChild(card);

    });

}


// ============================================
// BODY PART FILTER
// ============================================

function filterBodyPart(bodyPart) {

    // Open workouts page

    const workoutsPage =
        document.getElementById("workouts");

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active-page");
        });

    workoutsPage.classList.add("active-page");


    // Navigation

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.textContent
                    .toLowerCase()
                    .includes("workouts")
            ) {
                button.classList.add("active");
            }

        });


    document.getElementById("pageTitle").textContent =
        "Workouts";


    // Find matching filter button

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    let matchingButton = null;


    filterButtons.forEach(button => {

        if (
            button.textContent.trim() === bodyPart
        ) {
            matchingButton = button;
        }

    });


    displayWorkouts(
        bodyPart,
        matchingButton
    );

}


// ============================================
// START WORKOUT
// ============================================

function startWorkout(workoutName) {

    const selectedWorkout =
        workouts.find(
            workout => workout.name === workoutName
        );


    if (!selectedWorkout) {
        return;
    }


    document.getElementById("workoutName").value =
        selectedWorkout.name;


    document.getElementById("workoutBodyPart").value =
        selectedWorkout.bodyPart;


    document.getElementById("workoutDuration").value =
        parseInt(selectedWorkout.duration);


    document.getElementById("workoutCalories").value =
        parseInt(selectedWorkout.calories);


    openWorkoutModal();

}


// ============================================
// MODAL
// ============================================

function openWorkoutModal() {

    document
        .getElementById("workoutModal")
        .classList.add("show");

}


function closeWorkoutModal() {

    document
        .getElementById("workoutModal")
        .classList.remove("show");

}


// Close modal when clicking outside

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("workoutModal");

    if (event.target === modal) {
        closeWorkoutModal();
    }

});


// ============================================
// SAVE WORKOUT
// ============================================

function saveWorkout() {

    const name =
        document.getElementById("workoutName").value.trim();


    const bodyPart =
        document.getElementById("workoutBodyPart").value;


    const duration =
        Number(
            document.getElementById("workoutDuration").value
        );


    const calories =
        Number(
            document.getElementById("workoutCalories").value
        );


    const notes =
        document.getElementById("workoutNotes").value.trim();


    // Validation

    if (!name) {

        alert("Please enter workout name.");

        return;
    }


    if (!duration || duration <= 0) {

        alert("Please enter workout duration.");

        return;
    }


    if (!calories || calories <= 0) {

        alert("Please enter calories.");

        return;
    }


    // Create workout object

    const workout = {

        id: Date.now(),

        name: name,

        bodyPart: bodyPart,

        duration: duration,

        calories: calories,

        notes: notes,

        date: new Date().toLocaleDateString()

    };


    // Add workout

    workoutHistory.unshift(workout);


    // Save to browser

    localStorage.setItem(
        "fitTrackWorkouts",
        JSON.stringify(workoutHistory)
    );


    // Clear form

    document.getElementById("workoutName").value = "";

    document.getElementById("workoutDuration").value = "";

    document.getElementById("workoutCalories").value = "";

    document.getElementById("workoutNotes").value = "";


    // Close modal

    closeWorkoutModal();


    // Update everything

    updateDashboard();

    updateProgress();

    updateHistory();


    alert("Workout saved successfully!");


}


// ============================================
// DASHBOARD
// ============================================

function updateDashboard() {

    const count =
        workoutHistory.length;


    const totalDuration =
        workoutHistory.reduce(
            (sum, workout) =>
                sum + Number(workout.duration),
            0
        );


    const totalCalories =
        workoutHistory.reduce(
            (sum, workout) =>
                sum + Number(workout.calories),
            0
        );


    document.getElementById("workoutCount")
        .textContent = count;


    document.getElementById("totalTime")
        .textContent =
        totalDuration + " min";


    document.getElementById("totalCalories")
        .textContent =
        totalCalories + " kcal";


    document.getElementById("progressWorkouts")
        .textContent = count;


    document.getElementById("progressDuration")
        .textContent =
        totalDuration + " min";


    document.getElementById("progressCalories")
        .textContent =
        totalCalories + " kcal";


    // Weekly goal

    const weeklyGoal = 5;

    const weeklyCount =
        Math.min(count, weeklyGoal);


    const percentage =
        (weeklyCount / weeklyGoal) * 100;


    document.getElementById("goalText")
        .textContent =
        weeklyCount + " / " + weeklyGoal + " workouts";


    document.getElementById("goalProgress")
        .style.width =
        percentage + "%";


    // Streak

    document.getElementById("streakValue")
        .textContent =
        calculateStreak() + " Days";


    // Recent activity

    const recent =
        document.getElementById("recentActivity");


    if (workoutHistory.length === 0) {

        recent.innerHTML = `

            <div class="empty-state">

                <div>🏃</div>

                <p>No workouts yet</p>

                <small>
                    Start your first workout!
                </small>

            </div>

        `;

        return;
    }


    recent.innerHTML = "";


    workoutHistory
        .slice(0, 3)
        .forEach(workout => {

            const item =
                document.createElement("div");

            item.className = "history-item";


            item.innerHTML = `

                <div>

                    <h3>${workout.name}</h3>

                    <p>
                        ${workout.bodyPart}
                        •
                        ${workout.date}
                    </p>

                </div>

                <strong>
                    ${workout.duration} min
                </strong>

            `;


            recent.appendChild(item);

        });

}


// ============================================
// HISTORY
// ============================================

function updateHistory() {

    const historyList =
        document.getElementById("historyList");


    if (workoutHistory.length === 0) {

        historyList.innerHTML = `

            <div class="empty-state">

                <div>📅</div>

                <p>No workout history</p>

                <small>
                    Your completed workouts will appear here.
                </small>

            </div>

        `;

        return;
    }


    historyList.innerHTML = "";


    workoutHistory.forEach(workout => {

        const item =
            document.createElement("div");


        item.className =
            "history-item";


        item.innerHTML = `

            <div>

                <h3>${workout.name}</h3>

                <p>
                    ${workout.bodyPart}
                    •
                    ${workout.date}
                    •
                    ${workout.duration} min
                    •
                    ${workout.calories} kcal
                </p>

            </div>

            <button
                class="text-btn"
                onclick="deleteWorkout(${workout.id})"
            >
                Delete
            </button>

        `;


        historyList.appendChild(item);

    });

}


// ============================================
// DELETE WORKOUT
// ============================================

function deleteWorkout(id) {

    const confirmDelete =
        confirm("Delete this workout?");


    if (!confirmDelete) {
        return;
    }


    workoutHistory =
        workoutHistory.filter(
            workout => workout.id !== id
        );


    localStorage.setItem(
        "fitTrackWorkouts",
        JSON.stringify(workoutHistory)
    );


    updateDashboard();

    updateProgress();

    updateHistory();

}


// ============================================
// STREAK
// ============================================

function calculateStreak() {

    if (workoutHistory.length === 0) {
        return 0;
    }


    const dates =
        workoutHistory.map(
            workout => workout.date
        );


    const uniqueDates =
        [...new Set(dates)];


    return uniqueDates.length;

}


// ============================================
// PROFILE
// ============================================

function saveProfile() {

    profile.name =
        document.getElementById("profileName").value;


    profile.email =
        document.getElementById("profileEmail").value;


    profile.age =
        document.getElementById("profileAge").value;


    profile.weight =
        document.getElementById("profileWeight").value;


    profile.height =
        document.getElementById("profileHeight").value;


    profile.goal =
        document.getElementById("fitnessGoal").value;


    localStorage.setItem(
        "fitTrackProfile",
        JSON.stringify(profile)
    );


    document.getElementById("userName")
        .textContent =
        profile.name || "User";


    document.querySelector(".user-avatar")
        .textContent =
        profile.name
            ? profile.name.charAt(0).toUpperCase()
            : "U";


    alert("Profile saved successfully!");

}


// ============================================
// LOAD PROFILE
// ============================================

function loadProfile() {

    document.getElementById("profileName").value =
        profile.name || "";


    document.getElementById("profileEmail").value =
        profile.email || "";


    document.getElementById("profileAge").value =
        profile.age || "";


    document.getElementById("profileWeight").value =
        profile.weight || "";


    document.getElementById("profileHeight").value =
        profile.height || "";


    document.getElementById("fitnessGoal").value =
        profile.goal || "";


    document.getElementById("userName")
        .textContent =
        profile.name || "User";


    document.querySelector(".user-avatar")
        .textContent =
        profile.name
            ? profile.name.charAt(0).toUpperCase()
            : "U";

}


// ============================================
// PROGRESS
// ============================================

function updateProgress() {

    const count =
        workoutHistory.length;


    const duration =
        workoutHistory.reduce(
            (total, workout) =>
                total + Number(workout.duration),
            0
        );


    const calories =
        workoutHistory.reduce(
            (total, workout) =>
                total + Number(workout.calories),
            0
        );


    document.getElementById("progressWorkouts")
        .textContent = count;


    document.getElementById("progressDuration")
        .textContent =
        duration + " min";


    document.getElementById("progressCalories")
        .textContent =
        calories + " kcal";

}


// ============================================
// INITIAL LOAD
// ============================================

document.addEventListener("DOMContentLoaded", function() {

    // Show workout library

    displayWorkouts("All");


    // Load profile

    loadProfile();

    updateDashboard();
    updateProgress();

    updateHistory();

});
/* =====================================
   LOGIN SYSTEM
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loginPage = document.getElementById("loginPage");
    const loginForm = document.getElementById("loginForm");
    const app = document.getElementById("app");


    // Check whether user is already logged in

    const loggedInUser =
        localStorage.getItem("fitTrackUser");


    if (loggedInUser) {

        loginPage.style.display = "none";

        if (app) {
            app.classList.remove("app-hidden");
        }

    } else {

        loginPage.style.display = "flex";

        if (app) {
            app.classList.add("app-hidden");
        }

    }


    // Login

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const userId =
            document.getElementById("loginId").value.trim();


        const password =
            document.getElementById("loginPassword").value.trim();


        if (userId === "" || password === "") {

            alert("Please enter User ID and Password.");

            return;
        }


        // Save login

        localStorage.setItem(
            "fitTrackUser",
            userId
        );


        // Hide login

        loginPage.style.display = "none";


        // Show application

        if (app) {
            app.classList.remove("app-hidden");
        }

    });

});