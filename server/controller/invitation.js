var Invitation = require('../models/invitation'),
	shortid = require('shortid');

module.exports = {
	create: function(req, res){
		var invites = [];
		console.log(req.body.count);
		for (var i = 0; i < req.body.count; i++) {
			invites.push({invite: shortid.generate()});
		};
		req.body.invites = invites;
		console.log(req.body);
		var invitation = new Invitation(req.body);
		invitation.save(function(err, data){
			if(err) console.log(err);
			if(data){
				console.log(data);
				res.json(data);
			}
		})
	}
}