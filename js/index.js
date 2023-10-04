function fetchEventData() {
    return fetch("http://127.0.0.1:5000/event")
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error", error);

            return null
        });
}

function sortByDate(data) {
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function displayEventData(data) {
    const eventsContainer = document.getElementById("items_container");
    eventsContainer.innerHTML = "";

    if (!data) {
        const eventsContainer = document.getElementById("cards");
        eventsContainer.innerHTML = "";
        eventsContainer.insertAdjacentHTML("afterbegin", `<h1 style="margin-top: 50px; text-align: center">No Data<h1>`)
    }
    console.log(data)

    data.forEach((event) => {
        eventsContainer.insertAdjacentHTML("beforeend", `<li class="card">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <p class="card-text">City: ${event.city}</p>
                <p class="card-text">Address: ${event.address}</p>
                <p class="card-text">Date: ${event.date}</p>
                <p class="card-text">Visitors: ${event.max_visitors}</p>
            </div>
        </li>`)
    });
}

const sortButton = document.getElementById("sort_button");
sortButton.addEventListener("click", () => {
    fetchEventData()
        .then((data) => {
            const sortedData = sortByDate(data);
            displayEventData(sortedData);
        })
        .catch((error) => {
            console.error("Error", error);
        });
});

const countButton = document.getElementById("count_button");
countButton.addEventListener("click", () => {
    fetchEventData()
        .then((data) => {
            const totalVisitors = data.reduce((total, event) => total + event.max_visitors, 0);

            const countResult = document.getElementById("count_result");
            countResult.textContent = `Total Visitors: ${totalVisitors}`;
        })
        .catch((error) => {
            console.error("Error", error);
        });
});


function fetchAndDisplayEventData() {
    fetchEventData()
        .then((data) => {
            displayEventData(data);
        })
        .catch((error) => {
            console.error("Error fetching and displaying event data:", error);
        });
}

function filterEventsByName(inputText, data) {
    return data.filter((event) => event.name.toLowerCase().includes(inputText.toLowerCase()));
}

const findButton = document.getElementById("find_button");
findButton.addEventListener("click", () => {
    const inputText = document.getElementById("find_input").value.trim();

    if (inputText === "") {
        alert("Please enter a search term.");
        return;
    }

    fetchEventData()
        .then((data) => {
            const filteredData = filterEventsByName(inputText, data);
            displayEventData(filteredData);
        })
        .catch((error) => {
            console.error("Error", error);
        });
});

const cancelFindButton = document.getElementById("cancel_find_button");
cancelFindButton.addEventListener("click", () => {
    fetchAndDisplayEventData();
});


document.addEventListener("DOMContentLoaded", fetchAndDisplayEventData);
