/* =========================
   IT HELP DESK
   JAVASCRIPT
   ========================= */


/* =========================
   DEFAULT TICKETS
   ========================= */

const defaultTickets = [

    {
        id: 1001,
        employee: "Arun Kumar",
        email: "arun@gmail.com",
        department: "Finance",
        category: "Network",
        priority: "High",
        subject: "WiFi not working",
        description: "Unable to connect to office WiFi.",
        status: "Open",
        date: "2026-09-30"
    },

    {
        id: 1002,
        employee: "Ravi Kumar",
        email: "ravi@gmail.com",
        department: "HR",
        category: "Hardware",
        priority: "Medium",
        subject: "Computer is slow",
        description: "Computer takes too much time to start.",
        status: "In Progress",
        date: "2026-09-29"
    },

    {
        id: 1003,
        employee: "Priya",
        email: "priya@gmail.com",
        department: "Sales",
        category: "Account",
        priority: "Low",
        subject: "Password reset",
        description: "Need help resetting my account password.",
        status: "Resolved",
        date: "2026-09-28"
    }

];


/* =========================
   LOAD TICKETS
   ========================= */

let tickets = [];


const savedTickets =
    localStorage.getItem("helpDeskTickets");


if (savedTickets) {

    try {

        const parsedTickets =
            JSON.parse(savedTickets);


        if (
            Array.isArray(parsedTickets)
            &&
            parsedTickets.length > 0
        ) {

            tickets = parsedTickets;

        }

        else {

            tickets = defaultTickets;

        }

    }

    catch (error) {

        tickets = defaultTickets;

    }

}

else {

    tickets = defaultTickets;

}


/* =========================
   NORMALIZE TICKET IDs
   ========================= */

tickets = tickets.map(function(ticket, index) {

    const convertedId =
        Number(ticket.id);


    if (Number.isFinite(convertedId)) {

        ticket.id = convertedId;

    }

    else {

        ticket.id = 1001 + index;

    }


    return ticket;

});


/* =========================
   DOM ELEMENTS
   ========================= */

const ticketTableBody =
    document.getElementById("ticketTableBody");


const searchInput =
    document.getElementById("searchInput");


const statusFilter =
    document.getElementById("statusFilter");


const priorityFilter =
    document.getElementById("priorityFilter");


const newTicketBtn =
    document.getElementById("newTicketBtn");


const ticketModal =
    document.getElementById("ticketModal");


const viewModal =
    document.getElementById("viewModal");


const closeModal =
    document.getElementById("closeModal");


const closeViewModal =
    document.getElementById("closeViewModal");


const cancelBtn =
    document.getElementById("cancelBtn");


const ticketForm =
    document.getElementById("ticketForm");


const modalTitle =
    document.getElementById("modalTitle");


const ticketDetails =
    document.getElementById("ticketDetails");


const toast =
    document.getElementById("toast");


/* =========================
   FORM ELEMENTS
   ========================= */

const editTicketId =
    document.getElementById("editTicketId");


const employeeName =
    document.getElementById("employeeName");


const email =
    document.getElementById("email");


const department =
    document.getElementById("department");


const category =
    document.getElementById("category");


const priority =
    document.getElementById("priority");


const subject =
    document.getElementById("subject");


const description =
    document.getElementById("description");


/* =========================
   SAVE TICKETS
   ========================= */

function saveTickets() {

    localStorage.setItem(
        "helpDeskTickets",
        JSON.stringify(tickets)
    );

}


/* =========================
   FIND TICKET
   ========================= */

function findTicketById(id) {

    const searchId =
        String(id);


    return tickets.find(function(ticket) {

        return String(ticket.id) === searchId;

    });

}


/* =========================
   GENERATE TICKET ID
   ========================= */

function generateTicketId() {

    if (tickets.length === 0) {

        return 1001;

    }


    const validIds =
        tickets
            .map(function(ticket) {

                return Number(ticket.id);

            })
            .filter(function(id) {

                return Number.isFinite(id);

            });


    if (validIds.length === 0) {

        return 1001;

    }


    const highestId =
        Math.max(...validIds);


    return highestId + 1;

}
/* =========================
   DISPLAY TICKETS
   ========================= */

