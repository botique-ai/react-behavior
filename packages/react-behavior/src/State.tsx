import * as React from "react";
import {Renderable} from "./Renderable";

export type StateSpec = { state: any; setState: any };

export type StateProps = {
  initialState?: any;
  children: Renderable<StateSpec>;
  deriveFromProps?: any;
};

export class State extends React.PureComponent<StateProps, {}> {
  constructor(props: StateProps) {
    super(props);
    this.state = props.initialState;
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.deriveFromProps) {
          this.setState(nextProps.deriveFromProps);
      }
  }

  render() {
    const ToRender = this.props.children;
    return (
        <ToRender state={this.state} setState={this.setState.bind(this)} />
    );
  }
}
