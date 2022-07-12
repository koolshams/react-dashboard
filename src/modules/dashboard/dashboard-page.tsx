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
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmModal } from '../common/components/confirm-modal/confirm-modal';
import GridLayout from 'react-grid-layout';

import 'react-resizable/css/styles.css';
import './dashboard.scss';
import { constructWidget, widgets } from './widgets/widget-base';
import { WidgetTypes, Widget, Tab } from './interfaces';
import { EditDeleteMenu } from '../common/components/edit-delete-menu/edit-delete-menu';
import { WidgetModal } from './widget-modal';
import { AppState } from '../../redux-config';
import {
  addTab,
  addWidget,
  deleteTab,
  deleteWidget,
  editTab,
  editWidget,
} from './store/dashboard-slice';

function addWidgetHelper(
  type: WidgetTypes,
  tabId: string,
  addWidget: (widget: Widget) => void,
) {
  const wd = widgets.find((w) => w.type === type);
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

const DashboardPage = ({}) => {
  const [activeTab, setActiveTab] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [tabToDelete, setTabToDelete] = useState<null | Tab>(null);
  const [tabToEdit, setTabToEdit] = useState<null | Tab>(null);
  const [currentWidgets, setCurrentWidgets] = useState<Widget[]>([]);
  const [resizable, setResizable] = useState(false);
  const [widgetModalVisibile, setWidgetModalVisible] = useState(false);

  const tabs = useSelector<AppState, Tab[]>((state) => state.dashboard.tabs);
  const widgets = useSelector<AppState, Widget[]>(
    (state) => state.dashboard.widgets,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!tabs.find((tab) => tab.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    setCurrentWidgets(widgets.filter((w) => w.tabId === activeTab));
  }, [widgets, activeTab]);

  return (
    <div className="dashboard-page">
      <Nav tabs className="dashboard-page--tab-header">
        {tabs.map((tab) => (
          <NavItem key={tab.id}>
            <NavLink
              className={classNames({ active: activeTab === tab.id })}
              onClick={() => {
                setActiveTab(tab.id);
              }}
            >
              {tab.name}{' '}
              <EditDeleteMenu
                onDelete={() => {
                  setTabToDelete(tab);
                }}
                onEdit={() => {
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
            <Button size="sm" onClick={() => setWidgetModalVisible(true)}>
              Add Widget
            </Button>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        {tabs.map((tab) => (
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
                    {currentWidgets.map((widget) =>
                      constructWidget(
                        widget,
                        (widget) => dispatch(editWidget(widget)),
                        (id) => dispatch(deleteWidget(id)),
                      ),
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
        onSubmit={(values) => {
          dispatch(
            addTab({
              ...values,
              id: uniqid(),
            }),
          );
          setShowAddForm(false);
        }}
        open={showAddForm}
        close={() => setShowAddForm(false)}
      />
      {tabToDelete && (
        <ConfirmModal
          onYes={() => {
            dispatch(deleteTab(tabToDelete.id));
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
          onSubmit={(values) => {
            dispatch(
              editTab({
                id: tabToEdit.id,
                ...values,
              }),
            );
            setTabToEdit(null);
          }}
          currentValue={tabToEdit}
          open={!!tabToEdit}
          close={() => setTabToEdit(null)}
        />
      )}
      <WidgetModal
        close={() => setWidgetModalVisible(false)}
        open={widgetModalVisibile}
        onSubmit={(type) => {
          addWidgetHelper(type, activeTab, (widget) =>
            dispatch(addWidget(widget)),
          );
          setWidgetModalVisible(false);
        }}
      />
    </div>
  );
};

export default DashboardPage;
