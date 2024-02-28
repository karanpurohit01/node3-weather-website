const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set("view engine","hbs")
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name: "Karan"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
              return res.send({error})
           }
           console.log("forecast",forecastData)
           console.log("location",location)
        res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
        })
     })
     })

})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name: "Jack"
    })
}) 

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name: "Sam"
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:"404",
        name: "Karan purohit",
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:"404",
        name: "Karan purohit",
        errorMessage:"My 404 page"
    })
})

app.listen(3000,()=> {
    console.log("Port is listening on 3000")
})