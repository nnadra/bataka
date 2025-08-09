const quizData = [
    {
        question: "Bagaimana pelafalan ini?",
        image: "assets/aksara-batak-u.png",
        options: ["hello", "Ba", "U", "Nga", "Sa", "Pa", "Na", "Wa", "Da", "Ra"],
        answer: "U"
    },
    {
        question: "Apa pelafalan huruf ini?",
        image: "assets/aksara-batak-ba.png",
        options: ["Ba", "Na", "U", "Ra", "Sa", "Pa", "Nga", "Wa", "Da", "hello"],
        answer: "Ba"
    }
];

let currentQuestion = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const imageEl = document.getElementById("quiz-image");
const answersEl = document.getElementById("answer-options");
const sendBtn = document.getElementById("sendBtn");

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    imageEl.src = q.image;
    answersEl.innerHTML = "";

    q.options.forEach(option => {
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

const notifBox = document.getElementById("notification");
const notifMsg = document.getElementById("notif-message");
const notifClose = document.getElementById("notif-close");

function showNotification(message, type) {
    notifMsg.textContent = message;
    notifBox.classList.remove("hidden", "correct", "wrong");
    notifBox.classList.add(type);
}

notifClose.addEventListener("click", () => {
    notifBox.classList.add("hidden");
    if (currentQuestion < quizData.length) {
        selectedAnswer = null;
        loadQuestion();
    }
});

sendBtn.addEventListener("click", () => {
    if (!selectedAnswer) {
        showNotification("Pilih jawaban dulu!", "wrong");
        return;
    }
    if (selectedAnswer === quizData[currentQuestion].answer) {
        showNotification("Jawaban benar!", "correct");
        currentQuestion++;
    } else {
        showNotification("Jawaban salah, coba lagi!", "wrong");
    }
});


loadQuestion();
