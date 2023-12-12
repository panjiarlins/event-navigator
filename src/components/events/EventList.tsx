import { getFeaturedEvents } from '../../../dummy-data';
import EventItem from './EventItem';
import classes from './EventList.module.css';

type EventListProps = {
  items: ReturnType<typeof getFeaturedEvents>;
};

function EventList({ items }: EventListProps): JSX.Element {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
}

export default EventList;
