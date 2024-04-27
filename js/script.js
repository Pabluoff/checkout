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

    if (method === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const cvv = document.getElementById('cvv').value;
        if (!cardNumber || !expirationDate || !cvv) {
            highlightEmptyInputs('card');
            return;
        }
    } else if (method === 'pix') {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirm-email').value;
        const phone = document.getElementById('phone').value;
        const cpf = document.getElementById('cpf').value;
        if (!fullname || !email || !confirmEmail || !phone || !cpf) {
            highlightEmptyInputs('pix');
            return;
        }
    }

    document.getElementById('payment-success').style.display = 'block';
});

function highlightEmptyInputs(method) {
    const inputsToCheck = method === 'card' ?
        ['card-number', 'expiration-date', 'cvv', 'fullname', 'email', 'confirm-email', 'phone', 'cpf',] :
        ['fullname', 'email', 'confirm-email', 'phone', 'cpf'];

    inputsToCheck.forEach(inputId => {
        const inputElement = document.getElementById(inputId);
        if (!inputElement.value) {
            inputElement.style.borderColor = 'red';
        } else {
            inputElement.style.borderColor = ''; // Resetar a cor da borda
        }
    });
}
