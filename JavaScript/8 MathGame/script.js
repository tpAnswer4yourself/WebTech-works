const primer = document.querySelector('.math_primer');
const input = document.querySelector('#example');
const button = document.querySelector('.submit');

const button_reset = document.querySelector('.reset');
const button_exit = document.querySelector('.exit');

const levelDisplay = document.querySelector('.level');
const verify = document.querySelector('.verify');
const timerDisplay = document.getElementById('timer');
const timer_dis = document.querySelector('.timer');
const level_dis = document.querySelector('.level');

const input_placeholder = document.getElementById('example');

const block = document.querySelector('.input_and_sub');

const input_block = document.querySelector('.input');

let taymer = 0;
let questions_in_level = 0;
let currentLevel = 1;  //!!!!
let used_questions = new Set();
let time_to_next_question = 1000;

let time_left = 120; // seconds
let timerInterval = null; //для будущей остановки таймера

let correct = 0;
let wrong = 0;
let total_correct = 0;
let total_wrong = 0;

let currentAnswer = null;

function resetGame() {
    taymer = 0;
    questions_in_level = 0;
    currentLevel = 1; //!!!!
    used_questions.clear();
    correct = 0;
    wrong = 0;
    total_correct = 0;
    total_wrong = 0;

    currentAnswer = null;
    stopTimer();
    startTimer();
    viewQuestion();
    button.disabled = false;
    primer.style.color = 'black';
    primer.style.display = 'block';
    block.style.display = 'block'; //показать блок
    timer_dis.style.display = 'block';
    level_dis.style.display = 'block';
    input_block.style.display = 'block';
}

