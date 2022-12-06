/* Elements selectors */

const cardInputs = document.querySelectorAll(".form-card__input");
const cardFields = document.querySelectorAll(".card__info");

const form = document.querySelector(".form-card-infos");

/* Regular expressions */

const cvcRegEx = /^\d{3}$/;
const cardNumberRegEx = /^\d{16}$/;
const monthRegEx = /^(0?[1-9]|1[012])$/;
const yearRegEx = /^\d{2}$/

/* Real time update card info with input fields */

function updateCardInfos() {
    cardInputs.forEach((ie) => {
    
        ie.addEventListener("input", () => {
            cardFields.forEach( fe => (ie.id.includes(fe.id)) ? 
                                fe.innerText = ie.value : undefined);
        });
    });
}

updateCardInfos();

/* Check if any input field is empty */

function checkInputs() {
    let wrongInputsCount = 0;

    cardInputs.forEach((ie) => {
        var spanElement = document.getElementById(ie.parentElement.querySelector("span").id);

        /* spanElement.remove("visible");
        spanElement.innerText = '';
        ie.classList.remove('form__input--empty'); */

        if(ie.value.trim() === '') {
            wrongInputsCount++;
            spanElement.innerText = "Cant'be blank";
            ie.classList.add('form__input--empty');
            spanElement.classList.add("visible");
        } else if(ie.value !== '') {
            if(ie.id === "form-card__number") {
                if(cardNumberRegEx.test(ie.value)) {
                    return undefined;
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }
            } else if(ie.id === "form-card__month") {
                if(monthRegEx.test(ie.value)) {
                    return undefined;
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }

            } else if(ie.id === "form-card__year") {
                if(yearRegEx.test(ie.value)) {
                    return undefined;
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }

            } else if(ie.id === "form-card__cvc") {
                if(cvcRegEx.test(ie.value)) {
                    return undefined;
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }
            }
        }
    });

    return (wrongInputsCount === 0);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // form.reset();

    checkInputs();

});




