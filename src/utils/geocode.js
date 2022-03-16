const request= require('request')


const geocode = (address,callback) => {

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGl0dG9wYWNoZW4iLCJhIjoiY2t6M3VuNWp6MDBmdDJzbGk5OG8zYWU2bCJ9.maGBD7au1PA2eqVvj4TzSA'
    request({url,json:true},(error,{body})=>{
        if (error) {
           callback("Cannot Connect now",undefined)
        } else if  (body.features.length===0){
            callback("unable to find the place",undefined)
        } else {
        
            const latitude =body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined,{
                latitude : latitude,
                longitude: longitude,
                location : location}
                )
        }
    })

}

module.exports=geocode