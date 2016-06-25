var token = "";

var     Bot = require("node-telegram-bot-api"),
        bot = new Bot(token, {polling: true}),
        request = require("request"),
        parseString = require('xml2js').parseString,
        fs = require("fs-extra");


var lataus = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
                console.log("content-type:", res.headers["content-type"]);
                console.log("content-length:", res.headers["content-length"]);

                request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
        });
};

var data = "kisu.png";
var data2 = "kisu.gif";

bot.onText(/^\/kissa$/, function (msg) {
        request('http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=jpg', function (error, response, body) {
                var xml = body;
                if (!error && response.statusCode == 200) {
                        parseString(xml, function (err, result) {
                                if (err){
                                    console.log(err);
                                };
                                data = result.response.data[0].images[0].image[0].url;
                                data = data.toString();
                                lataus(data, "kisu.jpg", function(){
                                        console.log("lataus onnistui - jpg");
                                        bot.sendPhoto(chatId, kissa).then(function(){
                                                console.log("Komento /kissa suoritettu.");
                                        });
                                });
                        });
                };
        });
        var chatId = msg.chat.id;
        var kissa = "kisu.jpg";
});

bot.onText(/^\/kissagif$/, function (msg) {
        request('http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=gif', function (error, response, body) {
                var xml = body;
                if (!error && response.statusCode == 200) {
                        parseString(xml, function (err, result) {
                                if (err){
                                    console.log(err);
                                };
                                data = result.response.data[0].images[0].image[0].url;
                                data = data.toString();
                                lataus(data, "kisu.gif", function(){
                                        console.log("lataus onnistui - gif");
                                        bot.sendDocument(chatId, kissa).then(function(){
                                                console.log("Komento /kissagif suoritettu.");
                                        });
                                });
                        });
                };
        });
        var chatId = msg.chat.id;
        var kissa = "kisu.gif";
});

bot.onText(/\/servut$/, function (msg) {
  var chatId = msg.chat.id;
  lataus("http://cache.www.gametracker.com/server_info/77.86.191.54:27032/b_350_20_5A6C3E_383F2D_D2E1B5_2E3226.png", "bhop.png", function(){
      console.log("lataus onnistui - bhop");
      bot.sendPhoto(chatId, kuva, {caption: "join.koodiluola.eu:27032"});
  });
  lataus("http://cache.www.gametracker.com/server_info/77.86.191.54:27029/b_350_20_5A6C3E_383F2D_D2E1B5_2E3226.png", "surf.png", function(){
      console.log("lataus onnistui - surf");
      bot.sendPhoto(chatId, kuva2, {caption: "join.koodiluola.eu:27029"});
  });
  lataus("http://cache.www.gametracker.com/server_info/77.86.191.54:27044/b_350_20_5A6C3E_383F2D_D2E1B5_2E3226.png", "arena.png", function(){
      console.log("lataus onnistui - arena");
      bot.sendPhoto(chatId, kuva3, {caption: "join.koodiluola.eu:27044"});
  });
  lataus("http://cache.www.gametracker.com/server_info/77.86.191.54:27031/b_350_20_5A6C3E_383F2D_D2E1B5_2E3226.png", "jb.png", function(){
      console.log("lataus onnistui - jb");
      bot.sendPhoto(chatId, kuva4, {caption: "join.koodiluola.eu:27031"});
  });
  // From file
  var kuva = "bhop.png",
  kuva2 = "surf.png",
  kuva3 = "arena.png",
  kuva4 = "jb.png",
  kuva5 = "",
  kuva6 = "";
});

bot.onText(/\/help$/, function (msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, "/kissa\n/kissagif\n/servut");
});

console.log("Botti on tulilla.");