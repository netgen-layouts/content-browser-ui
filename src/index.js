import 'babel-polyfill';
import './index.css';
import './fonts.css';
import InputBrowse from './plugins/InputBrowse';
import MultipleBrowse from './plugins/MultipleBrowse';
import Browser from './plugins/Browser';
import * as serviceWorker from './serviceWorker';

window.addEventListener('load', () => {
  [...document.getElementsByClassName('js-input-browse')].forEach(el => new InputBrowse(el));
  [...document.getElementsByClassName('js-multiple-browse')].forEach(el => new MultipleBrowse(el));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { InputBrowse, MultipleBrowse, Browser };
