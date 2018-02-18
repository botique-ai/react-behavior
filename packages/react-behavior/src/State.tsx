import * as React from "react";

export type StateSpec = { state: any; setState: any };

export type StateProps = {
  initialState?: any;
  children(props: StateSpec): JSX.Element | null;
};

export class State extends React.Component<StateProps, {}> {
  constructor(props: StateProps) {
    super(props);
    this.state = props.initialState;
  }

  render() {
    return this.props.children({
      state: this.state,
      setState: this.setState.bind(this)
    });
  }
}
