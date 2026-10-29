// Lektion ts-advanced-types: Types berechnen, wo es Bugs verhindert
// Dauer: etwa 25 Minuten
//
// Aufgabe
// 1. Setters<Shape>: Mapped Type mit Key Remapping. Aus { name: string } wird
//    { setName: (value: string) => void }. Tipp: as `set${Capitalize<Key>}`.
// 2. IsString verteilt sich über Unions: IsString<string | number> ergibt boolean.
//    Schreib IsStringStrict, das für string | number false liefert ([Value] extends [string]).
// 3. RouteParams<'/orders/:orderId/items/:productId'> soll
//    { orderId: string; productId: string } ergeben (Template Literal Types mit infer).
//    buildPath setzt die Parameter zur Laufzeit ein.
//
// Prüfen: npm test -- ts-advanced-types und npm run typecheck:start

export type Setters<Shape> = unknown // TODO

export type IsString<Value> = Value extends string ? true : false
export type IsStringStrict<Value> = Value extends string ? true : false // TODO: nicht distributiv

export type RouteParams<Route extends string> = Record<string, string> // TODO

export const buildPath = <Route extends string>(route: Route, params: RouteParams<Route>): string => {
  throw new Error('TODO: :name durch params[name] ersetzen')
}
