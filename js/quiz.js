const quizData = [
    {
        question: "Bagaimana pelafalan ini?",
        image: "assets/quiz/aksara-batak-a.png",
        options: ["A", "Ha", "Na", "Pa", "U", "Ba", "Nga", "Sa", "Wa", "Ra"],
        answer: "A"
    },
    {
        question: "Soal kedua nih, Bagaimana pelafalan ini?",
        image: "assets/quiz/aksara-batak-ha.png",
        options: ["Ha", "A", "Pa", "U", "Na", "Ba", "Nga", "Sa", "Wa", "Ra"],
        answer: "Ha"
    },
    {
        question: "Sudah sampai soal 3, Bagaimana pelafalan ini?",
        image: "assets/quiz/aksara-batak-na.png",
        options: ["Na", "Ha", "Pa", "U", "A", "Ba", "Nga", "Sa", "Wa", "Ra"],
        answer: "Na"
    },
    {
        question: "Dikit lagi sudah di soal 4, Bagaimana pelafalan ini?",
        image: "assets/quiz/aksara-batak-pa.png",
        options: ["Pa", "Na", "Ha", "U", "A", "Ba", "Nga", "Sa", "Wa", "Ra"],
        answer: "Pa"
    },
    {
        question: "Satu soal lagi, Semannggat! Bagaimana pelafalan ini?",
        image: "assets/quiz/aksara-batak-u.png",
        options: ["U", "Pa", "Na", "Ha", "A", "Ba", "Nga", "Sa", "Wa", "Ra"],
        answer: "U"
    }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

const quizContainer = document.querySelector(".quiz-container");
const initialQuizHTML = quizContainer.innerHTML; // simpan HTML awal (background putih aman)

let questionEl = document.getElementById("question");
let imageEl = document.getElementById("quiz-image");
let answersEl = document.getElementById("answer-options");
let sendBtn = document.getElementById("sendBtn");

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    imageEl.src = q.image;
    answersEl.innerHTML = "";

    // acak jawaban
    const shuffledOptions = shuffleArray([...q.options]);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("div");
        btn.classList.add("answer-option");
        btn.textContent = option;
        btn.addEventListener("click", () => {
            document.querySelectorAll(".answer-option").forEach(el => el.classList.remove("selected"));
            btn.classList.add("selected");
            selectedAnswer = option;
        });
        answersEl.appendChild(btn);
    });

}
function handleSend() {
    if (!selectedAnswer) {
        // Belum pilih jawaban
        showNotification("Pilih jawaban dulu!", "warning");
        return;
    }

    if (selectedAnswer === quizData[currentQuestion].answer) {
        // Benar
        score++;
        showNotification("Jawaban benar!", "correct");
        currentQuestion++;
    } else {
        // Salah
        showNotification("Jawaban salah!", "wrong");
    }
}



function showResultScreen() {
    quizContainer.innerHTML = `
        <div class="result-screen">
            <h2>🎉 Yey! Kamu sudah menyelesaikan semua!</h2>
            <p>Skor kamu: ${score} / ${quizData.length}</p>
            <button class="back-btn">⬅ Kembali ke Halaman Utama</button>
            <button class="retry-btn">🔄 Main Lagi</button>
        </div>
    `;

    document.querySelector(".back-btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.querySelector(".retry-btn").addEventListener("click", () => {
        restartQuiz();
    });
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    quizContainer.innerHTML = initialQuizHTML; // kembalikan ke tampilan awal

    // rebind element
    questionEl = document.getElementById("question");
    imageEl = document.getElementById("quiz-image");
    answersEl = document.getElementById("answer-options");
    sendBtn = document.getElementById("sendBtn");

    sendBtn.addEventListener("click", handleSend);
    loadQuestion();
}

// Notifikasi
const notifBox = document.getElementById("notification");
const notifMsg = document.getElementById("notif-message");
const notifClose = document.getElementById("notif-close");
const notifIcon = document.getElementById("notif-icon");

function showNotification(message, type) {
    notifMsg.textContent = message;
    notifBox.classList.remove("hidden", "correct", "wrong", "warning");
    notifBox.classList.add(type);

    // Set icon & teks tombol sesuai type
    if (type === "correct") {
        notifIcon.src = "assets/icons/icon-true.svg";
        notifClose.textContent = "Lanjut";
    } else if (type === "wrong") {
        notifIcon.src = "assets/icons/icon-wrong.svg";
        notifClose.textContent = "Ulangi";
    } else if (type === "warning") {
        notifIcon.src = "assets/icons/icon-repeat.svg";
        notifClose.textContent = "Oke";
    }
}

notifClose.addEventListener("click", () => {
    notifBox.classList.add("hidden");

    if (currentQuestion < quizData.length) {
        selectedAnswer = null;
        loadQuestion();
    } else {
        showResultScreen();
    }
});


// Bind pertama kali
sendBtn.addEventListener("click", handleSend);
loadQuestion();
