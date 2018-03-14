import * as React from "react";

export type Renderable<TProps> = (props: TProps) => JSX.Element | null;
