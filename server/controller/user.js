var User = require('../models/user');
var Invitation = require('../models/invitation');

module.exports = {
	register: function(req, res){

		var user = new User(req.body);
		saved = false;
		var cb = function(){
			saved = true;
		}
		Invitation.findOne({email: req.body.email}, function(err, data){
			if(err) console.log(err);
			if(data){
				for (var i = 0; i < data.invites.length; i++) {
					if(req.body.inviteCode == data.invites[i].invite)
					{
						user.save(function(err, data){
							console.log('error hai'+ err);
							console.log('data hai'+ data);
							if(err) console.log(err);
							if(data) {
								saved = true;
								cb();
								res.json(200, data);
								return;
							}
						});
					}
				};
			}
		})
	}
}