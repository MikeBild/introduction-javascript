// Lesson ts-advanced-types: Compute types where they prevent bugs
// Duration: about 25 minutes
//
// Exercise
// 1. Setters<Shape>: mapped type with key remapping. { name: string } becomes
//    { setName: (value: string) => void }. Hint: as `set${Capitalize<Key>}`.
// 2. IsString distributes over unions: IsString<string | number> gives boolean.
//    Write IsStringStrict, which returns false for string | number ([Value] extends [string]).
// 3. RouteParams<'/orders/:orderId/items/:productId'> should give
//    { orderId: string; productId: string } (template literal types with infer).
//    buildPath fills in the parameters at runtime.
//
// Check: npm test -- ts-advanced-types and npm run typecheck:start

export type Setters<Shape> = unknown // TODO

export type IsString<Value> = Value extends string ? true : false
export type IsStringStrict<Value> = Value extends string ? true : false // TODO: not distributive

export type RouteParams<Route extends string> = Record<string, string> // TODO

export const buildPath = <Route extends string>(route: Route, params: RouteParams<Route>): string => {
  throw new Error('TODO: :name durch params[name] ersetzen')
}
