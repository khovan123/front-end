import { forwardRef, useImperativeHandle, useRef } from "react";
import { ReactPortal, createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset },
  ref
) {
  const dialog = useRef();
  const timeLeft = (timeRemaining / 1000).toFixed(2);
  const score = ((1 - timeLeft / targetTime) * 100).toFixed();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <>
      <dialog className="result-modal" ref={dialog}>
        {timeLeft <= 0 ? <h2>You lost</h2> : <h2>Your score: {score}</h2>}
        <p>
          The target time was{" "}
          <strong>
            {targetTime} second{targetTime > 1 ? "s" : ""}.
          </strong>
        </p>
        <p>
          You stopped the timer with <strong>{timeLeft} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    </>,
    document.getElementById("modal")
  );
});
export default ResultModal;
