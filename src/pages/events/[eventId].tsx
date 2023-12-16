import EventSummary from '@/components/events/event-detail/EventSummary';
import EventLogistics from '@/components/events/event-detail/EventLogistics';
import EventContent from '@/components/events/event-detail/EventContent';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { EventType, getAllEvents, getEventById } from '@/helpers/api-util';

type EventDetailPageProps = {
  event: EventType;
};

export default function EventDetailPage({ event }: EventDetailPageProps) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        address={event.location}
        date={event.date}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { eventId } = context.params as { eventId: string };
  const event = await getEventById(eventId);
  if (!event) return { notFound: true };
  return { props: { event } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events: EventType[] = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return { paths, fallback: 'blocking' };
};
