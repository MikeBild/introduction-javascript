export type Setters<Shape> = {
  [Key in keyof Shape & string as `set${Capitalize<Key>}`]: (value: Shape[Key]) => void
}

export type IsString<Value> = Value extends string ? true : false
// Die eckigen Klammern verhindern die Distribution über die Union.
export type IsStringStrict<Value> = [Value] extends [string] ? true : false

type ParamNames<Route extends string> = Route extends `${string}:${infer Name}/${infer Rest}`
  ? Name | ParamNames<`/${Rest}`>
  : Route extends `${string}:${infer Name}`
    ? Name
    : never

export type RouteParams<Route extends string> = { [Name in ParamNames<Route>]: string }

export const buildPath = <Route extends string>(route: Route, params: RouteParams<Route>): string =>
  route.replace(/:(\w+)/g, (_, name: string) =>
    encodeURIComponent((params as Record<string, string>)[name] ?? ''),
  )
