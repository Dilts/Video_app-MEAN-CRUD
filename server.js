
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app		 	   = express();					 // create our app w/ express
var mongoose 	   = require('mongoose');			 // mongoose for mongo



// Connect to mongoDB
mongoose.connect('mongodb://localhost/ct-app-db');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


// app.put('/users', indexController.updateUser);


require('./app/routes')(app);



var server = app.listen(6189, function() {
	console.log('Express server listening on port ' + server.address().port);
});


