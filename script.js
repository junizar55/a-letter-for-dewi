// ======== ISI SURAT DIBAGI 2 HALAMAN ========
// Kamu bisa atur pembagian paragrafnya sesuai selera.

const PART1 = `Selamat Valentine, Dewi.

Kalau suatu sore nanti hujan reda, aku ingin mengajakmu keluar rumah. Kita tidak perlu pergi jauh. Cukup berjalan berdua, menyusuri jalan yang biasa, lalu berhenti sebentar membeli sesuatu yang manis. Biar sederhana. Biar tidak mewah. Tapi nyata.

Aku suka membayangkan hal-hal kecil seperti itu, karena di situlah aku paling merasa dekat denganmu. Di langkah yang sejajar. Di tawa yang tidak dibuat-buat. Di caramu menikmati manis seperti menemukan alasan baru untuk tetap lembut pada hidup.

Kalau hujan turun lagi, tidak apa. Kita bisa tetap berjalan pelan, membiarkan rintik menempel sebentar, lalu saling menertawakan hal-hal sepele. Aku ingin momen seperti itu tersimpan rapi, bukan sebagai kenangan yang jauh, tapi sebagai kebiasaan yang kita rawat.

Akhir-akhir ini aku sering menemukan kamu di hal-hal yang sunyi. Di sela ramai yang tiba-tiba terasa kosong. Di lagu yang terdengar biasa, tapi mendadak terasa seperti mengingatkan. Di kalimat-kalimat yang tidak jadi kukirim, karena aku ingin memilih waktu yang tepat agar kamu tidak hanya membaca, tapi benar-benar merasa.`;


const PART2 = `Aku tidak tahu bagaimana hari-harimu belakangan ini. Tapi aku ingin kamu tahu, kamu tidak perlu jadi kuat terus. Kamu boleh lelah. Kamu boleh diam. Kamu boleh manja sebentar. Dan kamu tetap pantas dicintai dengan tenang, bukan dengan ragu.

Aku ingin mengenalmu lagi, Dewi. Dengan cara yang lebih sabar. Lebih hadir. Lebih bertanggung jawab. Aku ingin jadi tempatmu pulang, bukan tempatmu menebak-nebak.

Selamat Valentine, sayang.

Kalau cinta itu perjalanan, aku tidak minta jalannya selalu mudah. Aku cuma ingin kita tetap berjalan. Pelan-pelan, tapi saling menjaga. Dan suatu hari nanti, ketika kita menoleh ke belakang, kita bisa tersenyum dan tahu bahwa yang kita rawat ini benar-benar berhasil.
-jun`;


// ======== LOGIC ========
let started = false;
let isMuted = true;

const hero = document.getElementById("hero");
const readBtn = document.getElementById("readBtn");

const lettersBox = document.getElementById("letterBox");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const typed1 = document.getElementById("typedText1");
const typed2 = document.getElementById("typedText2");

const bgm = document.getElementById("bgm");
const soundBtn = document.getElementById("soundBtn");
const signature = document.getElementById("signature");

function updateSoundIcon(){
  soundBtn.textContent = isMuted ? "🔇" : "🔈";
}
updateSoundIcon();

soundBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  if (bgm) bgm.muted = isMuted;
  updateSoundIcon();
});

function typeText(targetEl, text, speed, onDone){
  let i = 0;
  targetEl.textContent = "";

  function tick(){
    targetEl.textContent += text.charAt(i);
    i++;
    if (i < text.length) setTimeout(tick, speed);
    else onDone?.();
  }
  tick();
}

readBtn.addEventListener("click", () => {
  if (started) return;
  started = true;

  // start music (user interaction)
  if (bgm) {
    bgm.volume = 0.35;
    bgm.muted = false;
    isMuted = false;
    updateSoundIcon();

    bgm.play().catch(() => {
      bgm.muted = true;
      isMuted = true;
      updateSoundIcon();
    });
  }

  // hide hero
  hero.style.transition = "opacity .6s ease, transform .6s ease";
  hero.style.opacity = "0";
  hero.style.transform = "translateY(8px)";

  setTimeout(() => {
    hero.style.display = "none";

    // show letters
    lettersBox.style.display = "flex";
    page2.style.display = "none";
    if (signature) signature.classList.remove("show");

    const speed = 20;

    // page 1 -> page 2 -> signature
    typeText(typed1, PART1, speed, () => {
      page2.style.display = "block";
      typeText(typed2, PART2, speed, () => {
        if (signature) signature.classList.add("show");
      });
    });
  }, 650);
});
