// DOM Elements
const datesContainer = document.getElementById('datesContainer');
const eventsList = document.getElementById('eventsList');
const eventDetails = document.getElementById('eventDetails');
const locationBtn = document.getElementById('locationBtn');
const backToDatesBtn = document.getElementById('backToDatesBtn');
const backToEventsBtn = document.getElementById('backToEventsBtn');

// Show location button after delay
setTimeout(() => {
    locationBtn.style.display = 'block';
}, 500);

// Location button click handler
locationBtn.addEventListener('click', () => {
    window.open('https://map.proxi.co/r/feyAcvGSlBz5mnQqNq7d?lat=19.867079136782134&lng=-285.5051158712134&zoom=18.526500000000002', '_blank');
});

// Date cards click handlers
const dateCards = document.querySelectorAll('.date-card');
dateCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const date = e.currentTarget.getAttribute('data-date');
        showEventsForDate(date);
    });
});

// Back to dates button - optimized for faster transition
backToDatesBtn.addEventListener('click', () => {
    eventsList.style.opacity = '0';
    eventsList.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        eventsList.style.display = 'none';
        datesContainer.style.display = 'block';
        setTimeout(() => {
            datesContainer.style.opacity = '1';
            datesContainer.style.transform = 'translateY(0)';
        }, 10);
    }, 300);
});

// Back to events button - optimized for faster transition
backToEventsBtn.addEventListener('click', () => {
    eventDetails.style.opacity = '0';
    eventDetails.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        eventDetails.style.display = 'none';
        eventsList.style.display = 'block';
        setTimeout(() => {
            eventsList.style.opacity = '1';
            eventsList.style.transform = 'translateY(0)';
        }, 10);
    }, 300);
});

function showEventsForDate(date) {
    const eventsTitle = document.getElementById('eventsTitle');
    const eventsGrid = document.getElementById('eventsGrid');
    
    eventsTitle.textContent = `Events on ${formatDate(date)}`;
    eventsGrid.innerHTML = '';
    
    const events = getEventsForDate(date);
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-name">${event.name}</div>
        `;
        eventCard.addEventListener('click', () => showEventDetails(event));
        eventsGrid.appendChild(eventCard);
    });
    
    // Optimized transition
    datesContainer.style.opacity = '0';
    datesContainer.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        datesContainer.style.display = 'none';
        eventsList.style.display = 'block';
        setTimeout(() => {
            eventsList.style.opacity = '1';
            eventsList.style.transform = 'translateY(0)';
        }, 10);
    }, 300);
}

function showEventDetails(event) {
    const eventDetailsTitle = document.getElementById('eventDetailsTitle');
    const eventDetailsContent = document.getElementById('eventDetailsContent');
    
    eventDetailsTitle.textContent = event.name;
    
    eventDetailsContent.innerHTML = `
        <div class="event-info">
            <strong>Time:</strong> ${event.time}
        </div>
        <div class="event-info">
            <strong>Location:</strong> ${event.location}
        </div>
    `;
    
    // Optimized transition
    eventsList.style.opacity = '0';
    eventsList.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        eventsList.style.display = 'none';
        eventDetails.style.display = 'block';
        setTimeout(() => {
            eventDetails.style.opacity = '1';
            eventDetails.style.transform = 'translateY(0)';
        }, 10);
    }, 300);
}

function formatDate(dateString) {
    const date = new Date(dateString.split('/').reverse().join('-'));
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function getEventsForDate(date) {
    const events = {
        '18/04/2025': [
            { name: 'Inauguration', time: '10:30 am to 1:00 pm', location: 'Main Auditorium - Ayodhya Hall' },
            { name: 'Short film', time: '2:00 to 4:30 pm', location: 'B.H.M.S Basement - Chitrangan Hall' },
            { name: 'Installation', time: '2:00 to 4:30 pm', location: 'B.H.M.S Building - Pratibha Hall & Samuel Hahnemann Hall' },
            { name: 'Clay Modelling', time: '2:00 to 4:30 pm', location: 'Spanadan Bhavan' },
            { name: 'Spot Photography', time: '2:00 to 4:30 pm', location: 'B.A.M.S Building - Dhanvantari Hall' },
            { name: 'Cultural Event', time: '5:00 to 8:00 pm', location: 'Main Auditorium - Ayodhya Hall' }
        ],
        '19/04/2025': [
            { name: 'Rangoli', time: '1:00 to 3:30 pm', location: 'B.H.M.S Basement - Chitrangan Hall' },
            { name: 'On Spot Painting', time: '1:00 to 3:30 pm', location: 'B.A.M.S Building - Shukracharya Hall & Dhanvantari Hall' },
            { name: 'Collage Making', time: '1:00 to 3:30 pm', location: 'B.P.T.H Building - Mrutyunjay Hall' },
            { name: 'Poster Making', time: '1:00 to 3:30 pm', location: 'B.H.M.S Building - Pratibha Hall & Sankalp Hall' },
            { name: 'Cartooning', time: '1:00 to 3:30 pm', location: 'Nursing Building - Florence Nightingale Hall' },
            { name: 'Validatory Ceremony', time: '5:00 to 8:00 pm', location: 'Main Auditorium - Ayodhya Hall' }
        ]
    };
    
    return events[date] || [];
}