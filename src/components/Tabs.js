import React, { useState } from 'react';
import Tab from './Tab';
import S from './Tabs.module.css';

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.initialTab || props.children[0].props.id);

  return (
    <React.Fragment>
      <ul className={S.tabs}>
        {props.children.map((child) => {
          if (!child) return false;
          return (
            <Tab
              isActive={activeTab === child.props.id}
              key={`tab-${child.props.id}`}
              label={child.props.label}
              onClick={() => setActiveTab(child.props.id)}
              icon={child.props.icon}
            />
          );
        })}
      </ul>
      <React.Fragment>
        {props.children.map((child) => {
          if (!child) return false;
          if (child.props.id !== activeTab) return undefined;
          return child.props.children;
        })}
      </React.Fragment>
    </React.Fragment>
  );
}

export default Tabs;
