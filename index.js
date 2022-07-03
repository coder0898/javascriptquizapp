//getting all required buttons and so on.
const start_btn = document.querySelector(".start_btn");

const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .exit");
const conts = info_box.querySelector(".buttons .conts");

const quiz_box = document.querySelector(".quiz_box");
const option_list = quiz_box.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const time_line = document.querySelector("header .time_line");

const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


// if startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show info box
}
// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
}

//On continue
conts.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(widthValue);
}



let que_count = 0;
let que_num = 1;
let counter;
let timeVal = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeVal = 15; 
    que_count = 0;
    que_num = 1;
    userScore = 0;
    widthValue = 0;
    showQuetion(que_count); //calling showQestions function
    queCounter(que_num); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeVal); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = quiz_box.querySelector(".next_btn");

next_btn.onclick = () => {
    if (que_count < questions.length - 1 && que_num <= questions.length) {
        que_count++;
        que_num++;
        showQuestion(que_count);
        questionCounter(que_num);
        clearInterval(counter);
        clearInterval(counterLine); //clear counterLine
        startTimer(timeVal);
        startTimerLine(widthValue); //calling startTimerLine function
        next_btn.style.display = "none";
    } else {
        console.log("quiz compeleted!!!");
        showResultBoxconst();
    }
}

//getting quiz question from array
function showQuestion(index) {
    const ques_text = quiz_box.querySelector(".ques_text");


    let que_tag = `<span>${questions[index].numb}.${questions[index].question}</span>`;
    ques_text.innerHTML = que_tag;
    let opt_tag = ` <div class="option">${questions[index].options[0]}</div>
    <div class="option">${questions[index].options[1]}</div>
    <div class="option">${questions[index].options[2]}</div>
    <div class="option">${questions[index].options[3]}</div>`;
    option_list.innerHTML = opt_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i <= option.length - 1; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(ans) {
    clearInterval(counter);
    //   startTimer(timeVal);
    let userAns = ans.innerHTML;
    let correcAns = questions[que_count].answer;
    let Alloption = option_list.children.length;
    //   console.log(userAns);
    //   console.log(correcAns);
    //   console.log(userAns == correcAns)
    if (userAns == correcAns) {
        userScore+=1;
        console.log(userScore);
        console.log("Answer is correct");
        ans.classList.add("correct");
        ans.insertAdjacentHTML("beforeend", tickIconTag);
    } else {
        ans.classList.add("wrong");
        console.log("Answer is worng");
        ans.insertAdjacentHTML("beforeend", crossIconTag);
        //if wrong answer automatically select correct
        for (let i = 0; i < Alloption; i++) {
            if (option_list.children[i].innerHTML == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }

    }

    //once option selected disable all other option
    for (let i = 0; i < Alloption; i++) {
        option_list.children[i].classList.add("dsiable");
    }

    next_btn.style.display = "block";
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.innerHTML = time;
        time--;
        if (time < 9) {
            addZero = timeCount.innerHTML;
            timeCount.innerHTML = `0${addZero}`;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.innerHTML = "00";
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.style.display="block"; //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 549) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

//counting question
function questionCounter(index) {
    const bottom_ques_count = quiz_box.querySelector(".total_que");

    const questionCountTag = `<span><p>${index}</p>of<p>${questions.length}</p>Question</span>`;
    bottom_ques_count.innerHTML = questionCountTag;
}

// result box showing
function showResultBoxconst() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = `<span>and congrats! , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}