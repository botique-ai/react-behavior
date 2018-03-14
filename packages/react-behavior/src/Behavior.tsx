import { Renderable } from "./Renderable";

export type Behavior<TProps, TSpec> = Renderable<
  TProps & { children: Renderable<TSpec> }
>;
