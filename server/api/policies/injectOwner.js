var jwt = require('jsonwebtoken');
var secret = 'RS#$09qu43f09qfj94qf*&H#(R';
var refreshSecret = 'rw5&&$$2224124f*&H#(R';
var bcrypt = require('bcrypt');
 
module.exports = function (req, res, next) {

            var token, user;

            if (req.headers && req.headers.authorization) {
                var parts = req.headers.authorization.split(' ');
                if (parts.length == 2) {
                    var scheme = parts[0],
                        credentials = parts[1];

                    if (/^Bearer$/i.test(scheme)) {
                        token = credentials;
                    }
                } else {

                }
            }
            var bearerToken, refreshToken;

            bearerToken = jwt.verify(token, secret);
            //refreshToken = jwt.verify(req.body.refresh_token, refreshSecret);
            //console.log(bearerToken);
            //req.body.createdBy = req.user.id;
            Token.find({where : { token: token, user: bearerToken.owner}, limit :1 })
                .exec(function (err, model){
                      if (!err && model.length > 0) {
                        model = req.body[Object.keys(req.body)[0]];
                        console.log(model);
                        model.createdBy = bearerToken.owner;
                        model.owner = bearerToken.owner;
                        next();
                      }
		      else {
			return res.status(403).json({ error: 'Could not authenticate user '+ username });
		      }
                });

        };



