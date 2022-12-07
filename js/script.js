/* Elements selectors */

const cardInputs = document.querySelectorAll(".form-card__input");
const cardFields = document.querySelectorAll(".card__info");

const form = document.querySelector(".form-card-infos");
const spans = form.querySelectorAll("span");
const confirmationMsg = document.querySelector(".confirmation__wrapper");

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
        let spanElement = document.getElementById(ie.parentElement.querySelector("span").id);

        if(ie.value.trim() === '') {
            wrongInputsCount++;
            spanElement.innerText = "Cant'be blank";
            ie.classList.add('form__input--empty');
            spanElement.classList.add("visible");
        } else if(ie.value !== '') {
            if(ie.id === "form-card__name") {
                resetErrorsMarks("form-card__name", "input__name--error");
            } else if(ie.id === "form-card__number") {
                if(cardNumberRegEx.test(ie.value)) {
                    resetErrorsMarks("form-card__number", "input__number--error");
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }
            } else if(ie.id === "form-card__month") {
                if(monthRegEx.test(ie.value)) {
                    resetErrorsMarks("form-card__month", "input__month--error");
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }

            } else if(ie.id === "form-card__year") {
                if(yearRegEx.test(ie.value)) {
                    resetErrorsMarks("form-card__year", "input__year--error");
                } else {
                    wrongInputsCount++;
                    spanElement.innerText = "Wrong number/size format";
                    spanElement.classList.add("visible");
                }

            } else if(ie.id === "form-card__cvc") {
                if(cvcRegEx.test(ie.value)) {
                    resetErrorsMarks("form-card__cvc", "input__cvc--error");
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

/* Reset spans */

function resetErrorsMarks(inputID = undefined, spanID = undefined) {

    if(spanID === undefined && inputID === undefined) {
        spans.forEach((se) => {
            se.classList.remove("visible");
        });
        cardInputs.forEach((ie) => {
            ie.classList.remove("form__input--empty");
        });
    } else if(spanID !== undefined && inputID !== undefined) {
        document.getElementById(spanID).classList.remove("visible");
        document.getElementById(inputID).classList.remove("form__input--empty");
    }  
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(checkInputs()) {
        form.setAttribute("style", "visibility: hidden;");
        confirmationMsg.setAttribute("style", "visibility: visible;");
        resetErrorsMarks();

        confirmationMsg.addEventListener("click", () => {
            window.location.reload();
            form.reset();
        });
    }
});




