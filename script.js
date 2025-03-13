let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const imageElement = document.getElementById("question-image"); // Elemento para exibir a imagem
const scoreElement = document.getElementById("score");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    // Atualiza a imagem, se houver
    if (currentQuestion.image) {
        imageElement.src = currentQuestion.image;
        imageElement.style.display = "block"; // Mostra a imagem
    } else {
        imageElement.style.display = "none"; // Esconde a imagem se não houver
    }
    
    optionsElement.innerHTML = ""; // Limpa as opções anteriores
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => selectAnswer(option));
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    // Atualiza a pontuação se a resposta estiver correta
    if (isCorrect) {
        score++;
        scoreElement.textContent = `Pontuação: ${score} `;
        alert("Resposta correta!"); // Alerta que a resposta está correta
    } else {
        alert("Resposta incorreta.");
    }

    // Aguardar 2 segundos e carregar a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    questionElement.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    optionsElement.innerHTML = "";
    imageElement.style.display = "none"; // Esconde a imagem no final
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion(); // Carrega a primeira pergunta ao iniciar
});
