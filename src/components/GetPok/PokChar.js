import { Fragment, useEffect, useState } from "react";
import styles from "./PokChar.module.css";

const PokChar = (props) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState("");

  const enterPokHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/characteristic/${props.onEnterPok}`
      );

      if (!response.ok) {
        throw new Error("Check pokemon's name");
      }

      const data = await response.json();
      const datas = data.descriptions;
      let dataFilter = datas.filter(({ language }) => language.name === "en");
      let dataFilters = dataFilter[0].description;
      console.log("dataFilter");
      setData(dataFilters);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    enterPokHandler();
  }, []);

  return (
    <Fragment>
      <div className={props.className}>
        {" "}
        <span className={styles.Hwa}>Characteristic: </span>
        <span>{data}</span>
        {error && <span>{error}</span>}
      </div>
      
    </Fragment>
  );
};

export default PokChar;
