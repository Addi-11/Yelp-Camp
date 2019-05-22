var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
//COMMENT ROUTES


//new
router.get("/campgrounds/:id/comments/new", isLoggedIn,function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground : campground});
        }
    })   
})

//create
router.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username  = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/"+ campground._id);
                }
            })
        }
    })
})

//edit
router.get("/campgrounds/:id/comments/:comment_id/edit",function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("/campgrounds/:id")
        } else {
    res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
        }
    })
})

//update
router.put("/campgrounds/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



function isLoggedIn(req,res, next){ 
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;