import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { defaultInterface, modalInterface } from "../../interface/props";

const BackDrop = (props: modalInterface) => {
  return <div className={classes.backdrop} onClick= {props.onClose}/>;
};

const ModalOverLay = (props: defaultInterface) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

const Modal = (props: modalInterface) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose ={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