function startTimer() {
    if (currentLevel === 1) time_left = 60;  //время на первом уровне
    else if (currentLevel === 2) time_left = 60; //время на втором уровне
    else if (currentLevel === 3) time_left = 60; //время на третьем уровне

    timerDisplay.textContent = time_left;

    if (timerInterval != null) {
        clearInterval(timerInterval);
    }

    //запуск нового таймера
    timerInterval = setInterval(() => {
        time_left--;
        timerDisplay.textContent = time_left;
        if (time_left <= 0) {
            clearInterval(timerInterval);
            verify.textContent = 'Время вышло! Игра окончена...';
            verify.style.color = 'red';
            block.style.display = 'none'; //скрыть блок инпут+кнопка
            level_dis.style.display = 'none';
            primer.style.display = 'none';
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval != null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}


function generateQuestion(currentLevel) {
    if (currentLevel === 1) {
        input_placeholder.placeholder = 'Введите число';
        const a = Math.floor(Math.random() * 31) - 15;
        if (a === 0) return generateQuestion(currentLevel);
        const b = Math.floor(Math.random() * 15) + 1;
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
        input_placeholder.placeholder = 'Введите True или False';
        const a = Math.floor(Math.random() * 21) - 10;
        if (a === 0) return generateQuestion(currentLevel);
        const b = Math.floor(Math.random() * 15) + 1;
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

    if (currentLevel === 3) {
        input_placeholder.placeholder = 'Введите двоичное число';
        const bits_a = Math.floor(Math.random() * 4) + 1; // от 1 до 4 бит
        const bits_b = Math.floor(Math.random() * 4) + 1; // от 1 до 4 бит

        let a = Math.floor(Math.random() * (1 << bits_a));
        let b = Math.floor(Math.random() * (1 << bits_b));

        if (a === 0 || b === 0) return generateQuestion(currentLevel);

        const operator = Math.random() < 0.5 ? '+' : '-';
        let abin = a.toString(2);
        let bbin = b.toString(2);

        let answer;
        let question;

        if (operator === '+') {
            const sum = a + b;
            if (sum > 15) return generateQuestion(currentLevel) //переполнение


            answer = sum.toString(2);
            question = `${abin} + ${bbin}`;
        }

        else if (operator === '-') {
            if (a < b) {
                [a, b] = [b, a];
                [abin, bbin] = [bbin, abin];
            }
            const vichit = a - b;
            answer = vichit === 0 ? '0' : vichit.toString(2);

            question = `${abin} - ${bbin}`;
        }

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
    if (currentLevel === 3) {
        primer.textContent = q.text + ' = ?';
    }

    currentAnswer = q.answer;
    input.value = '';
    input.focus();
    verify.textContent = '';
    levelDisplay.textContent = `Уровень: ${currentLevel} | ${correct}✅ ${wrong}❌`;
}


function checkAnswer() {
    if (currentLevel === 1) {
        const user_answer = parseFloat(input.value);
        if (user_answer === currentAnswer) {
            correct++;
            total_correct++;
            verify.textContent = 'Верно!';
            verify.style.color = 'green';
        }
        else if (user_answer !== currentAnswer || isNaN(user_answer)) {
            wrong++;
            total_wrong++;
            verify.textContent = 'Неверно!';
            verify.style.color = 'red';
        }
    }
    else if (currentLevel === 2) {
        const user_answer = input.value.trim().toLowerCase();
        if (user_answer === '1' || user_answer === 'true' || user_answer === 'yes' || user_answer === 'y' || user_answer === 't' || user_answer === 'да' || user_answer === 'д' || user_answer === 'правда') {
            const bool_user_answer = true;
            if (bool_user_answer === currentAnswer) {
                correct++;
                total_correct++;
                verify.textContent = 'Верно!';
                verify.style.color = 'green';
            }
            else {
                wrong++;
                total_wrong++;
                verify.textContent = 'Неверно!';
                verify.style.color = 'red';
            }
        }
        else if (user_answer === '0' || user_answer === 'false' || user_answer === 'no' || user_answer === 'n' || user_answer === 'f' || user_answer === 'нет' || user_answer === 'н' || user_answer === 'ложь') {
            const bool_user_answer = false;
            if (bool_user_answer === currentAnswer) {
                correct++;
                total_correct++;
                verify.textContent = 'Верно!';
                verify.style.color = 'green';
            }
            else {
                wrong++;
                total_wrong++;
                verify.textContent = 'Неверно!';
                verify.style.color = 'red';
            }
        }
        else {
            verify.textContent = 'Введите true или false';
            verify.style.color = 'gray';
            return;
        }
    }
    else if (currentLevel === 3) {
        const user_answer = input.value.trim();
        if (user_answer === currentAnswer) {
            correct++;
            total_correct++;
            verify.textContent = 'Верно!';
            verify.style.color = 'green';
        }
        else {
            wrong++;
            total_wrong++;
            verify.textContent = 'Неверно!';
            verify.style.color = 'red';
        }
    }

    //проверка на конец уровня, переход на новый
    if (correct + wrong >= 10) {
        levelDisplay.textContent = `Уровень: ${currentLevel} | ${correct}✅ ${wrong}❌`;

        if (correct >= 8) {

            if (currentLevel === 3) {
                input.value = '';
                stopTimer();

                setTimeout(() => {
                    alert("✨ Вы успешно прошли игру MathGame! ✨");
                }, 1000);

                verify.textContent = 'Поздравляем!\nВы прошли игру!';
                primer.textContent = `Правильных ответов: ${total_correct}✅\nОшибок: ${total_wrong}❌`;
                level_dis.style.display = 'none';
                verify.style.color = 'green';
                button.style.display = 'none';
                block.style.display = 'none';
                timer_dis.style.display = 'none';

                return;
            }

            currentLevel++;
            used_questions.clear();

            input.value = '';
            correct = 0;
            wrong = 0;

            verify.textContent = `Новый ${currentLevel}✅ уровень!`;
            verify.style.color = 'blue';

            setTimeout(() => {
                verify.textContent = '';
                startTimer();
                viewQuestion();
            }, 3500);
            return;
        }

        else {
            input.value = '';
            primer.textContent = `Правильных ответов: ${total_correct}✅
            \nОшибок: ${total_wrong}❌`;
            stopTimer();
            button.disabled = true;
            verify.textContent = 'Игра окончена, недостаточно правильных ответов';
            block.style.display = 'none'; //скрыть блок инпут+кнопка
            timer_dis.style.display = 'none';
            level_dis.style.display = 'none';
            verify.style.color = 'red';
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

button_reset.addEventListener('click', () => {
    block.style.display = 'none'; //скрыть блок инпут+кнопка
    timer_dis.style.display = 'none';
    verify.textContent = '';
    primer.textContent = 'Запуск новой игры...';
    primer.style.color = `#6520b9ff`;
    stopTimer();
    input.value = '';
    setTimeout(resetGame, 1500);
});

button_exit.addEventListener('click', () => {
    stopTimer();
    block.style.display = 'none'; //скрыть блок инпут+кнопка
    timer_dis.style.display = 'none';
    primer.textContent = 'Игра завершена!';
    primer.style.color = 'red';
    verify.textContent = '';
    input.value = '';
});

resetGame();