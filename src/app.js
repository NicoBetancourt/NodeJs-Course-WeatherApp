const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public') //General el path de la ruta
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views tocaltion
app.set('view engine','hbs') // Permite crear html dinámico con hbs siempre en una carpeta creada llamada views
app.set('views',viewPath) // Indica donde estará ubicado la información que espera como views
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //El path se envía a express

//// De esta manera se enviaba información al servidor, pero se reemplazó enviado los archivos en el path en formato html
// app.get('/help', (req, res) =>{
//     res.send({ // Información tipo JSON
//         name: 'Nicolás',
//         age: 28
//     })
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>About page</h1>')
// })

app.get('', (req, res) =>{ 
    res.render('index',{ //con solo el nombre conecta con el archivo creado en index
        title: 'Weather App', // Crea un objeto para enviar al servidor
        name: 'Nicolás Betancourt'
    })

})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Nico'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        info: 'Do you need some help?',
        name: 'Nico'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }else{
        geocode(req.query.address, (error,{latitude,longitud,location}={}) =>{ //Si se igual a vacío, por defecto crea las variables undefined, que ayuda por si alguna propiedad no existe
            if  (error){
                return res.send({error})
            }
        
            forecast(latitude, longitud, (error, forecastData) => {
                if (error){
                    return res.send({error})
                }
                return res.send({
                    location,
                    temperature: forecastData
                })
            })
        })
    }
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error',{
        title: '404',
        //title: 'Page not found',
        info: 'help article not found',
        name: 'Nico'
    })
})

app.get('*', (req, res) =>{
    res.render('error',{
        title: '404',
        info: 'Page not found',
        name: 'Nico'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})