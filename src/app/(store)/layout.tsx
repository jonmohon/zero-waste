// Layout group: (store)
// Wraps all storefront routes. Currently a passthrough — will hold
// cart context provider and other store-wide client state when needed.

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
