var optionsDiv = document.getElementById('optionsDiv')
var catSelect = document.getElementById('catSelect')
var diffSelect = document.getElementById('diffSelect')
var loadingDiv = document.getElementById('loadingDiv')
var startQuiz = document.getElementById('startQuiz')
var selectTags = document.getElementById('selectTags')
var loadingPara = document.getElementById('loadingPara')
var submitBtn = document.getElementById('submit')
var timerDiv = document.getElementById('timer')
var displayTime = document.getElementById('displayTime')
var correctAns = document.getElementById('correctAns')
var scoreTrack = document.getElementById('scoreTrack')
var disScore = document.getElementById('disScore')
var homeBtn = document.getElementById('home')
var dashBtn = document.getElementById('dashboard')
var homeDiv = document.getElementById('homeDiv')
var dashDiv = document.getElementById('dashDiv')




dashDiv.style.display =  'none'
// localStorage.setItem('dashArray', JSON.stringify([]))
if (JSON.parse(localStorage.getItem("dashArray")) == null) {
  localStorage.setItem("dashArray", JSON.stringify([]))
}

timerDiv.style.display = 'none'



var loadFlag = false

let labels = document.querySelectorAll('label')

var bol1 = document.getElementById('bol1')
var bol2 = document.getElementById('bol2')

var question = document.getElementById('question')

var allData = []

// var x
var timerInterval = null;

var allCategories = []

let count = 0
var selectData = []

var attempts = 0
var score = 0

let category = ''
let difficulty = ''
let catName = ''

var diffFlag = false

let quizFlag = false

// Home button



// Home display function

function displayLandPage() {
  selectTags.style.display = "block"
  optionsDiv.style.display = "none"
  timerDiv.style.display = "none"
  loadingDiv.style.display = "block"
  clearInterval(timerInterval)

}

catSelect.addEventListener('change', async () => {
  console.log(event.target.value)
  catName = event.target.name
  // let selectData = []
  //  for(let i=0;i<allData.length;i++) {
  //       if(allData.category == event.target.value  ) {
  //         selectData.push(allData[i])
  //       }
  //  }
  console.log(catName)
  diffFlag = true

  category = event.target.value
  selectData = await getData(event.target.value)
  // console.log(selectData.results)
  allData = selectData.results

  for (let i = 0; i < allCategories.length; i++) {
    if (allCategories[i].id == category) {
      catName = allCategories[i].category
    }
  }

  count = 0

  // selectData = allData.filter(elem => elem.category == event.target.value && elem)
  // if (loadFlag && category != '' && difficulty != '' && quizFlag ) {
  //   quizFlag = false
  //   displayOptions()
  // }
})


diffSelect.addEventListener('change', async () => {
  console.log(event.target.value)



  difficulty = event.target.value

  selectData = await getData(event.target.value)
  allData = selectData.results
  // }

  diffFlag = true

  // allData = allData.filter(elem => elem.difficulty == event.target.value && elem)

  count = 0
  console.log(allData)

})


async function checkData() {
  let i = 9
  while (i <= 32) {
    var res = await getData(i)
    console.log(res.results[0].category)
    let cat = res.results[0].category



    for (let j = 0; j < res.results.length; j++) {
      allData.push(res.results[j])
    }

    allCategories.push({ category: cat, id: i })

    var catOpt = document.createElement('option')
    catOpt.value = i
    catOpt.textContent = cat
    catOpt.setAttribute('name', cat)
    catSelect.append(catOpt)

    i++
  }
  console.log(allData)
  // let data = await fetch("https://opentdb.com/api.php?amount=200").then(res => res.json())
  // console.log(data)

  loadingPara.textContent = 'Hi Welcome to Play Quiz'
  // displayOptions()


}

function getData(x) {
  if (!diffFlag) {
    return fetch("https://opentdb.com/api.php?amount=20&category=" + x)
      .then(data => data.json())
  } else {
    return fetch("https://opentdb.com/api.php?amount=10&category=" + category + "&difficulty=" + x)
      .then(data => data.json())

  }
}

checkData()


homeBtn.addEventListener('click', () => {
  homeDiv.style.display = 'block'
  dashDiv.style.display = 'none'
  displayLandPage()
  if (count >= 1 && count < 9) {
    loadingPara.innerHTML = "Invalid Attempt" + "&#129320;"

    let dashObj = {
      category: catName,
      difficulty: difficulty,
      score: score,
      status: 'Invalid Attempt',
      feedback: 'Try once again'
    }



    var localData = JSON.parse(localStorage.getItem('dashArray'))
    console.log(localData)
    localData.push(dashObj)
    localStorage.setItem('dashArray', JSON.stringify(localData))


  }
})


dashBtn.addEventListener('click', ()=> {
    homeDiv.style.display = 'none'
    dashDiv.style.display = 'block'
  let data = JSON.parse(localStorage.getItem('dashArray'))

  let tbody = document.getElementById('tbody')
  tbody.innerHTML = ''

    // 
    for(let i=0;i<data.length;i++) {
      var tr = document.createElement('tr')
       tr.innerHTML = '<td>' + Number(i+1) + '<td>' + data[i].category + '<td>' + data[i].difficulty + '<td>' + data[i].score + '<td>' + data[i].status + '<td>' + data[i].feedback
       tbody.append(tr)
    }
})


