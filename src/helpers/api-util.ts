export type EventType = {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
};

export async function getAllEvents() {
  const response = await fetch(process.env.API_EVENTS as string);
  const data: { [key: string]: Omit<EventType, 'id'> } = await response.json();
  const events: EventType[] = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents: EventType[] = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents: EventType[] = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const allEvents: EventType[] = await getAllEvents();
  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}
