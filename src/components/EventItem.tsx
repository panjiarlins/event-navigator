import Link from 'next/link';
import { getFeaturedEvents } from '../../dummy-data';
import Image from 'next/image';

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
    <li>
      <Image loader={() => image} src={image} alt={title} fill />
      <div>
        <h2>Title</h2>
        <div>
          <time>{formattedDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
        <div>
          <Link href={`/events/${id}`}>Explore event</Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
