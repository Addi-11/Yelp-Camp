var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds.js");

router.get("/campgrounds",function(req,res){
    
    // get all the campgrounds from db
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser :req.user}); //name of data as to be collected: name of data to be passed
        }
    })
});

router.post("/campgrounds",isLoggedIn,function(req,res){

    //add data to the campgrounds db
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name, image : image, description : desc}
    
    Campground.create(newCampground, function(err , newlyCreated){
        if(err){
            console.log(err);
        } else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW ROUTE

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//EDIT ROUTE
router.get("/campgrounds/:id/edit",function(req,res){
    Campground.findById(req.params.id , function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    })
});

//UPDATE ROUTE
router.put("/campgrounds/:id", function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
            console.log(err);
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
})

//middleware
function isLoggedIn(req,res, next){ 
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
