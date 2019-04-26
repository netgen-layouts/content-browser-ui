import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Browser {
  constructor(el) {
    this.el = el;
    this.min_selected = el.dataset.min_selected ? parseInt(el.dataset.min_selected, 10) : 1;
    this.max_selected = el.dataset.max_selected ? parseInt(el.dataset.max_selected, 10) : 1;
    this.startLocation = el.dataset.start_location ? parseInt(el.dataset.start_location, 10) : null;
    this.selectedItems = [];
    [this.nameEl] = el.getElementsByClassName('js-name');
    [this.valueEl] = el.getElementsByClassName('js-value');
    this.rootPath = el.getElementsByClassName('js-config-name')[0].value;
    this.browserEl = document.createElement('div');

    this.init();
    console.log(this);
  }

  init() {
    this.el.appendChild(this.browserEl);
    this.setupEvents();
  }

  setupEvents() {
    [...this.el.getElementsByClassName('js-trigger')].forEach(el => el.addEventListener('click', this.openBrowser.bind(this)));
    [...this.el.getElementsByClassName('js-config-name')].forEach(el => el.addEventListener('change', this.changeRootPath.bind(this)));
    [...this.el.getElementsByClassName('js-clear')].forEach(el => el.addEventListener('click', this.clear.bind(this)));
  }

  openBrowser(e) {
    e && e.preventDefault();
    ReactDOM.render(
      <App
        min_selected={this.min_selected}
        max_selected={this.max_selected}
        startLocation={this.startLocation}
        onCancel={this.cancel.bind(this)}
        onConfirm={this.onConfirm.bind(this)}
        rootPath={this.rootPath}
      />,
      this.browserEl
    );
  }

  changeRootPath(e) {
    this.clear();
    this.rootPath = e.target.value;
  }

  cancel(e) {
    e && e.preventDefault();
    this.closeBrowser();
  }

  clear() {
    this.selectedItems = [];
    this.nameEl.innerHTML = this.nameEl.dataset.emptyNote;
    this.valueEl.value = '';
    this.el.classList.add('item-empty');
  }

  onConfirm(selected) {
    this.selectedItems = selected;
    this.nameEl.innerHTML = selected[0].name;
    this.valueEl.value = selected[0].value;
    this.el.classList.remove('item-empty');
    this.closeBrowser();
  }

  closeBrowser() {
    ReactDOM.unmountComponentAtNode(this.browserEl);
  }
}

[...document.getElementsByClassName('js-input-browse')].forEach(el => new Browser(el));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
