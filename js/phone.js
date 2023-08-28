const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    //step 1
    const phoneContainer = document.getElementById('phone-container')
    //clear phone container card before adding new card
    phoneContainer.textContent = '';

    //display show all button if there are more then 12 phone
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // console.log(isShowAll)

    //display only first 12 phone is not show all
    if (!isShowAll) {
        phones = phones.slice(0,12)
    }

    phones.forEach(phone => {
        // console.log(phone);
        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3. set inner Html
        phoneCard.innerHTML = `

        <figure><img src="${phone.image} " /></figure>
        <div class="card-body text-center">
          <h2 class="card-title justify-center">${phone.phone_name} </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>

        `;
        //4 .step append child
        phoneContainer.appendChild(phoneCard);

    });
    // hide loading spinner
    toggleLoadingSpinner(false)
}

const handleShowDetails = async (id) => {
    console.log('click show details', id)
    //load single data
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    showPhoneDetails(phone)
}

// show phone details
    const showPhoneDetails = (phone) =>{
        console.log(phone);
        const phoneName = document.getElementById('show-details-phone-name')
        phoneName.innerText = phone.name;

        const showDetailsContainer = document.getElementById('show-details-container')
        showDetailsContainer.innerHTML = `
            <img src="${phone.image}" alt="" class= "mx-auto my-3">
            <h2 class = "text-2xl font-bold">${phone.brand}</h2>
            <p><span class= "text-xl font-bold">Storage: </span>${phone?.mainFeatures?.storage} </p>
            <p><span class = "text-xl font-bold"> Display: </span> ${phone?.mainFeatures?.displaySize}</p>
            <p>${phone?.mainFeatures?.chipSet}</p>
            <p class = "my-3"><span class = "text-xl font-bold"> ChipSet: </span>${phone?.mainFeatures?.chipSet} </p>
            <p> <span class = "text-xl font-bold"> Sensors: </span>${phone?.mainFeatures?.sensors} </p>
            <p><span class = "text-xl font-bold"> GPS: </span>${phone.others?.GPS || 'No GPS'}</p>
            <p>${phone?.releaseDate} </p>
            
        `;

        //show the modal
        show_details_modal.showModal();
    }

//handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


//handle show on
const handleShowAll = () =>{
    handleSearch(true)


}

loadPhone()