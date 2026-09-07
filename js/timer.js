/* =========================
   TIMER SETTINGS
========================= */

const STUDY_TIME = 25 * 60;

const BREAK_TIME = 5 * 60;


/* =========================
   TIMER VARIABLES
========================= */

let timeRemaining =
    STUDY_TIME;

let timerInterval =
    null;

let isRunning =
    false;

let isStudySession =
    true;


/* =========================
   STATISTICS
========================= */

let completedSessions =
    parseInt(
        localStorage.getItem(
            "completedSessions"
        )
    ) || 0;


let studyMinutes =
    parseInt(
        localStorage.getItem(
            "studyMinutes"
        )
    ) || 0;


/* =========================
   START
========================= */

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        startTimer
    );


function startTimer() {

    if (isRunning) {
        return;
    }


    isRunning = true;


    timerInterval =
        setInterval(
            function () {

                timeRemaining--;

                updateDisplay();

                updateProgress();


                if (
                    timeRemaining <= 0
                ) {

                    finishSession();

                }

            },
            1000
        );

}


/* =========================
   PAUSE
========================= */

document
    .getElementById("pauseBtn")
    .addEventListener(
        "click",
        pauseTimer
    );


function pauseTimer() {

    clearInterval(
        timerInterval
    );

    isRunning = false;

}


/* =========================
   RESET
========================= */

document
    .getElementById("resetBtn")
    .addEventListener(
        "click",
        resetTimer
    );


function resetTimer() {

    clearInterval(
        timerInterval
    );


    isRunning = false;


    if (isStudySession) {

        timeRemaining =
            STUDY_TIME;

    } else {

        timeRemaining =
            BREAK_TIME;

    }


    updateDisplay();

    updateProgress();

}


/* =========================
   SKIP
========================= */

document
    .getElementById("skipBtn")
    .addEventListener(
        "click",
        skipSession
    );


function skipSession() {

    clearInterval(
        timerInterval
    );


    isRunning = false;


    switchSession();

}


/* =========================
   FINISH SESSION
========================= */

function finishSession() {

    clearInterval(
        timerInterval
    );


    isRunning = false;


    if (isStudySession) {

        completedSessions++;

        studyMinutes += 25;


        localStorage.setItem(
            "completedSessions",
            completedSessions
        );


        localStorage.setItem(
            "studyMinutes",
            studyMinutes
        );


        updateStatistics();

    }


    showNotification();


    switchSession();

}


/* =========================
   SWITCH SESSION
========================= */

function switchSession() {

    isStudySession =
        !isStudySession;


    if (isStudySession) {

        timeRemaining =
            STUDY_TIME;

    } else {

        timeRemaining =
            BREAK_TIME;

    }


    updateSessionType();

    updateDisplay();

    updateProgress();

}


/* =========================
   UPDATE DISPLAY
========================= */

function updateDisplay() {

    const minutes =
        Math.floor(
            timeRemaining / 60
        );


    const seconds =
        timeRemaining % 60;


    document.getElementById(
        "timerDisplay"
    ).textContent =

        `${String(minutes).padStart(2, "0")}:` +

        `${String(seconds).padStart(2, "0")}`;

}


/* =========================
   PROGRESS
========================= */

function updateProgress() {

    const totalTime =
        isStudySession
            ? STUDY_TIME
            : BREAK_TIME;


    const elapsed =
        totalTime -
        timeRemaining;


    const percentage =
        (elapsed / totalTime) * 100;


    document.getElementById(
        "timerProgress"
    ).style.width =
        percentage + "%";

}


/* =========================
   SESSION TYPE
========================= */

function updateSessionType() {

    const element =
        document.getElementById(
            "sessionType"
        );


    if (isStudySession) {

        element.textContent =
            "Study Session";

        element.className =
            "badge bg-primary fs-6 px-3 py-2";

    } else {

        element.textContent =
            "Break Time";

        element.className =
            "badge bg-success fs-6 px-3 py-2";

    }

}


/* =========================
   STATISTICS
========================= */

function updateStatistics() {

    document.getElementById(
        "completedSessions"
    ).textContent =
        completedSessions;


    document.getElementById(
        "studyMinutes"
    ).textContent =
        studyMinutes;


    document.getElementById(
        "streak"
    ).textContent =
        completedSessions;

}


/* =========================
   NOTIFICATION
========================= */

function showNotification() {

    if (
        "Notification" in window
    ) {

        if (
            Notification.permission ===
            "granted"
        ) {

            new Notification(
                "Smart Campus",
                {
                    body:
                        isStudySession
                            ? "Study session completed! Take a break."
                            : "Break finished! Time to study."
                }
            );

        }

        else if (
            Notification.permission !==
            "denied"
        ) {

            Notification.requestPermission();

        }

    }


    alert(
        isStudySession
            ? "Study session completed! 🎉"
            : "Break finished! Time to study! 📚"
    );

}


/* =========================
   THEME
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

            } else {

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


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDisplay();

        updateProgress();

        updateStatistics();

        updateSessionType();

        setupTheme();

    }
);