const request = require('request');


const forecast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9e950212144cb84319895eafbdb63af6&query=${lat},${long}&units=m`
 
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('Unable to connect to weather services!',undefined)
       }else if(body.error){
          callback('Unable to find forecast. Try another coordinates',undefined)
       }else{
         let temprature = "The temprature is "+body.current.temperature
          callback(undefined,temprature)
       }
    })
 }

module.exports = forecast;