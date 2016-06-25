var express = require("express"),
    app     = express()
    request = require("request"),
    parseString = require("xml2js").parseString;

app.get("/node", function (req, res){
	res.send("koodiBot on koodiluolan ikioma botti.");
});

app.listen(8080, function(){
	console.log("Nettisivu on tulilla");
});
