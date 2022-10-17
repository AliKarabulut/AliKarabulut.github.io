import { Fragment, useEffect, useState } from "react";
import PokChar from "./PokChar";
import styles from "./PokFec.module.css";

const PokFec = (props) => {
  const [error, setError] = useState(null);
  const [dava, setDava] = useState("");
  const [davas, setDavas] = useState("");
  const [ability, setAbility] = useState("");

  const enterPokHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.onEnterPok}`
      );

      if (!response.ok) {
        throw new Error("Check pokemon's name");
      }

      const data = await response.json();
      console.log(data);
      setDava(data);
      setDavas(data.sprites.front_default);
      setAbility(data.abilities[0].ability.name);
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    enterPokHandler();
  }, []);

  return (
    <Fragment>
      <div className={styles.nameWrapper}>
        {" "}
        <div className={styles.name}>
          {" "}
          {`${dava.name}`.toUpperCase()}{" "}
          <div className={styles.typeContain}>
            {dava.types?.map((types) => {
              return (
                <img
                  className={styles.type}
                  src={"/PokemonType/" + types.type.name + ".png"}
                  alt=""
                />
              );
            })}
          </div>
        </div>{" "}
      </div>
      <div className={styles.CardoStat}>
        <div className={styles.Cardo}>
          <img className={styles.image} src={davas} alt="" />
          <div className={styles.characterWrapper}>
            <div className={styles.character}>
              <span className={styles.Hwa}>Height:</span>{" "}
              {((dava.height * 10) / 2.54 / 12).toFixed(0) +
                "' " +
                ("0" + Math.round(((dava.height * 10) / 2.54) % 12)).slice(-2) +
                '"'}
            </div>
            <div className={styles.character}>
              <span className={styles.Hwa}>Weight:</span>{" "}
              {(dava.weight * 0.22).toFixed(1) + " lbs"}
            </div>
            <div className={styles.character}>
              <span className={styles.Hwa}>Ability:</span>{" "}
              {ability.charAt(0).toUpperCase() + ability.slice(1)}
            </div>
            <PokChar
              className={styles.character}
              onEnterPok={props.onEnterPok}
            ></PokChar>
          </div>
        </div>

        <div className={styles.statWrapper}>
          {dava.stats?.map((anan) => {
            return (
              <div className={styles.stat}>
                <span className={styles.statName}>
                  {anan.stat.name
                    .replace("-", " ")
                    .split(" ")
                    .map((word) => {
                      return word[0].toUpperCase() + word.substring(1);
                    })
                    .join(" ")}
                  :{" "}
                </span>
                {anan.base_stat}
              </div>
            );
          })}
        </div>
      </div>

      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default PokFec;
