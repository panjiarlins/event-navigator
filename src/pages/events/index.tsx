import { useRouter } from 'next/router';
import { getAllEvents } from '../../../dummy-data';
import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { GetStaticProps } from 'next';
import { EventType } from '@/helpers/api-util';
import Head from 'next/head';

type EventsPageProps = {
  events: EventType[];
};

export default function EventsPage({ events }: EventsPageProps) {
  const router = useRouter();

  const findEventsHandler = (year: number, month: number): void => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve...."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const events: EventType[] = await getAllEvents();
  return {
    props: { events },
    revalidate: 1800,
  };
};
