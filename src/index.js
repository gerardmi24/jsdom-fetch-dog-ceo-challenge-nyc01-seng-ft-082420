let breeds = []

document.addEventListener('DOMContentLoaded', function () {
    loadImages();
    loadBreedOptions();

});

function loadImages() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(results => {

        results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = dogPicUrl;
    container.appendChild(newImageEl);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(results => {
       
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(e) {
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropDown = document.querySelector('#breed-dropdown');
    breedDropDown.addEventListener('change', function(e) {
        selectBreedsStartingWith(e.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(e){
    e.target.style.color = 'palevioletred';
}