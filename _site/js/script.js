function selectPaymentMethod(method) {
    const cardOption = document.getElementById('card-option');
    const pixOption = document.getElementById('pix-option');
    const checkoutForm = document.getElementById('checkout-form');

    if (method === 'card') {
        document.getElementById('card-section').style.display = 'block';
        document.getElementById('pix-section').style.display = 'none';
        cardOption.classList.add('selected');
        pixOption.classList.remove('selected');
    } else if (method === 'pix') {
        document.getElementById('card-section').style.display = 'none';
        document.getElementById('pix-section').style.display = 'block';
        cardOption.classList.remove('selected');
        pixOption.classList.add('selected');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    selectPaymentMethod('card');
});

document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const method = document.querySelector('.payment-option.selected').id.replace('-option', '');
    const cardSection = document.getElementById('card-section');
    const pixSection = document.getElementById('pix-section');
    let isValid = true;

    if (method === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const cvv = document.getElementById('cvv').value;

        // Verifica se os campos do cartão estão preenchidos e com borda verde
        if (!isValidInput('card-number') || !isValidInput('expiration-date') || !isValidInput('cvv')) {
            highlightEmptyInputs('card');
            isValid = false;
        }

        // Verifica os outros campos relevantes
        const otherFieldsValid = ['fullname', 'email', 'confirm-email', 'phone', 'cpf'].every(field => isValidInput(field));
        if (!otherFieldsValid) {
            highlightEmptyInputs('card');
            isValid = false;
        }
    } else if (method === 'pix') {
        // Verifica os campos relevantes para PIX
        const pixFieldsValid = ['fullname', 'email', 'confirm-email', 'phone', 'cpf'].every(field => isValidInput(field));
        if (!pixFieldsValid) {
            highlightEmptyInputs('pix');
            isValid = false;
        }
    }

    // Exibir payment-success apenas se o método de pagamento for PIX e todos os campos PIX estiverem preenchidos
    if (isValid && method === 'pix') {
        document.getElementById('payment-success').style.display = 'block';
    }

    // Exibir congratulations-page apenas se o método de pagamento for cartão e todos os campos cartão estiverem preenchidos
    if (isValid && method === 'card') {
        document.getElementById('congratulation-page').style.display = 'block';
    }
});

// Função para verificar se um input está preenchido e com borda verde
function isValidInput(inputId) {
    const inputElement = document.getElementById(inputId);
    return inputElement.value.trim() && inputElement.style.borderColor === 'green';
}

// Função para destacar inputs vazios ou inválidos
function highlightEmptyInputs(method) {
    const inputsToCheck = method === 'card' ?
        ['card-number', 'expiration-date', 'cvv', 'fullname', 'email', 'confirm-email', 'phone', 'cpf'] :
        ['fullname', 'email', 'confirm-email', 'phone', 'cpf'];

    inputsToCheck.forEach(inputId => {
        const inputElement = document.getElementById(inputId);
        if (!inputElement.value || inputElement.style.borderColor === 'red') {
            inputElement.style.borderColor = 'red';
        } else {
            inputElement.style.borderColor = 'green'; 
        }
    });
}

// Função para validar o nome completo
function validateFullName() {
    const fullnameInput = document.getElementById('fullname');
    const fullnameValue = fullnameInput.value.trim();

    // Verifica se o nome possui pelo menos 5 caracteres incluindo um espaço
    const isValid = fullnameValue.split(' ').length >= 2 && fullnameValue.length >= 5;
    if (isValid) {
        fullnameInput.style.borderColor = 'green';
    } else {
        fullnameInput.style.borderColor = 'red';
    }
}

// Função para validar o e-mail
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid = emailRegex.test(emailValue);
    if (isValid) {
        emailInput.style.borderColor = 'green';
    } else {
        emailInput.style.borderColor = 'red';
    }

    validateConfirmEmail();
}

function validateConfirmEmail() {
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirm-email');
    const confirmEmailValue = confirmEmailInput.value.trim();

    const isValid = emailInput.value === confirmEmailValue;
    if (isValid) {
        confirmEmailInput.style.borderColor = 'green';
    } else {
        confirmEmailInput.style.borderColor = 'red';
    }
}


