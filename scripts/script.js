const url = "https://striveschool-api.herokuapp.com/api/agenda"

/* 
    todo: 
        - add edit icon
        - add delete icon
*/
window.onload = async () => {
  await getEvents()
}

const getEvents = async () => {
  try {
    const res = await fetch(url)
    const events = await res.json() //array of events
    renderEvents(events)
  } catch (error) {
    handleError(error)
  }
}

const renderEvents = (arrayOfEvents) => {
  const ul = document.querySelector("ul.list-group")
  ul.innerHTML = ""
  arrayOfEvents.forEach((singleEvent) => {
    const { name, description, time, price, _id } = singleEvent
    ul.innerHTML += `<li class="list-group-item w-50">
    <div class='row align-items-center justify-content-between p-3'>
      <div class='col col-6'>
      <h3> ${name} </h3>
            <p> ${description} </p>
            ${
              price !== null
                ? `<span class="badge badge-pill badge-warning">${price} $</span>`
                : ""
            }
            <span class="badge badge-pill badge-info">${time}</span>
      </div> 
      <div class='col col-6 row justify-content-end'>
      <a href='./backoffice.html?id=${_id}' class='btn btn-primary m-1'> <i class="bi bi-pencil-square"></i> </a>
            <button class='btn btn-danger m-1' onclick='deleteEvent("${_id}")'> <i class="bi bi-trash-fill"></i> </button>
            <a href='./details.html?id=${_id}' class='btn btn-info rounded-pill m-1'> <i class="bi bi-arrow-up-right-square-fill"></i> Details </a>
      </div> 
    </div>
            
            
        </li>`
  })
}

const deleteEvent = async (idToDelete) => {
  //add confirmation
  try {
    let res = await fetch(url + "/" + idToDelete, {
      method: "DELETE",
    })
    // "https://striveschool-api.herokuapp.com/api/agenda/63c9060fe73738001537433b"
    console.log(res)
    if (res.ok) {
      await getEvents()
    }
  } catch (error) {
    handleError(error)
  }
}

const handleError = (errorText) => {
  const alert = document.querySelector(".alert span.alert-text")
  console.log(alert)
  alert.innerText = errorText
  alert.parentElement.classList.replace("d-none", "d-block")
}
