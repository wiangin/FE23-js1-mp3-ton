// Tomt div element som tar emot en annan div elemet som innehåller länderna information som användare söker efter. 
const containerDivEl = document.querySelector('#container');

// Tar emot användarinput och visar information om länderna som användaren söker efter.
const form = document.querySelector('form');
form.addEventListener('submit',event => {
    event.preventDefault();
    const userInput = document.querySelector('#userInput').value;
    const nameSelect = document.querySelector('#name');
    const languageSelect = document.querySelector('#language');
    
    //Om användare väljer genom att klicka på "name".
    if(nameSelect.checked == true){
        async function fetchCounties(userInputName){
            const countryApiUrl = `https://restcountries.com/v3.1/name/${userInputName}`;
            containerDivEl.innerHTML = '';
            const response = await fetch(countryApiUrl);
            if(response.ok){
                const dataCountry = await response.json();
                return dataCountry;
            }
            else if(response.status === 404){
                throw 404;
            }   
        }

        fetchCounties(userInput)
        .then(displayCountryInfo)
        .catch(displayError);    
    }

    //Om användare väljer genom att klicka på "language".
    else if(languageSelect.checked == true){
        async function fetchLanguage(userInputLanguage){
            const languageUrl = ` https://restcountries.com/v3.1/lang/${userInputLanguage}`;
            containerDivEl.innerHTML = '';
            const response = await fetch(languageUrl);
            if (response.ok){
                 const dataLanguage = await response.json();     
                 return dataLanguage;    
            }
            else if(response.status === 404){
                 throw 404;
            }
         }
        fetchLanguage(userInput)
        .then(displayCountryInfo)
        .catch(displayError);
    }

    form.reset();
})

//fuktionen som visar länderna information i fallande ordning och sorterar efter populationsmängd från flest till minst".
function displayCountryInfo(getLand){
    const sort = getLand.sort((a,b) => b.population - a.population);
    for(const landlist of getLand){
        const containerBoxDiv = document.createElement('div');
        containerBoxDiv.classList.add('divBorder');
        const landNameEl = document.createElement('p');
        const flagImageEl = document.createElement('img');
        const subregionEl = document.createElement('p');
        const capitalEl = document.createElement('p');
        const populationEl = document.createElement('p');

        const name = 'Official name: ' + landlist.name.official;
        const flag = landlist.flags.svg;
        const subregion = 'Subregion: ' + (landlist.subregion !== undefined ? landlist.subregion : 'None');
        const capital = 'Capital city: ' + (landlist.capital !== undefined ? landlist.capital : 'None');
        const population = 'Population: ' + landlist.population;

        landNameEl.innerText = name;
        flagImageEl.src = flag;
        subregionEl.innerText = subregion;
        capitalEl.innerText = capital;
        populationEl.innerText = population;
        containerBoxDiv.append(flagImageEl,landNameEl, subregionEl, capitalEl, populationEl);
        containerDivEl.append(containerBoxDiv);
    }
}

// Fuktion som visar när länderna ej hittas eller annat fel.
function displayError(error){
    const errorEl = document.createElement('h1');
    if(error === 404){
        errorEl.innerText = 'Country not found.';
    }
    else{
        errorEl.innerText = 'Something went wrong. Please try again later.';
    }
    containerDivEl.append(errorEl);
}

