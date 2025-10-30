const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation)

let targetLocation = 'Lucknow'
const fetchResult = async () => {
    let url = Enter your API key Url

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    let locationName = data.location.name
    let time = data.location.localtime
    let temp = data.current.temp_c

    let condition = data.current.condition.text
    updateDetails(temp, locationName, time, condition)

}

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]
    let currentDay = getDayName(new Date(splitDate).getDay());
    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateTimeField.innerText = ' ${splitDate} ${currentDay} ${splitTime}';
    conditionField.innerText = condition;

}

function searchForLocation(e) {
    e.preventDefault()
    target = searchField.value
    fetchResult(target)
}

fetchResult(targetLocation)
function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}

