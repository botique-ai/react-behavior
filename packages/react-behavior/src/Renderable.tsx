import * as React from "react";

export type Renderable<TProps> =
  | React.ComponentClass<TProps>
  | ((props: TProps) => JSX.Element | null);
