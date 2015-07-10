/**
* Token.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var moment = require('moment');
module.exports = {
  autoCreatedBy: false,
  attributes: {

    token : { type: 'string',required: true, index:true, unique: true },

    expiry : { type: 'datetime', defaultsTo: function() { return moment().add(2,'h').toDate() }},

    user : { model: 'user' }
  }
};

