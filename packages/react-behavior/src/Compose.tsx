import * as React from "react";
import { Behavior } from "./Behavior";
import { Renderable } from "./Renderable";

export function ComposeTwo<T1, T2>(props: {
  behaviors: [[string, Behavior<any, T1>], [string, Behavior<any, T2>]];
  children: Renderable<T1 & T2>;
}) {
  const BehaviorOne = props.behaviors[0][1];
  const BehaviorTwo = props.behaviors[1][1];
  return (
    <BehaviorOne>
      {behaviorOne => (
        <BehaviorTwo>
          {behaviorTwo => (
            <props.children
              {...{
                [props.behaviors[0][0]]: behaviorOne,
                [props.behaviors[1][0]]: behaviorTwo
              } as any}
            />
          )}
        </BehaviorTwo>
      )}
    </BehaviorOne>
  );
}

export function Compose(
  props: { children: Renderable<any> } & {
    behaviors: [string, Behavior<{}, any>][];
  }
) {
  const { children: ToRender, behaviors: behaviorsEntries } = props;
  if (behaviorsEntries.length === 1) {
    const ToRenderOuter = behaviorsEntries[0][1];
    return (
      <ToRenderOuter
        render={result => (
          <ToRender {...{ [behaviorsEntries[0][0]]: result }} />
        )}
      />
    );
  } else if (behaviorsEntries.length === 2) {
    return (
      <ComposeTwo
        behaviors={[
          [behaviorsEntries[0][0], behaviorsEntries[0][1]],
          [behaviorsEntries[1][0], behaviorsEntries[1][1]]
        ]}
      >
        {props.children}
      </ComposeTwo>
    );
  } else {
    const ComposedBehavior = behaviorsEntries.reduce(
      ([prevKey, prevBehavior], [key, behavior]) => [
        key,
        ({ render: innerRender }) => (
          <ComposeTwo behaviors={[[prevKey, prevBehavior], [key, behavior]]}>
            {innerRender}
          </ComposeTwo>
        )
      ]
    )[1];

    return <ComposedBehavior render={ToRender} />;
  }
}
