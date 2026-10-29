
function hitungStatistika() {
    const input = document.getElementById("dataAngka").value.trim();
    const hasil = document.getElementById("hasil");

    // Memeriksa input
    const bagianData = input.split(",").map(x => x.trim());

    if (
        input === "" ||
        bagianData.some(x => x === "" || !Number.isFinite(Number(x)))
    ) {
        hasil.innerHTML = "<p>Masukkan angka yang benar dan pisahkan dengan koma!</p>";
        return;
    }

    // Mengubah input menjadi angka
    const data = bagianData.map(Number);

    // Mengurutkan data
    data.sort((a, b) => a - b);

    // Menghitung mean
    const jumlah = data.reduce((total, angka) => total + angka, 0);
    const mean = jumlah / data.length;

    // Menghitung median
    const tengah = Math.floor(data.length / 2);
    let median;

    if (data.length % 2 === 0) {
        median = (data[tengah - 1] + data[tengah]) / 2;
    } else {
        median = data[tengah];
    }

    // Menghitung modus
    const frekuensi = {};

    data.forEach(angka => {
        frekuensi[angka] = (frekuensi[angka] || 0) + 1;
    });

    const frekuensiTertinggi = Math.max(...Object.values(frekuensi));

    const daftarModus = Object.keys(frekuensi)
        .filter(angka => frekuensi[angka] === frekuensiTertinggi);

    let modus;

    if (frekuensiTertinggi === 1) {
        modus = "Tidak ada modus";
    } else {
        modus = daftarModus.join(", ");
    }

    // Menampilkan hasil
    hasil.innerHTML = `
        <h3>Hasil Perhitungan</h3>
        <p><b>Data terurut:</b> ${data.join(", ")}</p>
        <p><b>Banyak data:</b> ${data.length}</p>
        <p><b>Mean:</b> ${mean.toFixed(2)}</p>
        <p><b>Median:</b> ${median}</p>
        <p><b>Modus:</b> ${modus}</p>
    `;
}
