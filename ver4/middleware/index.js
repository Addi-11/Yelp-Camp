var middlewareObj = {};
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var flash        = require("connect-flash");

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error","Comment not found!!")
                res.redirect("back");
            } else{

                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else{
                    req.flash("error","You aren't permitted to do that!!");
                    res.redirect("back");
                }
            } 
            });
        } else{
                req.flash("error","You need to be logged in to do that!!")
                res.redirect("back");
    }        
}

middlewareObj.isLoggedIn = function(req,res, next){ 
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!!");
    res.redirect("/login");
}

module.exports = middlewareObj;
