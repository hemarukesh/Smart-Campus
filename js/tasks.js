document.addEventListener("DOMContentLoaded", function () {

    loadTasks();

    setupTaskForm();

    setupFilters();

    setupTheme();

});


/* =========================
   GET TASKS
========================= */

function getTasks() {

    return JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

}


/* =========================
   SAVE TASKS
========================= */

function saveTasks(tasks) {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* =========================
   LOAD TASKS
========================= */

function loadTasks() {

    let tasks = getTasks();

    displayTasks(tasks);

}


/* =========================
   DISPLAY TASKS
========================= */

function displayTasks(tasks) {

    const taskList =
        document.getElementById("taskList");


    if (tasks.length === 0) {

        taskList.innerHTML = `

            <div class="text-center text-muted py-5">

                <i class="bi bi-clipboard-x fs-1"></i>

                <p class="mt-2">
                    No tasks found.
                </p>

            </div>

        `;

        return;

    }


    taskList.innerHTML = "";


    tasks.forEach(function (task) {

        let priorityClass = "";


        if (task.priority === "High") {

            priorityClass = "bg-danger";

        } else if (task.priority === "Medium") {

            priorityClass = "bg-warning text-dark";

        } else {

            priorityClass = "bg-success";

        }


        const taskElement =
            document.createElement("div");


        taskElement.className =
            "task-item border-bottom py-3";


        taskElement.innerHTML = `

            <div class="d-flex
                        justify-content-between
                        align-items-center">


                <div class="d-flex
                            align-items-center">


                    <input
                        type="checkbox"
                        class="form-check-input me-3"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask(${task.id})">


                    <div>

                        <h6 class="mb-1
                            ${task.completed
                                ? "text-decoration-line-through text-muted"
                                : ""}">

                            ${task.title}

                        </h6>


                        <small class="text-muted">

                            📅 ${task.date}

                            &nbsp; | &nbsp;

                            ${task.category}

                        </small>

                    </div>


                </div>


                <div>

                    <span class="badge ${priorityClass} me-2">

                        ${task.priority}

                    </span>


                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="deleteTask(${task.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>


            </div>

        `;


        taskList.appendChild(taskElement);

    });

}


/* =========================
   ADD TASK
========================= */

function setupTaskForm() {

    const form =
        document.getElementById("taskForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const title =
            document.getElementById("taskTitle").value.trim();

        const date =
            document.getElementById("taskDate").value;

        const priority =
            document.getElementById("taskPriority").value;

        const category =
            document.getElementById("taskCategory").value;


        if (title === "" || date === "") {

            alert("Please fill all required fields.");

            return;

        }


        let tasks = getTasks();


        const newTask = {

            id: Date.now(),

            title: title,

            date: date,

            priority: priority,

            category: category,

            completed: false

        };


        tasks.push(newTask);


        saveTasks(tasks);


        displayTasks(tasks);


        form.reset();


        // Close Bootstrap modal

        const modalElement =
            document.getElementById("taskModal");

        const modal =
            bootstrap.Modal.getInstance(modalElement);

        modal.hide();

    });

}


/* =========================
   COMPLETE TASK
========================= */

function toggleTask(id) {

    let tasks = getTasks();


    tasks = tasks.map(function (task) {

        if (task.id === id) {

            task.completed =
                !task.completed;

        }

        return task;

    });


    saveTasks(tasks);

    displayTasks(tasks);

}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    if (!confirm(
        "Are you sure you want to delete this task?"
    )) {

        return;

    }


    let tasks = getTasks();


    tasks =
        tasks.filter(function (task) {

            return task.id !== id;

        });


    saveTasks(tasks);

    displayTasks(tasks);

}


/* =========================
   FILTERS
========================= */

function setupFilters() {

    const search =
        document.getElementById("searchTask");

    const priority =
        document.getElementById("filterPriority");

    const status =
        document.getElementById("filterStatus");


    search.addEventListener(
        "input",
        applyFilters
    );

    priority.addEventListener(
        "change",
        applyFilters
    );

    status.addEventListener(
        "change",
        applyFilters
    );

}


function applyFilters() {

    let tasks = getTasks();


    const searchValue =
        document.getElementById("searchTask")
        .value
        .toLowerCase();


    const priorityValue =
        document.getElementById("filterPriority")
        .value;


    const statusValue =
        document.getElementById("filterStatus")
        .value;


    tasks =
        tasks.filter(function (task) {


            // Search

            const matchesSearch =
                task.title
                .toLowerCase()
                .includes(searchValue);


            // Priority

            const matchesPriority =
                priorityValue === "all" ||
                task.priority === priorityValue;


            // Status

            const matchesStatus =
                statusValue === "all" ||

                (statusValue === "completed" &&
                 task.completed) ||

                (statusValue === "pending" &&
                 !task.completed);


            return (
                matchesSearch &&
                matchesPriority &&
                matchesStatus
            );

        });


    displayTasks(tasks);

}


/* =========================
   DARK MODE
========================= */

function setupTheme() {

    const button =
        document.getElementById("themeToggle");


    button.addEventListener("click", function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        if (
            document.body.classList.contains(
                "dark-mode"
            )
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

    });

}