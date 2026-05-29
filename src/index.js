import "./styles.css";

let City = null;

async function GetCity(City) {
  try {
    Place = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${City}?key=GCGYCP3VHJ9FKXDSK2A9EFSBK`);
    let Data = await Place.json();
    console.log(Data)
  } catch {
    alert("Please Enter a Valid city")
  }
}

let Submit = document.querySelector(".myForm");
Submit.addEventListener("submit", (e) => {
  e.preventDefault;
  let CityInput = e.target.AddCity.value;
  GetCity(CityInput);
});
