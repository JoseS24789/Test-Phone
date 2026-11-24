// craftex-connector.js

function onScanSuccess(decodedText, decodedResult) {
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    const statusBox = document.getElementById('status-box');
    statusBox.innerText = `Found: ${decodedText}. Opening Craftex...`;

    console.log(`Scanned barcode: ${decodedText}`, decodedResult);

    html5QrCode.stop().then(() => {
        const craftexSearchUrl = `https://www.craftex.com/catalogsearch/result/?q=${encodeURIComponent(decodedText)}`;
        window.location.href = craftexSearchUrl;
    }).catch(err => {
        console.error("Failed to stop scanner.", err);
    });
}

function onScanFailure(error) {
}

const html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: { width: 200, height: 100 } };

html5QrCode.start(
    { facingMode: "environment" }, 
    config, 
    onScanSuccess, 
    onScanFailure
).catch((err) => {
    console.error("Error starting the rear camera: ", err);
    document.getElementById('status-box').innerText = "Error: Could not access the rear camera.";
});