function displayTickets(ticketList = tickets) {

    ticketTableBody.innerHTML = "";


    if (ticketList.length === 0) {

        ticketTableBody.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="empty-message">

                        No tickets found

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    ticketList.forEach(function(ticket) {

        const priorityClass =
            String(ticket.priority)
                .toLowerCase();


        const statusClass =
            String(ticket.status)
                .toLowerCase()
                .replace(" ", "-");


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                #${ticket.id}
            </td>


            <td>

                <strong>
                    ${ticket.subject}
                </strong>

            </td>


            <td>
                ${ticket.employee}
            </td>


            <td>
                ${ticket.department}
            </td>


            <td>

                <span class="badge priority-${priorityClass}">

                    ${ticket.priority}

                </span>

            </td>


            <td>

                <span class="badge status-${statusClass}">

                    ${ticket.status}

                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        type="button"
                        class="action-btn view-btn"
                        data-id="${ticket.id}"
                        data-action="view"
                    >
                        View
                    </button>


                    <button
                        type="button"
                        class="action-btn edit-btn"
                        data-id="${ticket.id}"
                        data-action="edit"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="action-btn delete-btn"
                        data-id="${ticket.id}"
                        data-action="delete"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        ticketTableBody.appendChild(row);

    });

}


/* =========================
   UPDATE DASHBOARD
   ========================= */

function updateDashboard() {

    const total =
        tickets.length;


    const open =
        tickets.filter(function(ticket) {

            return ticket.status === "Open";

        }).length;


    const progress =
        tickets.filter(function(ticket) {

            return ticket.status === "In Progress";

        }).length;


    const resolved =
        tickets.filter(function(ticket) {

            return ticket.status === "Resolved";

        }).length;


    document.getElementById(
        "totalTickets"
    ).textContent = total;


    document.getElementById(
        "openTickets"
    ).textContent = open;


    document.getElementById(
        "progressTickets"
    ).textContent = progress;


    document.getElementById(
        "resolvedTickets"
    ).textContent = resolved;

}


/* =========================
   SEARCH AND FILTER
   ========================= */

function filterTickets() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const statusValue =
        statusFilter.value;


    const priorityValue =
        priorityFilter.value;


    const filteredTickets =
        tickets.filter(function(ticket) {

            const subjectText =
                String(ticket.subject)
                    .toLowerCase();


            const employeeText =
                String(ticket.employee)
                    .toLowerCase();


            const departmentText =
                String(ticket.department)
                    .toLowerCase();


            const searchMatch =

                subjectText.includes(searchValue)

                ||

                employeeText.includes(searchValue)

                ||

                departmentText.includes(searchValue);


            const statusMatch =

                statusValue === "all"

                ||

                ticket.status === statusValue;


            const priorityMatch =

                priorityValue === "all"

                ||

                ticket.priority === priorityValue;


            return (

                searchMatch
                &&
                statusMatch
                &&
                priorityMatch

            );

        });


    displayTickets(filteredTickets);

}


/* =========================
   OPEN CREATE MODAL
   ========================= */

function openCreateModal() {

    ticketForm.reset();


    editTicketId.value = "";


    modalTitle.textContent =
        "Create New Ticket";


    ticketModal.classList.add("active");

}


/* =========================
   CLOSE CREATE MODAL
   ========================= */

function closeTicketModal() {

    ticketModal.classList.remove("active");

}


/* =========================
   CREATE / UPDATE TICKET
   ========================= */

ticketForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const employeeValue =
            employeeName.value.trim();


        const emailValue =
            email.value.trim();


        const departmentValue =
            department.value;


        const categoryValue =
            category.value;


        const priorityValue =
            priority.value;


        const subjectValue =
            subject.value.trim();


        const descriptionValue =
            description.value.trim();


        /* =========================
           VALIDATION
           ========================= */

        if (

            employeeValue === ""
            ||
            emailValue === ""
            ||
            departmentValue === ""
            ||
            categoryValue === ""
            ||
            priorityValue === ""
            ||
            subjectValue === ""
            ||
            descriptionValue === ""

        ) {

            showToast(
                "Please fill all fields"
            );

            return;

        }


        /* =========================
           UPDATE TICKET
           ========================= */

        if (editTicketId.value !== "") {

            const ticket =
                findTicketById(
                    editTicketId.value
                );


            if (!ticket) {

                showToast(
                    "Ticket not found"
                );

                return;

            }


            ticket.employee =
                employeeValue;


            ticket.email =
                emailValue;


            ticket.department =
                departmentValue;


            ticket.category =
                categoryValue;


            ticket.priority =
                priorityValue;


            ticket.subject =
                subjectValue;


            ticket.description =
                descriptionValue;


            saveTickets();


            displayTickets();


            updateDashboard();


            closeTicketModal();


            showToast(
                "Ticket updated successfully"
            );


            return;

        }


        /* =========================
           CREATE NEW TICKET
           ========================= */

        const newTicketId =
            generateTicketId();


        const newTicket = {

            id: newTicketId,

            employee: employeeValue,

            email: emailValue,

            department: departmentValue,

            category: categoryValue,

            priority: priorityValue,

            subject: subjectValue,

            description: descriptionValue,

            status: "Open",

            date: new Date()
                .toISOString()
                .split("T")[0]

        };


        tickets.push(newTicket);


        saveTickets();


        displayTickets();


        updateDashboard();


        closeTicketModal();


        showToast(
            `Ticket #${newTicketId} created successfully`
        );

    }
);


/* =========================
   VIEW TICKET
   ========================= */

