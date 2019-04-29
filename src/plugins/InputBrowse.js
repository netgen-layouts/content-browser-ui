import Browser from './Browser';

export default class InputBrowse {
  constructor(el, opts = {}) {
    this.el = el;
    this.overrides = {
      min_selected: 1,
      max_selected: 1,
      ...el.dataset,
      ...opts.overrides,
    };
    this.selectedItems = [];
    [this.nameEl] = el.getElementsByClassName('js-name');
    [this.valueEl] = el.getElementsByClassName('js-value');
    this.rootPath = el.getElementsByClassName('js-config-name')[0].value;
    this.browser = new Browser({
      overrides: this.overrides,
      rootPath: this.rootPath,
      onCancel: this.cancel.bind(this),
      onConfirm: this.onConfirm.bind(this),
    });

    this.setupEvents();
  }

  setupEvents() {
    [...this.el.getElementsByClassName('js-trigger')].forEach(el => el.addEventListener('click', this.openBrowser.bind(this)));
    [...this.el.getElementsByClassName('js-config-name')].forEach(el => el.addEventListener('change', this.changeRootPath.bind(this)));
    [...this.el.getElementsByClassName('js-clear')].forEach(el => el.addEventListener('click', this.clear.bind(this)));
  }

  openBrowser(e) {
    e && e.preventDefault();
    this.browser.open();
  }

  changeRootPath(e) {
    this.clear();
    this.rootPath = e.target.value;
    this.browser.rootPath = e.target.value;
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
    this.triggerChangeEvent();
  }

  onConfirm(selected) {
    this.selectedItems = selected;
    this.nameEl.innerHTML = selected[0].name;
    this.valueEl.value = selected[0].value;
    this.el.classList.remove('item-empty');
    this.closeBrowser();
    this.triggerChangeEvent();
  }

  triggerChangeEvent() {
    this.el.dispatchEvent(new CustomEvent('browser:change', { bubbles: true, cancelable: true, detail: { instance: this } }));
  }

  closeBrowser() {
    this.browser.close();
  }
}
