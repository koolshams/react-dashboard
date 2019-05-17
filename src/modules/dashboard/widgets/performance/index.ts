import { PerformanceWidgetForm } from "./performance-widget-form";
import { PerformanceWidget } from "./performance-widget";
import { WidgetTypes } from "../../interfaces";

export default {
    type: WidgetTypes.PERFORMANCE,
    main: PerformanceWidget,
    form: PerformanceWidgetForm,
    props: {
        title: 'Performance'
    }
}