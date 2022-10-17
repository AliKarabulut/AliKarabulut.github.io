import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import PokFec from "../GetPok/PokFec";
import PokEncounter from "../GetPok/PokEncounter";
import styles from "./Card.module.css";
import PokLoc from "../GetPok/PokLoc";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const Card = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <PokFec onEnterPok={props.onEnterPok}></PokFec>
          <div>
            <PokLoc onEnterPok={props.onEnterPok}></PokLoc>
            <PokEncounter onEnterPok={props.onEnterPok}></PokEncounter>
          </div>
        </ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Card;
