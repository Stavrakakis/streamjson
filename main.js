
var StreamJSON = require('./StreamJSON');

var streamer = new StreamJSON();

streamer.load('/results.json', function(newdata, progress){
    
    console.log(Math.round(progress*100)+"%");
});