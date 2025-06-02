const imageElem = document.getElementById('protectedImage');
const unlockBtn = document.getElementById('unlockButton');
const fileInput = document.getElementById('encryptedFileInput');

unlockBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload an encrypted .txt file.');
        return;
    }

    const password = prompt('Enter password to unlock image:');
    if (!password) return;

    const reader = new FileReader();
    reader.onload = function () {
        try {
            const encryptedData = reader.result;
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, password);
            const decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedBase64) {
                alert('Invalid password or corrupted data.');
                return;
            }

            imageElem.src = 'data:image/png;base64,' + decryptedBase64;
            imageElem.classList.remove('blurred');
            imageElem.classList.add('clear');
        } catch (err) {
            alert('Failed to decrypt image.');
        }
    };
    reader.readAsText(file);
});

const encryptSection = document.getElementById("encryptSection");
const decryptSection = document.getElementById("decryptSection");

document.getElementById("showEncryptBtn").addEventListener("click", () => {
  encryptSection.style.display = "block";
  decryptSection.style.display = "none";
});

document.getElementById("showDecryptBtn").addEventListener("click", () => {
  encryptSection.style.display = "none";
  decryptSection.style.display = "block";
});