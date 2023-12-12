import { getFeaturedEvents } from '../../../dummy-data';
import classes from './EventItem.module.css';
import Button from '../ui/Button';
import CalendarIcon from '../icons/CalendarIcon';
import MapPinIcon from '../icons/MapPinIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

type EventItemProps = {
  item: ReturnType<typeof getFeaturedEvents>[number];
};

function EventItem({
  item: { id, title, image, date, location },
}: EventItemProps): JSX.Element {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  return (
    <li className={classes.item}>
      {/* <Image loader={() => image} src={image} alt={title} fill /> */}
      <img src={image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2 className="text-lg font-bold">{title}</h2>
          <div className={classes.date}>
            <CalendarIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <MapPinIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
