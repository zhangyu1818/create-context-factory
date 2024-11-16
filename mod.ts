import * as React from 'react';

/**
 * Props interface for Provider component
 * @template T - Type of value accepted by the Provider
 */
export interface ProviderProps<T> {
  /** Default value */
  defaultValue?: T;
  /** React child nodes */
  children: React.ReactNode;
}

/**
 * Return type of the factory function
 * @template DefaultValue - Type of default value
 * @template Effect - Type of effect function
 */
export type FactoryReturnType<
  DefaultValue,
  // deno-lint-ignore no-explicit-any
  Effect extends (...value: unknown[]) => any
> = readonly [
  (props: ProviderProps<DefaultValue>) => React.ReactElement,
  <Selected>(selector: (value: ReturnType<Effect>) => Selected) => Selected
];

/**
 * Creates a Context factory
 * @template Effect - Type of effect function
 * @template DefaultValue - Type of default value, defaults to first parameter type of Effect
 * @param effect - Effect function that generates Context value
 * @returns A tuple containing Provider component and selector hook
 * @example
 * ```ts
 * const [Provider, useSelector] = createContextFactory(() => ({
 *   count: useState(0),
 *   name: useState("")
 * }));
 * ```
 */
export function createContextFactory<
  // deno-lint-ignore no-explicit-any
  Effect extends (...value: any[]) => any,
  DefaultValue = Parameters<Effect>[0]
>(effect: Effect): FactoryReturnType<DefaultValue, Effect> {
  type Context = ReturnType<Effect>;

  const context = React.createContext<Context>({} as Context);

  const ContextProvider = (props: ProviderProps<DefaultValue>) => {
    const { children, defaultValue } = props;
    return React.createElement(context.Provider, { value: effect(defaultValue) }, children);
  };

  function useContextSelector<Selected>(selector: (value: Context) => Selected) {
    const contextState = React.useContext(context);
    return selector(contextState);
  }

  return [ContextProvider, useContextSelector] as const;
}
