import { FormEvent, useContext, useRef } from 'react';
import axios from 'axios';
import { NotificationContext } from '@/store/notification-context';
import classes from './NewsLetterRegistration.module.css';

export default function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const enteredEmail = emailInputRef.current?.value;

      notificationCtx.showNotification({
        title: 'Signing up....',
        message: 'Registering for newsletter',
        status: 'pending',
      });

      await axios({
        url: '/api/newsletter',
        method: 'post',
        data: { email: enteredEmail },
      });

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
    } catch (error: any) {
      notificationCtx.showNotification({
        title: 'Error!',
        message:
          error?.response?.data?.message ||
          error?.message ||
          JSON.stringify(error),
        status: 'error',
      });
    }
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
