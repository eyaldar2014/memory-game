// console.log('a')

const pictureApi = 'https://dog.ceo/api/breeds/image/random'
const board = document.querySelector('#board')
const body = document.querySelector('body')
const count = document.querySelector('#count')
const landing = document.querySelector('#landing')
const minute = document.querySelector("#minutes")
const second = document.querySelector("#seconds")
const champion = document.querySelector("#champion")
const hiddenTextBox = document.querySelector("#hiddenTextBox")
const championName = document.querySelector("#championName")


const randomArray = []
const randomCardsArray = []
let numOfOpenCards = 0
let wrongCounter = 0
let rightCounter = 0
let record = 0
let number
let temp
let current
let gameOn = false
let stopWach = false
// console.log(board)



/* functions ------------------------------------------------------------------------*/
function createCardCouple(n) {

  landing.style.zIndex = '-1'
  number = n

  for (let i = 0; n > i; i++) {

    let card = document.createElement('div')
    let card2 = document.createElement('div')

    card.classList.add('pic')
    card2.classList.add('pic')
    firstCode = (Math.random())
    secondCode = (Math.random())

    randomArray.push(firstCode)
    randomArray.push(secondCode)
    card.id = firstCode
    card2.id = secondCode

    getApicture(card, card2)
    randomCardsArray.push(card)
    randomCardsArray.push(card2)
  }
  randomize()
}

async function getApicture(card, card2) {

  const apiInfo = await fetch(pictureApi + '/' + 1)
  const apiData = await apiInfo.json()

  apiData.message.forEach(pic => {
    let text = 'url(' + pic + ')'
    card.style.backgroundImage = text
    card2.style.backgroundImage = text
  })
}

function randomize() {
  let sortedArray = randomArray.sort(function (a, b) { return a - b })
  let sortedArrayByCards = []

  sortedArray.forEach(num => {
    randomCardsArray.forEach(card => {
      if (num === parseFloat(card.id)) {
        sortedArrayByCards.push(card)
      }
    })
  })

  sortedArrayByCards.forEach(card => {
    let cardBlock = document.createElement('div')
    cardBlock.classList.add('cardBlock')

    board.appendChild(cardBlock)
    cardBlock.appendChild(card)
  })

  const cards = document.querySelectorAll('.pic')
  cards.forEach(card => {
    card.addEventListener('click', revealCard)
  })
}

function revealCard(e) {

  if (gameOn === false) {
    clockWise()
    gameOn = true
  }

  if (numOfOpenCards === 0) {
    current = e.target
    temp = current

    current.style.opacity = "1"
    numOfOpenCards = 1
  }

  else if (numOfOpenCards === 1 && e.target !== temp) {
    current = e.target

    current.style.opacity = "1"

    if (temp.style.backgroundImage === current.style.backgroundImage) {
      current.removeEventListener('click', revealCard)
      temp.removeEventListener('click', revealCard)
      rightCounter += 1
      numOfOpenCards = 0
      if(rightCounter === number){
        stopWach = true
        const win = document.createElement('div')
        win.innerHTML = ' YOU WON !!!'
        win.classList.add('youWon')
        board.appendChild(win)
        checkRecord()

      }
    }
    else {
      numOfOpenCards = 2
      wrongCounter += 1
      count.innerHTML = wrongCounter
      setTimeout(flipBack, 1400)
    }
  }
}

function flipBack() {
  current.style.opacity = "0"
  temp.style.opacity = "0"
  numOfOpenCards = 0
}

function clockWise() {

  if (stopWach === true){
    return
  }

  let newValue = parseInt(second.innerHTML)
  let minuteValue = parseInt(minute.innerHTML)

  newValue += 1
  if (newValue < 10) {
    newValue = '0' + newValue.toString()
  }

  else if (newValue === 60) {
    newValue = '00'

    minuteValue += 1
  }
  if (minuteValue < 10) {
    minuteValue = '0' + minuteValue.toString()
  }

  else if (minuteValue === 60) {
    minuteValue = '00'
    return
  }

  second.innerHTML = newValue
  minute.innerHTML = minuteValue

  setTimeout(clockWise, 1000)
}



// const allDivs = document.querySelectorAll('div')
// allDivs.forEach(div => {
//   div.style.border = "1px solid red"

// })

// createCardCouple(1)
function checkRecord(){
  let score = minutes.innerHTML + second.innerHTML
  if (parseInt(score) > record){
    record = parseInt(score)
    // champion.innerHTML = score
    hiddenTextBox.style.zIndex ='100'

  }

}

function applyRecord(){
  console.log(championName.value)
  champion.innerHTML = championName.value
  hiddenTextBox.style.zIndex ='-100'
}