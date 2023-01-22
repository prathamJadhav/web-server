const request = require('request');

const weather = (longitude, latitude, callback) => {
  const weatherURL =
    'http://api.weatherstack.com/current?access_key=420893e96d36ca69e81fe0c2c595a40f&query=' +
    longitude +
    ',' +
    latitude;

  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) {
      callback('Unable to fetch weather data!', undefined);
    }else if(response.body.error){
      callback('Unable to fetch weather data!', undefined);
    }else{
      callback(undefined, {
        weather_type : response.body.current.weather_descriptions[0],
        temperature : response.body.current.temperature
      })
    }
  });
};

module.exports = weather;
