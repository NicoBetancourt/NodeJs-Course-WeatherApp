console.log('Prueba del servidor corriendo')

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault() //Evita que se actualice la página con cada click
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    
    fetch('/weather?address='+location).then((response) =>{ // se deja un simple / para indicar que pueda ser desde local Host o desde Horoku
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.temperature
        }
        
    })
})
})