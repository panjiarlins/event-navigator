import Button from '../ui/Button';
import classes from './ResultsTitle.module.css';

type ResultsTitleProps = {
  date: Date;
};

function ResultsTitle({ date }: ResultsTitleProps): JSX.Element {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1 className="text-xl font-bold mb-4">Events in {formattedDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
