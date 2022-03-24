const path = require('path')
const express = require('express')
const hbs =require('hbs')

const app=express()
const port=process.env.PORT || 3000

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//Define Path for Express Config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set up handle bars and View locations.
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to Serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'weather App',
        name : 'Ditto Pachen'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Evan Pachen'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title : 'About Me',
        name : 'Evan Pachen'
    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return  res.send({
             errorMessage : 'Address is not entered'
         })
     }


     
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {

        if (error) {
            console.log(error)
            return  res.send({error})
        }


        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log(error)
                return  res.send({error})
            }
            //console.log('Error', error)
            console.log(location)
            console.log(forecastData)

            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })

    })

   
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
       return  res.send({
            errorMessage : 'Search Criteria not entered'
        })
    }
    res.send({
        forecast : 'Forecast',
        location : 'Location'
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        errorMessage : 'No Help Article Page Found',
        title : '404',
        name : 'Evan Pachen'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        errorMessage : 'Page Not Found',
        title : '404',
        name : 'Evan Pachen'
    })
})
app.listen(port,()=> {
    console.log ('Server Started')
}
)