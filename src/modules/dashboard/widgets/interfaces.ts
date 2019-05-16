import { Widget, WidgetTypes } from '../redux/dashboard-reducer';

export interface WidgetFormProps {
  errors: any;
  touched: any;
}

export interface WidgetProps {
  widget: Widget;
}

export interface WidgetMap {
  type: WidgetTypes;
  main: React.FunctionComponent<WidgetProps>;
  form: React.FunctionComponent<WidgetFormProps>;
  props: any;
}
