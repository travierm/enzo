import { applyHydration } from "@/core/applyHydration";
import { useState } from "preact/hooks";

type Props = {
  name: string;
};

const CounterComponent = (props: Props) => {
  const [count, setCount] = useState(0);

  console.log("my props", props);
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export const Counter = applyHydration("Counter", CounterComponent);