function viewTicket(id) {

    const ticket =
        findTicketById(id);


    if (!ticket) {

        showToast(
            "Ticket not found"
        );

        return;

    }


    const priorityClass =
        String(ticket.priority)
            .toLowerCase();


    const statusClass =
        String(ticket.status)
            .toLowerCase()
            .replace(" ", "-");


    ticketDetails.innerHTML = `

        <div class="detail-item">

            <span>
                Ticket ID
            </span>

            <strong>
                #${ticket.id}
            </strong>

        </div>


        <div class="detail-item">

            <span>
                Subject
            </span>

            <strong>
                ${ticket.subject}
            </strong>

        </div>


        <div class="detail-item">

            <span>
                Employee
            </span>

            <strong>
                ${ticket.employee}
            </strong>

        </div>


        <div class="detail-item">

            <span>
                Email
            </span>

            <strong>
                ${ticket.email}
            </strong>

        </div>


        <div class="detail-item">

            <span>
                Department
            </span>

            <strong>
                ${ticket.department}
            </strong>

        </div>


        <div class="detail-item">

            <span>
                Category
            </span>

            <strong>
                ${ticket.category}
            </strong>

        </div>


        <div class="detail-item">

            <span>
                Priority
            </span>

            <span class="badge priority-${priorityClass}">

                ${ticket.priority}

            </span>

        </div>


        <div class="detail-item">

            <span>
                Status
            </span>

            <span class="badge status-${statusClass}">

                ${ticket.status}

            </span>

        </div>


        <div class="detail-item">

            <span>
                Description
            </span>

            <div class="detail-description">

                ${ticket.description}

            </div>

        </div>


        <div class="detail-item">

            <span>
                Created Date
            </span>

            <strong>
                ${ticket.date}
            </strong>

        </div>

    `;


    viewModal.classList.add("active");

}


/* =========================
   EDIT TICKET
   ========================= */

function editTicket(id) {

    const ticket =
        findTicketById(id);


    if (!ticket) {

        showToast(
            "Ticket not found"
        );

        return;

    }


    editTicketId.value =
        ticket.id;


    employeeName.value =
        ticket.employee;


    email.value =
        ticket.email;


    department.value =
        ticket.department;


    category.value =
        ticket.category;


    priority.value =
        ticket.priority;


    subject.value =
        ticket.subject;


    description.value =
        ticket.description;


    modalTitle.textContent =
        "Edit Ticket";


    ticketModal.classList.add("active");

}


/* =========================
   DELETE TICKET
   ========================= */

function deleteTicket(id) {

    const ticket =
        findTicketById(id);


    if (!ticket) {

        showToast(
            "Ticket not found"
        );

        return;

    }


    const confirmation =
        confirm(
            `Delete ticket #${ticket.id}?`
        );


    if (!confirmation) {

        return;

    }


    tickets =
        tickets.filter(function(item) {

            return String(item.id)
                !== String(id);

        });


    saveTickets();


    displayTickets();


    updateDashboard();


    showToast(
        `Ticket #${id} deleted successfully`
    );

}


/* =========================
   TICKET ACTION BUTTONS
   ========================= */

ticketTableBody.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".action-btn"
            );


        if (!button) {

            return;

        }


        const id =
            button.getAttribute("data-id");


        const action =
            button.getAttribute("data-action");


        if (action === "view") {

            viewTicket(id);

        }


        else if (action === "edit") {

            editTicket(id);

        }


        else if (action === "delete") {

            deleteTicket(id);

        }

    }
);


/* =========================
   TOAST
   ========================= */

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   NEW TICKET BUTTON
   ========================= */

newTicketBtn.addEventListener(
    "click",
    function() {

        openCreateModal();

    }
);


/* =========================
   CLOSE MODAL
   ========================= */

closeModal.addEventListener(
    "click",
    function() {

        closeTicketModal();

    }
);


/* =========================
   CANCEL BUTTON
   ========================= */

cancelBtn.addEventListener(
    "click",
    function() {

        closeTicketModal();

    }
);


/* =========================
   CLOSE VIEW MODAL
   ========================= */

closeViewModal.addEventListener(
    "click",
    function() {

        viewModal.classList.remove("active");

    }
);


/* =========================
   SEARCH
   ========================= */

searchInput.addEventListener(
    "input",
    function() {

        filterTickets();

    }
);


/* =========================
   STATUS FILTER
   ========================= */

statusFilter.addEventListener(
    "change",
    function() {

        filterTickets();

    }
);


/* =========================
   PRIORITY FILTER
   ========================= */

priorityFilter.addEventListener(
    "change",
    function() {

        filterTickets();

    }
);


/* =========================
   OUTSIDE CLICK
   ========================= */

ticketModal.addEventListener(
    "click",
    function(event) {

        if (event.target === ticketModal) {

            closeTicketModal();

        }

    }
);


viewModal.addEventListener(
    "click",
    function(event) {

        if (event.target === viewModal) {

            viewModal.classList.remove("active");

        }

    }
);


/* =========================
   SAVE NORMALIZED DATA
   ========================= */

saveTickets();


/* =========================
   INITIAL DISPLAY
   ========================= */

displayTickets();


updateDashboard();