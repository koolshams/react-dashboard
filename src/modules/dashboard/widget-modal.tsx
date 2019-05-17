import React, { useState } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { WidgetTypes } from './interfaces';

export interface WidgetModalProps {
  open: boolean;
  close: () => void;
  onSubmit: (type: WidgetTypes) => void;
}

interface WidgetItem {
  title: string;
  description: string;
  type: WidgetTypes;
}

const widgets: WidgetItem[] = [
  {
    title: 'Peformance widget',
    description: 'shows a widget with a chart',
    type: WidgetTypes.PERFORMANCE,
  },
  {
    title: 'Text widget',
    description: 'shows a static text widget',
    type: WidgetTypes.STATIC,
  },
];

const filterFn = (search: string) => (item: WidgetItem) => {
  if (!search) {
    return true;
  }
  return (
    item.title.toLowerCase().indexOf(search.toLocaleLowerCase()) >= 0 ||
    item.description.toLowerCase().indexOf(search.toLocaleLowerCase()) >= 0
  );
};

export const WidgetModal: React.FC<WidgetModalProps> = ({
  open,
  close,
  onSubmit,
}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <Modal isOpen={open} toggle={close}>
      <ModalHeader toggle={close}>Add Widget</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label sm={2}>Search</Label>
            <Col sm={10}>
              <input
                className="form-control"
                type="text"
                name="search"
                value={searchText}
                placeholder="Search"
                onChange={evt => setSearchText(evt.target.value)}
              />
            </Col>
          </FormGroup>
        </Form>
        <ListGroup>
          {widgets.filter(filterFn(searchText)).map(item => (
            <ListGroupItem key={item.type.toString()}>
              <ListGroupItemHeading tag="a" onClick={() => onSubmit(item.type)}>
                {item.title}
              </ListGroupItemHeading>
              <ListGroupItemText>{item.description}</ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
      </ModalBody>
    </Modal>
  );
};
