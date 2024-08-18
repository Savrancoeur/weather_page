$(document).ready(function () {
  const translations = {
    en: { wind: "Wind", humidity: "Humidity", sunshine: "Sunshine" },
    fr: {
      wind: "Vent",
      humidity: "Humidité",
      sunshine: "Ensoleillement",
    },
    es: { wind: "Viento", humidity: "Humedad", sunshine: "Luz solar" },
    de: {
      wind: "Wind",
      humidity: "Feuchtigkeit",
      sunshine: "Sonnenschein",
    },
    it: { wind: "Vento", humidity: "Umidità", sunshine: "Luce solare" },
  };

  function updateWeather() {
    const city = $("#city-select").val();
    const lang = $("#language-select").val();
    const apiKey = "3ed65ed42325b77096470e252c7df8e7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`;

    $.getJSON(url, function (data) {
      $("#city-name").text(city);
      $("#temperature").text(`${Math.round(data.main.temp)}°C`);
      $("#weather-description").text(data.weather[0].description);
      $("#wind-speed").text(
        `${translations[lang].wind}: ${data.wind.speed} km/h`
      );
      $("#humidity-level").text(
        `${translations[lang].humidity}: ${data.main.humidity}%`
      );
      $("#sunshine-hours").text(
        `${translations[lang].sunshine}: ${(data.clouds.all / 10).toFixed(1)} h`
      );

      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      $("#weather-icon").attr("src", iconUrl);
    });
  }

  $("#city-select, #language-select").change(updateWeather);

  updateWeather();
});
