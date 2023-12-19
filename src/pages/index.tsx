import EventList from '@/components/events/EventList';
import NewsletterRegistration from '@/components/input/NewsLetterRegistration';
import { EventType, getFeaturedEvents } from '@/helpers/api-util';
import { GetStaticProps } from 'next';
import Head from 'next/head';

type HomePageProps = {
  events: EventType[];
};

export default function HomePage({ events }: HomePageProps) {
  return (
    <div>
      <Head>
        <title>Event Navigator</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve...."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredEvents: EventType[] = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
};
