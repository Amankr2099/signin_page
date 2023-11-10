const express = require('express')
const bodyParser = require('body-parser')
// const request = require('request')
const https = require('https')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("stylings"))

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/home.html")
    
})


app.post("/",function (req,res) {
    var full_name = req.body.full_name
    var house_name = req.body.house_name
    var email_add = req.body.email_add
    var email_password = req.body.email_password
    var data = {
        members : [
            {
                email_address : email_add,
                status : "subscribed",
                merge_fields : {
                    FNAME : full_name,
                    MMERGE6 : house_name,
                    MMERGE7 : email_password
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/b4bbb15aa7"
    const options = {
        method : "POST",
        auth : "akr:rcd7fcf1c88c7439d15fadd08d0b3020e-us21"
    }
    const request = https.request(url,options,function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function (data) {
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData)
    request.end()
    
})

app.listen(3000,function (req,res) {
    console.log("Server initiated");
    
})

//cd7fcf1c88c7439d15fadd08d0b3020e-us21
// b4bbb15aa7