var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');
var shabadContent = {};
var currentLine = 1;

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
    var query = "SELECT ID, Gurmukhi, English, Punjabi FROM Verse WHERE ID IN ("
        + "SELECT VerseID FROM Shabad WHERE ShabadID = (SELECT ShabadID FROM Shabad WHERE VerseID = " + verseId + ") "
        + ")" ;
    var response = "";
    var line = 1;
    var count = 0;
    db.each(query, function(err, row) {
        if (shabadContent.hasOwnProperty(line) !== true) {
            shabadContent[line] = {};
        }

        shabadContent[line][count] = row;
        if (verseId === row.ID) {
            currentLine = line;
        }
        response += "<li class='list-group-item' onclick='showLine(" + line + ")'>" + row.Gurmukhi + "</li>";
        count++;

        if (row.Gurmukhi.indexOf("]1]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]2]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]3]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]4]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]5]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]6]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]7]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]8]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]9]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]10]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]11]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]12]") > 0) {
            line++;
            count = 0;
        }
    }, function() {
        showLine(currentLine);
        $('#shabad-results').html(response);
        $('#shabad-tab').tab('show');
    });
}

function showLine(line) {
    $('#gurmukhi1').html(shabadContent[line][0].Gurmukhi);
    $('#english1').html(shabadContent[line][0].English);
    $('#punjabi1').html(shabadContent[line][0].Punjabi);

    $('#gurmukhi2').html(shabadContent[line][1].Gurmukhi);
    $('#english2').html(shabadContent[line][1].English);
    $('#punjabi2').html(shabadContent[line][1].Punjabi);
}

$('#search-text').keypress(function(e) {
    if(e.which == 13) {
        search();
    }
});