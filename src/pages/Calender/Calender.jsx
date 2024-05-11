import { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Paper, Stack, Button, Modal } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";


function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    setClickedEvent(clickInfo.event);
    setConfirmationModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (clickedEvent) {
      clickedEvent.remove();
      setConfirmationModalOpen(false);
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const createEventId = () => {
    return String(Date.now());
  };

  return (
    <Stack direction={"row"}>
      <Paper className="demo-app-sidebar">
        <h2 style={{ textAlign: "center" }}>
          All Events ({currentEvents.length})
        </h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </Paper>

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
      <Modal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
      >
        <Paper>
          <h2>Confirm Event Deletion</h2>
          <p>
            Are you sure you want to delete the event "
            {clickedEvent ? clickedEvent.title : ""}
            "?
          </p>
          <Button onClick={handleDeleteEvent}>Delete</Button>
          <Button onClick={() => setConfirmationModalOpen(false)}>
            Cancel
          </Button>
        </Paper>
      </Modal>
    </Stack>
  );
};

export default Calendar;
