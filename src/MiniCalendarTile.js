import React, { Component } from 'react';
import moment from 'moment'
import './MiniCalendarTile.css';

class MiniCalendarTile extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className={"weekday-column " + this.props.classes}
            onClick={this.props.onClick}>
        <div className="content">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default MiniCalendarTile;
