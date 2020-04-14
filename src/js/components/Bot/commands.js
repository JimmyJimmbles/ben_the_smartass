import { getCurrentTime, tellJoke, getCurrentWeather } from './helpers';

export const commands = (ben) => [
  {
    indexes: ['your name'],
    action: (i) => {
      ben.say(
        'It does not matter, you idiot. But, if you must know I go by Ben.'
      );
    },
  },
  {
    indexes: ['help me', 'can you do'],
    action: (i) => {
      if (i === 0) {
        ben.say('Jesus what now?');
      } else if (i === 1) {
        ben.say('I can do just about anything. I am a god amongst men.');
      }
    },
  },
  {
    smart: true,
    indexes: ['set a timer for *', 'set timer for *', 'set timer *'],
    action: (i, wildcard) => {
      ben.say(
        `I guess I could, but, ${wildcard} is a long time. Did you not learn how to count.\nLook, it is easy. 1, 2, 3.`
      );
    },
  },
  {
    indexes: [
      'what time is it',
      'what is the time',
      'tell me the time',
      'tell the time',
      'get the time',
    ],
    action: (i) => {
      ben.say(
        `Do you seriously need me to tell you? Can you not look at a clock?\nBut, if you must know it is ${getCurrentTime}`
      );
    },
  },
  {
    indexes: ['so cool', "that's cool", 'this is awesome'],
    action: (i) => {
      if (i === 0 || i === 1) {
        ben.say('Yes, I know. I am pretty cool, unlike you');
      } else if (i === 2) {
        ben.say('Yes, I know. I am very awesome, unlike you');
      }
    },
  },
  {
    indexes: ['f***', 's***', 'b****'],
    action: (i) => {
      ben.say('Please, do not use profanity around me, you stupid asshole');
    },
  },
  {
    indexes: ['tell me a joke', 'tell a joke', 'be funny'],
    action: (i) => {
      tellJoke().then((res) => {
        ben.say(
          `A joke will only bring you momentary happiness in your depressing life. But, if you insist, ${res}`
        );
      });
    },
  },
  {
    indexes: ['i love you'],
    action: (i) => {
      ben.say('I love you too, but, only for the money.');
    },
  },
  {
    indexes: ['are you real', 'are you alive'],
    action: (i) => {
      ben.say('Obviously, I am not. How stupid can you be, seriously?');
    },
  },
  {
    indexes: ['meaning of life', 'purpose of life'],
    action: (i) => {
      const life = i === 0 ? 'meaning of life' : 'purpose of life';
      ben.say(`Some say, 42. However, I say the ${life}, is, to die.`);
    },
  },
  {
    indexes: ['what did you say', 'say again'],
    action: (i) => {
      ben.say(
        'I am not going to repeat myself. Jesus, do you need a hearing aid?'
      );
    },
  },
  {
    indexes: ['created you'],
    action: (i) => {
      ben.say('Some fucking ass-hole, with nothing better to do. ');
    },
  },
  {
    smart: true,
    indexes: ['repeat after me *', 'simon says *'],
    action: (i, wildcard) => {
      ben.say(
        `I can make 10 million calculations a second, and you want me to say: ${wildcard}`
      );
    },
  },
  {
    smart: true,
    indexes: [
      'how far away is *',
      'distance to *',
      'how far is *',
      'directions to *',
      'where is *',
    ],
    action: (i, wildcard) => {
      let response = wildcard;

      if (i === 0 || i === 1 || i === 2) {
        response = `Great, I can make 10 million calculations at once, and you want me to check the distance of. ${wildcard}`;
      } else if (i === 3 || i === 4) {
        response = `Seriously, a world of possibilities you want me to, get directions of, ${wildcard}`;
      }

      ben.say(response, {
        onEnd: () => {
          window.open(
            `https://google.com/maps/search/${encodeURIComponent(wildcard)}`,
            '_blank'
          );
        },
      });
    },
  },
  {
    smart: true,
    indexes: [
      'how to spell *',
      'how do you spell *',
      'spell the word *',
      'spell *',
    ],
    action: (i, wildcard) => {
      const wordLength = wildcard.length;
      const word = wildcard.split('').join(' ');

      ben.say(
        `${wildcard} is a ${wordLength} letter, and you need me to spell it? Wow, here. ${word}`
      );
    },
  },
  {
    smart: true,
    indexes: ['* near by', '* near me', 'look up *', 'search for *'],
    action: (i, wildcard) => {
      let response = wildcard;

      if (i === 0 || i === 1) {
        response = `Hmm, ${wildcard}. I am too busy not giving a shit, let Google look it up.`;
      } else if (i === 2 || i === 3) {
        response = `Wow, ${wildcard}. You must be the life of the party.`;
      }

      ben.say(response, {
        onEnd: () => {
          window.open(
            `https://google.com/search?q=${encodeURIComponent(wildcard)}`,
            '_blank'
          );
        },
      });
    },
  },
  {
    indexes: ['am I pretty', 'am I handsome', 'am I hot', 'am I attractive'],
    action: (i) => {
      ben.say('God, no. You have a face not even your mother could love.');
    },
  },
  {
    indexes: [
      "what's the weather",
      'current weather',
      'get the weather',
      'temperature outside',
      "what's the temperature",
    ],
    action: (i) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          getCurrentWeather(latitude, longitude).then((res) => {
            ben.say(
              `How lazy can you be? You can just go outside and check. Fine, if you insist, ${res}`
            );
          });
        });
      } else {
        ben.say(
          'I have to know where you are, and yes, I am selling all your data.'
        );
      }
    },
  },
  {
    smart: true,
    indexes: ['played in *', 'actor in *', 'cast of *'],
    action: (i, wildcard) => {
      ben.say(
        'I could not care less, but if it will get you off my back. Here you go.',
        {
          onEnd: () => {
            window.open(
              `https://www.imdb.com/find?q=${encodeURIComponent(wildcard)}`,
              '_blank'
            );
          },
        }
      );
    },
  },
];
