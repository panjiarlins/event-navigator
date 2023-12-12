import { getFeaturedEvents } from '../../dummy-data';
import EventItem from './EventItem';

type EventListProps = {
  items: ReturnType<typeof getFeaturedEvents>;
};

function EventList({ items }: EventListProps): JSX.Element {
  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
}

export default EventList;
