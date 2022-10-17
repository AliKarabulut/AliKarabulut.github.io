import { Fragment, useEffect, useState } from "react";
import styles from "./PokEncounter.module.css";
const PokEncounter = (props) => {
  const [error, setError] = useState(null);
  const [dava, setDava] = useState("");

  const enterPokHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/encounter-method/${props.onEnterPok}`
      );

      if (!response.ok) {
        throw new Error("Check pokemon's name");
      }

      const data = await response.json();
      const datas = data.names;
      setDava(datas.pop().name);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    enterPokHandler();
  }, []);

  return (
    <Fragment>
      <div>
        <span className={styles.encounter}>Encounter: </span>
        <span className={styles.encounterChild}>{dava}</span>
      </div>
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default PokEncounter;
