// Personal API Key for OpenWeatherMap API
const API_KEY = "&APPID=e23122c5062eb361eb2aa6ee3762e1db&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Convert date
function convertDate(unixtimestamp) {
	// Months array
	var months_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Convert timestamp to milliseconds
	var date = new Date(unixtimestamp * 1000);

	// Year
	var year = date.getFullYear();

	// Month
	var month = months_array[date.getMonth()];

	// Day
	var day = date.getDate();

	// Display date time in MM/dd/yyyy format
	var convertedTime = month + "/" + day + "/" + year;

	return convertedTime;
}

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
	const zip = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;

	getAPIData(baseURL, zip, API_KEY)
		.then(function (data) {
			// Add data
			console.log("AllData from api: ", data);
			postWeatherData("/addWeatherData", {
				temperature: data.main.temp,
				date: convertDate(data.dt),
				userResponse: feelings,
			});
		})
		.then(() => updateUI());
}
