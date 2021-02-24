const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    
    console.log('Connected to SQlite in-memory database');

    var createTable = "CREATE TABLE IF NOT EXISTS rating (ratee VARCHAR(256), stars TINYINT, comment VARCHAR(1024));";
    db.run(createTable, function (e, result) {
     if (e) throw e;

     console.log("Rating table created");
     //console.log(module.exports);
    });
  });

module.exports = {
  deleteRating: function (ratee, stars, comment) {
    db.run("Truncate rating;", 
    function (err, result) {
        if (err) throw err;

        console.log("all records deleted");
    }); 
  },
  
  /* getRatingsAsHtml: function() {
    db.all("SELECT ratee, stars, comment FROM rating;", [], (err, result) => {
      if (err) throw err;

      var table = "<table>";
      for(var n=0; n < result.length; n++) {
        table += "<tr><td>" + result[n].ratee + "</td><td>"
        + result[n].stars + "</td><td>" + result[n].comment + "</td></tr>";
        console.log(result[n]);
      }

      return table + "</table>";
    });
  },  */
  getRatingsAsHtml: function() {
    var sql ="SELECT ratee, stars, comment FROM rating;";
    db.all(sql, [], (err, rows) => {
      if (err) throw err;
  
      rows.forEach((row) => {
        console.log(row.ratee + ", " + row.stars + ", " + row.comment);
      });
    });
  },

  insertRating: function (ratee, stars, comment) {
    db.run("INSERT INTO rating VALUES ( ?, ?, ? )", [ratee, stars, comment], 
    function (err, result) {
        if (err) throw err;

        console.log("1 record inserted: " + ratee + ", " + stars + ", " + comment);
    });    
  }
};
