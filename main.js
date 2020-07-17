const question = document.querySelector("h3");
const answers = document.querySelectorAll(".answer")
const answersBody = document.querySelectorAll(".answer-body");
const progres = document.querySelector(".progress-bar");
const s = document.querySelector(".score");
const current = document.querySelector(".current");
const total = document.querySelector(".total");
const totalS = document.querySelector(".totalS");
// Modal selection
const modal = document.querySelector(".modal");
const ol = document.querySelector("ol");

let curI = 0;
let score = 0;
//to store answered worng or correct to display in modal
let a = Array(questions.length).fill(null);
total.innerText = questions.length;
totalS.innerText = questions.length * 10;

const handleModal = () => {
    modal.style.display = "block";
    for(let i = 0; i<a.length; i++){
        const line = document.createElement("li");
        if(a[i]) {
            line.classList.add("correct-modal");
            line.innerText = "Correct"
        } else {
            let answerNum = questions[i]["correct"];
            let a = questions[i][String(answerNum)];
            line.classList.add("wrong-modal")
            line.innerText = `Wrong, Corret answer is ${a}`
        }
        ol.appendChild(line);
    }
}
const updateHeader = () => {
    if(curI < questions.length){
        current.innerText = curI + 1;
    } else {
        current.innerText = "Finished";
    }
    s.innerText = score;
    const percent = (curI / questions.length) * 100;
    console.log(percent);
    progres.style.width = `${percent}%`;
}

const loadQuestion = () => {
    const curQ = questions[curI];
    question.innerText = curQ.q;
    answersBody.forEach((a, i) => {
        a.innerText = curQ[String(i)];
    })
}

const check = function(i){
    // Remove event listeners until next question appear
    answers.forEach(a => a.classList.add("disabled"));
    // Number of chosen answer
    const val = i;
    // Number of correct answer
    const correct = questions[curI].correct;
    // Go to next question
    curI++
    if(val == correct){
        score += 10;
        a[curI-1] = true;
        this.classList.add("correct");
        setTimeout(() => this.classList.remove("correct"), 1000);
    } else {
        a[curI-1] = false;
        this.classList.add("wrong");
        setTimeout(() => this.classList.remove("wrong"), 1000);
    }
    updateHeader();
    if(curI < questions.length ){
        setTimeout(() => {
            answers.forEach(a => a.classList.remove("disabled"));
            loadQuestion();
        }, 2000)
    } else {
        setTimeout(() => {
            handleModal()
        }, 2000)
    }
}
loadQuestion();
updateHeader();

for(let i = 0; i < answers.length; i++){
    answers[i].addEventListener("click", check.bind(answers[i], i));
}
window.addEventListener("click", ({target}) => {
    if(target !== modal){
        modal.style.display = "none";
    }
})