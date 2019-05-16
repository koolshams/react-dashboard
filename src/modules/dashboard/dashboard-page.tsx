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
import {
  addTab,
  removeTab,
  editTab,
  addWidget,
  editWidget,
  removeWidget,
} from './redux/dashboard-actions';
import { TabMenu } from './components/tab-menu/tab-menu';
import { ConfirmModal } from '../common/components/confirm-modal/confirm-modal';
import GridLayout from 'react-grid-layout';

import 'react-resizable/css/styles.css';
import './dashboard.scss';
import { constructWidget, widgets } from './widgets/widget-base';

interface StateProps {
  tabs: Tab[];
  widgets: Widget[];
}

interface DispatchProps {
  onAddTab: (tab: Tab) => void;
  onEditTab: (tab: Tab) => void;
  onDeleteTab: (tabId: string) => void;
  onAddWidget: (widget: Widget) => void;
  onEditWidget: (widget: Widget) => void;
  onDeleteWidget: (widgetId: string) => void;
}

interface DashboardProps extends StateProps, DispatchProps {}

function addWidgetHelper(
  type: WidgetTypes,
  tabId: string,
  addWidget: (widget: Widget) => void,
) {
  const wd = widgets.find(w => w.type === type);
  if (wd) {
    const widget: Widget = {
      tabId,
      id: uniqid(),
      type: type,
      position: {
        x: 0,
        y: 0,
        w: 8,
        h: 8,
      },
      props: wd.props,
    };
    addWidget(widget);
  }
}

const Dashboard: React.FC<DashboardProps> = ({
  tabs,
  widgets,
  onAddTab,
  onEditTab,
  onDeleteTab,
  onAddWidget,
  onEditWidget,
  onDeleteWidget,
}) => {
  const [activeTab, setActiveTab] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [tabToDelete, setTabToDelete] = useState<null | Tab>(null);
  const [tabToEdit, setTabToEdit] = useState<null | Tab>(null);
  const [currentWidgets, setCurrentWidgets] = useState<Widget[]>([]);
  const [resizable, setResizable] = useState(false);

  useEffect(() => {
    if (!tabs.find(tab => tab.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    setCurrentWidgets(widgets.filter(w => w.tabId === activeTab));
  }, [widgets, activeTab]);

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
                addWidgetHelper(
                  WidgetTypes.PERFORMANCE,
                  activeTab,
                  onAddWidget,
                );
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
                    cols={24}
                    rowHeight={30}
                    width={window.innerWidth - 50}
                    isResizable={resizable}
                    isDraggable={resizable}
                  >
                    {currentWidgets.map(widget =>
                      constructWidget(widget, onEditWidget, onDeleteWidget),
                    )}
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
          onAddTab({
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
            onDeleteTab(tabToDelete.id);
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
            onEditTab({
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
    onAddTab: addTab,
    onDeleteTab: removeTab,
    onEditTab: editTab,
    onAddWidget: addWidget,
    onEditWidget: editWidget,
    onDeleteWidget: removeWidget,
  },
)(Dashboard);
