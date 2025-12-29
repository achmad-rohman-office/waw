// Ambil elemen karakter dari DOM
const character = document.getElementById('character');

// Variabel untuk gerakan
let isMoving = false; // Flag untuk mengecek apakah sedang bergerak
let targetX = 50; // Target posisi X awal
let targetY = 50; // Target posisi Y awal
let currentX = 50; // Posisi X saat ini
let currentY = 50; // Posisi Y saat ini
const speed = 0.05; // Kecepatan gerakan (0-1, lebih kecil = lebih halus)

// Fungsi untuk mendapatkan batas layar (responsif)
function getScreenBounds() {
    return {
        width: window.innerWidth - 100, // Kurangi ukuran karakter agar tidak keluar
        height: window.innerHeight - 100
    };
}

// Fungsi animasi gerakan menggunakan requestAnimationFrame untuk smoothness
function animate() {
    if (!isMoving) return; // Jika tidak bergerak, stop animasi
    
    // Hitung perbedaan posisi
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    
    // Update posisi dengan easing (ease-out effect)
    currentX += dx * speed;
    currentY += dy * speed;
    
    // Terapkan posisi ke elemen (dengan sedikit bounce effect via transform)
    character.style.left = currentX + 'px';
    character.style.top = currentY + 'px';
    character.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`; // Bounce kecil
    
    // Jika sudah dekat target, stop gerakan
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
        isMoving = false;
        character.style.transform = 'translate(0, 0)'; // Reset transform
    }
    
    // Loop animasi
    requestAnimationFrame(animate);
}

// Event listener untuk klik: gerak ke posisi acak
character.addEventListener('click', () => {
    const bounds = getScreenBounds();
    // Posisi acak dalam batas layar
    targetX = Math.random() * bounds.width;
    targetY = Math.random() * bounds.height;
    isMoving = true; // Mulai gerakan
    animate(); // Jalankan animasi
});

// Event listener untuk double klik: berhenti
character.addEventListener('dblclick', () => {
    isMoving = false; // Stop gerakan
});

// Event listener untuk resize window: update batas (responsivitas)
window.addEventListener('resize', () => {
    // Jika sedang bergerak, pastikan target tetap dalam batas baru
    const bounds = getScreenBounds();
    if (targetX > bounds.width) targetX = bounds.width;
    if (targetY > bounds.height) targetY = bounds.height;
});