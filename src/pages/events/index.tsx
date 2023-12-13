import { useRouter } from 'next/router';
import { getAllEvents } from '../../../dummy-data';
import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';

function EventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year: number, month: number): void => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default EventsPage;