function formatPhone() {
    const phoneInput = document.getElementById('phone');
    let phoneValue = phoneInput.value.trim();

    phoneValue = phoneValue.replace(/\D/g, '');

    if (phoneValue.length > 11) {
        phoneValue = phoneValue.slice(0, 11);
    }

    if (phoneValue.length > 2 && phoneValue.length <= 5) {
        phoneValue = phoneValue.replace(/^(\d{2})(\d{1,4})/, '($1) $2');
    } else if (phoneValue.length > 5 && phoneValue.length <= 9) {
        phoneValue = phoneValue.replace(/^(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    } else if (phoneValue.length > 9 && phoneValue.length <= 11) {
        phoneValue = phoneValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }

    phoneInput.value = phoneValue;

    const isValid = /^\(\d{2}\) \d{5}-\d{4}$/.test(phoneValue);
    if (isValid) {
        phoneInput.style.borderColor = 'green';
    } else {
        phoneInput.style.borderColor = 'red';
    }
}


// Função para validar o CPF
function validateCPF() {
    const cpfInput = document.getElementById('cpf');
    let cpfValue = cpfInput.value.trim();

    if (cpfValue.length > 14) {
        cpfValue = cpfValue.slice(0, 14);
        cpfInput.value = cpfValue;
    }

    cpfValue = cpfValue.replace(/\D/g, '');

    cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
    cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    cpfInput.value = cpfValue;

    const isValid = isValidCPF(cpfValue);
    if (isValid) {
        cpfInput.style.borderColor = 'green';
    } else {
        cpfInput.style.borderColor = 'red';
    }
}

// Função para validar o CPF usando o algoritmo do dígito verificador
function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11) return false;

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Função para formatar o número do cartão e validar
function formatCardNumber() {
    const cardNumberInput = document.getElementById('card-number');
    let cardNumberValue = cardNumberInput.value.trim();

    // Remove caracteres não numéricos
    cardNumberValue = cardNumberValue.replace(/\D/g, '');

    // Adiciona espaço a cada 4 dígitos
    cardNumberValue = cardNumberValue.replace(/(\d{4})/g, '$1 ').trim();

    cardNumberInput.value = cardNumberValue;

    // Verifica se o número do cartão é válido
    const isValid = /^\d{16}$/.test(cardNumberValue.replace(/\s/g, ''));
    if (isValid) {
        cardNumberInput.style.borderColor = 'green';
    } else {
        cardNumberInput.style.borderColor = 'red';
    }
}


// Função para formatar o CVV e validar
function formatCVV() {
    const cvvInput = document.getElementById('cvv');
    let cvvValue = cvvInput.value.trim();

    cvvValue = cvvValue.replace(/\D/g, '');

    if (cvvValue.length > 3) {
        cvvValue = cvvValue.slice(0, 3);
    }

    cvvInput.value = cvvValue;

    const isValid = cvvValue.length === 3;
    if (isValid) {
        cvvInput.style.borderColor = 'green';
    } else {
        cvvInput.style.borderColor = 'red';
    }
}

// Função para formatar a data e validar
function formatExpirationDate() {
    const expirationDateInput = document.getElementById('expiration-date');
    let expirationDateValue = expirationDateInput.value.trim();

    expirationDateValue = expirationDateValue.replace(/\D/g, '');

    if (expirationDateValue.length > 6) {
        expirationDateValue = expirationDateValue.slice(0, 6);
    }

    if (expirationDateValue.length > 2) {
        expirationDateValue = expirationDateValue.replace(/^(\d{2})(\d{0,4})/, '$1/$2');
    }

    expirationDateInput.value = expirationDateValue;

    const isValid = isValidExpirationDate(expirationDateValue);
    if (isValid) {
        expirationDateInput.style.borderColor = 'green';
    } else {
        expirationDateInput.style.borderColor = 'red';
    }
}

function isValidExpirationDate(date) {
    const parts = date.split('/');
    if (parts.length !== 2) return false;

    const month = parseInt(parts[0]);
    const year = parseInt(parts[1]);

    const currentYear = new Date().getFullYear() % 100; 
    return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= new Date().getMonth() + 1));
}

document.getElementById('expiration-date').addEventListener('input', formatExpirationDate);
document.getElementById('fullname').addEventListener('input', validateFullName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('confirm-email').addEventListener('input', validateConfirmEmail);
document.getElementById('phone').addEventListener('input', formatPhone);
document.getElementById('cpf').addEventListener('input', validateCPF);
document.getElementById('card-number').addEventListener('input', formatCardNumber);
document.getElementById('cvv').addEventListener('input', formatCVV);


// Atualizar e-mail exibido na página de congratulação
function updateEmail(email) {
    const emailSpan = document.getElementById('user-email');
    emailSpan.textContent = email;
}

// Chamar a função updateEmail com o e-mail inserido
document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    updateEmail(email);
});
