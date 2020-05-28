const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'/templates/views')
const partialsPath=path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jatin Sethi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jatin Sethi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Can you see me ?',
        name:'Jatin Sethi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
      return  res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                address:req.query.address,
                forecast:forecastData,
                location:data.location
            })

        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jatin Sethi',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jatin Sethi',
        errorMessage: 'Page Not found!'

    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})