import React, { useState, useCallback } from 'react';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classNames from 'classnames';
import { TabFormModal } from './tab-form-modal';
import { Tab } from './redux/dashboard-reducer';
import { connect } from 'react-redux';
import { StoreState } from '../../redux-config';
import { addTab } from './redux/dashboard-actions';

interface StateProps {
  tabs: Tab[];
}

interface DispatchProps {
  onAdd: (tab: Tab) => void;
}

interface DashboardProps extends StateProps, DispatchProps {}

const Dashboard: React.FC<DashboardProps> = ({ tabs, onAdd }) => {
  const [activeTab, setActiveTab] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState<'ADD' | 'EDIT'>('ADD');
  const [currentTab, setCurrentTab] = useState({ name: '' });
  useCallback(() => {
    console.log('callback called');
    if (!tabs.find(tab => tab.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);
  return (
    <div className="dashboard-page">
      <Nav tabs>
        {tabs.map(tab => (
          <NavItem key={tab.id}>
            <NavLink
              className={classNames({ active: activeTab === tab.id })}
              onClick={() => {
                setActiveTab(tab.id);
              }}
            >
              {tab.name}
            </NavLink>
          </NavItem>
        ))}
        <NavItem>
          <NavLink
            onClick={() => {
              setFormOpen(true);
              setFormType('ADD');
              setCurrentTab({
                name: '',
              });
            }}
          >
            +
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {tabs.map(tab => (
          <TabPane tabId={tab.id} key={tab.id}>
            <Row>
              <Col sm="12">
                <h4>{tab.name} Contents</h4>
              </Col>
            </Row>
          </TabPane>
        ))}
      </TabContent>
      <TabFormModal
        type={formType}
        onSubmit={tab => {
          setFormOpen(false);
          if (formType === 'ADD') {
            onAdd(tab);
          }
        }}
        currentValue={currentTab}
        open={formOpen}
        close={() => setFormOpen(false)}
      />
    </div>
  );
};

export const DashboardPage = connect<StateProps, DispatchProps, {}, StoreState>(
  state => ({
    tabs: state.dashboard.tabs,
  }),
  {
    onAdd: addTab,
  },
)(Dashboard);
