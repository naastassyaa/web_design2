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

    const eventData = {
        name: eventName,
        description: eventDescription,
        city: eventCity,
        address: eventAddress,
        date: eventDate,
        max_visitors: eventMaxVisitors,
    };


    fetch('http://127.0.0.1:5000/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
        .then(response => {
            if (response.ok) {
                alert('Event added successfully!');
                eventForm.reset();
                window.location.replace("http://localhost:63342/lab4/index.html");
            } else {
                alert('Error adding event. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding event. Please try again.');
        });

});

