let id = 'no' //For septating save/edit notes
selectNotes()
//DOM SELECTOR

let title = document.getElementById('title') //Title dom
let notes = document.getElementById('notes') //Notes dom
let save = document.getElementById('btn-save') //Save button dom
let today = new Date().toLocaleDateString('en-IN').split('/') // Time by IS

//FUNCTION's

save.onclick = function(){ //Save button function
    let object = { //Object
        'title': title.value,
        'notes': notes.value,
        'time': today
    }

    if(title.value == ''){ // Alert for empty title
        alert('Enter the title')
    }else{
        if(id == 'no'){ //For addnotes
            let array = getJsonData() //Json parse to array
            if(array == null){ // First notes creat
                let field = [object]
                setJsonData(field) 
            }else{ //From 2nd push into the array
                array.push(object)
                setJsonData(array)
            }
        }else{ //For edit notes
            let array = getJsonData()
            array[id].title = title.value //Storing edited title value 
            array[id].notes = notes.value //Storing edited notes value
            setJsonData(array)
        }
        refresh() //Field clear
        selectNotes() //display
    }      
}

function selectNotes(){
    let array = getJsonData()
    if(array!=null){ //Checking the array is > 0
        let html = ''
        for(let i=0; i<array.length; i++){ 
            html += `<div class= "boat">
                        <div class="output-el">
                        <h3>${array[i].title}</h3>
                        <p>${array[i].notes}</p>
                        <button onclick="editNotes(${i})" class='btn-edit'>Edit</button>  
                        <button onclick="delectNotes(${i})" class='btn-delect'>Delete</button>
                        <p class="time-el">${array[i].time}</p>
                        </div>
                    </div>`
        }
        document.getElementById('output-container').innerHTML = html // Display the result in inner html 
    }
}

function editNotes(index){ //Edit function
    id = index //Changing index value for edit notes
    let array = getJsonData()
    
    document.getElementById('title').value = array[index].title //Edit the title
    document.getElementById('notes').value = array[index].notes //Edit the notes
}

function delectNotes(index){ // Delect notes, index is to  spicifaction
    alert('Check once ') // Alert the user befor delect
    let array = getJsonData()
    array.splice(index, 1) //Splice function to specify the index & 1 = how many node to delect
    setJsonData(array)
    selectNotes() 
}

function refresh(){ //Field clear
    title.value = ''
    notes.value = ''
}

function getJsonData(){ // function for localStorage get Item
	let value = JSON.parse(localStorage.getItem('Notepad-Application'))
	return value //Returning the get Item
}

function setJsonData(value){ // Function for localStorage srt item parameter is value to store in ls
	localStorage.setItem('Notepad-Application', JSON.stringify(value))
}
