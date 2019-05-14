import React, { useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import uniqid from 'uniqid';
import { TextField } from '../common/components/form-elements/text-field/text-field';
import { Tab } from './redux/dashboard-reducer';

export interface TabFormModalProps {
  open: boolean;
  close: () => void;
  currentValue: {
    id?: string;
    name: string;
  };
  onSubmit: (tab: Tab) => void;
  type: 'ADD' | 'EDIT';
}

export const TabFormModal = ({
  open,
  close,
  type,
  onSubmit,
}: TabFormModalProps) => {
  const formRef: React.MutableRefObject<null | any> = useRef(null);
  return (
    <Modal isOpen={open} toggle={close}>
      <ModalHeader toggle={close}>
        {type === 'ADD' ? 'Add Tab' : 'Edit Tab'}
      </ModalHeader>
      <ModalBody>
        <Formik
          isInitialValid={false}
          ref={node => {
            formRef.current = node as any;
          }}
          initialValues={{
            name: '',
          }}
          validate={values => {
            let errors: { name?: string } = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            return errors;
          }}
          onSubmit={values => {
            const tab = {
              id: uniqid(),
              name: values.name,
            };
            onSubmit(tab);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <TextField
                title="Name"
                name="name"
                type="text"
                placeholder="Name"
                error={errors.name}
                touched={touched.name}
              />
            </Form>
          )}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            if (formRef.current) {
              formRef.current.submitForm();
            }
          }}
        >
          Save
        </Button>{' '}
        <Button color="secondary" onClick={close}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
