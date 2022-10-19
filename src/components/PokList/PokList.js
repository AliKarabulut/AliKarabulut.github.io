import { useEffect, useState, Fragment } from "react";
import styles from "./PokList.module.css";

const PokList = (props) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    setError(null);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=999999"
      );

      if (!response.ok) {
        throw new Error("Input Request failed.");
      }

      const data = await response.json();
      const datas = data.results;

      const loadeddata = [];

      for (const pokKey in datas) {
        loadeddata.push({
          name: datas[pokKey].name,
          id: Number(pokKey) + 1,
        });
      }

      setData(loadeddata);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const updatePokeDex = (poke) => {
    props.onTake(poke);
  };
  if (props.valss.trim().length > 0) {
    props.onId(data);
    return (
      <Fragment>
        <div className={styles.max}>
          {data
            .filter(({ name }) => name.indexOf(props.valss.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div onClick={() => updatePokeDex(value.name)}>
                  <span>{value.name}</span>
                </div>
              );
            })}
        </div>
        {error && console.log(error)}
      </Fragment>
    );
  }
};

export default PokList;
