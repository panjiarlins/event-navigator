import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { EventType, getFilteredEvents } from '@/helpers/api-util';
import { GetServerSideProps } from 'next';

type FilteredEventsPageProps = {
  events: EventType[];
  date: { year: number; month: number };
  hasError: boolean;
};
export default function FilteredEventsPage({
  events,
  date,
  hasError = false,
}: FilteredEventsPageProps) {
  if (hasError) {
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

  if (events.length === 0) {
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
      <ResultsTitle date={new Date(date.year, date.month - 1)} />
      <EventList items={events} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const year = Number(context.params?.slug?.[0]);
  const month = Number(context.params?.slug?.[1]);

  if (
    !year ||
    !month ||
    year < 2021 ||
    year > 2030 ||
    month < 1 ||
    month > 12
  ) {
    return { props: { hasError: true } };
  }

  const events = await getFilteredEvents({ month, year });
  return { props: { events, date: { year, month } } };
};
