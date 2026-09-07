const resources = [

    {
        title: "Java Programming",
        category: "Java",
        description:
            "Learn Java fundamentals, OOP, collections and exception handling.",
        icon: "☕",
        link: "https://dev.java/learn/"
    },

    {
        title: "Java JDBC",
        category: "Java",
        description:
            "Learn how Java applications connect with relational databases.",
        icon: "🔌",
        link: "https://docs.oracle.com/javase/tutorial/jdbc/"
    },

    {
        title: "SQL Tutorial",
        category: "SQL",
        description:
            "Learn SQL queries, joins, grouping and database operations.",
        icon: "🗄️",
        link: "https://www.w3schools.com/sql/"
    },

    {
        title: "MDN Web Docs",
        category: "Web Development",
        description:
            "Learn HTML, CSS and JavaScript using detailed documentation.",
        icon: "🌐",
        link: "https://developer.mozilla.org/"
    },

    {
        title: "Bootstrap Documentation",
        category: "Web Development",
        description:
            "Learn responsive UI development using Bootstrap.",
        icon: "🅱️",
        link: "https://getbootstrap.com/docs/"
    },

    {
        title: "JavaScript Guide",
        category: "Web Development",
        description:
            "Understand JavaScript fundamentals, DOM and events.",
        icon: "📜",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },

    {
        title: "LeetCode",
        category: "DSA",
        description:
            "Practice coding problems and prepare for technical interviews.",
        icon: "🧠",
        link: "https://leetcode.com/"
    },

    {
        title: "GeeksforGeeks DSA",
        category: "DSA",
        description:
            "Learn data structures and algorithms with examples and problems.",
        icon: "💻",
        link: "https://www.geeksforgeeks.org/data-structures/"
    },

    {
        title: "Aptitude Practice",
        category: "Aptitude",
        description:
            "Practice quantitative aptitude, reasoning and verbal questions.",
        icon: "🎯",
        link: "https://www.indiabix.com/"
    },

    {
        title: "Machine Learning",
        category: "AI/ML",
        description:
            "Explore machine learning concepts and practical examples.",
        icon: "🤖",
        link: "https://developers.google.com/machine-learning"
    }

];


let selectedCategory = "All";


/* =========================
   DISPLAY RESOURCES
========================= */

function displayResources() {

    const container =
        document.getElementById(
            "resourcesContainer"
        );


    const search =
        document.getElementById(
            "resourceSearch"
        )
        .value
        .toLowerCase();


    const filteredResources =
        resources.filter(function (resource) {


            const matchesSearch =

                resource.title
                    .toLowerCase()
                    .includes(search)

                ||

                resource.description
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =

                selectedCategory === "All"

                ||

                resource.category ===
                    selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    container.innerHTML = "";


    if (
        filteredResources.length === 0
    ) {

        container.innerHTML = `

            <div class="col-12 text-center py-5">

                <i class="bi bi-search fs-1 text-muted">
                </i>

                <h5 class="mt-3">
                    No resources found
                </h5>

                <p class="text-muted">
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    filteredResources.forEach(
        function (resource) {


            const card =
                document.createElement("div");


            card.className =
                "col-md-6 col-xl-4";


            card.innerHTML = `

                <div class="card h-100 resource-card">

                    <div class="card-body">


                        <div class="resource-icon">

                            ${resource.icon}

                        </div>


                        <span class="badge bg-primary mb-2">

                            ${resource.category}

                        </span>


                        <h5>

                            ${resource.title}

                        </h5>


                        <p class="text-muted">

                            ${resource.description}

                        </p>


                    </div>


                    <div class="card-footer bg-white border-0">

                        <a
                            href="${resource.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-primary w-100">

                            Explore Resource

                            <i class="bi bi-box-arrow-up-right">
                            </i>

                        </a>

                    </div>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================
   SEARCH
========================= */

document
    .getElementById("resourceSearch")
    .addEventListener(
        "input",
        displayResources
    );


/* =========================
   CATEGORY
========================= */

document
    .querySelectorAll(".category-btn")
    .forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                selectedCategory =
                    this.dataset.category;


                document
                    .querySelectorAll(
                        ".category-btn"
                    )
                    .forEach(
                        function (btn) {

                            btn.classList.remove(
                                "btn-primary"
                            );

                            btn.classList.add(
                                "btn-outline-primary"
                            );

                        }
                    );


                this.classList.remove(
                    "btn-outline-primary"
                );

                this.classList.add(
                    "btn-primary"
                );


                displayResources();

            }
        );

    });


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


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayResources();

        setupTheme();

    }
);