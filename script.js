
document.getElementById("eksplorasi").innerHTML = `
    <h2>Eksplorasi Data</h2>
    <p>Masukkan beberapa angka dan pisahkan dengan tanda koma.</p>

    <input type="text" id="dataAngka"
    placeholder="Contoh: 70, 80, 75, 90, 80">

    <button onclick="hitungStatistika()">
        Hitung Statistik
    </button>

    <div id="hasil"></div>
`;

function hitungStatistika() {
    const input = document.getElementById("dataAngka").value.trim();
    const hasil = document.getElementById("hasil");

    const bagianData = input.split(",").map(x => x.trim());

    if (input === "" || bagianData.some(
        x => x === "" || !Number.isFinite(Number(x))
    )) {
        hasil.innerHTML = "<p>Masukkan angka dengan benar!</p>";
        return;
    }

    const data = bagianData.map(Number);
    data.sort((a, b) => a - b);

    const jumlah = data.reduce((total, angka) => total + angka, 0);
    const mean = jumlah / data.length;

    const tengah = Math.floor(data.length / 2);
    let median;

    if (data.length % 2 === 0) {
        median = (data[tengah - 1] + data[tengah]) / 2;
    } else {
        median = data[tengah];
    }

    const frekuensi = {};

    data.forEach(angka => {
        frekuensi[angka] = (frekuensi[angka] || 0) + 1;
    });

    const frekuensiTertinggi = Math.max(...Object.values(frekuensi));

    const daftarModus = Object.keys(frekuensi)
        .filter(angka => frekuensi[angka] === frekuensiTertinggi);

    const modus = frekuensiTertinggi === 1
        ? "Tidak ada modus"
        : daftarModus.join(", ");

    hasil.innerHTML = `
        <h3>Hasil Perhitungan</h3>
        <p>Data terurut: ${data.join(", ")}</p>
        <p>Banyak data: ${data.length}</p>
        <p>Mean: ${mean.toFixed(2)}</p>
        <p>Median: ${median}</p>
        <p>Modus: ${modus}</p>
    `;
}
