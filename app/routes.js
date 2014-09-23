// var mongoose = require('mongoose');
var User = require('../app/models/userschema.js').User;


module.exports = function(app) {

// ________________API______________________

// Display all users in the DB
	app.get('/api/users', function(req, res){
		User.find(function(err, users){
			if (err)
				res.send(err);
		
			return res.json(users);
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
		}, function(err, user){
			if (err){
				return res.send(err);
			}
			// User.find({name: user.name}, function(err, user) {
			// 	if(err){
			// 		return res.send(err);
			// 	}
			// 	console.log('server side: ', user)
				return res.json(user);
			// });	
		});
	});

	app.delete('/api/users/:_id', function (req,res){
		User.findByIdAndRemove(
			req.params._id, 
			function(err){
				if(err)
					res.send(err)
			
				return res.send();
			}
		);
	});

	app.put('/api/users/:user_id', function (req,res){

		User.findOneAndUpdate(req.params._id, function(err, user){
				if(err){
					return res.send(err)
				}
				console.log('user to change', user)
				user.name = req.body.name;
				user.save(function(err){
					if (err){
						return res.send(err)
					}
					res.json(user);
				})
			}
		);
	});



// app
	app.get('/',function(req,res){
		res.sendfile('./public/index.html'); // load single view file
	});

}

