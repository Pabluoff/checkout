function selectPaymentMethod(method) {
    if (method === 'card') {
        document.getElementById('card-section').style.display = 'block';
        document.getElementById('pix-section').style.display = 'none';
    } else if (method === 'pix') {
        document.getElementById('card-section').style.display = 'none';
        document.getElementById('pix-section').style.display = 'block';
    }
}
