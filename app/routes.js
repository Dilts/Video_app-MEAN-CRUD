// var mongoose = require('mongoose');
var User = require('../app/models/userschema.js').User;

// ______________________Convert Youtube to embeded _____________________

// var convertYoutubeUrl = function(url){
//   // use regular expression to refine a given url down to the video id only.
//   return url.replace(
//     /(?:[https?:]*\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(\w+)(?:.*)/gi,
//     '$1'
//   )};


// <<<<<<<<<<<<<<<<<<<<< API >>>>>>>>>>>>>>>>>>>>>>

module.exports = function(app) {



// ___________ Get all users in the DB_______________
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


// ____________Create User_____________________
	app.post('/api/users', function (req, res){
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

// _______________Delete an Upload___________________
	app.delete('/api/users/:_id', function (req,res){
		User.findByIdAndRemove(
			req.params._id, 
			function(err){
				if(err){
					res.send(err)
				}
				else{
					return res.send(200);
				}
			}
		);
	});


// _______________Route to update upload info______________________
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

// __________________Comment on Upload________________
	app.post('/api/users/:_id', function(req, res) {
		if(req.body.hasOwnProperty('inform')){
			User.update(
							
				{_id: req.params._id},
				{$push: {inform: {category: req.body.inform.category}}},

				function(err,data) {
					if (err)
						return res.send(err);
					User.find({_id: req.params._id}, function(err,quote) {
						if (err)
							res.send(err)
						return res.send(200, quote);
					})					
				}						
			);
		}
		else if (req.body.hasOwnProperty('comment')){
			console.log('else if hit*******************')
			User.update(	

				{_id: req.params._id},
				{$push: {comments: {name: req.body.name, comment: req.body.comment}}},

				function(err,data) {
				console.log('else if hit*******************')
				
					if (err){
						return res.send(err);
					}
					User.find({_id: req.params._id}, function(err,quote) {
						console.log('check if quote exits', quote)

						if (err){
							res.send(err)
						}
						return res.send(200, quote);
					})	
				}
			);
		}
		else {
			return res.send('Error Error')
		}
	});

	// app.post('/api/users/:_id', function (req, res){
	//     User.addCommentToArticle(req.param('_id'), {
	//         // person: req.param('person'),
	//         text: req.param('comment'),
	//         created_at: new Date()
	//        } , function( error, docs) {
	//            res.redirect('/blog/' + req.param('_id'))
	//        });
	// });


// __________________Define the Application________________
	app.get('/',function(req,res){
		res.sendfile('./public/index.html'); // load single view file (angular will handle the page changes on the front-end)
	});

};

