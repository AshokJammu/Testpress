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