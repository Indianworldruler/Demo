// Sample data for behavior insights and upcoming festivals
const culturalData = {
    "North India": {
        behaviorInsights: ["Consumers prefer traditional festivals and cultural events.", "Social media influence is significant in decision making.", "Food festivals attract large crowds."],
        upcomingFestivals: [{ name: "Holi", date: "2025-03-25" }],
        upcomingEvents: [{ name: "Taj Mahotsav", date: "2025-02-18" }]
    },
    "South India": {
        behaviorInsights: ["Regional cuisines are a key focus for consumers.", "Festivals are celebrated with grandeur.", "Cultural heritage influences purchasing decisions."],
        upcomingFestivals: [{ name: "Pongal", date: "2025-01-14" }],
        upcomingEvents: [{ name: "International Esports Masters", date: "Scheduled 2025" }]
    },
    "East India": {
        behaviorInsights: ["Durga Puja is the most significant festival.", "Art and handicrafts have a strong market.", "Cultural events are often tied to local traditions."],
        upcomingFestivals: [{ name: "Bihar Diwas", date: "2025-03-22" }],
        upcomingEvents: [{ name: "KONARK DANCE FESTIVAL", date: "1st-5th December" }]
    },
    "West India": {
        behaviorInsights: ["Diversity in culture leads to varied consumer preferences.", "Cultural festivals see significant tourist involvement.", "Traditional clothing has a prominent market."],
        upcomingFestivals: [{ name: "Holi", date: "2025-03-14" }, { name: "Ugadi", date: "2025-03-30" }],
        upcomingEvents: [{ name: "Surat International Textile Expo", date: "To be announced" }]
    }
};

const horoscopes = {
    "Aquarius": "Today is a great day to pursue creative endeavors.",
    "Pisces": "You may find comfort in solitude. Reflect on recent events.",
    "Aries": "Challenges may arise, but your determination will see you through.",
    "Taurus": "Patience will be your ally today; good things are coming.",
    "Gemini": "Communicate openly with those around you for better connections.",
    "Cancer": "Focus on self-care. Balance work and relaxation.",
    "Leo": "Your charisma is high. It's a good day for social interactions.",
    "Virgo": "Organize your surroundings to create a clearer mindset.",
    "Libra": "Balance is key today; avoid extremes in decision-making.",
    "Scorpio": "Embrace new experiences that challenge your comfort zone.",
    "Sagittarius": "Adventure awaits, but remember to plan wisely.",
    "Capricorn": "Hard work is paying off. Stay focused on your goals."
};

let users = [];
let currentUser = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle user registration
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('[name="username"]').value;
            const password = this.querySelector('[name="password"]').value;
            const birthdate = this.querySelector('[name="birthdate"]').value;
            const region = this.querySelector('[name="region"]').value;

            if (users.some(user => user.username === username)) {
                alert('User already exists!');
                return;
            }

            users.push({ username, password, birthdate, region });
            alert('User registered successfully!');
            this.reset();
        });
    }

    // Function to handle user login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = this.querySelector('[name="username"]').value;
            const password = this.querySelector('[name="password"]').value;
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                currentUser = user;
                alert('Login successful!');
                updateUserInfo();
                updateUserList();
                this.reset();
            } else {
                alert('Invalid username or password!');
            }
        });
    }
});

// Function to update user info based on the current logged-in user
function updateUserInfo() {
    if (currentUser) {
        const regionData = culturalData[currentUser.region];
        
        const behaviorInsights = document.getElementById('behaviorInsights');
        if (behaviorInsights && regionData.behaviorInsights) {
            behaviorInsights.innerHTML = regionData.behaviorInsights
                .map(insight => `<p>${insight}</p>`)
                .join('');
        }

        updateUpcomingFestivals(regionData.upcomingFestivals);
        updateUpcomingEvents(regionData.upcomingEvents);
        displayHoroscope();
    }
}

// Function to display user's horoscope based on birthdate
function displayHoroscope() {
    if (currentUser && currentUser.birthdate) {
        const zodiacSign = getZodiacSign(currentUser.birthdate);
        const horoscopeMessage = horoscopes[zodiacSign];
        const luckMessage = "Lucky Color: Blue, Lucky Number: 7";
        
        const horoscopeLuck = document.getElementById('horoscopeLuck');
        if (horoscopeLuck) {
            horoscopeLuck.innerHTML = `
                <p>Zodiac Sign: ${zodiacSign}</p>
                <p>Horoscope: ${horoscopeMessage}</p>
                <p>${luckMessage}</p>
            `;
        }
    }
}

// Function to determine zodiac sign based on birthdate
function getZodiacSign(birthdate) {
    const date = new Date(birthdate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    return "Capricorn";
}

// Function to update upcoming festivals based on region
function updateUpcomingFestivals(festivals) {
    const festivalRecommendations = document.getElementById('festivalRecommendations');
    if (!festivalRecommendations) return;

    const today = new Date();
    festivalRecommendations.innerHTML = '';

    if (festivals && festivals.length > 0) {
        const upcomingFestivals = festivals.filter(festival => {
            const festivalDate = new Date(festival.date);
            return !isNaN(festivalDate.getTime()) && festivalDate >= today;
        });

        if (upcomingFestivals.length > 0) {
            upcomingFestivals.forEach(festival => {
                festivalRecommendations.innerHTML += `<p>${festival.name} - ${festival.date}</p>`;
            });
        } else {
            festivalRecommendations.innerHTML = '<p>No upcoming festivals available for your region.</p>';
        }
    }
}

// Function to update upcoming events based on region
function updateUpcomingEvents(events) {
    const eventCalendar = document.getElementById('eventCalendar');
    if (!eventCalendar) return;

    eventCalendar.innerHTML = '';

    if (events && events.length > 0) {
        events.forEach(event => {
            eventCalendar.innerHTML += `<p>${event.name} - ${event.date}</p>`;
        });
    } else {
        eventCalendar.innerHTML = '<p>No upcoming cultural events available for your region.</p>';
    }
}

// Function to update user list
function updateUserList() {
    const userList = document.getElementById('userList');
    if (!userList) return;

    userList.innerHTML = '';
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.username;
        userList.appendChild(listItem);
    });
}

// Function to delete the current user
const deleteUserButton = document.getElementById('deleteUser');
if (deleteUserButton) {
    deleteUserButton.addEventListener('click', function() {
        if (currentUser) {
            users = users.filter(user => user.username !== currentUser.username);
            alert('User deleted successfully!');
            currentUser = null;
            
            // Clear all displays
            ['behaviorInsights', 'festivalRecommendations', 'eventCalendar', 'horoscopeLuck'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.innerHTML = '';
            });
            
            updateUserList();
        } else {
            alert('No user is currently logged in.');
        }
    });
}