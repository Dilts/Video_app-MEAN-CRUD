// var mongoose = require('mongoose');
var User = require('../app/models/userschema.js').User;


module.exports = function(app) {

// ________________API______________________

// Display all users in the DB
	app.get('/api/user', function(req, res){
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




// app
	app.get('/',function(req,res){
		res.sendfile('./public/index.html'); // load single view file
	});

}





// var indexController = {

// exports.updateUser = function(req, res){
// 	console.log('Body is', req.body)

// 	var user2 = req.body;
// 	console.log(user2.name)

// 	user.findOneAndUpdate({name: user2.name},user2, function(err, update){
// 	if(err){
// 		return res.send(500, err);

// 	}

// 	if(!update){
// 		return res.send(404);
// 	}

// 	return res.send(200, update);
// 	});
// }

// };

// module.exports = indexController;a



// var indexController = {
// 	index: function(req, res) {
// 		res.render('index');
// 	},

// 	createUpload: function(req, res) {
// 	console.log(req.body)


//     var user = new userModel({
// 	    name: req.body.name,
// 	    url: req.body.url,
// 	    title: req.body.title,
// 	    desc: req.body.desc,
// 	    });  	
    
//     // req.user.name = req.body.name,
//     // req.user.url = req.body.url,
//     // req.user.title = req.body.title,
//     // req.user.desc = req.body.desc,

//     console.log(user)

//     user.create(user, function(err, doc) {
//     	if (err) {
//     		console.log('error not saving', err)
//     		res.send(404, 'did not save')
//     	}
//     	res.send(200)
//     }) 

//     // res.render('index', req)

// 	},