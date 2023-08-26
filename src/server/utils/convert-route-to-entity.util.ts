const mapping: Record<string, string> = {
  books: 'book',
  collections: 'collection',
  discussions: 'discussion',
  publishers: 'publisher',
  reviews: 'review',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
