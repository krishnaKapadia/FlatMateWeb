import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


class Calender extends Component {
  // TODO Calendar http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro
  constructor(props) {
    super(props);

    BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

    this.myEventsList = [
      {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 1),
      },
      {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
      }
    ]
  }

  render() {
    return(
      <div>
        <BigCalendar
          events={this.myEventsList}
        />
      </div>
    )
  }

}

export default Calender;
