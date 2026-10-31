// craftex-connector.js

function onScanSuccess(decodedText, decodedResult) {
    // Reproducir vibración de éxito si está disponible
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }

    // Actualizar estado en pantalla
    const statusBox = document.getElementById('status-box');
    statusBox.innerText = `Found: ${decodedText}. Opening Craftex...`;

    console.log(`Scanned barcode: ${decodedText}`, decodedResult);

    // Opcional: Detener el escáner al encontrar el código
    html5QrCode.stop().then(() => {
        // Redirigir a la búsqueda oficial de Craftex usando el código escaneado
        const craftexSearchUrl = `https://www.craftex.com/catalogsearch/result/?q=${encodeURIComponent(decodedText)}`;
        window.location.href = craftexSearchUrl;
    }).catch(err => {
        console.error("Failed to stop scanner.", err);
    });
}

function onScanFailure(error) {
    // Ignorar errores de escaneo continuo mientras busca enfocar
}

// Inicializar el escáner al cargar la página
const html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: { width: 200, height: 100 } };

// Forzar el uso exclusivo de la cámara trasera ('environment')
html5QrCode.start(
    { facingMode: "environment" }, 
    config, 
    onScanSuccess, 
    onScanFailure
).catch((err) => {
    console.error("Error starting the rear camera: ", err);
    document.getElementById('status-box').innerText = "Error: Could not access the rear camera.";
});
