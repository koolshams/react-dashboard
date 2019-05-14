import React, { useState } from 'react';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import classNames from 'classnames';
import { TabFormModal } from './tab-form-modal';

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  return (
    <div className="dashboard-page">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classNames({ active: activeTab === 0 })}
            onClick={() => {
              setActiveTab(0);
            }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({ active: activeTab === 1 })}
            onClick={() => {
              setActiveTab(1);
            }}
          >
            Moar Tabs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => setFormOpen(true) }>+</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={0}>
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={1}>
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <TabFormModal open={formOpen} close={() => setFormOpen(false)} />
    </div>
  );
};
