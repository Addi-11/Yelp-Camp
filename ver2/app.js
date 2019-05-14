var express = require("express"),
        app = express(), 
 bodyParser = require("body-parser"),
   mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});   

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

// SCHEMA SETUP
var capmpgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", capmpgroundSchema);

/*Campground.create({
    name : "Garnite Hills", 
    image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1",
    description:"This is great Granite hill with no bathrooms, no water, Beautiful granite and a real adventure site"
}, function(err, campground){
    if(err){
        console.log(err);
    } else{
        console.log(" NEWL CREATED CAPGROUND: ");
        console.log(campground);
    }
})*/


app.get("/",function(req,res){
    res.render("landing"); //'cause of the view engine writing ejs can be avoided  
})

/*var campgrounds = [
    {name : "Salmon Creek",  image : "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2y0su6ixv655t.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F16115458%2FNorth-Bend-Park-Campground.jpg&f=1"},
    {name : "Garnite Hills", image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1"},// see image url has proxy--beaware if it doesnt work
    {name : "Mountains Goat's Rest", image : "https://media.pitchup.co.uk/images/4/image/private/s--gD9P_NMZ--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1423732353/torrent-walk-campsite/torrent-walk-campsite-camping-near-cadair-idris.jpg"},
    {name : "Salmon Creek",  image : "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2y0su6ixv655t.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F16115458%2FNorth-Bend-Park-Campground.jpg&f=1"},
    {name : "Garnite Hills", image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1"},// see image url has proxy--beaware if it doesnt work
    {name : "Mountains Goat's Rest", image : "https://media.pitchup.co.uk/images/4/image/private/s--gD9P_NMZ--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1423732353/torrent-walk-campsite/torrent-walk-campsite-camping-near-cadair-idris.jpg"},
    {name : "Salmon Creek",  image : "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2y0su6ixv655t.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F16115458%2FNorth-Bend-Park-Campground.jpg&f=1"},
    {name : "Garnite Hills", image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1"},// see image url has proxy--beaware if it doesnt work
    {name : "Mountains Goat's Rest", image : "https://media.pitchup.co.uk/images/4/image/private/s--gD9P_NMZ--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1423732353/torrent-walk-campsite/torrent-walk-campsite-camping-near-cadair-idris.jpg"},
    {name : "Salmon Creek",  image : "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2y0su6ixv655t.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F16115458%2FNorth-Bend-Park-Campground.jpg&f=1"},
    {name : "Garnite Hills", image :"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fbutterloving.files.wordpress.com%2F2013%2F04%2Finks-lake-state-park-007.jpg&f=1"},// see image url has proxy--beaware if it doesnt work
    {name : "Mountains Goat's Rest", image : "https://media.pitchup.co.uk/images/4/image/private/s--gD9P_NMZ--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1423732353/torrent-walk-campsite/torrent-walk-campsite-camping-near-cadair-idris.jpg"}
    
]*/ 

app.get("/campgrounds",function(req,res){
    // get all the campgrounds from db
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("index",{campgrounds:allcampgrounds}); //name of data as to be collected: name of data to be passed
        }
    })
});

app.post("/campgrounds",function(req,res){

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

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
})
app.listen(8080,'localhost', function(){
   console.log("Yelp Camp Server has Begun!!");
});