import React, { useState } from 'react';
import Tab from './Tab';
import S from './Tabs.module.css';

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.initialTab || props.children[0].props.id);
  const children = props.children.filter(child => !!child);

  return (
    <React.Fragment>
      <div className={S.tabsHeader}>
        {children.length > 1 &&
          <ul className={S.tabs} data-cy="tabs">
            {children.map((child) => {
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
        }
        {props.headerContent && <div className={S.headerContent}>
            {props.headerContent}
          </div>
        }
      </div>
      <React.Fragment>
        {children.map((child) => {
          if (!child) return false;
          if (child.props.id !== activeTab) return undefined;
          return child.props.children;
        })}
      </React.Fragment>
    </React.Fragment>
  );
}

export default Tabs;
