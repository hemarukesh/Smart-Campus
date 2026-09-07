/* =========================
   DASHBOARD INITIALIZATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

        setupTheme();

        updateWelcomeMessage();

    }
);


/* =========================
   LOAD DASHBOARD
========================= */

function loadDashboard() {

    updateTaskStatistics();

    updateNoteStatistics();

    updateStudyStatistics();

    updateScheduleStatistics();

    displayDashboardTasks();

    displayDashboardSchedule();

    displayDashboardNotes();

}


/* =========================
   TASK STATISTICS
========================= */

function updateTaskStatistics() {

    const tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const total =
        tasks.length;


    /*
       Your task objects use
       completed = true / false
    */

    const completed =
        tasks.filter(
            function (task) {

                return task.completed === true;

            }
        ).length;


    document.getElementById(
        "totalTasks"
    ).textContent =
        total;


    document.getElementById(
        "completedTasks"
    ).textContent =
        completed;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    document.getElementById(
        "taskPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "taskProgress"
    ).style.width =
        percentage + "%";

}


/* =========================
   NOTES
========================= */

function updateNoteStatistics() {

    const notes =
        JSON.parse(
            localStorage.getItem("notes")
        ) || [];


    document.getElementById(
        "totalNotes"
    ).textContent =
        notes.length;

}


/* =========================
   STUDY TIME
========================= */

function updateStudyStatistics() {

    const minutes =
        parseInt(
            localStorage.getItem(
                "studyMinutes"
            )
        ) || 0;


    document.getElementById(
        "studyMinutes"
    ).textContent =
        minutes;

}


/* =========================
   SCHEDULE
========================= */

function updateScheduleStatistics() {

    const schedule =
        JSON.parse(
            localStorage.getItem("schedule")
        ) || [];


    document.getElementById(
        "totalSchedule"
    ).textContent =
        schedule.length;

}


/* =========================
   DASHBOARD TASKS
========================= */

function displayDashboardTasks() {

    const tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const container =
        document.getElementById(
            "dashboardTasks"
        );


    if (tasks.length === 0) {

        container.innerHTML = `

            <div class="text-center
                        text-muted
                        py-4">

                <i class="bi bi-check2-circle fs-1">
                </i>

                <p class="mt-2">

                    No tasks yet.

                </p>


                <a
                    href="pages/tasks.html"
                    class="btn btn-primary btn-sm">

                    Add Task

                </a>

            </div>

        `;

        return;

    }


    /*
       Show maximum 5 tasks
    */

    const recentTasks =
        tasks.slice(0, 5);


    container.innerHTML = "";


    recentTasks.forEach(
        function (task) {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "dashboard-task";


            div.innerHTML = `

                <div class="d-flex
                            align-items-center
                            mb-3">

                    <i class="bi
                              ${task.completed
                                ? "bi-check-circle-fill text-success"
                                : "bi-circle text-muted"}
                              me-3 fs-5">
                    </i>


                    <div>

                        <div class="
                            ${task.completed
                                ? "text-decoration-line-through text-muted"
                                : ""}">

                            ${task.title}

                        </div>


                        <small class="text-muted">

                            ${task.priority || "Normal"}

                        </small>

                    </div>

                </div>

            `;


            container.appendChild(
                div
            );

        }
    );

}


/* =========================
   DASHBOARD SCHEDULE
========================= */

function displayDashboardSchedule() {

    const schedule =
        JSON.parse(
            localStorage.getItem(
                "schedule"
            )
        ) || [];


    const container =
        document.getElementById(
            "dashboardSchedule"
        );


    if (schedule.length === 0) {

        container.innerHTML = `

            <div class="text-center
                        text-muted
                        py-4">

                <i class="bi bi-calendar-x fs-1">
                </i>

                <p class="mt-2">

                    No sessions scheduled.

                </p>

                <a
                    href="pages/schedule.html"
                    class="btn btn-primary btn-sm">

                    Add Session

                </a>

            </div>

        `;

        return;

    }


    /*
       Sort by time
    */

    schedule.sort(
        function (a, b) {

            return a.time.localeCompare(
                b.time
            );

        }
    );


    const sessions =
        schedule.slice(0, 5);


    container.innerHTML = "";


    sessions.forEach(
        function (item) {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "schedule-item mb-3";


            div.innerHTML = `

                <div class="d-flex">


                    <div class="schedule-time-small">

                        ${formatTime(
                            item.time
                        )}

                    </div>


                    <div class="ms-3">

                        <strong>

                            ${item.subject}

                        </strong>


                        <br>


                        <small class="text-muted">

                            ${item.day}

                            ${item.room
                                ? " • " + item.room
                                : ""}

                        </small>

                    </div>

                </div>

            `;


            container.appendChild(
                div
            );

        }
    );

}


/* =========================
   DASHBOARD NOTES
========================= */

function displayDashboardNotes() {

    const notes =
        JSON.parse(
            localStorage.getItem(
                "notes"
            )
        ) || [];


    const container =
        document.getElementById(
            "dashboardNotes"
        );


    if (notes.length === 0) {

        container.innerHTML = `

            <div class="col-12
                        text-center
                        text-muted
                        py-4">

                <i class="bi bi-journal-x fs-1">
                </i>

                <p class="mt-2">

                    No notes available.

                </p>


                <a
                    href="pages/notes.html"
                    class="btn btn-primary btn-sm">

                    Create Note

                </a>

            </div>

        `;

        return;

    }


    const recentNotes =
        notes.slice(-3).reverse();


    container.innerHTML = "";


    recentNotes.forEach(
        function (note) {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "col-md-4 mb-3";


            div.innerHTML = `

                <div class="card
                            h-100
                            dashboard-note-card">

                    <div class="card-body">


                        <span
                            class="badge bg-primary mb-2">

                            ${note.category}

                        </span>


                        <h6>

                            ${note.title}

                        </h6>


                        <p class="text-muted small">

                            ${note.content}

                        </p>


                    </div>

                </div>

            `;


            container.appendChild(
                div
            );

        }
    );

}


/* =========================
   FORMAT TIME
========================= */

function formatTime(time) {

    const parts =
        time.split(":");


    let hour =
        parseInt(parts[0]);


    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return `${hour}:${minute} ${period}`;

}


/* =========================
   WELCOME MESSAGE
========================= */

function updateWelcomeMessage() {

    const hour =
        new Date().getHours();


    let greeting;


    if (hour < 12) {

        greeting =
            "Good Morning";

    }

    else if (hour < 17) {

        greeting =
            "Good Afternoon";

    }

    else {

        greeting =
            "Good Evening";

    }


    document.getElementById(
        "welcomeMessage"
    ).textContent =

        `${greeting}, Hema! 🌱`;

}


/* =========================
   DARK MODE
========================= */

function setupTheme() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    button.addEventListener(
        "click",
        function () {


            document.body.classList.toggle(
                "dark-mode"
            );


            if (
                document.body.classList
                    .contains("dark-mode")
            ) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );


                button.innerHTML =
                    '<i class="bi bi-sun"></i>';

            }

            else {

                localStorage.setItem(
                    "theme",
                    "light"
                );


                button.innerHTML =
                    '<i class="bi bi-moon"></i>';

            }

        }
    );

}