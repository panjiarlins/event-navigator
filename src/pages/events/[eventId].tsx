import EventSummary from '@/components/events/event-detail/EventSummary';
import EventLogistics from '@/components/events/event-detail/EventLogistics';
import EventContent from '@/components/events/event-detail/EventContent';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { EventType, getEventById, getFeaturedEvents } from '@/helpers/api-util';
import Head from 'next/head';

type EventDetailPageProps = {
  event: EventType;
};

export default function EventDetailPage({ event }: EventDetailPageProps) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
  return {
    props: { event },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events: EventType[] = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return { paths, fallback: 'blocking' };
};
