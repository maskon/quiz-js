const question = document.getElementById('question')
const questionNumber = document.getElementById('question--number')
const quizOptionAll = document.getElementById('quiz__options')
const btn = document.getElementById('btn')
const btnNew = document.getElementById('btn-new')
const quisItem = document.getElementById('quis__item')
const quizNum = document.getElementById('quiz__num')
const quizLength = document.getElementById('quiz__length')
const quizSmile = document.getElementById('quiz__smile')
const minute = document.getElementById('min')
const second = document.getElementById('sec')

let count = 0
let total = 0
let correctAnswer = 0

blocksBtn()
renderHTML()
questionСounter()
renderTotal()

btn.addEventListener('click', () => {
    quizOptionAll.innerHTML = '' 
    if (count < (data.length - 1)) {
        count++
        renderHTML()
        questionСounter()
        renderTotal()
        total > 0 ? correctAnswer++ : correctAnswer
    } else {
        questionNumber.innerHTML = ''
        quizSmile.style.display = 'block'
        question.innerHTML = `Тест окончен ваш результат ${correctAnswer} из ${data.length}`
        quisItem.innerHTML = ''
    }
})

function renderHTML() {
    for (let i = 0; i < data[count].quiz__option.length; i++) {
        quizOptionAll.insertAdjacentHTML('beforeend', `
            <div class="quiz__option">
                <div class="quiz__text">${data[count].quiz__option[i]}</div>
            </div>`)
    }
}

function questionСounter() {
    question.innerHTML = data[count].question
    questionNumber.innerHTML = count + 1 + '.'
    quizNum.innerHTML = count + 1
    quizLength.innerHTML = data.length
}

function renderTotal() {
    quizOptionAll.addEventListener('click', (e) => {
        const quizAll = quizOptionAll.querySelectorAll('.quiz__text')
        quizAll.forEach(item => item.classList.remove('quiz__text__active'))
        total = 0
        if (e.target.classList.contains('quiz__text')) {
            e.target.classList.add('quiz__text__active')
            btn.disabled = false
            btn.style.opacity = '1'
            btn.style.cursor = 'pointer'
            if (e.target.innerText === 'all of the above'&&
                e.target.classList.contains('quiz__text__active')|| 
                e.target.innerText === 'string'|| 
                e.target.innerText === '==='|| 
                e.target.innerText === 'log()'|| 
                e.target.innerText === 'for'|| 
                e.target.innerText === 'typeof()'|| 
                e.target.innerText === 'parseInt()'|| 
                e.target.innerText === 'push()'|| 
                e.target.innerText === '+'|| 
                e.target.innerText === 'Math.floor(Math.random()  10)') {     
                total++
            }
        }
    })
    blocksBtn()
}

function blocksBtn() {
    btn.disabled = true
    btn.style.opacity = '0.5'
    btn.style.cursor = 'default'
}

let intervalId

function timer() {
    clearInterval(intervalId)
    
    intervalId = setInterval( () => {
        
        if (Number(second.innerHTML) === 0) {
            second.innerHTML = 60
            minute.innerHTML = Number(minute.innerHTML) - 1
        }
        
        second.innerHTML = Number(second.innerHTML) - 1
        
        if (second.innerHTML < 10) {
            second.innerHTML = '0' + second.innerHTML
        }
        
        if (Number(minute.innerHTML) < 0 || Number(second.innerHTML) < 1) {
            minute.innerHTML = '0'
            second.innerHTML = '00'
            
            clearInterval(intervalId)
            
            questionNumber.innerHTML = ''
            quizOptionAll.innerHTML = ''
            quisItem.innerHTML = ''
            question.innerHTML = `Время вышло, ваш результат ${correctAnswer} из ${data.length}`
            document.querySelector('body').style.justifyContent='center'
            btnNew.style.display='block'
            
            btnNew.addEventListener('click', () => { location.reload() }) //Обновить страницу
        }   
    }, 1000)
}

timer()