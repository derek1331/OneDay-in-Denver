import React from "react";
import { Calendar } from "fullcalendar";

class Cal extends React.Component {
  componentDidMount() {
    var calendarEl = document.getElementById("calendar"); // grab element reference

    var calendar = new Calendar(calendarEl, {
      // put your options and callbacks here
      defaultView: "listDay",
      allDaySlot: false,
      nowIndicator: true,
      buttonText: {
        today: "today",
        month: "month",
        week: "week",
        day: "day",
        list: "list"
      },
      columnHeader: false,
      events: [
        {
          title:  'My Event',
          start:  '2018-10-24T14:30:00',
          allDay: false
        }
        // other events here...
      ],

    });


 

    calendar.render();
  }

  render() {
    return <div id="calendar"> </div>;
  }
}

export default Cal;
