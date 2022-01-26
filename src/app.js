const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define pathes for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Daria Harashchuk' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Daria Harashchuk' });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Message',
    name: 'Daria Harashchuk',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: 'You must provide an address' });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({ forecast: forecastData, location, address });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorText: 'Help Article Not Found',
    name: 'Daria Harashchuk',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorText: 'Not Found',
    name: 'Daria Harashchuk',
  });
});

app.listen(port, () => {
  console.log('Server is up on port' + port);
});
