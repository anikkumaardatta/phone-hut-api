
const phoneContainer = document.getElementById('phone_container');
const searchField = document.getElementById('search_field');
const searchBtn = document.getElementById('search_btn')

searchField.addEventListener('keypress', (e)=>{
    if(e.key ==='Enter'){
        processSearch(12);
    }
})
const loadPhones = async(searchText , dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const resP = await fetch(url);
    const data = await resP.json();
    displayPhones(data.data , dataLimit);
}
const showPhone = (phone) => {
    phoneContainer.innerHTML=``;
    toggleLoader(true)
    loadPhones(phone, 5);
}
const displayPhones = (phones, dataLimit) =>{
    phoneContainer.innerHTML=``;

    const showALl = document.getElementById('show_all');

    if(dataLimit && phones.length > 12){
        phones = phones.slice(0,dataLimit);
        showALl.classList.remove('d-none');
    }
    else{
        showALl.classList.add('d-none');
    }

    const noFound = document.getElementById('no_found_message');

    if(phones.length == 0){
        noFound.innerText = "No Phone Found :("
    }
    else{
        noFound.innerText = ""
    }

    phones.forEach(phone => {
        const column = document.createElement('div');
        column.classList.add('col');
        column.innerHTML = `
            <div class="card p-3">
                <img src="${phone.image}" style="max-width: 200px" class="mx-auto card-img-top alt="">
                <div class="card-body">
                    <h3 class="card-title text-center fw-semibold text-danger">${phone.phone_name}</h3>
                    <p class="card-text text-justify">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </p>
                    <div class="text-end">
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                    </div>
                </div>
            </div>
            `;
            phoneContainer.appendChild(column)
    });
    
    toggleLoader(false)
}
const showDetails = async(slug) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    const resP = await fetch(url);
    const data = await resP.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = (phone) =>{
    const phoneDetailsModalLabel = document.getElementById('phoneDetailsModalLabel');
    phoneDetailsModalLabel.innerText = phone.brand
    const modalBody = document.getElementById('modal_body');
    modalBody.innerHTML =`
    <div class="card w-100" style="width: 18rem;">
        <img src="${phone.image}" style="max-width: 180px" class="p-4 card-img-top mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">${phone.releaseDate}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="fw-semibold">Storage: </span>
                <small class="text-muted">${phone.mainFeatures.storage}</small>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="fw-semibold">Display:</span>
                <small class="text-muted">${phone.mainFeatures.displaySize}</small>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="fw-semibold">ChipSet:</span>
                <small class="text-muted">${phone.mainFeatures.chipSet}</small>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="fw-semibold">Sensors:</span>
                <small class="text-muted">${phone.mainFeatures.sensors}</small>
            </li>
        </ul>
    </div>
    `
    console.log(phone);
}
const processSearch = (dataLimit) =>{
    phoneContainer.innerHTML=``;
    toggleLoader(true)
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
searchBtn.addEventListener('click', ()=>{
    processSearch(12);
})

const onLoading = () => {
    toggleLoader(true)
}

const toggleLoader = (isLoading) =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}
document.getElementById('btn_show_all').addEventListener('click', ()=>{
    processSearch();
})
loadPhones('m');