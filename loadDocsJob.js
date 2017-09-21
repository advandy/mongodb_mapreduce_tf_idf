var fs = require('fs'),

var MongoClient = require('mongodb').MongoClient;

function loadDocsToDB(file) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect("mongodb://localhost:27017/local", function (err, db) {
            var readFileStream = fs.createReadStream(file);
            readFileStream.on('data', function(chunk) {
                var outStr = chunk.toString().toLowerCase();
                outStr = outStr.replace(/ +(?= )/g,'').trim();
                outStr = outStr.replace(/[^a-zA-Z ]/g, ' ');
                var arr = outStr.split(" ");
                var aPromises = [];
                for (var i = 0; i < arr.length; i++) {
                    aPromises.push(new Promise(function(resolve, reject) {
                        (function(i) {
                            db.collection("stopWords").find({value: arr[i]}).toArray(function(err, result) {
                                if (result.length > 0) {
                                    resolve(i);
                                }
                                resolve();
                            })
                        }(i));
                    }));
                }

                Promise.all(aPromises).then(function(values) {
                    for (var i = values.length - 1; i > 0; i--) {
                        if (values[i]) {
                            arr.splice(values[i], 1);
                        }
                    }
                    outStr = arr.join(" ");
                    db.collection("sourceData").insertOne({
                        "doc": file,
                        "content": outStr
                    }, function(err, result) {
                        console.log(file + " done");
                        resolve();
                    })
                });
            });
        });
    })
}

loadDocsToDB("text1.txt").then(loadDocsToDB.bind(null, "text2.txt")).then(loadDocsToDB.bind(null,"text3.txt"));
