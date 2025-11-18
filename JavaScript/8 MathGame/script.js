const primer = document.querySelector('.math_primer');
const input = document.querySelector('#example');
const button = document.querySelector('.submit');
const levelDisplay = document.querySelector('.level');
const verify = document.querySelector('.verify');

let taymer = 0;
let questions_in_level = 0;
let currentLevel = 1;
let used_questions = new Set();
time_to_next_question = 1000;

let correct = 0;
let wrong = 0;
let currentAnswer = null;

function resetGame() {
    taymer = 0;
    questions_in_level = 0;
    currentLevel = 1;
    used_questions.clear();
    correct = 0;
    wrong = 0;
    currentAnswer = null;
    viewQuestion();
}

function generateQuestion(currentLevel) {
    if (currentLevel === 1) {
        const a = Math.floor(Math.random() * 41) - 20;
        if (a === 0) return generateQuestion(currentLevel);
        const b = Math.floor(Math.random() * 20) + 1;
        const operators = ['+', '-', '/', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let question, answer;

        if (operator === '+') {
            answer = a + b;
            question = `${a} + ${b}`;
        }
        else if (operator === '-') {
            answer = a - b;
            question = `${a} - ${b}`;
        }
        else if (operator === '*') {
            answer = a * b;
            question = `${a} × ${b}`;
        }
        else if (operator === '/') {
            const dividend = a * b;
            question = `${dividend} ÷ ${a}`;
            answer = b;
        }

        const key = question;
        if (used_questions.has(key)) {
            return generateQuestion(currentLevel);
        }

        used_questions.add(key);
        return { text: question, answer: answer };
    }

    if (currentLevel === 2) {
        const a = Math.floor(Math.random() * 31) - 15;
        if (a === 0) return generateQuestion(currentLevel);
        const b = Math.floor(Math.random() * 25) + 1;
        const rightNumber = Math.floor(Math.random() * 100) + 1;
        const operators = ['+', '-', '*', '/'];
        const operators_logic = ['>', '<', '=='];
        const operator_arifmetic = operators[Math.floor(Math.random() * operators.length)];
        const operator_logic = operators_logic[Math.floor(Math.random() * operators_logic.length)];

        let left_value;
        if (operator_arifmetic === '+') {
            left_value = a + b;
        }
        else if (operator_arifmetic === '-') {
            left_value = a - b;
        }
        else if (operator_arifmetic === '*') {
            left_value = a * b;
        }
        else if (operator_arifmetic === '/') {
            const dividend = a * b;
            left_value = b;
        }

        const logic_operator = `${left_value} ${operator_logic} ${rightNumber}`;
        let question = `${a} ${operator_arifmetic === '*' ? '×' : operator_arifmetic === '/' ? '÷' : operator_arifmetic} ${b} ${operator_logic} ${rightNumber}`;
        let answer = eval(`${left_value} ${operator_logic} ${rightNumber}`);

        const key = question;
        if (used_questions.has(key)) {
            return generateQuestion(currentLevel);
        }

        used_questions.add(key);
        return { text: question, answer: answer };


    }
}

function viewQuestion() {
    const q = generateQuestion(currentLevel);
    if (currentLevel === 1) {
        primer.textContent = q.text + ' = ?';
    }
    if (currentLevel === 2) {
        primer.textContent = q.text;
    }

    currentAnswer = q.answer;
    input.value = '';
    input.focus();
    verify.textContent = '';
    levelDisplay.textContent = `Level: ${currentLevel} | Correct: ${correct} | Wrong: ${wrong}`;
}


function checkAnswer() {
    if (currentLevel === 1) {
        const user_answer = parseFloat(input.value);
        if (user_answer === currentAnswer) {
            correct++;
            verify.textContent = 'Correct!';
            verify.style.color = 'green';
        }
        else if (user_answer !== currentAnswer || isNaN(user_answer)) {
            wrong++;
            verify.textContent = 'Incorrect!';
            verify.style.color = 'red';
        }
    }
    else if (currentLevel === 2) {
        const user_answer = input.value.trim().toLowerCase();
        if (user_answer === '1' || user_answer === 'true' || user_answer === 'yes' || user_answer === 'y' || user_answer === 't') {
            const bool_user_answer = true;
            if (bool_user_answer === currentAnswer) {
                correct++;
                verify.textContent = 'Correct!';
                verify.style.color = 'green';
            }
            else {
                wrong++;
                verify.textContent = 'Incorrect!';
                verify.style.color = 'red';
            }
        }
        else if (user_answer === '0' || user_answer === 'false' || user_answer === 'no' || user_answer === 'n' || user_answer === 'f') {
            const bool_user_answer = false;
            if (bool_user_answer === currentAnswer) {
                correct++;
                verify.textContent = 'Correct!';
                verify.style.color = 'green';
            }
            else {
                wrong++;
                verify.textContent = 'Incorrect!';
                verify.style.color = 'red';
            }
        }
        else {
            verify.textContent = 'True/False';
            verify.style.color = 'gray';
            return;
        }
    }

    if (correct + wrong === 10) {
        if (currentLevel === 3)
        {
            input.value = '';
            verify.textContent = 'You completed all levels!';
            verify.style.color = 'green';
            setTimeout(resetGame, 5000);
            return;
        }

        else if (correct >= 8) {
            currentLevel++;
            used_questions.clear();

            input.value = '';
            correct = 0;
            wrong = 0;
        }
        else {
            input.value = '';
            verify.textContent = 'Game Over! Restarting...';
            verify.style.color = 'red';
            setTimeout(resetGame, 5000);
            return;
        }
    }

    input.value = '';
    setTimeout(viewQuestion, time_to_next_question);



}

button.addEventListener('click', checkAnswer);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

viewQuestion();