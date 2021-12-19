const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['#3CB371', '#DC143C', '#DB7093', '	#FF4500', '#4682B4', '#BC8F8F', '#006400','#66CDAA', '#191970'] //массив с цветовой гаммой

//создаем переменные времени и очков
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0]. classList.add('up');
}) 

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle()
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
        current = `0${current}`
    }
    setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    board.innerHTML = `<h1>Ваш счет: ${score}</h1>`;
}

//функция создания рандомного кружка внутри поля игры
function createRandomCircle() {
    //создаем болк, в который будет записан кружок (мишень)
    const circle = document.createElement('div');
    //размеры кружка (рандомно в зависимости от заднных значений минимум - максимум)
    const size = getRandomNumber(10, 40);
    //отрисовываем ширину и высоту поля
    const {width, height} = board.getBoundingClientRect();
    //
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    setColor(circle);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;  
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}
//создаем функцию рандома от минимума до максимума
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//функция принимает аргумент и меняет фон
function setColor(element) {
    //создаем переменную color и записываем в неё цвет из функции
    const color = getRandomColor();
    //присваеваем её фон получившийся цвет
    element.style.background = color;
}
//создаем функцию, которая возвращает нам индекс цвета (из массива на строке 7)
function getRandomColor() {
    //в индекс получаем цифру от 0 до 8 - цвет по счету в массиве
    const index = Math.floor(Math.random() * colors.length);
    //возвращаем массив с индексом - то есть сам цвет
    return colors[index];
}
