const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./mysqlDao.js');
//const dao = require('./sqliteDao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/whichIsBetter', (request, response)  => {
    
    var result = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/1024px-MarvelLogo.svg.png";

    var rand = Math.random();
    if(rand < .5) {
        result = "https://i.pinimg.com/originals/39/9c/4d/399c4ddbb8b0bca6150195633b4acf37.png";
    }

    response.status(200).send( "<img src='" + result + "' alt='' width='80%'>" );
})

app.get('/gimmeAMeme', (request, response)  => {
      
    response.status(200).send( "<img src='' alt=''>" );
})

app.get('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.insertRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.get('/getRatings', (request, response)  => {
    var str = getRatingsAsHtml();

    response.status(200).send(str);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});