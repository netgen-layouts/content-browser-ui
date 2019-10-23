import React, { Component } from 'react';
import S from './Dropdown.module.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
    };

    this.dropdownRef = React.createRef();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleDropdown(e) {
    e && e.preventDefault();
    this.state.isOpen ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    this.setState({isOpen: true});
    document.addEventListener('mousedown', this.handleClick, false);
  }

  closeDropdown() {
    this.setState({isOpen: false});
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.dropdownRef.current.contains(e.target)) return;
    this.closeDropdown();
  }

  render() {
    return (
      <div className={S.dropdown} ref={this.dropdownRef} data-cy="dropdown">
        <a href="#/" onClick={this.toggleDropdown} className={S.toggle} data-cy="dropdown-toggle">{this.props.label}{this.props.icon ? this.props.icon : ''}</a>
        {this.state.isOpen && <ul className={S.menu} data-cy="dropdown-menu">{this.props.children}</ul>}
      </div>
    );
  }
}

export default Dropdown;
