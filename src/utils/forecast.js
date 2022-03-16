
const request= require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=eba571fdd07f065545cd7d2afdb18463&query=' + latitude+','+longitude + '&units=m'


    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback("Cannot Connect now",undefined)
         } else if  (body.error){
             callback("unable to find the place",undefined)
         } else {
            const data = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out'
            callback(undefined, data)
         }
})

}

module.exports=forecast