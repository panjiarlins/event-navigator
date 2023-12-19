import React, { useRef } from 'react';
import classes from './NewsLetterRegistration.module.css';

export default function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const registrationHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}
