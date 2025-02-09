document.addEventListener("DOMContentLoaded", function () {
    const checkWashDiv = document.querySelector(".checkWash");
    
    async function checkWeather() {
        const apiKey = "a39301d6084f41cf9f051617250602"; // Replace with your actual WeatherAPI key
        const location = "Chennai"; // Replace with your city or dynamically fetch user's location
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch weather data");
            
            const data = await response.json();
            const condition = data.current.condition.text.toLowerCase();
            const iconUrl = data.current.condition.icon; // Weather condition icon
            const isSunny = condition.includes("sunny") || condition.includes("clear");

            checkWashDiv.innerHTML = `<img src="https:${iconUrl}" alt="Weather Icon" style="width: 100px; height: 100px;">`;
            checkWashDiv.style.fontFamily = "monospace";
            checkWashDiv.style.fontSize = "1.5rem";

            if (isSunny) {
                checkWashDiv.innerHTML += " ✅ Good weather to wash clothes!";
                checkWashDiv.style.backgroundColor = "#4CAF50"; // Green
                checkWashDiv.style.color = "#FFFFFF";
            } else {
                checkWashDiv.innerHTML += `❌ Not ideal for washing. Weather: ${data.current.condition.text}`;
                checkWashDiv.style.backgroundColor = "#2C3E50"; // Dark Blue
                checkWashDiv.style.color = "#FFFFFF";
            }
        } catch (error) {
            checkWashDiv.innerHTML = "⚠️ Error fetching weather data.";
            checkWashDiv.style.backgroundColor = "#C0392B"; // Dark Red
            checkWashDiv.style.color = "#FFFFFF";
            console.error("Weather Fetch Error:", error);
        }
    }

    checkWeather();
});
