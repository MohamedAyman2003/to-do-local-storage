let input = document.querySelector( ".input" )
let submit = document.querySelector( ".add" )
let tasks = document.querySelector( ".tasks" )
let arrayOfTasks = [];

getElementsFromLocalStorage() 

if ( localStorage.getItem( "tasks" ) ) {
    arrayOfTasks = JSON.parse( localStorage.getItem( "tasks" ) )
    
}
tasks.addEventListener( "click" ,( e ) => {
    if ( e.target.classList.contains( "del" ) ) {
        deleteTaskeWith( e.target.parentElement.getAttribute( "data-id" ) )
        e.target.parentElement.remove()
    }
    if ( e.target.classList.contains( "task" ) ) {
         toggleStateTaskWith( e.target.getAttribute( "data-id" ) )
        e.target.classList.toggle("done")
    }
})


submit.onclick = function () {
    if ( input.value !== "" ) {
        addTaskToArray(input.value)
        input.value = ""
    }
}

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: input.value,
        completed: false
        
    }
    arrayOfTasks.push( task )
    addElementsToPageFrom( arrayOfTasks )
    // add task to local storage
    addDataToLocalStorage(arrayOfTasks)
     
}

function addElementsToPageFrom( arrayOfTasks ) {
    tasks.innerHTML = ""
    arrayOfTasks.forEach(task => {
        let div = document.createElement( "div" )
        div.className = "task"
        if ( task.completed ) {
            div.className = "task done"
        }
        div.setAttribute( "data-id", task.id )
        div.appendChild( document.createTextNode( task.title ) )
        let span = document.createElement( "span" )
        span.className = "del"
        span.appendChild( document.createTextNode( "delete" ) )
        div.appendChild( span )
        tasks.appendChild(div)
    });
}
function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks))
}
function getElementsFromLocalStorage() {
    let data = localStorage.getItem( "tasks" )
    if ( data ) {
        let task = JSON.parse( localStorage.getItem( "tasks" ) )
        addElementsToPageFrom(task)
    }
}

function deleteTaskeWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter( ( task ) => task.id != taskId )
    addDataToLocalStorage(arrayOfTasks)
}
function toggleStateTaskWith( taskId ) {
    for ( let i = 0; i < arrayOfTasks.length; i++ ){
        if ( arrayOfTasks[ i ].id == taskId ) {
            arrayOfTasks[ i ].completed == false ? (arrayOfTasks[ i ].completed = true) : ( arrayOfTasks[ i ].completed = false)
            
        }
    }addDataToLocalStorage(arrayOfTasks)

}






