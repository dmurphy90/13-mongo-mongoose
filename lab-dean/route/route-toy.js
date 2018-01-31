'use strict';

const Toy = require('../model/toy.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {

  router.route('/toy/:_id?')
    .get((req, res) => {
    
      if(req.params._id) {
        return Toy.findById(req.params._id)
          .then(toy => res.status(200).json(toy))
          .catch(err => errorHandler(err, res));
      }

      //handle case of no ID here
    })

    .post(bodyParser, (req, res) => {
      new Toy(req.body).save()
        .then(toy => res.status(201).json(toy))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {

    })
    .delete((req, res) => {

    });
};