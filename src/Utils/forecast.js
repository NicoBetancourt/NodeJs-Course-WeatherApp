const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=7b012015f5ae2ca5a0780d2981811098&query=37.8267,-122.4233' // Units=f para faranheit

// request({url:url,json:true},(error,response) => { 
//     if (error){ 
//         console.log('Unable to connect to weather service!')
//     }else if (response.body.error){ 
//         console.log('Unable to find location')
//     }else{
//         console.log(response.body.current.weather_descriptions[0]+'. There is a current '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out')
//     }
// })

const forecast = (latitude, longitude, callback) =>{//Si pongo json :true, response llega como objeto, no quiere JSON.PARSE(response.body)
    const url = 'http://api.weatherstack.com/current?access_key=7b012015f5ae2ca5a0780d2981811098&query=' + latitude + ',' + longitude  // Units=f para faranheit

    request({url, json:true}, (error, {body})=>{
        if (error){ // Si existe error, informe que no puede conectar al servidor
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error) { // Verifica si genera problemas al conectar al servidor
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+'. There is a current '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
        }
    })
} 

module.exports = forecast

