const form = document.getElementById('dynamic_Form');
const inputContainer = document.getElementById('inputContainer');
const addFieldButton = document.getElementById('addFieldButton');
const submitButton = document.getElementById('submitButton');
const customAlert = document.getElementById('customAlert');

let timeoutId;

// Create new Input Field
function createInputField() {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter what you want';
    inputField.addEventListener('input', handleInputValidation);
    inputField.addEventListener('blur', () => startRemovalTimer(inputField));
    inputContainer.appendChild(inputField);
}


function handleInputValidation() {
    if (this.value.trim() === '') {
        this.style.borderColor = 'red';
    } else {
        this.style.borderColor = 'green';
    }
}


function startRemovalTimer(inputField) {
    clearTimeout(timeoutId);
    if (inputField.value.trim() === '') {
        timeoutId = setTimeout(() => {
            inputField.remove();
        }, 10000);
    }
}

// Add a new field when the button is clicked
addFieldButton.addEventListener('click', createInputField);

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = Array.from(inputContainer.getElementsByTagName('input'));
    const allValid = inputs.every(input => input.value.trim() !== '');

    if (allValid) {
        customAlert.classList.remove('hidden');
        setTimeout(() => {
            customAlert.classList.add('hidden');
            // Clear inputs if needed
            inputs.forEach(input => input.value = '');
        }, 2000);
    } else {
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'red';
            }
        });
    }
});
