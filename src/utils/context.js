import { createContext, useState } from "react";

const Context = createContext({ data: {}, setData: () => {} });

export function ContextProvider(props) {
  const [data, setData] = useState({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("user"),
    todo: localStorage.getItem("todo"),
  });

  return (
    <Context.Provider value={{ data, setData }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;
