import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

export default class Browser {
  constructor(opts = {}) {
    this.overrides = opts.overrides || {};
    this.rootPath = opts.rootPath || '';
    this.onCancel = opts.onCancel;
    this.onConfirm = opts.onConfirm;
    this.disabledItems = opts.disabledItems || [];

    this.el = document.createElement('div');
  }

  open() {
    document.body.appendChild(this.el);
    ReactDOM.render(
      <App
        overrides={this.overrides}
        rootPath={this.rootPath}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm.bind(this)}
        disabledItems={this.disabledItems}
      />,
      this.el
    );
  }

  close() {
    ReactDOM.unmountComponentAtNode(this.el);
    document.body.removeChild(this.el);
  }
}
