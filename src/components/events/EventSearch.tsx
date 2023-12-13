import React, { useRef } from 'react';
import Button from '../ui/Button';
import classes from './EventSearch.module.css';

type EventSearchProps = {
  onSearch: (year: number, month: number) => void;
};

function EventSearch({ onSearch }: EventSearchProps): JSX.Element {
  const yearInputRef = useRef<HTMLSelectElement | null>(null);
  const monthInputRef = useRef<HTMLSelectElement | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;
    if (selectedYear && selectedMonth) {
      onSearch(+selectedYear, +selectedMonth);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select ref={yearInputRef} name="year" id="year">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select ref={monthInputRef} name="month" id="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <Button onClick={() => {}}>Find Events</Button>
      </div>
    </form>
  );
}

export default EventSearch;
