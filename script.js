let myNotes = []
let myTabs = []
let inputEl = document.getElementById('input-el')
const saveBtn = document.getElementById('save-btn')
const tabBtn = document.getElementById('tab-btn')
const clearNotesBtn = document.getElementById('clear-notes-btn')
const clearTabsBtn = document.getElementById('clear-tabs-btn')
const notesEl = document.getElementById('ul-el')
const urlsEl = document.getElementById('ol-el')
const notesFromStorage = JSON.parse(localStorage.getItem('myNotes'))
const tabsFromStorage = JSON.parse(localStorage.getItem('myTabs'))

if(notesFromStorage){
  myNotes = notesFromStorage
  renderNotes()
}
if(tabsFromStorage){
  myTabs = tabsFromStorage
  renderTabs()
}
saveBtn.addEventListener('click', function(){
  myNotes.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myNotes', JSON.stringify(myNotes))
  renderNotes()
  })

tabBtn.addEventListener('click', function(){
      chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      myTabs.push(tabs[0].url)
      localStorage.setItem('myTabs', JSON.stringify(myTabs))
      renderTabs()
    })

})

clearNotesBtn.addEventListener('click', function(){
    myNotes=[]
    localStorage.clear()
    renderNotes()

})
clearTabsBtn.addEventListener('click', function(){
    myTabs=[]
    localStorage.clear()
    renderTabs()

})


function renderTabs(){
    let tabItems=''
    for(let i=0; i<myTabs.length; i++){
        tabItems+=`
        <li>
        <a href='${myTabs[i]}' target='_blank'>${myTabs[i]}</a>
        </li> `
    }
    urlsEl.innerHTML= tabItems
}
function renderNotes(){
    let noteItems=''
    for(let i=0; i<myNotes.length; i++){
        noteItems+=`
          <button class='clear-btn' id='clear-btn${i}'>x</button>
           <li id='list-${i}'>${myNotes[i]}</li>

        `
        }
    notesEl.innerHTML = noteItems
}
