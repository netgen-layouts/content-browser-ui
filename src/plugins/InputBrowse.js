import Browser from './Browser';

export default class InputBrowse {
  constructor(el, opts = {}) {
    if (el.dataset.browser) return;
    this.el = el;
    const overrides = {...el.dataset};
    for (const key in overrides) {
      if (overrides[key] === 'false' || overrides[key] === 'true') {
        overrides[key] = overrides[key] === 'true';
      }
    }
    this.overrides = {
      min_selected: 1,
      max_selected: 1,
      ...overrides,
      ...opts.overrides,
    };
    this.selectedItems = [];
    [this.nameEl] = el.getElementsByClassName('js-name');
    [this.valueEl] = el.getElementsByClassName('js-value');
    this.itemType = el.getElementsByClassName('js-item-type')[0].value;
    this.browser = new Browser({
      overrides: this.overrides,
      itemType: this.itemType,
      onCancel: this.cancel.bind(this),
      onConfirm: this.onConfirm.bind(this),
    });

    this.el.dataset.browser = true;

    this.setupEvents();
  }

  setupEvents() {
    [...this.el.getElementsByClassName('js-trigger')].forEach(el => el.addEventListener('click', this.open.bind(this)));
    [...this.el.getElementsByClassName('js-item-type')].forEach(el => el.addEventListener('change', this.changeItemType.bind(this)));
    [...this.el.getElementsByClassName('js-clear')].forEach(el => el.addEventListener('click', this.clear.bind(this)));
  }

  open(e) {
    e && e.preventDefault();
    this.browser.open();
  }

  close() {
    this.browser.close();
  }

  cancel() {
    this.el.dispatchEvent(new CustomEvent('browser:cancel', { bubbles: true, cancelable: true, detail: { instance: this } }));
  }

  changeItemType(e) {
    this.clear();
    this.itemType = e.target.value;
    this.browser.itemType = e.target.value;
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
    this.triggerChangeEvent();
  }

  triggerChangeEvent() {
    this.el.dispatchEvent(new CustomEvent('browser:change', { bubbles: true, cancelable: true, detail: { instance: this } }));
  }
}
