document.addEventListener("DOMContentLoaded", function () {

    loadSchedule();

    setupScheduleForm();

    setupDayFilter();

    setupTheme();

});


/* =========================
   GET SCHEDULE
========================= */

function getSchedule() {

    return JSON.parse(
        localStorage.getItem("schedule")
    ) || [];

}


/* =========================
   SAVE SCHEDULE
========================= */

function saveSchedule(schedule) {

    localStorage.setItem(
        "schedule",
        JSON.stringify(schedule)
    );

}


/* =========================
   LOAD SCHEDULE
========================= */

function loadSchedule() {

    const schedule =
        getSchedule();

    displaySchedule(schedule);

}


/* =========================
   DISPLAY SCHEDULE
========================= */

function displaySchedule(schedule) {

    const container =
        document.getElementById(
            "scheduleContainer"
        );


    if (schedule.length === 0) {

        container.innerHTML = `

            <div class="card">

                <div class="card-body
                            text-center
                            text-muted
                            py-5">

                    <i class="bi bi-calendar-x fs-1"></i>

                    <h5 class="mt-3">
                        No sessions scheduled
                    </h5>

                    <p>
                        Add your first class or study session.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    /* SORT BY TIME */

    schedule.sort(function (a, b) {

        return a.time.localeCompare(
            b.time
        );

    });


    schedule.forEach(function (item) {


        const card =
            document.createElement("div");


        card.className =
            "card mb-3 schedule-card";


        card.innerHTML = `

            <div class="card-body">

                <div class="row align-items-center">


                    <!-- TIME -->

                    <div class="col-md-2">

                        <div class="schedule-time">

                            <i class="bi bi-clock"></i>

                            ${formatTime(item.time)}

                        </div>

                        <small class="text-muted">

                            ${item.day}

                        </small>

                    </div>


                    <!-- SUBJECT -->

                    <div class="col-md-4">

                        <h5 class="mb-1">

                            ${item.subject}

                        </h5>


                        <span class="badge bg-primary">

                            ${item.type}

                        </span>

                    </div>


                    <!-- DETAILS -->

                    <div class="col-md-4">

                        <p class="mb-1">

                            <i class="bi bi-person"></i>

                            ${item.instructor || "Not specified"}

                        </p>


                        <p class="mb-0">

                            <i class="bi bi-building"></i>

                            ${item.room || "Not specified"}

                        </p>

                    </div>


                    <!-- ACTIONS -->

                    <div class="col-md-2 text-md-end mt-3 mt-md-0">


                        <button
                            class="btn btn-sm btn-outline-primary me-1"
                            onclick="editSchedule(${item.id})">

                            <i class="bi bi-pencil"></i>

                        </button>


                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="deleteSchedule(${item.id})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>


                </div>

            </div>

        `;


        container.appendChild(card);

    });

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
   ADD / EDIT
========================= */

let editingScheduleId = null;


function setupScheduleForm() {

    const form =
        document.getElementById(
            "scheduleForm"
        );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();


            const day =
                document.getElementById(
                    "scheduleDay"
                ).value;


            const time =
                document.getElementById(
                    "scheduleTime"
                ).value;


            const instructor =
                document.getElementById(
                    "instructor"
                ).value.trim();


            const room =
                document.getElementById(
                    "room"
                ).value.trim();


            const type =
                document.getElementById(
                    "sessionType"
                ).value;


            if (
                subject === "" ||
                day === "" ||
                time === ""
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            let schedule =
                getSchedule();


            /* EDIT */

            if (
                editingScheduleId !== null
            ) {


                schedule =
                    schedule.map(
                        function (item) {


                            if (
                                item.id ===
                                editingScheduleId
                            ) {

                                item.subject =
                                    subject;

                                item.day =
                                    day;

                                item.time =
                                    time;

                                item.instructor =
                                    instructor;

                                item.room =
                                    room;

                                item.type =
                                    type;

                            }


                            return item;

                        }
                    );


                editingScheduleId = null;

            }


            /* ADD */

            else {


                const newSession = {

                    id: Date.now(),

                    subject:
                        subject,

                    day:
                        day,

                    time:
                        time,

                    instructor:
                        instructor,

                    room:
                        room,

                    type:
                        type

                };


                schedule.push(
                    newSession
                );

            }


            saveSchedule(
                schedule
            );


            displaySchedule(
                schedule
            );


            form.reset();


            const modalElement =
                document.getElementById(
                    "scheduleModal"
                );


            const modal =
                bootstrap.Modal
                .getInstance(
                    modalElement
                );


            modal.hide();

        }
    );

}


/* =========================
   PREPARE ADD
========================= */

function prepareAddSchedule() {

    editingScheduleId =
        null;


    document.getElementById(
        "scheduleModalTitle"
    ).textContent =
        "Add Study Session";


    document.getElementById(
        "scheduleForm"
    ).reset();

}


/* =========================
   EDIT
========================= */

function editSchedule(id) {

    const schedule =
        getSchedule();


    const item =
        schedule.find(
            function (session) {

                return session.id === id;

            }
        );


    if (!item) {
        return;
    }


    editingScheduleId =
        id;


    document.getElementById(
        "scheduleModalTitle"
    ).textContent =
        "Edit Study Session";


    document.getElementById(
        "subject"
    ).value =
        item.subject;


    document.getElementById(
        "scheduleDay"
    ).value =
        item.day;


    document.getElementById(
        "scheduleTime"
    ).value =
        item.time;


    document.getElementById(
        "instructor"
    ).value =
        item.instructor;


    document.getElementById(
        "room"
    ).value =
        item.room;


    document.getElementById(
        "sessionType"
    ).value =
        item.type;


    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "scheduleModal"
            )
        );


    modal.show();

}


/* =========================
   DELETE
========================= */

function deleteSchedule(id) {

    if (
        !confirm(
            "Delete this schedule?"
        )
    ) {

        return;

    }


    let schedule =
        getSchedule();


    schedule =
        schedule.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveSchedule(
        schedule
    );


    displaySchedule(
        schedule
    );

}


/* =========================
   DAY FILTER
========================= */

function setupDayFilter() {

    document.getElementById(
        "dayFilter"
    ).addEventListener(
        "change",
        applyDayFilter
    );

}


function applyDayFilter() {

    const selectedDay =
        document.getElementById(
            "dayFilter"
        ).value;


    let schedule =
        getSchedule();


    if (
        selectedDay !== "All"
    ) {

        schedule =
            schedule.filter(
                function (item) {

                    return (
                        item.day ===
                        selectedDay
                    );

                }
            );

    }


    displaySchedule(
        schedule
    );

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