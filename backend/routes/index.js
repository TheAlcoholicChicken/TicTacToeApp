var express = require('express');
var router = express.Router();
var userID = null;
var mongo = require('mongodb');
var monk = require('monk');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  if(userID != null) {
    res.redirect('game');
  } else {
    res.render('index', { title: 'Express' });
  }
});

/*GET Game page. */
router.get('/game', function(req, res) {
  res.render('game', {title: 'Landing Page'});
});

/* GET user ranking page */
router.get('/ranking', function(req, res) {
  var db = req.db;
  var collection = db.get('Player');
  collection.find({}, {}, function(e, docs) {
    // console.log(docs);
    console.log(sortCollection(docs));
    
    res.render('ranking', {
      "ranking" : docs
    })
  });
});

/* GET Userlist Page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('Player');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add New User' });
});

/*POST score*/
router.post('/addscore', function(req, res) {
  var db          = req.db;
  let collection  = db.get('Player');
  let score       = req.body.score;
  let dbscore     = 0;

  //Get the current Highscore of the user logged in.
  collection.findOne({"user_id": userID}, 'data.highscore').then((doc) => {
    dbscore       = doc;
    console.log(doc);
  })

  // If highscore is lower than the score the user got, update db
  if(dbscore < score) {
    if(collection.update({"user_id": userID}, {$set: {"data.highscore":score}})) {
      console.log("app user");
    } else if(collection.update({"core_app_id": userID}, {$set: {"data.highscore":score}})){
      console.log("core app user");
    } else {
      console.log("not found");
    }
  }
  res.redirect('game');
});

/* POST to login service */
/* TODO: fix the query */
router.post('/checkuser', function(req, res) {
  var db = req.db;
  var userEmail = req.body.loginemail;
  var userPassword = req.body.loginpw;
  // db.collection("Player").find({$and: [{data: {email: userEmail}}, {data: {password : userPassword}}]}, function(e, docs) {
  db.collection("Player").find({}, {}, function(e, docs) {  
    docs.forEach(element => {
      if(element.data.email == userEmail && element.data.password == userPassword) {
        console.log("yes");
        db.collection()
        userID = element.user_id;
      } 
    });
    console.log(userID);
    console.log("==========");
    if(userID != null) {
      console.log("You are now logged in");
      res.redirect("game");
    } else {
      console.log("Login failed");
      res.redirect("index");
    }
  });
});

/* POST to Add User Service*/
router.post('/adduser', function(req, res) {

  //Set our interna; db variable
  var db = req.db;

  // Get our form values. 
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  var userPw = req.body.userpw;

  req.checkBody(userEmail, "Enter a valid e-mail address.").isEmail();
  req.checkBody(userName, "Must be 6 or more letters.").isLength(6);
  // Set collection
  var userTable = db.get('Player');

  // Generate random user ID
  userID = generateID();
  //Submit to db
  userTable.insert({
    "user_id" : userID,
    "core_app_id" : null,
    "data": {
      "username" : userName,
      "email" : userEmail,
      "password" : userPw,
      "highscore" : 0,
      "best_ranking": 0
    }

  }, function (err, doc) {
    if(err) {
      res.send("There was a problem adding the information to the database");
    }
    else {
      res.redirect('game');
    }
  });
});

function sortCollection(docs) {
  count = 0;
  if(docs.length <= 1) {
    return docs;
  } else {
    var left = [];
    var right = [];
    var newArr = [];
    var pivot = docs.pop();
    var length = docs.length;

    for(var i = 0; i < length; i++) {
      if(docs[i].data.highscore >= pivot.data.highscore) {
        left.push(docs[i]);
      } else {
        right.push(docs[i]);
      }
    }
    return newArr.concat(sortCollection(left), pivot, sortCollection(right));
  }

}

function generateID() {
  var S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return(S4()+S4()+S4());
};

module.exports = router;