const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
session = require('express-session'),
cors = require('cors'),
errorHandler = require('errorhandler'),
mongoose = require('mongoose'),
responseTime= require('response-time');

var swaggerJSDoc = require('swagger-jsdoc'),
expressPaginate = require('express-paginate');
   

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production',
app = express();

var swaggerDefinition = {
    info: {
        title: 'School Rankings API',
        version: '1.0.0',
        description: 'Integrating RESTful API with Swagger',
        termsOfService: '',
        host: '',
        basePath: '/',
    },
    host: 'localhost:8000',
    basePath: '/',
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'school-rankings', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false}));
app.use(expressPaginate.middleware(5, 5));
app.use(responseTime());

if(!isProduction){
    app.use(errorHandler());
}

mongoose.connect("mongodb://srankings:srankings123@ds145750.mlab.com:45750/school-rankings", {useNewUrlParser: true});
mongoose.set('debug', true);



require('./models/Users');
require('./models/Schools');
require('./config/passport');   
app.use(require('./routes'));



if(!isProduction){
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        errors: {
            message: err.message,
            error: {}, 
        },
    });
});

app.use('/api-docs',express.static(path.join(__dirname,'api-docs')));

app.get('/swagger.json', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
    app.listen(8000, () => {
        console.log('Server running on http://localhost:8000/');
    });

