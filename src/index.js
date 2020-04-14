import React from 'react';
import ReactDOM from 'react-dom';
import { Bot } from './js/components/Bot';

// styles
import './scss/index.scss';

const app = document.getElementById('main-app');
app ? ReactDOM.render(<Bot />, app) : false;
