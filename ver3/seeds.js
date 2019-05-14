var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var campground = [
        {name : "Salmon Creek",  
        image : "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2y0su6ixv655t.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F16115458%2FNorth-Bend-Park-Campground.jpg&f=1",
        description: "blah blah blah"},
        {name : "Garnite Hills", 
        image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1",
        description: "boring blah blah"},// see image url has proxy--beaware if it doesnt work
        {name : "Mountains Goat's Rest", image : "https://media.pitchup.co.uk/images/4/image/private/s--gD9P_NMZ--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1423732353/torrent-walk-campsite/torrent-walk-campsite-camping-near-cadair-idris.jpg",
        description: "super boring blah blah"} 
]

function seedDB(){
    //add few campgrounds 
    campground.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else{
                console.log("added a new camp!");
                //create a comment
                Comment.create({
                    text: "This place is boring awesome",
                    author: "Peter Pan"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created a comment");
                    }
                })
            }
        })
    })

 }


module.exports  = seedDB;

