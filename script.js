const startbtn = document.getElementById("startBtn");
const queContainer = document.getElementById("queContainer");
const questionElem = document.getElementById("question");
const ansButtons = document.getElementById("ansButtons");
const nextButton = document.getElementById('NextBtn')
let shuffledQuestions, currentQuestionIndex;

startbtn.addEventListener("click", startGame);
function startGame() {
  startbtn.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  queContainer.classList.remove("hide");
  setNextQuestion();
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })
  

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElem.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        ansButtons.appendChild(button)
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while(ansButtons.firstChild){
        ansButtons.removeChild(ansButtons.firstChild)
    }
}
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(ansButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex+1)
    nextButton.classList.remove('hide');
else{
    startbtn.innerText = 'Restart'
    startbtn.classList.remove('hide')
}
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
  {
    question: "What is 4+4 ? ",
    answers: [
      { text: "4", correct: false },
      { text: "8", correct: true },
      { text: "16", correct: false },
      { text: "44", correct: false },
    ],
  },
  {
    question: "Which one is not a Keyword in Java  ? ",
    answers: [
      { text: "if", correct: false },
      { text: "break", correct: false },
      { text: "let", correct: true },
      { text: "while", correct: false },
    ],
  },
  {
  question: "If the simple interest for 6 years be equal to 30% of the principal, it will be equal to the principal after ? ",
    answers: [
      { text: "20", correct: true },
      { text: "30", correct: false },
      { text: "10", correct: false},
      { text: "22", correct: false },
    ],
  }
];
