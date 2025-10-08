// Fixed script.js for M-Tag_Scanner
// Perbaikan utama:
// 1. Validasi semua elemen DOM yang digunakan (menghindari error jika elemen null)
// 2. Memperbaiki teks pesan yang terpotong dan menambahkan log konsol untuk debugging
// 3. Membuat fungsi yang lebih jelas dan modular (generateSimulatedCode, simulateScan, displayResult)
// 4. Menambahkan fallback ketika semua elemen tidak tersedia

// SIMULASI DATA CHIP
const VALID_CHIPS = [
    { code: "MTG-2025-AX7B", brand: "Urban Threads", model: "Jaket Bomber Edisi Terbatas", status: "authentic" },
    { code: "MTG-2025-1C9K", brand: "Aura Bag", model: "Tas Selempang Kulit", status: "authentic" }
];

// Pastikan semua kode dijalankan setelah DOM (HTML) dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen DOM
    const scanScreen = document.getElementById('scan-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const resultScreen = document.getElementById('result-screen');
    const startScanBtn = document.getElementById('start-scan-btn');
    const scanAgainBtn = document.getElementById('scan-again-btn');

    // Elemen di layar hasil
    const iconContainer = document.getElementById('result-icon-container');
    const headline = document.getElementById('result-headline');
    const message = document.getElementById('result-message');
    const details = document.getElementById('product-details');

    // Cek keberadaan elemen penting
    const missing = [];
    if (!scanScreen) missing.push('scan-screen');
    if (!loadingScreen) missing.push('loading-screen');
    if (!resultScreen) missing.push('result-screen');
    if (!startScanBtn) missing.push('start-scan-btn');
    if (!scanAgainBtn) missing.push('scan-again-btn');
    if (!iconContainer) missing.push('result-icon-container');
    if (!headline) missing.push('result-headline');
    if (!message) missing.push('result-message');
    if (!details) missing.push('product-details');

    if (missing.length) {
        console.error('Elemen HTML tidak ditemukan:', missing.join(', '));
        // Jika elemen esensial tidak ada, hentikan eksekusi agar tidak menyebabkan error runtime
        return;
    }

    // Fungsi untuk beralih antar tampilan
    function switchScreen(activeScreen) {
        // matikan semua
        [scanScreen, loadingScreen, resultScreen].forEach(s => s.classList.remove('active'));
        // aktifkan yang diminta jika ada
        if (activeScreen && activeScreen.classList) activeScreen.classList.add('active');
    }

    // Fungsi untuk menghasilkan kode simulasi
    function generateSimulatedCode() {
        // 60% kemungkinan ASLI, 40% PALSU
        const authenticityChance = Math.random();

        if (authenticityChance < 0.5) {
            const randomIndex = Math.floor(Math.random() * VALID_CHIPS.length);
            return VALID_CHIPS[randomIndex].code;
        } else {
            return 'MTG-FAKE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        }
    }

    // Fungsi simulasi pemindaian
    function simulateScan() {
        console.log('Mulai simulasi scan...');
        switchScreen(loadingScreen);

        // Simulasi waktu verifikasi (3 detik)
        setTimeout(() => {
            const scannedCode = generateSimulatedCode();
            console.log('Kode ter-scan:', scannedCode);
            const productData = VALID_CHIPS.find(p => p.code === scannedCode) || null;
            displayResult(productData, scannedCode);
        }, 3000);
    }

    // Fungsi untuk menampilkan hasil
    function displayResult(data, code) {
        // Reset hasil sebelumnya
        resultScreen.classList.remove('result-authentic', 'result-counterfeit');
        iconContainer.innerHTML = '';
        details.style.display = 'none';

        if (data && data.status === 'authentic') {
            resultScreen.classList.add('result-authentic');
            iconContainer.innerHTML = '<span class="material-symbols-outlined">check_circle</span>';
            headline.textContent = 'PRODUK ASLI TERVERIFIKASI';
            message.textContent = 'Chip M-TAG terdaftar dan sesuai dengan data brand. Selamat, produk Anda 100% asli!';

            document.getElementById('brand-name').textContent = data.brand || 'Tidak tersedia';
            document.getElementById('product-model').textContent = data.model || 'Tidak tersedia';
            document.getElementById('verification-code').textContent = data.code || code;
            details.style.display = 'block';
        } else {
            resultScreen.classList.add('result-counterfeit');
            iconContainer.innerHTML = '<span class="material-symbols-outlined">cancel</span>';
            headline.textContent = 'PERINGATAN: CHIP TIDAK VALID';
            // Perbaikan teks pesan yang terpotong
            message.textContent = 'Kode chip tidak terdaftar pada database kami. Kemungkinan produk ini adalah tiruan. Hubungi customer service brand terkait untuk verifikasi lebih lanjut.';

            document.getElementById('brand-name').textContent = 'Tidak diketahui';
            document.getElementById('product-model').textContent = 'Tidak diketahui';
            document.getElementById('verification-code').textContent = code;
            details.style.display = 'block';
        }

        switchScreen(resultScreen);
    }

    // Pasang event listener dengan pemeriksaan
    startScanBtn.addEventListener('click', simulateScan);
    scanAgainBtn.addEventListener('click', () => switchScreen(scanScreen));

    // Inisialisasi: tampilkan layar scan
    switchScreen(scanScreen);

});
