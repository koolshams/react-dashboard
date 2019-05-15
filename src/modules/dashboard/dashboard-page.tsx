import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import uniqid from 'uniqid';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { TabFormModal } from './tab-form-modal';
import { Tab, Widget, WidgetTypes } from './redux/dashboard-reducer';
import { connect } from 'react-redux';
import { StoreState } from '../../redux-config';
import { addTab, removeTab, editTab } from './redux/dashboard-actions';
import { TabMenu } from './components/tab-menu';
import { ConfirmModal } from '../common/components/confirm-modal/confirm-modal';
import GridLayout from 'react-grid-layout';

import 'react-resizable/css/styles.css';
import './dashboard.scss';
import { PerformanceWidget } from './widgets/performance-widget';


interface StateProps {
  tabs: Tab[];
  widgets: Widget[];
}

interface DispatchProps {
  onAdd: (tab: Tab) => void;
  onEdit: (tab: Tab) => void;
  onDelete: (tabId: string) => void;
}

interface DashboardProps extends StateProps, DispatchProps {}

const Dashboard: React.FC<DashboardProps> = ({
  tabs,
  widgets,
  onAdd,
  onDelete,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [tabToDelete, setTabToDelete] = useState<null | Tab>(null);
  const [tabToEdit, setTabToEdit] = useState<null | Tab>(null);
  const [currentWidgets, setCurrentWidgets] = useState<Widget[]>([]);
  const [resizable, setResizable] = useState(false);
  const [layout, setLayout] = useState<any[]>([]);

  useEffect(() => {
    if (!tabs.find(tab => tab.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  return (
    <div className="dashboard-page">
      <Nav tabs className="dashboard-page--tab-header">
        {tabs.map(tab => (
          <NavItem key={tab.id}>
            <NavLink
              className={classNames({ active: activeTab === tab.id })}
              onClick={() => {
                setActiveTab(tab.id);
              }}
            >
              {tab.name}{' '}
              <TabMenu
                tab={tab}
                onDelete={tab => {
                  setTabToDelete(tab);
                }}
                onEdit={tab => {
                  setTabToEdit(tab);
                }}
              />
            </NavLink>
          </NavItem>
        ))}
        <NavItem>
          <NavLink
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            +
          </NavLink>
        </NavItem>
        {activeTab && (
          <NavItem className="dashboard-page--tab-actions">
            <Button
              color="light"
              size="sm"
              className={classNames({
                active: resizable,
              })}
              onClick={() => setResizable(!resizable)}
            >
              <i className="fas fa-expand-arrows-alt" />
            </Button>{' '}
            <Button
              size="sm"
              onClick={() => {
                setCurrentWidgets([
                  ...currentWidgets,
                  {
                    id: uniqid(),
                    title: 'Hello',
                    type: WidgetTypes.PERFORMANCE,
                    tabId: activeTab,
                    position: {
                      x: 0,
                      y: 0,
                      w: 5,
                      h: 5
                    },
                    props: {},
                  },
                ]);
              }}
            >
              Add Widget
            </Button>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        {tabs.map(tab => (
          <TabPane tabId={tab.id} key={tab.id}>
            <Row>
              <Col sm="12">
                {activeTab === tab.id && (
                  <GridLayout
                    containerPadding={[15, 15]}
                    draggableHandle=".card-title"
                    cols={24} rowHeight={30} width={window.innerWidth - 50}
                    isResizable={resizable}
                    isDraggable={resizable}
                  >
                    {currentWidgets.map(widget => (
                      <div className="card" key={widget.id} data-grid={widget.position}>
                        <h5 className="card-title">
                          {widget.title}{' '}
                          <Button
                            color="light"
                            size="xs"
                            className="float-right"
                            onMouseDown={evt => evt.stopPropagation()}
                          >
                            <i className="fas fa-cog" />
                          </Button>
                        </h5>
                        <div className="card-body">
                          {widget.type === WidgetTypes.PERFORMANCE && (
                            <PerformanceWidget
                              title={widget.title}
                              props={widget.props}
                            />
                          )}
                          Widget {widget.id} {widget.title}
                        </div>
                      </div>
                    ))}
                  </GridLayout>
                )}
              </Col>
            </Row>
          </TabPane>
        ))}
      </TabContent>
      <TabFormModal
        title="Add Tab"
        onSubmit={values => {
          onAdd({
            ...values,
            id: uniqid(),
          });
          setShowAddForm(false);
        }}
        open={showAddForm}
        close={() => setShowAddForm(false)}
      />
      {tabToDelete && (
        <ConfirmModal
          onYes={() => {
            onDelete(tabToDelete.id);
            setTabToDelete(null);
          }}
          onClose={() => {
            setTabToDelete(null);
          }}
          open={!!tabToDelete}
          title="Warning!!"
          message={`Are you sure to delete this tab: '${tabToDelete.name}'`}
        />
      )}
      {tabToEdit && (
        <TabFormModal
          title={'Edit Tab'}
          onSubmit={values => {
            onEdit({
              id: tabToEdit.id,
              ...values,
            });
            setTabToEdit(null);
          }}
          currentValue={tabToEdit}
          open={!!tabToEdit}
          close={() => setTabToEdit(null)}
        />
      )}
    </div>
  );
};

export const DashboardPage = connect<StateProps, DispatchProps, {}, StoreState>(
  state => ({
    tabs: state.dashboard.tabs,
    widgets: state.dashboard.widgets,
  }),
  {
    onAdd: addTab,
    onDelete: removeTab,
    onEdit: editTab,
  },
)(Dashboard);
