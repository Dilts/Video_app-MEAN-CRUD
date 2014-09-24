// var mongoose = require('mongoose');
var User = require('../app/models/userschema.js').User;


module.exports = function(app) {

// ________________API______________________

// Display all users in the DB
	app.get('/api/users', function(req, res){
		User.find(function(err, users){
			if (err){
				res.send(err);
			}
			else {
				return res.json(users);
			}
		});	
	});


// Create User
	app.post('/api/users', function(req, res){
		console.log('create user post called');
		console.log('req.body: ', req.body);
		User.create({
			name: req.body.name,
		    url: req.body.url,
		    title: req.body.title,
		    desc: req.body.desc,
		    category: req.body.category, 
		}, function(err, user){
			if (err){
				return res.send(err);
			}
			else{
				return res.json(user);
			}
		});
	});

	app.delete('/api/users/:_id', function (req,res){
		User.findByIdAndRemove(
			req.params._id, 
			function(err){
				if(err){
					res.send(err)
				}
				else{
					return res.send();
				}
			}
		);
	});



	app.put('/api/users/:_id', function (req,res){
		console.log(req)
		User.findByIdAndUpdate(req.params._id, req.body.editData, function(err, user){

				if(err){
					return res.send(err);
				}
				else {
					return res.send(200, user);
				}
			}
		);
	});



// app
	app.get('/',function(req,res){
		res.sendfile('./public/index.html'); // load single view file
	});

}

