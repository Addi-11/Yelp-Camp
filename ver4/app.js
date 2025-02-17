var express     = require("express"),
        app     = express(), 
   bodyParser   = require("body-parser"),
   mongoose     = require("mongoose"),
   flash        = require("connect-flash"),
   passport     = require("passport"),
   LocalStrategy= require("passport-local"),
   Campground   = require("./models/campgrounds"),
   Comment      = require("./models/comments"),
   methodOverride = require("method-override"),
   User         = require("./models/user"),
   seedDB       = require("./seeds");

//seedDB();

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});   

app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret : "You are a Dumbass",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//to pass the objects into every file
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 



app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(8080,'localhost', function(){
   console.log("Yelp Camp Server has Begun!!");
});