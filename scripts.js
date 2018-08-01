var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');
var lineNo;

function search() {
    var query = "SELECT ID, Gurmukhi FROM Verse WHERE FirstLetterEng like '%" + $('#search-text').val() + "%'" ;
    var response = "";
    db.each(query, function(err, row) {
        response += "<li class='list-group-item' onclick='showShabad(" + row.ID + ")'>" + row.Gurmukhi + "</li>";
    }, function() {
        $('#search-results').html(response);
    });
}

function showShabad(verseId) {
    var query = "SELECT ID, Gurmukhi FROM Verse WHERE ID IN ("
        + "SELECT VerseID FROM Shabad WHERE ShabadID = (SELECT ShabadID FROM Shabad WHERE VerseID = " + verseId + ") "
        + ")" ;
    var response = "";
    db.each(query, function(err, row) {
        if (verseId === row.ID) {
            
        }
        response += "<li class='list-group-item' onclick='showLine(" + row.ID + ")'>" + row.Gurmukhi + "</li>";
    }, function() {
        $('#shabad-results').html(response);
    });
}

$('#search-text').keypress(function(e) {
    if(e.which == 13) {
        search();
    }
});