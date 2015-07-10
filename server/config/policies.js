/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */
var jwt = require('jsonwebtoken');
var secret = 'RS#$09qu43f09qfj94qf*&H#(R';
var refreshSecret = 'rw5&&$$2224124f*&H#(R';
var bcrypt = require('bcrypt');

module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions (`true` allows public     *
     * access)                                                                  *
     *                                                                          *
     ***************************************************************************/

//    '*': "hasToken",

'*': [
    'basicAuth',
    'passport',
    'sessionAuth',
    'hasToken',
    'ModelPolicy',
    'AuditPolicy',
    'OwnerPolicy',
    'PermissionPolicy',
    'RolePolicy',
    'CriteriaPolicy'
  ],

  AuthController: {
    '*': [ 'passport' ]
  },

    AppController: {
        'serve': true
    },
    PageController: {
        "find": true,
    },
    UserController: {
        "create": true
    },


    PostController: {
	"create" : [
       function (req, res, next) {

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
	    	});

        }

	, true],
	"find" : true,
    },

//    AuthController: {
//        '*': true,
//    }

    /***************************************************************************
     *                                                                          *
     * Here's an example of mapping some policies to run before a controller    *
     * and its actions                                                          *
     *                                                                          *
     ***************************************************************************/
    // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture  : 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
    // }

};

