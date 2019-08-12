const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(json => {
    showTrainers(json)
})


showTrainers = (trainers) => {
    trainers.forEach(element => {
        createTrainer(element)
    });
}

createTrainer = (element) => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const main = document.getElementsByTagName("main")[0]
    div.classList.add("card")
    div.setAttribute("data-id", element.id)
    div.appendChild(p)
    div.appendChild(button)
    main.appendChild(div)

    p.innerText = element.name 
    button.innerText = "Add Pokemon"
    button.setAttribute("data-trainer-id", element.id)

    const list = document.createElement("ul")
    element.pokemons.forEach(pokemon => {
        const listItem = document.createElement("li")
        listItem.innerText = `${pokemon.nickname} (${pokemon.species})`
        const button = document.createElement("button")
        button.classList.add("release")
        button.innerText = "Release"
        button.setAttribute("data-pokemon-id", pokemon.id)
        listItem.appendChild(button)
        list.appendChild(listItem)
        button.addEventListener("click", () => {
            fetch(`${POKEMONS_URL}/${pokemon.id}`, {method:"DELETE"})
            listItem.remove()
        })
    })
    div.appendChild(list)

    button.addEventListener("click", ()=> {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "trainer_id": element.id
            })
            })
        .then(resp => {
            if (resp.status !== 403){
                return resp.json()
            } 
        })
        .then(json =>{
            const listItem = document.createElement("li")
            listItem.innerText = `${json.nickname} (${json.species})`
            const button = document.createElement("button")
            button.classList.add("release")
            button.innerText = "Release"
            button.setAttribute("data-pokemon-id", json.id)
            listItem.appendChild(button)
            list.appendChild(listItem)
        })
    })
}
