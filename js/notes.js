document.addEventListener("DOMContentLoaded", function () {

    loadNotes();

    setupNoteForm();

    setupNoteFilters();

    setupTheme();

});


/* =========================
   GET NOTES
========================= */

function getNotes() {

    return JSON.parse(
        localStorage.getItem("notes")
    ) || [];

}


/* =========================
   SAVE NOTES
========================= */

function saveNotes(notes) {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


/* =========================
   LOAD NOTES
========================= */

function loadNotes() {

    const notes = getNotes();

    displayNotes(notes);

}


/* =========================
   DISPLAY NOTES
========================= */

function displayNotes(notes) {

    const container =
        document.getElementById("notesContainer");


    if (notes.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="text-center
                            text-muted
                            py-5">

                    <i class="bi bi-journal-x fs-1">
                    </i>

                    <h5 class="mt-3">
                        No notes found
                    </h5>

                    <p>
                        Create your first study note.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    notes.forEach(function (note) {


        const card =
            document.createElement("div");


        card.className =
            "col-md-6 col-xl-4";


        card.innerHTML = `

            <div class="card h-100 note-card">

                <div class="card-body">

                    <div class="d-flex
                                justify-content-between
                                align-items-start
                                mb-3">

                        <h5 class="card-title mb-0">

                            ${note.title}

                        </h5>


                        <span class="badge bg-primary">

                            ${note.category}

                        </span>

                    </div>


                    <p class="card-text text-muted note-preview">

                        ${note.content}

                    </p>


                    <small class="text-muted">

                        <i class="bi bi-clock"></i>

                        ${note.date}

                    </small>

                </div>


                <div class="card-footer bg-white border-0">

                    <button
                        class="btn btn-sm btn-outline-primary me-2"
                        onclick="editNote(${note.id})">

                        <i class="bi bi-pencil"></i>

                        Edit

                    </button>


                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="deleteNote(${note.id})">

                        <i class="bi bi-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================
   ADD / EDIT NOTE
========================= */

let editingNoteId = null;


function setupNoteForm() {

    const form =
        document.getElementById("noteForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const title =
            document.getElementById("noteTitle")
            .value
            .trim();


        const category =
            document.getElementById("noteCategory")
            .value;


        const content =
            document.getElementById("noteContent")
            .value
            .trim();


        if (title === "" ||
            content === "") {

            alert(
                "Please fill all required fields."
            );

            return;

        }


        let notes = getNotes();


        /* EDIT */

        if (editingNoteId !== null) {

            notes =
                notes.map(function (note) {

                    if (
                        note.id === editingNoteId
                    ) {

                        note.title =
                            title;

                        note.category =
                            category;

                        note.content =
                            content;

                        note.date =
                            new Date()
                            .toLocaleDateString();

                    }

                    return note;

                });


            editingNoteId = null;


        }

        /* ADD */

        else {

            const newNote = {

                id: Date.now(),

                title: title,

                category: category,

                content: content,

                date:
                    new Date()
                    .toLocaleDateString()

            };


            notes.push(newNote);

        }


        saveNotes(notes);

        displayNotes(notes);


        form.reset();


        const modalElement =
            document.getElementById("noteModal");


        const modal =
            bootstrap.Modal
            .getInstance(modalElement);


        modal.hide();

    });

}


/* =========================
   PREPARE ADD
========================= */

function prepareAddNote() {

    editingNoteId = null;


    document.getElementById(
        "noteModalTitle"
    ).textContent =
        "Create New Note";


    document.getElementById(
        "noteForm"
    ).reset();

}


/* =========================
   EDIT NOTE
========================= */

function editNote(id) {

    const notes = getNotes();


    const note =
        notes.find(function (item) {

            return item.id === id;

        });


    if (!note) {
        return;
    }


    editingNoteId = id;


    document.getElementById(
        "noteModalTitle"
    ).textContent =
        "Edit Note";


    document.getElementById(
        "noteTitle"
    ).value =
        note.title;


    document.getElementById(
        "noteCategory"
    ).value =
        note.category;


    document.getElementById(
        "noteContent"
    ).value =
        note.content;


    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "noteModal"
            )
        );


    modal.show();

}


/* =========================
   DELETE NOTE
========================= */

function deleteNote(id) {

    if (!confirm(
        "Are you sure you want to delete this note?"
    )) {

        return;

    }


    let notes = getNotes();


    notes =
        notes.filter(function (note) {

            return note.id !== id;

        });


    saveNotes(notes);

    displayNotes(notes);

}


/* =========================
   SEARCH + FILTER
========================= */

function setupNoteFilters() {

    document.getElementById(
        "searchNote"
    ).addEventListener(
        "input",
        applyNoteFilters
    );


    document.getElementById(
        "filterCategory"
    ).addEventListener(
        "change",
        applyNoteFilters
    );

}


function applyNoteFilters() {

    let notes = getNotes();


    const search =
        document.getElementById(
            "searchNote"
        )
        .value
        .toLowerCase();


    const category =
        document.getElementById(
            "filterCategory"
        ).value;


    notes =
        notes.filter(function (note) {


            const matchesSearch =

                note.title
                    .toLowerCase()
                    .includes(search)

                ||

                note.content
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =

                category === "all"

                ||

                note.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayNotes(notes);

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
                document.body
                .classList
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