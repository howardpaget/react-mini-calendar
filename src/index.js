import React, { Component } from 'react';
import moment from 'moment'
import MiniCalendarTile from './MiniCalendarTile'
import MiniCalendarDateTile from './MiniCalendarDateTile'
import './index.css';

class MiniCalendar extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.setDate((this.props ? this.props.date : null) || new Date());
  }

  componentWillReceiveProps(props) {
    this.setDate((props ? props.date : null) || new Date());
  }

  setDate(date) {
    let startOfMonth = moment(date).startOf('month').toDate();
    let endOfMonth = moment(date).endOf('month').toDate();
    let daysInMonth = moment(endOfMonth).diff(moment(startOfMonth), 'days') + 1;
    let paddingBeginning = (startOfMonth.getDay() + 6) % 7;
    let paddingEnd = Math.ceil((daysInMonth + paddingBeginning) / 7) * 7 - daysInMonth - paddingBeginning;
    let dates = [...Array(daysInMonth).keys()].map(e => moment(startOfMonth).add(e, 'days').toDate());

    this.setState({
      startOfMonth: startOfMonth,
      endOfMonth: endOfMonth,
      daysInMonth: daysInMonth,
      paddingBeginning: paddingBeginning,
      paddingEnd: paddingEnd,
      dates: dates
    });
  }

  render() {

    let navigationBackYear, navigationBackMonth, navigationForwardYear, navigationForwardMonth;

    if(this.props.showNavigation) {
      navigationBackYear = <MiniCalendarTile classes="calendar-title-button" content="&laquo;" onClick={e => this.setDate(moment(this.state.startOfMonth).subtract(1, 'year').toDate())}/>;
      navigationBackMonth = <MiniCalendarTile classes="calendar-title-button" content="&lsaquo;" onClick={e => this.setDate(moment(this.state.startOfMonth).subtract(1, 'month').toDate())}/>;
      navigationForwardYear = <MiniCalendarTile classes="calendar-title-button" content="&raquo;" onClick={e => this.setDate(moment(this.state.startOfMonth).add(1, 'year').toDate())}/>; 
      navigationForwardMonth = <MiniCalendarTile classes="calendar-title-button" content="&rsaquo;" onClick={e => this.setDate(moment(this.state.startOfMonth).add(1, 'month').toDate())}/>; 
    }

    return (
      <div className="calendar-container">
        
        {navigationBackYear}
        {navigationBackMonth}

        <MiniCalendarTile classes={this.props.showNavigation ? "calendar-title" : "calendar-title-full"} onClick={e => {if(this.props.showNavigation) this.setDate(new Date())}} content={moment(this.state.startOfMonth).format('MMMM YYYY')}/>

        {navigationForwardMonth}
        {navigationForwardYear}

        <MiniCalendarTile classes="calendar-weekday-heading" content="MON"/>
        <MiniCalendarTile classes="calendar-weekday-heading" content="TUE"/>
        <MiniCalendarTile classes="calendar-weekday-heading" content="WED"/>
        <MiniCalendarTile classes="calendar-weekday-heading" content="THU"/>
        <MiniCalendarTile classes="calendar-weekday-heading" content="FRI"/>
        <MiniCalendarTile classes="calendar-weekday-heading" content="SAT"/>
        <MiniCalendarTile classes="calendar-weekday-heading" content="SUN"/>

        {[...Array(this.state.paddingBeginning)].map(e => <MiniCalendarTile key={e} content="&nbsp;"/>)}

        {this.state.dates.map(
          e => <MiniCalendarDateTile onClick={this.props.onClick} key={e} date={e} highlightToday={this.props.highlightToday} highlight={this.props.dates ? this.props.dates.some(d => d.getYear() === e.getYear() && d.getMonth() === e.getMonth() && d.getDate() === e.getDate()) : false } />)}

        {[...Array(this.state.paddingEnd)].map(e => <MiniCalendarTile key={e} content="&nbsp;"/>)}
      </div>
    );
  }
}

export default MiniCalendar;
