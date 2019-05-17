export interface Tab {
  id: string;
  name: string;
}

export enum WidgetTypes {
  PERFORMANCE = 'PERFORMANCE',
  STATIC = 'STATIC'
}

export interface Widget {
  id: string;
  tabId: string;
  type: WidgetTypes;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  props: {
    title: string;
    [key: string]: string | number | boolean;
  };
}
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
