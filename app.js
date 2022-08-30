
const phoneContainer = document.getElementById('phone_container');
const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const resP = await fetch(url);
    const data = await resP.json();
    displayPhones(data.data);
}
const showiPhone = (phone) => {
    phoneContainer.innerHTML=``;
    toggleLoader(true)
    loadPhones(phone);
}
const displayPhones = phones =>{

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
                    <h5 class="card-title text-center fw-semibold bg-warning rounded-5 py-2 text-dark">${phone.phone_name}</h5>
                    <p class="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </p>
                </div>
            </div>
            `;
            phoneContainer.appendChild(column)
    });
    
toggleLoader(false)
}

const searchField = document.getElementById('search_field');
const searchBtn = document.getElementById('search_btn')

searchBtn.addEventListener('click', ()=>{
    phoneContainer.innerHTML=``;
    toggleLoader(true)
    loadPhones(searchField.value);
    searchField.value=``;
})

const toggleLoader = (isLoading) =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}
loadPhones('m');