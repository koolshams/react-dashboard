import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { TextField } from '../../common/components/form-elements/text-field/text-field';
import { Widget, WidgetMap } from '../interfaces';
import perfWidget from './performance';
import staticWidget from './static';

export const widgets: WidgetMap[] = [perfWidget, staticWidget];

const MAIN_VIEW = 'main';
const FORM_VIEW = 'form';

type WidgetFn = (widget: Widget) => void;
type WidgetIdFn = (widgetId: string) => void;

function renderWidget(widget: Widget) {
  const target = widgets.find(w => w.type === widget.type);
  return target ? <target.main widget={widget} /> : null;
}

function renderWidgetForm(widget: Widget, touched: any, errors: any) {
  const target = widgets.find(w => w.type === widget.type);
  return target ? <target.form touched={touched} errors={errors} /> : null;
}

interface WidgetBaseProps {
  widget: Widget;
  onUpdate: WidgetFn;
  onDelete: WidgetIdFn;
}

const WidgetBase: React.FC<WidgetBaseProps> = ({
  widget,
  onUpdate,
  onDelete,
}) => {
  const [view, setView] = useState(MAIN_VIEW);
  return (
    <>
      <h5 className="card-title">
        {widget.props.title}{' '}
        {view === MAIN_VIEW && (
          <Button
            color="light"
            size="xs"
            className="float-right"
            onMouseDown={evt => {
              evt.stopPropagation();
              setView(FORM_VIEW);
            }}
          >
            <i className="fas fa-cog" />
          </Button>
        )}
      </h5>
      <div className="card-body">
        {view === MAIN_VIEW ? renderWidget(widget) : null}
        {view === FORM_VIEW && (
          <div>
            <Formik
              isInitialValid={false}
              initialValues={widget.props}
              onSubmit={values => {
                const updatedWidget = {
                  ...widget,
                  props: values,
                };
                onUpdate(updatedWidget);
                setView(MAIN_VIEW);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <TextField
                    name="title"
                    type="title"
                    placeholder="Title"
                    title="Title"
                    error={errors.title}
                    touched={touched.title}
                  />
                  {renderWidgetForm(widget, touched, errors)}
                  <button type="submit" className="btn btn-primary mb-2">
                    Save
                  </button>{' '}
                  <button
                    type="button"
                    className="btn btn-light mb-2"
                    onClick={() => setView(MAIN_VIEW)}
                  >
                    Cancel
                  </button>{' '}
                  <button
                    type="button"
                    className="btn btn-danger mb-2"
                    onClick={() => onDelete(widget.id)}
                  >
                    Delete
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
};

export function constructWidget(
  widget: Widget,
  onUpdate: WidgetFn,
  onDelete: WidgetIdFn,
) {
  return (
    <div className="card" key={widget.id} data-grid={widget.position}>
      <WidgetBase widget={widget} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
