const request = require('request')

////////// Geocoding

// const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibmljb2JldGFuY291cnQiLCJhIjoiY2w1eWlqNjNxMGsxaTNpbDdzOG9wNHZheCJ9.SxtUYJp1E8jI6HEldzul7g&limit=1'

// request({url:geoURL,json:true},(error,response) =>{ // En este caso features es un array de varias ubicaciones, se filtra por 1 y se toma el primer vector
//     if (error){ // Verifica error al conectarse con el servidor
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.features.length === 0){ // Verifica que haya algún elemento en el array
//         console.log('Any location found. Try to search another place.')
//     }else{
//         const longitude = response.body.features[0].center[0].toString()
//         const latitude = response.body.features[0].center[1].toString()
//         console.log('The longitude is: '+longitude+' and the latitude is: '+latitude)
//     }
    
// })

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoibmljb2JldGFuY291cnQiLCJhIjoiY2w1eWlqNjNxMGsxaTNpbDdzOG9wNHZheCJ9.SxtUYJp1E8jI6HEldzul7g&limit=1' //encodeURIComponent modifica caracteres que no entiende por caracteres que si entiende

    request({url, json:true},(error,{body})=>{ //trae la propiedad body de response
        if (error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.features.length === 0){
            callback('Any location found. Try to search another place.',undefined)
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0].toString(),
                latitude: body.features[0].center[1].toString(),
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode