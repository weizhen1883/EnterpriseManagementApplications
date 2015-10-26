var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/test');

var cuisine = {
    Name: String,
    price: Number,
    description: String,
    image: String
}

var typeSchema = {
  Name: String,
  cuisines: [cuisine]
};

var Type = mongoose.model('type', typeSchema,'Types');

// var typeData = {name: 1};

// var type = new Type(typeData);

// type.save( function(error, data){
//     if(error){
//         //res.json(error);
//         console.log(error);
//     }
//     else{
//       console.log(data.name);
//     }
// });

app.get('/Types',function(req,res){
    Type.find(function(err,doc){
    // console.log("The found value is " + doc);
    res.send(doc);
  });
})

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
    var newType = new Type({Name:data,cuisines:[]});
    newType.save( function(error, data){
      if(error){
        //res.json(error);
        console.log(error);
      }else{
      console.log(data.Name);
      }
    });
    res.redirect('/menu');
})

app.post('/menu/add_cuisine', function (req, res){
    var multiparty = require('multiparty');
    var form = new multiparty.Form();
    res.send(req.body.cuisine_name_en);
    form.parse(req, function (err, fields, files){
      var img = files.imageFile[0];
      var fs = require('fs');
      fs.readFile(img.path, function (err, data){
          var path = "./pages/menu_module/static/src/" + img.originalFilename;
          fs.writeFile(path, data, function (err){
            if(err) console.log(err);
        });
      });
      // var cuisine = {
      //   Name: req.body.cuisine_name_en,
      //   price: req.body.cuisine_retailPrice,
      //   description:req.body.cuisine_description_en,
      //   image:"./pages/menu_module/static/src/" + img.originalFilename
      // };

    //   Type.findOneAndUpdate(
    //   { Name: req.body.cuisine_typeID },
    //   { $push: { cuisines: cuisine }},
    //   { safe: true, upsert: true },
    //   function(err, blogModels) {
    //     if(err) console(err);
    //     });
    });
  });

app.get('/menu_module/static/js/menu.js', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/static/js/menu.js');
})

app.get('/menu_module/static/js/app.js', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/static/js/app.js');
})

app.get('/menu_module/static/js/controller.js', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/static/js/controller.js');
})

app.get('/menu_module/static/js/service/Types.js', function (req, res) {
    res.sendFile(process.cwd() + '/pages/menu_module/static/js/service/Types.js');
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