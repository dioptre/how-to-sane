// api/models/User.js
var bcrypt = require('bcrypt');

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');
_.merge(exports, _super);
_.merge(exports, {
  // Extend with custom logic here by adding additional fields, methods, etc.
    attributes: {

        // Relationships
        posts: {
            collection: 'post',
            via: 'user'
        },
        vendors: {
            collection: 'vendor',
            via: 'user'
        },
        photos: {
            collection: 'photo',
            via: 'user'
        },
        albums: {
            collection: 'album',
            via: 'user'
        },
        statuses: {
            collection: 'status',
            via: 'user'
        },

        events: {
            collection: 'event',
            via: 'users'
        },

        // attributes
        firstName: 'STRING',
        lastName: 'STRING',
        email: {
            type: 'EMAIL', // Email type will get validated by the ORM
            required: true,
            unique: true
        },
        userType: {
            type: 'INTEGER',
            defaultsTo: 0
                // 0=regularuser
                // 1=advanceduser
                // 2=minimalAdmin
                // 3=fullAdmin
        },
        password: {
            type: 'string',
            required: true
        },
        tagline: {
            type: 'string'
        },

        website: {
            type: 'string'
        },


        isAdmin: function() {
            return this.userType == 3;
        },
        userAccess: function() {
            switch (this.userType) {
                case 1:
                    return "Privlidged User";
                case 2:
                    return "Administrator";
                case 3:
                    return "Privlidged Administrator";
                default:
                    return "User";
            }
        },
        toJSON: function() {
            var obj = this.toObject();
            // Remove the password object value
            delete obj.password;
            // return the new object without password
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    //`console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
		    //console.log(user.password);
                    cb(null, user);
                }
            });
        });
    },
    beforeValidation: function(user, cb) {
	if (user.user)
	   _.merge(user, user.user);
	console.log(user);
	cb();
    }
});
