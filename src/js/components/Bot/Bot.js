// vendors
import React, { useState, useEffect } from 'react';
import Artyom from 'artyom.js';

// functions and components
import StatusDot from '../StatusDot/StatusDot';
import { commands } from './commands';

const Bot = () => {
  const [audioState, setAudioState] = useState(false);
  const [userResponse, setUserResponse] = useState([]);

  // init ben
  const ben = new Artyom();

  // add all the commands to Ben
  ben.addCommands(commands(ben));

  useEffect(() => {
    ben.initialize({
      lang: 'en-GB',
      continuous: true,
      listen: audioState,
      debug: true,
      speed: 1,
    });

    return () => ben;
  }, [audioState]);

  // if Ben is speaking do no listen to any commands
  ben.when('SPEECH_SYNTHESIS_START', () => {
    if (ben.isRecognizing()) {
      ben.dontObey();
    }
  });

  // once Ben is done speaking continue to listen to commands
  ben.when('SPEECH_SYNTHESIS_END', () => {
    if (!ben.isRecognizing() || !ben.isSpeaking()) {
      setTimeout(() => {
        ben.obey();
      }, 2000);
    }
  });

  // wake Ben up
  const wakeUpBen = () => {
    if (!audioState) {
      setAudioState(true);

      // ben.say('Why the hell, did you wake me up? What do you want.');
    } else {
      setAudioState(false);
      ben.shutUp();

      ben.fatality().then(() => {
        console.log('Ben has stopped.');
      });
    }
  };

  return (
    <div className="section">
      <div className="container text-center">
        <h1 className="text--welcome">Yo! This is Ben</h1>
        <p>Want to use Ben? Click the button to wake Ben up.</p>
        <button onClick={(event) => wakeUpBen(event)}>
          {audioState ? 'Put Ben to sleep' : 'Wake Ben up'}
        </button>
        <p>
          {!audioState ? (
            <>
              <StatusDot status="red" /> Off
            </>
          ) : (
            <>
              <StatusDot status="green" /> On
            </>
          )}
        </p>
        {userResponse && (
          <ul>
            {userResponse.map((res, i) => (
              <li key={i}>{res}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bot;
