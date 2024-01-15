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
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["event-detail"],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-detail"] });
      navigate("../");
    },
  });
  function handleSubmit(formData) {
    mutate({ id: id, event: formData });
  }

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <p>Submitting...</p>}
      {isError && (
        <ErrorBlock
          title={"Failed to fetch data."}
          message={error.info?.message || "Please try again later!"}
        />
      )}
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <EventForm inputData={data} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      )}
    </Modal>
  );
}
