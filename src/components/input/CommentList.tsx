import { CommentType } from '@/pages/api/comments/[eventId]';
import classes from './CommentList.module.css';

type CommentListProps = {
  items: CommentType[];
};
export default function CommentList({ items }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
