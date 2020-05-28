const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=2bce6eacb60c29eb18fe938730c4d48d&query= '+latitude +','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the internet',undefined)
        }
        else if(response.body.error){
            callback('Unable to search',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0]+" The current temperature is "+response.body.current.temperature+".The feels like temperature is "+response.body.current.feelslike)
        }
    })
}


module.exports =forecast