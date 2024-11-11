document.getElementById('addSessionButton').addEventListener('click', function() {
    const sessionTitle = document.getElementById('sessionTitle').value;
    const sessionDate = document.getElementById('sessionDate').value;
    const sessionTime = document.getElementById('sessionTime').value;

    if (sessionTitle && sessionDate && sessionTime) {
        const importance = prompt("Enter task importance (important, medium, normal):").toLowerCase();
        const sessionList = document.getElementById('sessionList');
        const li = document.createElement('li');
        
        // Convert time to 12-hour format
        const [hours, minutes] = sessionTime.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${formattedHours}:${minutes} ${period}`;

        li.textContent = `${sessionTitle} - ${sessionDate} at ${formattedTime}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            sessionList.removeChild(li);
        });

        if (importance === 'important') {
            li.classList.add('important');
            deleteButton.style.backgroundColor = '#cc0000';
        } else if (importance === 'medium') {
            li.classList.add('medium');
            deleteButton.style.backgroundColor = '#1e7e34';
        } else {
            li.classList.add('normal');
            deleteButton.style.backgroundColor = '#a9a9a9';
        }

        li.appendChild(deleteButton);
        sessionList.appendChild(li);
        
        document.getElementById('sessionTitle').value = '';
        document.getElementById('sessionDate').value = '';
        document.getElementById('sessionTime').value = '';
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const sessionList = document.getElementById('sessionList');
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add header row
    csvContent += "Session Title,Session Date,Session Time\n"; // Header

    Array.from(sessionList.children).forEach(li => {
        const sessionDetails = li.textContent.replace('Delete', '').trim();
        const [title, dateTime] = sessionDetails.split(' - ');
        const [date, time] = dateTime.split(' at ');
        csvContent += `${title},${date},${time}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Workshop Itinerary.csv'); // Change the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
