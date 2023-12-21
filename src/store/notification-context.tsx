import { ReactNode, createContext, useEffect, useState } from 'react';

type NotificationType = null | {
  title: string;
  message: string;
  status: 'success' | 'pending' | 'error';
};

type NotificationContextProviderProps = {
  children: ReactNode;
};

export const NotificationContext = createContext({
  notification: null as NotificationType,
  showNotification: (notificationData: NotificationType) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationType>(null);

  useEffect(() => {
    if (
      activeNotification &&
      ['success', 'error'].includes(activeNotification.status)
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: NotificationType) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
