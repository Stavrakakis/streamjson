var StreamJSON = (function () {
    
    var JSONStream = require('JSONStream');
    
    function StreamJSON() {
        this.progress = 0;
    }

    StreamJSON.prototype.load = function (url, onprogress) {

        var req = new XMLHttpRequest();

        var self = this;

        req.addEventListener("progress", updateProgress, false);
        req.addEventListener("load", transferComplete, false);
        req.addEventListener("error", transferFailed, false);
        req.addEventListener("abort", transferCancelled, false);

        function updateProgress (oEvent){
            if (oEvent.lengthComputable){
                self.progress = oEvent.loaded / oEvent.total;

                unprocessed = this.responseText.substring(nextReadPos);
                
                var len = unprocessed.length;

                begin = occurences(unprocessed, "{", true);
                end = occurences(unprocessed, "}", true);

                lastBracket = end.indices.length - (begin.count - end.count)-1;
                
                startPos = begin.indices[0];
                endPos = end.indices[lastBracket];        

                if (startPos && endPos){

                    validJSON = unprocessed.substring(startPos,endPos+1);

                    var lastChars = validJSON.substring(validJSON.length-10);
                    parseStream.write("["+validJSON+"]");
                    
                    nextReadPos += endPos+1;
                }
            }
        }


        function transferComplete(evt){
            
        };

        function transferFailed(evt){
            
        };

        function transferCancelled(evt){
            console.log('transfer cancelled');
        };

        req.open('GET', url, true);


        var occurences = function occurrences(string, subString, allowOverlapping){

            string+=""; subString+="";
            if(subString.length<=0) return string.length+1;

            var n=0, pos=0, indices=[];
            var step=(allowOverlapping)?(1):(subString.length);

            while(true){
                pos=string.indexOf(subString,pos);
                if(pos>=0){ indices.push(pos); n++; pos+=1; } else break;
            }
            return({count:n, indices:indices});
        }


        var parseStream = new JSONStream.parse();

        var nextReadPos = 0;
        var begin={},end={},startPos=0,endPos=0, validJSON="", lastBracket=0;
        var unprocessed = "";

        parseStream.on('data', function(obj){
            onprogress(obj, self.progress);
        });


        req.send();

    };

    return StreamJSON;
})();


    

module.exports = StreamJSON;