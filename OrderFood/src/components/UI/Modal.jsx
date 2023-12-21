import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

function Modal({ children, className = "", open, onClose }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    return () => {
      dialog.current.close();
    };
  }, [open]);
  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
export default Modal;
