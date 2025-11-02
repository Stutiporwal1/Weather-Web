const temperatureField = document.querySelector(".temp p"); 
const locationField = document.querySelector(".time_location p");
const dateTimeField = document.querySelector(".time_location span");
// This now correctly targets the one <p> in .condition
const conditionField = document.querySelector(".condition p"); 
// This was correct (once HTML class was fixed)
const searchField = document.querySelector(".search_area");
// This was correct
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

// Set a default location for the first load
let targetLocation = 'Lucknow';

// --- Modified fetchResult Function ---
// The function needs to accept the 'target' as an argument
const fetchResult = async (target) => {
    // --- IMPORTANT ---
    // Replace YOUR_API_KEY_HERE with your actual API key
    // This URL structure is for weatherapi.com
    let url = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY_HERE&q=${target}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`City not found: ${response.statusText}`);
        }
        const data = await response.json();

        // Log data to see the structure
        console.log(data);

        // Update variables from API data
        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        // Call update function
        updateDetails(temp, locationName, time, condition);

    } catch (error) {
        console.error("Error fetching weather:", error);
        // Display an error to the user
        temperatureField.innerText = "!";
        locationField.innerText = "City not found";
        dateTimeField.innerText = "Please try again";
        conditionField.innerText = "---";
    }
}

// --- Modified updateDetails Function ---
function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    // Add the degree symbol
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;

    // --- Fixed Template Literal ---
    // Use backticks (`) instead of single quotes (') to insert variables
    dateTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

// --- Modified searchForLocation Function ---
function searchForLocation(e) {
    e.preventDefault();
    // Use 'const' to declare the variable
    const target = searchField.value;
    // Pass the target to the fetch function
    fetchResult(target);
}

// --- getDayName Function (No errors) ---
function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}

// Initial fetch on page load with the default location
fetchResult(targetLocation);
