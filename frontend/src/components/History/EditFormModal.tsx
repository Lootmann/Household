import React from "react";

type EditFormModalProps = {
  isOpen: boolean;
  handleClose: any;
};

function EditFormModal({ isOpen, handleClose }: EditFormModalProps) {
  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose(false)}
          className="absolute flex justify-center items-start inset-0 bg-black bg-opacity-30 h-screen w-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative top-20 h-1/2 w-1/2 flex items-start justify-between p-4 bg-slate-300 border-b"
          >
            <h2>EditFormModal</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default EditFormModal;
