const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7c136723c373f76dec941cd9148b23e4&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Mapbox', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. Temperature outside is ${body.current.temperature} but it feels like ${body.current.feelslike}. The humidity is ${body.current.humidity}.`
      );
    }
  });
};

module.exports = forecast;
