document.getElementById('encryptForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    const password = document.getElementById('encryptPassword').value;

    const reader = new FileReader();
    reader.onload = function () {
        const base64Image = reader.result.split(',')[1];
        const encrypted = CryptoJS.AES.encrypt(base64Image, password).toString();

        const blob = new Blob([encrypted], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'encrypted_image.txt';
        link.click();
    };
    reader.readAsDataURL(file);
});