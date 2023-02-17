import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  //console.log(" From init()");
  
  
  //console.log(url);
  let cities = await fetchCities();
  console.log((cities));
  //Updates the DOM with the cities
  if (cities !=null) {
  cities.forEach((key) =>  {
    //console.log(cities[key].image)
   addCityToDOM(key.id, key.city, key.description, key.image);})
}
}
//Implementation of fetch call
async function fetchCities() {
  const url = config["backendEndpoint"];
  const url_api= url + "/cities";
  try {
  const response = await fetch(url_api);
  const data = await response.json();
  var cities = []
  for (var key in data) {
    cities.push(data[key])
  }
  return cities;
} catch(err) {
  return null;
}
// TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  console.log(id);
  console.log(city)
  console.log(description)
  console.log(image)
   
  let elem = document.getElementById("data")
  let child = document.createElement("div")
  child.className= "col-sm-6 col-lg-3 mb-4"
  /*child.innerHTML = `<div class="adventure-card border rounded">
  <a href="/home/crio-user/workspace/riteshcseitbhu-ME_QTRIPSTATIC/pages/adventures/index.html" class="d-flex flex-row justify-content-between" style="width:  100%; height: 100%">
    <img src="assets/bengaluru.jpg" class="card-img-top"
    alt="image"/>
    <div class="tile-text text-center">
      <h5>Bengaluru</h5><p>100+ places</p>
      </div>
      </div>
      </a>`;*/

      child.innerHTML= `<a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
      <div class="tile-text text-center">
        <h5>${city}</h5><p>${description}</p>
        </div>
        <img src="${image}" class="img-responsive" alt="image"/>
        </div> 
        </a>`
        
    
  // 1. Populate the City details and insert those details into the DOM
  elem.appendChild(child);
  console.log(document.getElementById(id))
}

export { init, fetchCities, addCityToDOM};
