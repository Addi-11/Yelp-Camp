var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds.js");
var user = require("../models/user.js");
var middlewareObj = require("../middleware/index.js");

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

router.post("/campgrounds",middlewareObj.isLoggedIn,function(req,res){

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

router.get("/campgrounds/new",middlewareObj.isLoggedIn, function(req,res){
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
  
    if(req.isAuthenticated()){
        Campground.findById(req.params.id , function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds");
            } else{
                console.log(foundCampground.author.id);
                console.log(req.user._id);
                //does the user own the campground
                //if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit", {campground : foundCampground});
               /* } else {
                    res.send("not allowed");
                }*/
            }
        })
    } else {
        console.log("YOU GOTTA LOGIN TO DO THAT!!");
        res.send("YOU GOTTA LOGIN TO DO THAT!!");
    }
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

//DESTROY ROUTE
router.delete("/campgrounds/:id", function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else
            res.redirect("/campgrounds");
    })
})



module.exports = router;
