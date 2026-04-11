// Layout group: (store)
// Wraps all storefront routes with store-wide providers.
// AuthProvider gives every page access to customer session state.
// CartProvider must live inside AuthProvider — it reads auth state to
// drop the cart on logout.

import { AuthProvider } from "@/components/auth/auth-provider";
import { CartProvider } from "@/components/cart/cart-provider";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
