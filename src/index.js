import "./styles.css";

let City = null;
let Title = document.querySelector('.Title')

async function GetCity(City) {
  //Loader DOM logic 
  let Loading = document.createElement('div')
  Loading.textContent = "Loading... "
  Loading.classList.add('Loading')
  Title.after(Loading)

  try {
    let Place = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${City}?key=GCGYCP3VHJ9FKXDSK2A9EFSBK`);
    let DirtyData = await Place.json();

    Loading.remove()

    let NewWeatherContainer = document.querySelector('.WeatherContainer')
    if (NewWeatherContainer) NewWeatherContainer.remove()

    let CleanData = {
      Feelslike: DirtyData.currentConditions.feelslike,
      Latitude: DirtyData.latitude,
      Longitude: DirtyData.longitude
    };

    //For the DOM loading 
    let WeatherContainer = document.createElement('div')
    WeatherContainer.classList.add("WeatherContainer")
    Title.after(WeatherContainer)

    let WeatherContainerTitle = document.createElement('div')
    WeatherContainerTitle.classList.add("WeatherContainerTitle")
    WeatherContainerTitle.textContent = City 
    WeatherContainer.appendChild(WeatherContainerTitle)

    let WeatherContainerBody = document.createElement('div')
    WeatherContainerBody.classList.add("WeatherContainerBody")
    WeatherContainer.appendChild(WeatherContainerBody)

    let WeatherFeelsLike = document.createElement('div')
    WeatherFeelsLike.textContent = `Feels Like: ${CleanData.Feelslike}`
    WeatherContainerBody.appendChild(WeatherFeelsLike)

    let WeatherLatitude = document.createElement('div')
    WeatherLatitude.textContent = `Latitude: ${CleanData.Latitude}`
    WeatherContainerBody.appendChild(WeatherLatitude)
    
    let WeatherLongitude = document.createElement('div')
    WeatherLongitude.textContent = `Longitude: ${CleanData.Longitude}` 
    WeatherContainerBody.appendChild(WeatherLongitude)

    let TempChangeButton = document.createElement('button')
    TempChangeButton.textContent = "Change to Celsius"
    TempChangeButton.classList.add("TempChange")
    WeatherContainerBody.appendChild(TempChangeButton)

    TempChangeButton.addEventListener("click", () => {
      if (TempChangeButton.textContent == "Change to Celsius") {
        TempChangeButton.textContent = "Change to Fahrenheit"
        CleanData.Feelslike = ((CleanData.Feelslike -32) * 5/9).toFixed(1)
        WeatherFeelsLike.textContent = `Feels Like: ${CleanData.Feelslike}`
      }
      
      else {
        TempChangeButton.textContent = "Change to Celsius"
        CleanData.Feelslike = ((CleanData.Feelslike * 1.8) + 32).toFixed(1)
        WeatherFeelsLike.textContent = `Feels Like: ${CleanData.Feelslike}`
      }
    })
    
  } catch {
    alert("Please Enter a Valid city")
    Loading.remove()  
  }
}

let Submit = document.querySelector(".myForm");
Submit.addEventListener("submit", (e) => {
  e.preventDefault();
  let CityInput = e.target.AddCity.value;
  GetCity(CityInput);
});
