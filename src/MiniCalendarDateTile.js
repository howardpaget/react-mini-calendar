import React, { Component } from 'react';
import moment from 'moment'
import './MiniCalendarDateTile.css';

class MiniCalendarDateTile extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className="weekday-column date-tile"
            onClick={d => {if(this.props.onClick) this.props.onClick(this.props.date) }}>
        <div className={(this.props.highlight ? "date-highlight" : "content") + " " + (this.props.highlightToday && (moment(this.props.date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) ? "highlight-today" : "") }>
          {moment(this.props.date).format('D')}
        </div>
      </div>
    );
  }
}

export default MiniCalendarDateTile;
