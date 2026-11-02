// scanner.js

document.addEventListener("DOMContentLoaded", function () {
    const statusBox = document.getElementById('status-box');
    const panelContent = document.getElementById('panel-content');
    let lastScannedCode = "";
    let isProcessing = false;

    function onScanSuccess(decodedText, decodedResult) {
        let cleanCode = decodedText.trim();

        // Evitar lecturas duplicadas continuas del mismo código
        if (isProcessing || cleanCode === lastScannedCode) {
            return;
        }

        isProcessing = true;
        lastScannedCode = cleanCode;

        if (navigator.vibrate) navigator.vibrate(100);

        statusBox.style.color = "#27ae60";
        statusBox.innerHTML = `¡Código detectado: <b>${cleanCode}</b>!`;

        console.info("Código escaneado:", cleanCode);

        // URL de búsqueda directa en Craftex
        const craftexSearchUrl = `https://www.craftex.com/search?keywords=${encodeURIComponent(cleanCode)}`;

        // Actualizar la tarjeta inferior con el botón de acceso directo sin cerrar la cámara
        panelContent.innerHTML = `
            <div class="product-card">
                <div class="code-display">SKU / Código: ${cleanCode}</div>
                <a href="${craftexSearchUrl}" target="_blank" class="craftex-btn">Ver en Craftex 🔍</a>
            </div>
        `;

        // Permitir un nuevo escaneo tras 3 segundos
        setTimeout(() => {
            isProcessing = false;
            lastScannedCode = "";
        }, 3000);
    }

    function onScanFailure(error) {
        // Continuar escaneando de manera fluida
    }

    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 180, height: 90 } };

    // Iniciar la cámara trasera de manera fija y permanente en modo split
    html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        onScanSuccess, 
        onScanFailure
    ).catch((err) => {
        console.error("Error de cámara:", err);
        statusBox.style.color = "#e74c3c";
        statusBox.innerText = "Error: No se pudo acceder a la cámara.";
    });
});
