import * as React from "react";

export function Functionize<TProps>(ToRender: React.ComponentClass<TProps>) {
    return (props: TProps) => <ToRender {...props} />;
}