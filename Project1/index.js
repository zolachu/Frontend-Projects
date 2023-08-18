const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const email = document.getElementById("email");

//

const showError = (input, message) => {
    const parent = input.parentElement;
    const small = parent.querySelector("small");
    small.innerText = message;
    parent.classList.add("error");
    parent.classList.remove("success");
};

const showSuccess = (input) => {
    const parent = input.parentElement;
    const small = parent.querySelector("small");
    parent.classList.remove("error");
    parent.classList.add("success");
};

const checkRequired = (input) => {
    input.forEach((i) => {
        console.log(i.id);
        const value = i.value.trim();
        if (value === "") {
            showError(i, `${getFieldName(i.id)} is required`);
        } else {
            showSuccess(i);
        }
    });
};

const getFieldName = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
};

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input.id)} must be at least ${min} letters.`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input.id)} must be less than ${max} letters.`
        );
    } else {
        showSuccess(input);
    }
};

const checkEmail = (input) => {
    const re = /\S+@\S+\.\S+/;

    if (!re.test(input.value.trim())) {
        showError(input, "email is not valid");
    } else {
        showSuccess(input);
    }
};

const checkMatchPasswords = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        //     showSuccess(pass2);
        // } else {
        showError(pass2, "passwords must match");
    }
};

// Form event listener
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([username, password, password2, email]);

    checkLength(username, 3, 8);
    checkLength(password, 8, 20);
    checkLength(password2, 8, 20);
    checkEmail(email);
    checkMatchPasswords(password, password2);
});