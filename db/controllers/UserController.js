var mongoose = require("mongoose");
var User = mongoose.model("User");

var userController = {};

userController.list = function(req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("./users/index", {users: users});
    }
  });
};


userController.show = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("./users/show", {user: user});
    }
  });
};

userController.create = function(req, res) {
  res.render("./users/create");
};

userController.save = function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if(err) {
      console.log(err);
      res.render("./users/create");
    } else {
      console.log("Successfully created an user.");
      res.redirect("/users/show/"+user._id);
    }
  });
};

userController.edit = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("./users/edit", {user: user});
    }
  });
};

userController.update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, {
    $set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
  }, { new: true }, function (err, user) {

    if (err) {
      console.log(err);
      res.render("./users/edit", {user: req.body});
    }

    res.redirect("/users/show/"+user._id);
  });
};

userController.delete = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("User deleted!");
      res.redirect("/users");
    }
  });
};

module.exports = userController;
