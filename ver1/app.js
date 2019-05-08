var express =require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("landing"); //'cause of the view engine writing ejs can be avoided  
})

app.get("/campgrounds",function(req,res){
     var campgrounds = [
         {name : "Salmon Creek",  image : "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2y0su6ixv655t.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F16115458%2FNorth-Bend-Park-Campground.jpg&f=1"},
         {name : "Garnite Hills", image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1"},// see image url has proxy--beaware if it doesnt work
         {name : "Mountains Goat's Rest", image : "https://media.pitchup.co.uk/images/4/image/private/s--gD9P_NMZ--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1423732353/torrent-walk-campsite/torrent-walk-campsite-camping-near-cadair-idris.jpg"}
     ]

     res.render("campgrounds",{campgrounds:campgrounds}); //name of data as to be collected: name of data to be passed
})

app.post("/campgrounds",function(){
    //add data to the campgrounds array
    //redirect back to campgrounds page

})

app.listen(8080,'localhost', function(){
   console.log("Yelp Camp Server has Begun!!");
});