var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.static('public'));

app.get('/', function (req, res) {
  //TODO:the address must run under root, need to be figure out.
    res.sendFile(process.cwd() + '/pages/index.html');
})

app.get('/menu', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/menu.html');
})

app.post('/menu/add_type', function (req, res) {
    var data = req.body.cuisine_type_name;
    //add the type name into database
    res.send(data);
})

app.get('/menu_module/static/js/menu.js', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/static/js/menu.js');
})

app.get('/menu_module/static/stylesheets/menu.css', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/static/stylesheets/menu.css');
})

app.get('/process_get', function (req, res) {

    // Prepare output in JSON format
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})