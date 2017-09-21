function loadStopWordsToDB(inputFile) {
    MongoClient.connect("mongodb://localhost:27017/local", function (err, db) {
        var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
     
        rl.on('line', function (line) {
            db.collection("stopWords").insertOne({
                "value": line
            });
        });
        
        rl.on('close', function (line) {
            console.log('done.');
        });
    });
}
loadStopWordsToDB('stopwords.txt');