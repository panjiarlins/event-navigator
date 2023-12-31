import CalendarIcon from '@/components/icons/CalendarIcon';
import MapPinIcon from '@/components/icons/MapPinIcon';
import LogisticsItem from './LogisticsItem';
import classes from './EventLogistics.module.css';
import Image from 'next/image';

type EventLogisticsProps = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

function EventLogistics({
  date,
  address,
  image,
  imageAlt,
}: EventLogisticsProps): JSX.Element {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image
          src={image}
          alt={imageAlt}
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={CalendarIcon}>
          <time>{formattedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={MapPinIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
