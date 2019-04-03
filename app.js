var express = require("express" );
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cons = require("consolidate");

var app = express();


app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));



app.get('/', function(req, res){
    res.render('index');
    console.log("Index Page loading");
    });

app.get('/about', function(req, res){
        res.render('about')
        console.log("About Us Page loading");
        });

app.get('/contact', function(req, res){
    res.render('contact');
    console.log("Contact Us Page loading");
            });

app.post('/contact/send', function(req, res){
    
    var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'alapativasu@hotmail.com',
            pass: ''
        }
    });
    var mailOptions = {
                from: 'Neeraja <alapativasu@hotmail.com>',
                to: 'alapativasu@gmail.com',
                subject: 'Website Submission',
                text: 'You have a message with following Details.. Name: '+req.body.name + 'Email: '+req.body.email+ 'Message: '+req.body.message,
                html:'<p>You have a message with following Details.. </p><ul><li> Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };
    transporter.sendMail(mailOptions,function(error,info){
         if(error){
             console.log(error);
             res.redirect('/');
         }else {
             console.log('Message Sent: '+info.response);
             res.redirect('/');
         }
    });
           });
    app.listen(3000);

    console.log("server running on port 3000");
