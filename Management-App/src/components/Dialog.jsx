import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Dialog = forwardRef(function Dialog({ props }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog className="section-dialog" {...props} ref={dialog}>
      <h2>Invalid value!</h2>
      <p>Please enter a valid value input.</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default Dialog;
