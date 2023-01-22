const express = require('express');
const path = require('path');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weatherApi');

const app = express();

//Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Pratham',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Pratham',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help Page is here ....',
    title: 'Help Page',
    name: 'Pratham',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide the address',
    });
  }

  const place = req.query.address;

  geocode(place, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    weather(
      latitude,
      longitude,
      (error, { weather_type, temperature } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          location: location,
          temperature: temperature,
          forecast: weather_type,
          address: req.query.address,
        });
      }
    );
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Pratham',
    errorMessage: 'Help Article Not Found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Pratham',
    errorMessage: 'Page Not Found',
  });
});

app.listen(3000, () => {
  console.log(
    chalk.green.bold.inverse('Server is running on port 3000 ......')
  );
});
