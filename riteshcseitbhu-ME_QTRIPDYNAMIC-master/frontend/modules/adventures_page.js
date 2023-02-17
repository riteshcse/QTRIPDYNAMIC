
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search)
try {
  return search.substring(6,search.length);
} catch(err) {
  return null;
}

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  const url = config["backendEndpoint"];
  const url_api= url + "/adventures?city=" + city;
  //console.log(url_api)
  try {
  const response = await fetch(url_api);
  const data = await response.json();
  return data;
} catch(err) {
  
  return null;
}
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
   
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //#endregio
  //console.log(adventures)
  let elem = document.getElementById("data")
  adventures.forEach((adventure) =>  {

    
    addOneAdventureToDom(adventure, elem);
  });
}
function addOneAdventureToDom(adventure,elem) {
  let child = document.createElement("div")
  let id = adventure["id"]
  let image = adventure["image"]
  let category = adventure["category"]
  let duration = adventure["duration"]
  let name = adventure["name"]
  let costPerHead = adventure["costPerHead"]
  
  child.className= "col-sm-6 col-lg-3 mb-4"
  child.innerHTML= `<a href="detail/?adventure=${id}" id="${id}">
  
  <div class="activity-card">
  <div class="category-banner">${category}</div>  

  <img src="${image}" class="img-responsive" alt="image"/>
  </div>
  <div class="d-flex justify-content-between">  
  <p>${name}</p>
  <p class="mb-0">${costPerHead}</p> 
  </div>
  <div class="d-flex justify-content-between">  
  <p>Duration</p>
  <p class="mb-0">${duration}</p> 
  </div>
  
  </a>`
  elem.appendChild(child);
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  var filteredAdventureList = list.filter(function(item) {
    return item.duration >= low && item.duration <= high ;
 });
 return filteredAdventureList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryFilters) {
  var filteredAdventureList = list.filter(function(item) {
    return categoryFilters.includes(item.category);
 });

 return filteredAdventureList;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  var listByCategory = [];
  if (filters != null && filters.category.length) {
    listByCategory = filterByCategory(list,filters.category);
  } else {
    listByCategory = list;
  }
  var listByDuration = [];
  if (filters!=null && filters.duration.length) {
    var splitArr = filters.duration.split("-")
    if (splitArr.length > 1) {
    var low = parseInt(splitArr[0]);
    var high = parseInt(splitArr[1].split(" ")[0]);
    } else{
      low = parseInt(filters.duration);
      high = 99;
    }
    listByDuration = filterByDuration(listByCategory, low, high);
  } else {
    listByDuration = listByCategory;
  }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

   //console.log(listByDuration)

  // Place holder for functionality to work in the Stubs
  return listByDuration;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
 async function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  var data = await JSON.parse(window.localStorage.getItem("filters"));
  console.log(data)
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  /*let elem = document.getElementById("category-list");
  let categories = filters.category;
  categories.forEach((item) => {
    let child = document.createElement("div");
    child.className = "pills";
    child.innerHTML = item;
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    elem.appendChild(child);

  }*/
  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}</div>
                `;

    document.getElementById("category-list").appendChild(ele);
  }); 
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
