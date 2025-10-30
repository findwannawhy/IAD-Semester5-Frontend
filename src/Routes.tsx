export const ROUTES = {
  HOME: "/",
  SAMPLES: "/samples",
  SAMPLE: "/samples/:id"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  SAMPLES: "Вещества",
  SAMPLE: "Вещество"
};