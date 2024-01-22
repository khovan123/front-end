import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
export default function EditEvent() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
  const { mutate, isFetching: isFetchingUdt } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newData = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const previousData = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], newData);
      return { previousData };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", id], context.previousData.event);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["events"] });
    //   navigate("../");
    // },
  });
  function handleSubmit(formData) {
    mutate({ id: id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }
  let content;
  if (isFetching) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title={"Failed to load event"}
          message={error.info?.message || "Failed to load event"}
        />
        <Link to={"/events"} className="button" />;
      </>
    );
  }
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          {isFetchingUdt ? "Updating..." : "Update"}
        </button>
      </EventForm>
    );
  }
  return <Modal onClose={handleClose}>{content}</Modal>;
}
