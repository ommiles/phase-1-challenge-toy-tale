// ? Question here ?
// * Thing
// ! Need to debug
// // Thing is done

// TODO: EVENT LISTENERS
// 2.2 Create an event listener so that, when the dorm is submitted...
// 2.3 ... after the form submit event the new toy is persisted to the database ...
// 2.4 & a new card showing the toy is added to the DOM.
// 3.1 Create an event listener that gives users the ability to click a button to "like" a toy. 
// 3.2 When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM.

// TODO: GRAB DOM ELS
// 1. Render the list of toys in a "card" on the page
// 2.1 Hook up a form than enables users to add new toys


// TODO: FETCHES
// FETCH GET REQUEST: render returned toys to the DOM
// FETCH POST REQUEST: create a new toy, then add it to the DOM
// FETCH PATCH REQUEST: updates an existing toy, then render the updated information to the DOM


// URL
let addToy = false;
const BASE_URL = `http://localhost:3000/toys`

// SELECTORS
const addBtn = document.querySelector(`#new-toy-btn`)
const toyFormContainer = document.querySelector(`.container`)
const toyCollection = document.querySelector(`#toy-collection`)
const form = document.querySelector(`.add-toy-form`)
// const button = document.querySelector(`.like-btn`)

// // Run fetch
// ! Don't forget parenthesis after json!!!
function getAllToys() {
  fetch(BASE_URL)
  .then(res => res.json())
  .then(toys => loopToy(toys))
}

// // TODO: Creata a forEach loop for each toy object in the toys array.
function loopToy(toys) {
  toys.forEach(toy => getOneToy(toy))
}

// // TODO: Grab a single toy from the toys array.
function getOneToy(toy) {
  renderToy(toy)
}

// // TODO: Render function for each object running through the loop
function renderToy(toy) {
  console.log(`renderedToy is firing`)
  let div = document.createElement(`div`)
  div.classList.add(`card`)
  toyCollection.appendChild(div)
  let h2 = document.createElement(`h2`)
  h2.innerText = toy.name
  let img = document.createElement(`img`)
  img.classList.add(`toy-avatar`)
  img.src = toy.image
  let p = document.createElement(`p`)
  p.innerText = `${toy.likes}`+` Likes`
  let button = document.createElement(`button`)
  button.innerText = `Like ❤️`
  button.dataset.id = toy.id
  console.log(button.dataset.id)
  // Listener must happen inside of renderToy function!
  button.addEventListener(`click`, e => updateLikes(e, toy))
  console.log(button.dataset.id)
  button.classList.add(`like-btn`)
  let deleteBtn = document.createElement('button')
  deleteBtn.class = 'like-btn'
  deleteBtn.innerText = 'Delete'
  deleteBtn.addEventListener('click', e => deleteToy(e, toy.id))
  div.appendChild(deleteBtn)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
}

// // Change CSS display on click event
function styleDisplayChange() {
  addBtn.addEventListener(`click`, () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = `block`;
    } else {
      toyFormContainer.style.display = `none`;
    }
  })
}

// TODO: Great job!  You remembered preventDefault :)
// ! Don't forget the .value !
// The event target is the HTML el we've grabbed with query Selector.
// We grab the name.value data and store it in our newObj variable.
// That variable is then used and stringified for the POST fetch body.
// After the body is updated, we run our render function again.
function updateDB(e) {
  e.preventDefault()
  // console.log(e.target)
  let newToyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  // ! Don't forget commas and config object !
  let config = {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyObj)
  }
  console.log(newToyObj)
  console.log(config)
  fetch(BASE_URL, config)
  .then(res => res.json)
  .then (renderToy(newToyObj))

  // ! Don't forget form reset !
  e.target.reset();
}

// ! DIFFICULT FUNCTION !
// Grab the target.id of the event ( we set this in renderToy() )
// 
function updateLikes(e, toy) {
  let newLike = parseInt(e.target.previousElementSibling.innerText) + 1
  console.log(newLike)
  // ! comma needed ?
  let config = {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: newLike
    })
  }
  fetch(BASE_URL + `/${toy.id}`, config)
  .then(res => res.json)
  // This updates the dom after the click.
  .then (like => e.target.previousElementSibling.innerText = `${newLike} Likes`)
}

const deleteToy = (e, id) => {
  e.target.parentNode.remove()
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())
}

form.addEventListener(`submit`, updateDB)
document.addEventListener(`DOMContentLoaded`, styleDisplayChange(),getAllToys())