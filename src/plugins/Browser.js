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

    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
    this.el = document.createElement('div');
  }

  open() {
    document.body.appendChild(this.el);
    ReactDOM.render(
      <App
        overrides={this.overrides}
        rootPath={this.rootPath}
        onCancel={this.cancel}
        onConfirm={this.confirm}
        disabledItems={this.disabledItems}
      />,
      this.el
    );
  }

  confirm(data) {
    this.onConfirm && this.onConfirm(data);
    this.close();
  }

  cancel(e) {
    e && e.preventDefault();
    this.onCancel && this.onCancel();
    this.close();
  }

  close() {
    ReactDOM.unmountComponentAtNode(this.el);
    document.body.removeChild(this.el);
  }
}
