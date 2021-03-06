var express = require("express");
var router = express.Router();

//allow usage of database via sequelizer
var models = require("../models");
var User = models.User;
var Profile = models.Profile;
var sequelize = models.sequelize;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/search", function(req, res, next) {
  res.render("search", {profiles: []});
});

router.post("/search", function(req, res, next) {
  console.log("post" + req.body.age + req.body.gender + req.body.city);

  Profile.findAll({
    where: {
      $and: [
        {age: req.body.age},
        {gender: req.body.gender},
        {city: req.body.city}
      ]
    },
    include: [{model: User}]
  }).then(result => {
    console.log("this is the profiles/result: " + result);
    res.render("search", {profiles: result});
  });
});

router.get("/:id", function(req, res, next) {
  User.findById(req.params.id, {
    include: [{model: Profile}]
  })
    .then(user => {
      res.render("profile", {user: user, profile: user.Profile});
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
