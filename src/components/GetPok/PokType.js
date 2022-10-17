import { Fragment, useEffect, useState } from "react";

const PokType = (props) => {
  const [error, setError] = useState(null);
  const [dava, setDava] = useState("");

  const enterPokHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${props.onEnterPok}`
      );

      if (!response.ok) {
        throw new Error("Check pokemon's name");
      }

      const data = await response.json();
      setDava(data.name);
      console.log(data);
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
        {" "}
        Type:{" "}
        <img
          style={{ width: "45px" }}
          src={"/PokemonType/" + dava + ".png"}
          alt=""
        />
      </div>

      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default PokType;
