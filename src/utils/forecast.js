const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = "https://api.darksky.net/forecast/cd7ebecdd360ed70db1a91ed873cdbf1/" + latitude + "," + longitude + "?units=si";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + " Current temperature is " + body.currently.temperature + "°C. There is a " + (body.currently.precipProbability * 100).toFixed() + "% chance of rain.");
    }
  });
}

module.exports = forecast;