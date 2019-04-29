import { htmlParser } from '../helpers';
import Browser from './Browser';

export default class MultipleBrowse {
  constructor(el, opts = {}) {
    this.el = el;
    this.overrides = {
      min_selected: 1,
      max_selected: 0,
      ...el.dataset,
      ...opts.overrides,
    };
    [this.valueEl] = el.getElementsByClassName('js-value');
    this.rootPath = el.getElementsByClassName('js-config-name')[0].value;
    this.input_template = el.dataset.browserPrototype;
    [this.itemsEl] = el.getElementsByClassName('items');
    this.selectedItems = this.getPreselectedItems();
    this.browser = new Browser({
      overrides: this.overrides,
      rootPath: this.rootPath,
      onCancel: this.cancel.bind(this),
      onConfirm: this.onConfirm.bind(this),
      disabledItems: this.selectedItems.map(item => item.value),
    });

    this.setupEvents();
  }

  setupEvents() {
    [...this.el.getElementsByClassName('js-trigger')].forEach(el => el.addEventListener('click', this.openBrowser.bind(this)));
    [...this.el.getElementsByClassName('js-config-name')].forEach(el => el.addEventListener('change', this.changeRootPath.bind(this)));
    [...this.el.getElementsByClassName('js-clear')].forEach(el => el.addEventListener('click', this.clear.bind(this)));
    this.el.addEventListener('click', (e) => {
      if (e.target.closest('.js-remove')) {
        this.removeItem(e);
      }
    });
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
    [...this.itemsEl.getElementsByClassName('item')].forEach(itemEl => {
      this.itemsEl.removeChild(itemEl);
    });
    this.toggleEmptyMsg();
    this.triggerChangeEvent();
  }

  onConfirm(selected) {
    this.selectedItems = this.selectedItems.concat(selected);
    this.renderAddedItems(selected);
    this.toggleEmptyMsg();
    this.closeBrowser();
    this.triggerChangeEvent();
  }

  renderAddedItems(items) {
    items.forEach(item => this.itemsEl.appendChild(this.renderItem(item)));
  }

  renderItem(item) {
    const newItem = htmlParser(this.input_template.replace(/__name__/g, item.value))[0];
    newItem.getElementsByClassName('name')[0].innerHTML = item.name;
    newItem.getElementsByTagName('INPUT')[0].value = item.value;
    return newItem;
  }

  closeBrowser() {
    this.browser.close();
  }

  triggerChangeEvent() {
    this.browser.disabledItems = this.selectedItems.map(item => item.value);
    this.el.dispatchEvent(new CustomEvent('browser:change', { bubbles: true, cancelable: true, detail: { instance: this } }));
  }

  removeItem(e) {
    e.preventDefault();
    const itemEl = e.target.closest('.item');
    const id = parseInt(itemEl.getElementsByTagName('INPUT')[0].value, 10);
    this.itemsEl.removeChild(itemEl);
    this.selectedItems = this.selectedItems.filter(item => item.value !== id);
    this.toggleEmptyMsg();
    this.triggerChangeEvent();
  }

  toggleEmptyMsg() {
    this.selectedItems.length ? this.el.classList.remove('items-empty') : this.el.classList.add('items-empty');
  }

  getPreselectedItems() {
    return [...this.itemsEl.getElementsByTagName('INPUT')].map(input => {
      return {value: parseInt(input.value, 10)};
    });
  }
}
