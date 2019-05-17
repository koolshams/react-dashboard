import { WidgetTypes } from '../../interfaces';
import { StaticWidget } from './static-widget';
import { StaticWidgetForm } from './static-widget-form';

export default {
  type: WidgetTypes.STATIC,
  main: StaticWidget,
  form: StaticWidgetForm,
  props: {
    title: 'Static Caption',
    text: 'static text',
  },
};
