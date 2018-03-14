import * as React from "react";
import { Behavior } from "./Behavior";
import { Renderable } from "./Renderable";

export function Bind<TSpec extends {}>(
  toRender: Renderable<TSpec>,
  props: Partial<TSpec>
): Renderable<Partial<TSpec>> {
  return (runProps: TSpec) => (toRender({ ...(props as any), ...(runProps as any) }));
}
