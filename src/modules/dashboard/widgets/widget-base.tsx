import React from 'react';
import { Widget, WidgetTypes } from '../redux/dashboard-reducer';
import { Button } from 'reactstrap';
import { PerformanceWidget } from './performance-widget';

export function constructWidget(widget: Widget) {
  return (
    <div className="card" key={widget.id} data-grid={widget.position}>
      <h5 className="card-title">
        {widget.title}{' '}
        <Button
          color="light"
          size="xs"
          className="float-right"
          onMouseDown={evt => evt.stopPropagation()}
        >
          <i className="fas fa-cog" />
        </Button>
      </h5>
      <div className="card-body">
        {widget.type === WidgetTypes.PERFORMANCE && (
          <PerformanceWidget title={widget.title} props={widget.props} />
        )}
      </div>
    </div>
  );
}
