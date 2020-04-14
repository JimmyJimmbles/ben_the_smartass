import axios from 'axios';

export const getCurrentTime = () => {
  let date = new Date();
  const hours = date.getHours() > 10 ? date.getHours() - 12 : '';
  const minutes = date.getMinutes() < 10 ? '0' : '' + date.getMinutes();
  const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${hours} ${minutes} ${amPm}`;
};

export const tellJoke = () => {
  return axios
    .get('https://official-joke-api.appspot.com/random_joke')
    .then((res) => {
      const { punchline, setup } = res.data;

      return `${setup}, ${punchline}`;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCurrentWeather = (latitude, longitude) =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=57db87e3da278b47605fa197743709db`
    )
    .then((res) => {
      const {
        data: {
          main: { temp, feels_like },
          weather,
        },
      } = res;
      const temperature = Math.floor(temp);
      const feelsLike = Math.floor(feels_like);
      let filler = '';

      if (feelsLike <= 45) {
        filler = 'In other words, cold as hell.';
      } else if (feelsLike <= 65) {
        filler = 'Perfect weather to go outside and leave me alone.';
      } else if (feelsLike >= 90) {
        filler = 'Also known as, hotter than hell.';
      }

      return `It is ${temperature}, but feels like ${feelsLike}. With ${weather[0].description}. ${filler}`;
    });
