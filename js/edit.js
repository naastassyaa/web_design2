function getEventIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("eventId");
}
function getEvent(eventId) {

    fetch(`http://127.0.0.1:5000/event/${eventId}`)
        .then((response) => response.json())
        .then((event) => {
            document.getElementById("eventName").value = event.name;
            document.getElementById("eventDescription").value = event.description;
            document.getElementById("eventCity").value = event.city;
            document.getElementById("eventAddress").value = event.address;
            document.getElementById("eventDate").value = event.date;
            document.getElementById("eventMaxVisitors").value = event.max_visitors;
        })
        .catch((error) => {
            console.error("Помилка отримання даних про подію:", error);
        });
}
const eventId = getEventIdFromURL();
getEvent(eventId);

const eventForm = document.getElementById('eventForm');
eventForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const eventName = document.getElementById("eventName").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventCity = document.getElementById("eventCity").value;
    const eventAddress = document.getElementById("eventAddress").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventMaxVisitors = document.getElementById("eventMaxVisitors").value;

    if (eventName.length > 45) {
        alert('Event name should not exceed 45 characters.');
        return;
    }

    if (eventCity.length > 45) {
        alert('Event city should not exceed 45 characters.');
        return;
    }

    if (eventAddress.length > 100) {
        alert('Event address should not exceed 100 characters.');
        return;
    }

    if (eventMaxVisitors < 1) {
        alert('Event max visitors should be more than 0');
        return;
    }

    const updatedEvent = {
        idevent: getEventIdFromURL(),
        name: eventName,
        description: eventDescription,
        city: eventCity,
        address: eventAddress,
        date: eventDate,
        max_visitors: eventMaxVisitors,
    };

    fetch(`http://127.0.0.1:5000/event`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Дані про подію оновлено успішно");
                document.getElementById("eventForm").reset();
                window.location.replace("http://localhost:63342/lab4/index.html");
            } else {
                console.error("Помилка оновлення даних про подію");
            }
        })
        .catch((error) => {
            console.error("Помилка відправлення PUT-запиту:", error);
        });
})


