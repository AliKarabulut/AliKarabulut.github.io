import { Fragment, useState } from "react";
import PokList from "../PokList/PokList";
import Card from "../UI/Card";

import styles from "./PokInput.module.css";

const GetPok = (props) => {
  const [display, setDisplay] = useState(false);
  const [inputValues, setInputValue] = useState("");
  const [PokValues, setPokValue] = useState("");
  const [poks, setPoks] = useState([]);
  const [error, setError] = useState(false);

  const InputChangeHandler = (event) => {
    setDisplay(false);
    setInputValue(event);
  };
  const idSender = (props) => {
    setPoks(props);
  };

  const NameChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setInputValue("");
    if (inputValues.trim().length > 0) {
      console.log(
        poks.filter(
          ({ name }) => name.indexOf(inputValues.toLowerCase()) > -1
        )[0].id
      );
      setPokValue(
        poks.filter(
          ({ name }) => name.indexOf(inputValues.toLowerCase()) > -1
        )[0].id
      );
      setError(true);
    }
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <Fragment>
      {error && <Card onConfirm={errorHandler} onEnterPok={PokValues} />}
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={submitHandler}>
          <input
            type="text"
            value={inputValues}
            placeholder="Type a name here..."
            onClick={() => setDisplay(!display)}
            onChange={NameChangeHandler}
          />
          <button>
            {props.loading ? "Sending..." : "Search for a Pokemon"}
          </button>
        </form>
        {display && (
          <PokList
            valss={inputValues}
            onTake={InputChangeHandler}
            onId={idSender}
          >
            {" "}
          </PokList>
        )}
      </div>
    </Fragment>
  );
};

export default GetPok;
