import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { json, useLoaderData, Await, defer } from "react-router-dom";
function EventsPage() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback="Loading...">
      <Await resolve={events}>
        {(loaderEvents) => <EventsList events={loaderEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "Could not fetch data.", status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loaderEvents(),
  });
}
