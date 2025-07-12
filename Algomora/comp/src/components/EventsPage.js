import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import '../components/events.css';
import { getEvents } from '../api/api'; // 👈 matches your `api.js`

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyEvent, setDailyEvent] = useState(null);
  const [userHouse, setUserHouse] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const user = await res.json();
        setUserHouse(user.house);

        document.body.classList.remove('gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff');
        if (user.house) {
          document.body.classList.add(user.house.toLowerCase());
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const matchingEvent = events.find(ev => new Date(ev.date).toDateString() === date.toDateString());
    setDailyEvent(matchingEvent || null);
  };

  return (
    <div className='zoomm-wrapper'>
      <div className="events-container">
        <div className="left-section">
          <div className="top-bar">
            <h2 className="events-title">Competitions & Events</h2>
            <span className="house-icon2" aria-label={`${userHouse} emblem`} />
          </div>
          {events.length === 0 ? (
            <p className="no-events">No events available.</p>
          ) : (
            events.map(ev => (
              <div key={ev._id} className="event-item">
                <div className="line">
                  <h3>{ev.name}</h3>
                  <p>{new Date(ev.date).toDateString()}</p>
                  <p>{ev.shardReward} 𖢻</p>
                  <Link to={`/participate/${ev._id}`} className="solve-button">Participate</Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="right-section">
          <Calendar onClickDay={handleDateClick} value={selectedDate} />
          {dailyEvent && (
            <div className="daily-event">
              <h3>Event on {selectedDate.toDateString()}</h3>
              <p><strong>{dailyEvent.name}</strong></p>
              <p>{dailyEvent.description}</p>
              <p>Reward: {dailyEvent.shardReward} 𖢻</p>
              <Link to={`/participate/${dailyEvent._id}`} className="solve-button">Participate</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;