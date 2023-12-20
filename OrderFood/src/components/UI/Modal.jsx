import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

function Modal({ children, className = "", open}) {
  const dialog = useRef();
  useEffect(()=>{
    if(open){
      dialog.current.showModal();
    }
    return ()=> dialog.current.close();
  },[open])
  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
export default Modal;
