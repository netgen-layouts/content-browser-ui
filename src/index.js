import 'babel-polyfill';
import './index.css';
import './fonts.css';
import InputBrowse from './plugins/InputBrowse';
import MultipleBrowse from './plugins/MultipleBrowse';
import Browser from './plugins/Browser';

window.addEventListener('load', () => {
  [...document.getElementsByClassName('js-input-browse')].forEach(el => new InputBrowse(el));
  [...document.getElementsByClassName('js-multiple-browse')].forEach(el => new MultipleBrowse(el));
});

export { InputBrowse, MultipleBrowse, Browser };
