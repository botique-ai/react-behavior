import * as React from "react";
import { Behavior } from "./Behavior";

export function Bind<TProps, TSpec extends {}>(
  ToRender: Behavior<any, TSpec>,
  props: TProps
): Behavior<any, Partial<TSpec>> {
  return (runProps: TSpec) => (
    <ToRender {...{ ...(props as any), ...(runProps as any) }} />
  );
}
