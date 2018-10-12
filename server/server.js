const express = require('express');
const http = require('http');
const cors = require('cors');
var sql = require("mssql");
const app = express();
const server = http.createServer(app);
const router = express.Router();
const bodyParser = require('body-parser');
server.listen(3000);
server.on('listening', () => {
    console.log('Server is listening on port 3000...');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

console.log(cors());

var sqlCredentials = {
    user: 'sa',
    password: 'Welcome@1234',
    server: 'ggku3ser2',
    database: 'SivaDB',

    options: {
        encrypt: true
    }
};

app.get('/liked_videos', function(req, res) {
    new sql.ConnectionPool(sqlCredentials).connect().then(pool => {
        return pool.request().query("select id from Video_Id")}).then(result => {
            res.send(result.recordset);
            sql.close();
        })
});

app.post('/post_likes', function(req, res) {
    new sql.ConnectionPool(sqlCredentials).connect().then(pool => {
        return pool.request().query("insert into Video_Id values('"+req.body.id+"')")
    }).then(results => {
        res.send(JSON.stringify(results));
        sql.close();
    })
});

