import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let o = new URLSearchParams(search)

   
  // Place holder for functionality to work in the Stubs
  return o.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  const url = config["backendEndpoint"];
  const url_api= url + "/adventures/detail/?adventure=" + adventureId;
  try {
    let res = await fetch(url_api);
    let data =  await res.json();
    return data;
  } catch (e) {
    return null;
  }
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call


  // Place holder for functionality to work in the Stu
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  let {name, subtitle, images, content} = adventure;
  console.log(images);
  document.getElementById("adventure-name").textContent = name;
  document.getElementById("adventure-subtitle").textContent = subtitle;
  document.getElementById("adventure-content").textContent = content;
  images.forEach(src => {
    console.log(src);
    document.getElementById("photo-gallery").innerHTML += `<div>
    <img src=${src} class= "activity-card-image" />
    </div>`;
  })
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  
    document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="slides-target">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
  
  images.forEach((src,i)  => {
    document.getElementById("slides-target").innerHTML += `<div class= "${"carousel-item" + (i === 0 ? " active" :"")}">
    <img src=${src} class="d-block w-100" alt ="..." /></div>`
  })
  }

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display="none"
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead
  } else {
    document.getElementById("reservation-panel-sold-out").style.display="block"
    document.getElementById("reservation-panel-available").style.display="none"
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = adventure.costPerHead*persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    document.getElementById("myForm").addEventListener("submit", async event=> {
      event.preventDefault()
      try {
      let form = document.getElementById("myForm")
      let res = await fetch(config.backendEndpoint + `/reservations/new`, {
      method: "POST",
      body: JSON.stringify({
        name: form.elements.name.value,
        date: form.elements.date.value,
        person: form.elements.person.value,
        adventure: adventure.id
      })
      ,
      headers: {
        "Content-Type": "application/json"
      }
    })   
    console.log(res)
    if (res.ok)  {
    alert("success")
    } else {
      alert("error")
    }
    
  } catch (e) {
    console.log(e)
    alert("erorr")

  }
})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display="block"
  } else{
    document.getElementById("reserved-banner").style.display="none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
