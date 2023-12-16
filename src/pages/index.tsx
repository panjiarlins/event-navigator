import EventList from '@/components/events/EventList';
import { EventType, getFeaturedEvents } from '@/helpers/api-util';
import { GetStaticProps } from 'next';

type HomePageProps = {
  events: EventType[];
};

export default function HomePage({ events }: HomePageProps) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredEvents: EventType[] = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
  };
};
