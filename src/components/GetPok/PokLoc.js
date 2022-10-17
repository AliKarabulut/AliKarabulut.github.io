import { Fragment, useEffect, useState } from "react";
import styles from "./PokLoc.module.css";
const PokLoc = (props) => {
  const [error, setError] = useState(null);
  const [dava, setDava] = useState([]);

  const enterPokHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.onEnterPok}/encounters`
      );

      if (!response.ok) {
        throw new Error("Check pokemon's name");
      }

      const data = await response.json();
      const anan = [];

      data.map((event) => {
        return anan.push(event.location_area.name);
      });

      console.log("pokloc");
      console.log(anan);
      console.log("pokloc");

      setDava(anan);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    enterPokHandler();
  }, []);

  return (
    <Fragment>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <th className={styles.tableHeader}>Location</th>
          {dava.map((value) => {
            return (
              <tr className={styles.tableChild}>
                {value[0].toUpperCase() +
                  value.substring(1).split("-").join(" ")}
              </tr>
            );
          })}
        </table>
      </div>

      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default PokLoc;
