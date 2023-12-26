import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <h1>Event Detail</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>
          {(loaderEvent) => <EventItem event={loaderEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(loaderEvents) => <EventsList events={loaderEvents} />}
        </Await>
      </Suspense>
    </>
  );
}
export default EventDetailPage;

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "Could not fetch data.", status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loaderEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch event detail.",
      },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loaderEvent(id),
    events: loaderEvents(),
  });
}
export async function action({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw json(
      {
        message: "Could not delete event data.",
      },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
