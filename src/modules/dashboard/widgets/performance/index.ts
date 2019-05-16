import { PerformanceWidgetForm } from "./performance-widget-form";
import { PerformanceWidget } from "./performance-widget";
import { WidgetTypes } from "../../redux/dashboard-reducer";

export default {
    type: WidgetTypes.PERFORMANCE,
    main: PerformanceWidget,
    form: PerformanceWidgetForm,
    props: {
        title: 'Performance'
    }
}