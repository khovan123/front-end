import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  return (
    <>
      <h1>Edit Event Page</h1>
      <EventForm method={"patch"} event={data.event} />
    </>
  );
}
export default EditEventPage;
