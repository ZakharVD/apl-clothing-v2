import { createPortal } from "react-dom";
import { useModal } from "../hooks/useModal";


export default function ModalWindow() {
  const { showModal, modalMessage, deactivateModal, callbackFn } = useModal();

  console.log("function to be done",callbackFn);

  function onCancelHandler() {
    return deactivateModal();
  }


  return createPortal(
    <>
      {showModal === true && (
        <div className="backdrop-blur-sm  w-full h-full z-10 top-0 fixed">
          <div className="centeredDiv w-[300px] h-[240px] bg-white border-[1px] shadow-md rounded-xl p-3 flex flex-col">
            <div className="h-1/2 flex justify-center items-center">
                <span className="text-center font-medium text-md">{modalMessage}</span>
            </div>
            <div className="h-1/2 flex flex-col justify-between">
                <button onClick={callbackFn} className="w-full bg-black hover:bg-stone-800 text-white p-3 rounded-xl">Confirm</button>
                <button onClick={onCancelHandler} className="w-full border-[1px] hover:border-black rounded-xl p-3">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.querySelector("#modal") as Element
  );
}
