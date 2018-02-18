import { Renderable } from "./Renderable";

export type Behavior<TProps, TSpec> = Renderable<
  TProps & { render: Renderable<TSpec> }
>;
