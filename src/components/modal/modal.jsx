import React from "react";
import PropTypes from "prop-types";

export function Modal({ open, onClose, children, title}) {
  return (
    <div
      className={`modal fade bd-example-modal-xl show ${open && "show"}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      style={{ display: open && "block"}}
      aria-modal="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content" style={{maxWidth: "600px", margin: "auto"}}>
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title h4"  id="myExtraLargeModalLabel" style={{color: "#EC8305"}}>
           
              {title}
            </h5>
            <button
              type="button"
              className="btn-close modal-closed-icon"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body"
          style={{backgroundColor: "#F0F0F0"}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  onAddToFavorites: PropTypes.func,
};