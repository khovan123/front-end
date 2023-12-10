import { useRef } from "react";
import Input from "./Input";
import Dialog from "./Dialog";
export default function AddProjects({ onAdd, onCancel }) {
  const refTitle = useRef();
  const refDescription = useRef();
  const refDate = useRef();
  const dialog = useRef();
  function handleSave() {
    const enteredTitle = refTitle.current.value;
    const enteredDescription = refDescription.current.value;
    const enteredDate = refDate.current.value;
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      dialog.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
    });
  }

  return (
    <>
      <Dialog ref={dialog} />
      <section className="section-addprojects">
        <div className="addprojects">
          <div className="btn-addprojects">
            <button onClick={onCancel}>Cancel</button>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
          <Input label={"title"} type="text" ref={refTitle} />
          <Input
            label={"description"}
            textarea
            rows={10}
            ref={refDescription}
          />
          <Input label={"date"} type="date" ref={refDate} />
        </div>
      </section>
    </>
  );
}
