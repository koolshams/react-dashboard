import React, { useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik';
import { TextField } from '../common/components/form-elements/text-field/text-field';

interface FormType  {
  name: string
}

export interface TabFormModalProps {
  open: boolean;
  close: () => void;
  currentValue?: FormType;
  onSubmit: (tab: FormType) => void;
  title: string;
}

export const TabFormModal = ({
  open,
  close,
  currentValue,
  title,
  onSubmit,
}: TabFormModalProps) => {
  const formRef: React.MutableRefObject<null | any> = useRef(null);
  return (
    <Modal isOpen={open} toggle={close}>
      <ModalHeader toggle={close}>
        {title}
      </ModalHeader>
      <ModalBody>
        <Formik
          isInitialValid={false}
          ref={node => {
            formRef.current = node as any;
          }}
          initialValues={{
            name: currentValue ? currentValue.name : '',
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
