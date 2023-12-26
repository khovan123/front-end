import EventForm from "../components/EventForm";
function NewEventPage() {
  return (
    <>
      <h1>NewEventPage</h1>
      <EventForm method={"post"} />
    </>
  );
}
export default NewEventPage;
