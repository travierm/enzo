import { hrtime } from "process";

interface Timers {
  [name: string]: NamedTimer;
}

interface NamedTimer {
  start: bigint;
  stop?: bigint;
}

export class Timer {
  timers: Timers;

  constructor() {
    this.timers = {} as Timers;
  }

  /**
   * @param name - The name of the timer
   */
  start(name: string) {
    this.timers[name] = { start: hrtime.bigint() };
  }

  stop(name: string) {
    const target = this.timers[name];

    if (!target) {
      throw new Error(`Timer ${name} not started.`);
    }

    target.stop = hrtime.bigint();
    const diff_ns = target.stop - target.start;

    console.log(`${name}: ${this.prettyNs(diff_ns)}`);
  }

  // turn nanoseconds into miliseconds when there is enough time
  prettyNs = (ns: bigint) => {
    if (ns >= BigInt(1e6)) {
      return `${Number(ns / BigInt(1e6))}ms ${Number(ns % BigInt(1e6))}ns`;
    }

    return `${Number(ns)}ns`;
  };
}

export const timer = new Timer();