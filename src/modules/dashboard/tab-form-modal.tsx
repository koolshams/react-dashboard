import React, { useRef, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import { TextField } from '../common/components/form-elements/text-field/text-field';

function submitForm(formRef: any) {
  formRef.current.submitForm();
}

export const TabFormModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const formRef = useRef(null);
  return (
    <Modal isOpen={open} toggle={close}>
      <ModalHeader toggle={close}>Add Tab</ModalHeader>
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
            console.log(values);
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
        <Button color="primary" onClick={() => submitForm(formRef)}>
          Save
        </Button>{' '}
        <Button color="secondary" onClick={close}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
