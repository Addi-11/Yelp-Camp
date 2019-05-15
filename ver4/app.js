var express     = require("express"),
        app     = express(), 
 bodyParser     = require("body-parser"),
   mongoose     = require("mongoose"),
   Campground   = require("./models/campgrounds"),
   Comment      = require("./models/comments"),
   seedDB       = require("./seeds");

   seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});   



app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


app.get("/",function(req,res){
    res.render("landing"); //'cause of the view engine writing ejs can be avoided  
})


app.get("/campgrounds",function(req,res){
    // get all the campgrounds from db
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("campgrounds/index",{campgrounds:allcampgrounds}); //name of data as to be collected: name of data to be passed
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
    res.render("campgrounds/new");
});

//SHOW ROUTE

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//COMMENT ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground : campground});
        }
    })   
})


app.post("/campgrounds/:id/comments", function(req, res){
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


app.listen(8080,'localhost', function(){
   console.log("Yelp Camp Server has Begun!!");
});