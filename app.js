window.addEventListener("load", () => {
  let lon;
  let lat;

  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature-section");
  const temperatureSpan = document.querySelector(".temperature-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a37894eeb9306f754913409ea8939294`;

       fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          let { description, main, icon } = data.weather[0];
          const { name } = data;
          //Set DOM Elements from API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = name;
          //Formula for Celsius
          let farenheit = (temp + (9 / 5)) + 32;
          //Set icons
          setIcons(main, document.querySelector(".icon"));

          //Change Temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () =>{
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = farenheit;
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp;
            }
          });
        })
        .catch((error) => console.log("error", error));
    });
  }
  
  //Convert icon to description
  
  // const clear_sky = {
  //   clear_sky: "01d",
  //   few_clouds: "02d",
  //   scattered_clouds: "03d",
  //   broken_clouds: "04d",
  //   shower_rain: "09d",
  //   rain: "10d",
  //   thunderstorm: "11d",
  //   snow: "13d",
  //   mist: "50d",
  // }
    function setIcons(main, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = main.replace(" ", "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
