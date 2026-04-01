// Layout group: (store)
// Wraps all storefront routes with store-wide providers.
// AuthProvider gives every page access to customer session state.

import { AuthProvider } from "@/components/auth/auth-provider";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
