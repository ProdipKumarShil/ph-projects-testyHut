const loadAllData = (searchWord = '') => {
    const inputValue = document.getElementById('searchInput').value
    searchWord += inputValue
    let index = 6

    // 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`
    fetch(URL)
    .then(res => res.json())
    .then(data => useData((data.meals).slice(0, index)))
}

const useData = (meals) => {
    const mainSection = document.getElementById('mealContainer')
    mainSection.innerHTML = ''
    meals.forEach((meal) => {
        const {strMeal, strInstructions, strMealThumb, idMeal} = meal
        const div = document.createElement('div')
        
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${strMealThumb}" class="img-fluid rounded-start " alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <p class="card-text">${strInstructions.slice(0, 40)}</p>
                        <a onclick="mealDetail(${idMeal})" href="" class="nav-link text-primary fw-bold"  data-bs-toggle="modal" data-bs-target="#mealModal">view details</a>
                    </div>
                </div>
            </div>
        </div>
        `
        mainSection.appendChild(div)

    })
}

const mealDetail = mealId => {
    console.log(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.meals[0]))
}

const displayModal = mealData => {
    const {strMeal, strMealThumb, strInstructions, strCategory, strArea, strYoutube} = mealData
    const modal = document.getElementById('modalBody')
    modal.innerHTML =`
        <div class="modal-header" >
            <h1 class="modal-title fs-5" id="mealModalLabel">${strMeal}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <div class="col">
                <div class="card">
                    <img src="${strMealThumb}" class="card-img-top " alt="...">
                    <div class="card-body">
                        <p class="card-text text-muted"> <span class="fw-bold ">Category: </span>${strCategory}</p>
                        <p class="card-text text-muted"> <span class="fw-bold ">Area:</span> ${strArea}</p>
                        <p class="card-text text-muted"> <span class="fw-bold ">Instructions:</span> ${strInstructions.slice(0, 200)}</p>
                        <p class="card-text text-muted"> <span class="fw-bold ">Youtube:</span> ${strYoutube}</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `
}

loadAllData()
