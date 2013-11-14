var express = require('express')
var join = require('path').resolve;
var cwd = process.cwd();
var pkg = require(join(cwd,'package.json'));

var app = module.exports = express();

app.set('views', join(cwd, 'views'))
app.set('view engine', 'jade');
app.use(express.static(cwd));

app.use(function(req, res, next) {
  res.locals({
    app: pkg
  });
  next();
});

app.get('/', function(req, res) {
  res.render('test');
})
