/* ---------- modules ---------- */
//express
var express = require('express');
var app = express();

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//path
var path = require('path');

//database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authorDB');

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quotes: [{
        id: {type: Number},
        quote: {type: String, required: true, minlength: 3},
        votes: {type: Number, required: false, default: 0}
    }]
}, {timestamps: true})
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

//Angular
app.use(express.static(__dirname + '/authorsAngular/dist'));

/* ---------- Route ---------- */
//get authors
app.get("/authors", (req,res) => {
    Author.find({}, (err, authors) => {
        if(err){
            console.log(err.message);
        } else {
            console.log('result fetch successful');
            res.json(authors);
        }
    })
})

//add new authors
app.post("/newAuthor", (req,res) => {
    var author = new Author({name: req.body.name});
    author.save(function(err){
        if(err){
            console.log('error: unable to add new author');
            res.json(err.message);
        } else {
            console.log('successfully added new author');
            res.json(req.body.name);
        }
    })
});

app.put("/newQuote/:_id", (req,res) => {
    console.log(req.body);
    var newQuote = {id: Math.floor(Math.random() * 1000) + 1, quote: req.body.quote, votes: 0}
    Author.findOneAndUpdate({_id: req.params._id}, {$push: {quotes: newQuote}}, (err, quotes) => {
        if(err){
            console.log(err);
        } else {
            console.log('successfully added new quote');
            res.json({quotes: newQuote});
        }
    })
})


//get author by id
app.get("/authors/:_id", (req,res) => {
    console.log(`fetching author with id, ${req.params._id}`);
    Author.findOne({_id: req.params._id}, (err,author) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(`successfully fetched author with id, ${req.params._id}`);
            res.json(author);
        }
    })
})


//delete author
app.delete("/authors/:id", (req,res) => {
    console.log('initiating removal');
    Author.remove({_id: req.params.id}, (err, authors) => {
        if(err){
            console.log(err.message);
        } else {
            console.log('Successfully removed');
            res.json(authors);
        }
    })
})

//edit author
app.put('/authors/:id', (req, res) => {
    Author.update({_id: req.params.id}, {$set: {name: req.body.name}}, (err, authors) => {
        if(err){
            console.log('ERROR: edit unsuccessful');
        } else {
            console.log('Successfully edited');
        }
    })
})

//upvote quote
app.put('/quotes/:_id', (req,res) => {
    // Author.findOneAndUpdate({_id: req.params.id}, {$set: {quotes: {vote: req.body.}}})
    console.log(req.body);
})


app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./authorsAngular/dist/index.html"))
});


/* ---------- Port ---------- */
app.listen(8000, function(){
    console.log("Authors Project listening on port 8000");
})