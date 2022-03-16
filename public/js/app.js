console.log('Loaded Javascript')




const weatherForm=document.querySelector("form")
const search=document.querySelector("input")
const message1=document.querySelector("#message-1")
const message2=document.querySelector("#message-2")

weatherForm.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    const location = search.value;
    const url='http://localhost:3000/weather?address='+location;
    console.log(url)
    message1.textContent="Loading"
    message2.textContent=""
    fetch(url).then((response)=> {
        response.json().then((data)=> {
            if(data.error) {
                console.log(data.error)
                message1.textContent=data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                message1.textContent=data.location
                message2.textContent=data.forecast
            }
            
        })
        })

})