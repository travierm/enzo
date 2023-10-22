import { useState } from 'preact/hooks';
import { applyHydration } from '../../framework/applyHydration';
import { BaseButton } from './BaseButton';

type Props = {
  initCount: number
  incrementor: (num: number) => number
}

function Component(props: Props) {
  const [value, setValue] = useState(props.initCount);

  return (
    <div>
      <div>Counter: {value}</div>

      <BaseButton onClick={() => setValue(props.incrementor(value))}>
        Increment
      </BaseButton>
      <BaseButton onClick={() => setValue(value - 1)}>Decrement</BaseButton>
    </div>
  );
}

export const Counter = applyHydration("Counter", Component);