// Display Questions

function displayOptions() {

  scoreTrack.style.color = 'white'
  scoreTrack.textContent = score + "/10"
  attempts = 0
  loadingDiv.style.display = 'none'
  optionsDiv.style.display = 'block'
  question.style.color = "black"
  question.innerHTML = count + 1 + ". " + allData[count].question

  


  if (allData[count].type == "boolean") {
    option1.style.color = '#fff'
    option2.style.color = '#fff'
    option1.textContent = "True"
    option2.textContent = "False"
    bol1.style.display = 'none'
    bol2.style.display = 'none'
  } else if (allData[count].type == 'multiple') {

    bol1.style.display = 'block'
    bol2.style.display = 'block'

    allData[count].incorrect_answers.push(allData[count].correct_answer)

    console.log(allData[count].incorrect_answers, "incorrect")
    console.log(shuffle(allData[count].incorrect_answers))

    shuffle(allData[count].incorrect_answers)
    for (i = 0; i < 4; i++) {

      labels[i].textContent = allData[count].incorrect_answers[i]
      labels[i].parentElement.checked = false
      labels[i].style.color = '#fff'
    }

  }

  correctAns.textContent = ''
}

// Start Quiz

startQuiz.addEventListener('click', () => {
  if (category != '' && difficulty != '') {
    selectTags.style.display = 'none'
    score = 0
    count = 0
    attempts = 0
    optionsDiv.style.display = 'block'
    disScore.innerHTML = ''
    timerDiv.style.display = 'block'
    loadFlag = true
    loadingPara.innerHTML = ''
    countDown()
    displayOptions()
  } else {
    loadingPara.textContent = "Please Choose Category and Difficulty"
  }

})


// Submit button

submitBtn.addEventListener('click', () => {

  event.preventDefault()

  var radioInput = document.querySelectorAll("input");
  console.log(attempts, count, "count")

  // var txt = "";
  var uncheck = 0
  console.log(event.target.nextSibling)

  if (count  >= 10) {


    loadingPara.textContent = 'Succesfully completed the Quiz'
    displayLandPage()


    var status = ''
    var feedback = ''
    if (score < 5) {
      status = "Fail"
      feedback = 'Reattempt the Quiz'
      disScore.innerHTML = "Score is " + score + " &#128553;"
    } else if (score >= 5 && score <= 7) {
      status = "Satisfactory"
      feedback = 'Need to Improve'
      disScore.innerHTML = "Score is " + score + " &#128533;"
    } else {
      status = "Excellent"
      feedback = 'Try new concept'
      disScore.innerHTML = "Score is " + score + " &#128525;"
    }

    if (count == 10) {
      let dashObj = {
        category: catName,
        difficulty: difficulty,
        score: score,
        status: status,
        feedback: feedback
      }

      var localData = JSON.parse(localStorage.getItem('dashArray'))
      console.log(localData)
      localData.push(dashObj)
      localStorage.setItem('dashArray', JSON.stringify(localData))
    }


  }else if (attempts < 2) {
    for (var i = 0; i < radioInput.length; i++) {
      if (radioInput[i].checked) {
        // txt = txt + radioInput[i].value;
        if (allData[count].correct_answer == radioInput[i].nextSibling.textContent) {
          count++
          score++
          // radioInput[i].nextSibling.setAttribute("class", "correct")
          radioInput[i].nextSibling.style.color = 'green'
          clearInterval(timerInterval)
          displayOptions()
          countDown()
        }
        else {
          // alert('incorrect')
          attempts++
          // radioInput[i].nextSibling.setAttribute("class", "wrong")
          radioInput[i].nextSibling.style.color = 'tomato'
          correctAns.style.color = 'cyan'
          correctAns.textContent = "You have one more attempt"
          // console.log("you have one more attempt")
        }
        radioInput[i].checked = false
        // uncheck = i
        // break
      }


      
    }

    if (attempts == 2) {
      correctAns.style.color = 'white'
      correctAns.textContent = "The correct answer is " + allData[count].correct_answer
    }

  } else {
    console.log(attempts, 'else')
    clearInterval(timerInterval)
    count++
    attempts = 0
    displayOptions()
    countDown()
  }




  // console.log(txt)
  // console.log(selectData)
  // radioInput[uncheck].checked = false

})

function countDown() {
  var time = 0
  if (difficulty == 'easy') {
    time = 30
    timerCountDown(time)
  } else if (difficulty == 'medium') {
    time = 45
    timerCountDown(time)
  } else if (difficulty == 'hard') {
    time = 60
    timerCountDown(time)
  }
}

if (!loadFlag) {
  optionsDiv.style.display = 'none'
  loadingPara.textContent = 'Loading please wait...'
}