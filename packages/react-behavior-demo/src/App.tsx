import * as React from "react";
import "./App.css";
import { State, StateSpec } from "react-behavior/lib/State";
import { Renderable } from "react-behavior/lib/Renderable";
import { ComposeTwo } from "react-behavior/lib/Compose";
import { Bind } from "react-behavior/lib/Bind";

export type CounterSpec = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const CounterBehavior = (props: {
  children: Renderable<CounterSpec>;
}) => (
  <State
    initialState={{
      value: 0
    }}
  >
    {({ state: counterState, setState }) => (
      <props.children
        value={counterState.value}
        onIncrease={() => setState(state => ({ value: state.value + 1 }))}
        onDecrease={() => setState(state => ({ value: state.value - 1 }))}
      />
    )}
  </State>
);

const Counter = (props: CounterSpec) => (
  <div>
    <button onClick={props.onIncrease}>increase</button>
    <button onClick={props.onDecrease}>decrease</button>
    <div>{props.value}</div>
  </div>
);

const logo = require("./logo.svg");

const StupidComponent = (props: {
  counterSpec: CounterSpec;
  stateSpec: StateSpec;
  text: string;
}) => (
  <React.Fragment>
    <Counter {...props.counterSpec} />
    <input
      type="text"
      value={props.stateSpec.state.value + `${props.counterSpec.value}`}
      onChange={e => props.stateSpec.setState({ value: e.target.value })}
    />
      <p>{props.text}</p>
  </React.Fragment>
);

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
    <ComposeTwo
      behaviors={[
        ["counterSpec", CounterBehavior],
        ["stateSpec", Bind(State, { initialState: { value: "" } })]
      ]}
    >
      {Bind(StupidComponent, {text: "Hello"})}
    </ComposeTwo>
    <CounterBehavior>{Counter}</CounterBehavior>
  </div>
);

export default App;
