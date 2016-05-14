var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

var posts = [
  {
    _id: 1,
    name: 'Angular',
    website: 'https://angular.io/',
    description: 'Angular is a development platform for building mobile and desktop web applications.'
  },
  {
    _id: 2,
    name: 'RxJs',
    website: 'http://reactivex.io/',
    description: 'Reactive Extensions (Rx) is a library for composing asynchronous and event-based programs using observable sequences and LINQ-style query operators.'
  },
  {
    _id: 3,
    name: 'Babel',
    website: 'https://babeljs.io/',
    description: 'Babel is a compiler for writing next generation JavaScript.'
  }
];
app.get('/posts', function(req, res) {
  res.send(posts);
});


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8181, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8181');
});
