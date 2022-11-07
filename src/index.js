const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Shukla123:Shukla123@cluster0.vyd2nui.mongodb.net", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(
    function (req, res, next) {
        now = new Date()
        // <--------------ong code of getting IST----------------> 
        // currentDate = now.getFullYear() + "-"
        // + (now.getMonth()+1)  + "-" 
        // + now.getDate()

        // currentTime =  now.getHours() + ":"  
        // + now.getMinutes() + ":" 
        // + now.getSeconds()


        //<--------------- Short Code of Getting IST--------------->
        let currentDate = new Date().toJSON().slice(0, 10);
        // let currentTime = new Date().toJSON().slice(11, 20); // GST
        var ISToffSet = 330;
        offset = ISToffSet * 60 * 1000;
        currentTime = new Date(now.getTime() + offset).toJSON().slice(11, 20)
        GetIp = req.ip       // get Ip Address 
        GEtURL = req.url     //Get Router Location
        console.log(currentDate, currentTime, ",", GetIp, ",", GEtURL)
        next()

    }
);


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});