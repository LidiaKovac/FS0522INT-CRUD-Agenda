{
  /* <div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
}
const url = "https://striveschool-api.herokuapp.com/api/agenda"

const params = new URLSearchParams(location.search)
const id = params.get("id")

window.onload = async () => {
  try {
    const res = await fetch(`${url}/${id}`) //GET
    const { name, description, price, time, _id, createdAt, updatedAt } = await res.json()
    const container = document.querySelector(".container")
    container.innerHTML += `<div class="card">
    <div class="card-header">
      ${name}
    </div>
    <div class="card-body">
      <h5 class="card-title">Your event is at: ${time.replace("T", " ").replace(".000Z", "")}</h5>
      <p class="card-text">${description}</p>
      <button class='btn btn-success rounded-pill'> Your event is ${price ? price + "$" : "FREE"} </button>
      <div class='d-flex flex-column justify-content-center w-50'> 
      <span class="badge badge-pill badge-light m-1">created: ${createdAt}</span>
      <span class="badge badge-pill badge-dark m-1">updated: ${updatedAt}</span>
      <span class="badge badge-pill badge-secondary m-1">id: ${_id}</span>
      </div>
    </div>
  </div>`
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
