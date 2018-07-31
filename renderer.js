// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

db.serialize(function() {
    db.each("SELECT SourceID AS id, SourceEnglish as source FROM Source", function(err, row) {
      console.log(row.id + ": " + row.source);
  });
});
