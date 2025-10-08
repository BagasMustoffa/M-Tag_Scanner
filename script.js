// SIMULASI DATA CHIP
// Array untuk mensimulasikan data dari server (hanya 2 item yang ASLI, sisanya dianggap PALSU/Belum Terdaftar)
const VALID_CHIPS = [
    { code: "MTG-2025-AX7B", brand: "Urban Threads", model: "Jaket Bomber Edisi Terbatas", status: "authentic" },
    { code: "MTG-2025-1C9K", brand: "Aura Bag", model: "Tas Selempang Kulit", status: "authentic" }
];

// Elemen DOM
const scanScreen = document.getElementById('scan-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const startScanBtn = document.getElementById('start-scan-btn');
const scanAgainBtn = document.getElementById('scan-again-btn');

// Fungsi untuk beralih antar tampilan
function switchScreen(activeScreen) {
    scanScreen.classList.remove('active');
    loadingScreen.classList.remove('active');
    resultScreen.classList.remove('active');

    activeScreen.classList.add('active');
}

// Fungsi utama simulasi pemindaian
function simulateScan() {
    // 1. Tampilkan layar loading
    switchScreen(loadingScreen);

    // 2. Simulasi proses pemindaian (3 detik)
    setTimeout(() => {
        // Logika sederhana: Menghasilkan kode chip simulasi (asumsi pembaca RFID membaca kode)
        const scannedCode = generateSimulatedCode();
        
        // Cek keaslian
        const productData = VALID_CHIPS.find(p => p.code === scannedCode);
        
        displayResult(productData, scannedCode);
        
    }, 3000); // Penundaan 3 detik untuk simulasi loading
}

// Fungsi untuk menghasilkan kode simulasi
function generateSimulatedCode() {
    // 60% kemungkinan menghasilkan produk ASLI (dari 2 chip valid)
    // 40% kemungkinan menghasilkan produk PALSU (kode acak)
    const authenticityChance = Math.random();

    if (authenticityChance < 0.6) {
        // Pilih salah satu kode ASLI secara acak
        const randomIndex = Math.floor(Math.random() * VALID_CHIPS.length);
        return VALID_CHIPS[randomIndex].code;
    } else {
        // Hasilkan kode PALSU/Tidak Terdaftar
        return 'MTG-FAKE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }
}

// Fungsi untuk menampilkan hasil
function displayResult(data, code) {
    const iconContainer = document.getElementById('result-icon-container');
    const headline = document.getElementById('result-headline');
    const message = document.getElementById('result-message');
    const details = document.getElementById('product-details');

    // Reset tampilan
    resultScreen.classList.remove('result-authentic', 'result-counterfeit');
    iconContainer.innerHTML = '';
    details.style.display = 'none';

    if (data && data.status === "authentic") {
        // KASUS ASLI
        resultScreen.classList.add('result-authentic');
        iconContainer.innerHTML = '<span class="material-symbols-outlined">check_circle</span>';
        headline.textContent = 'PRODUK ASLI TERVERIFIKASI';
        message.textContent = 'Chip M-TAG terdaftar dan sesuai dengan data brand. Selamat, produk Anda 100% asli!';
        
        // Tampilkan Detail
        document.getElementById('brand-name').textContent = data.brand;
        document.getElementById('product-model').textContent = data.model;
        document.getElementById('verification-code').textContent = data.code;
        details.style.display = 'block';

    } else {
        // KASUS PALSU / TIDAK TERDAFTAR
        resultScreen.classList.add('result-counterfeit');
        iconContainer.innerHTML = '<span class="material-symbols-outlined">cancel</span>';
        headline.textContent = 'PERINGATAN: CHIP TIDAK VALID';
        message.textContent = 'Kode chip tidak terdaftar di sistem M-TAG, atau produk ini adalah tiruan. Hubungi customer service brand terkait.';
        
        // Tampilkan Kode yang dipindai
        document.getElementById('brand-name').textContent = 'Tidak diketahui';
        document.getElementById('product-model').textContent = 'Tidak diketahui';
        document.getElementById('verification-code').textContent = code;
        details.style.display = 'block';
    }

    // Tampilkan layar hasil
    switchScreen(resultScreen);
}

// EVENT LISTENERS
startScanBtn.addEventListener('click', simulateScan);
scanAgainBtn.addEventListener('click', () => {
    switchScreen(scanScreen);
});

// Inisialisasi: Pastikan dimulai dari layar scan
switchScreen(scanScreen);
// BARIS INI KOSONG (menghilangkan kurung kurawal ekstra)