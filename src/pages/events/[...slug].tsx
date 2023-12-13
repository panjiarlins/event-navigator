import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';

function FilteredEventsPage() {
  const router = useRouter();

  if (!router.query.slug) {
    return <p className="center">Loading....</p>;
  }

  const year = +router.query.slug[0];
  const month = +router.query.slug[1];

  if (
    !year ||
    !month ||
    year < 2021 ||
    year > 2030 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ month, year });

  if (filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
