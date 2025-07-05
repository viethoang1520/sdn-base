const express = require("express");
const path = require("path");
const routes = require("./routes");
const session = require('express-session');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser');

require('dotenv').config();
const mongoDB = require('./config/db/mongoDB')
const app = express();

mongoDB.connect()

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));


app.get('/', (req, res) => {
  console.log('Hit / ')
  res.render('home');
});

routes(app);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`);
});

