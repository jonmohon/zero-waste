// Route: /order-confirmation/[id]
// Order confirmation page shown after a successful checkout. The page
// itself is a thin server shell — the actual fetch lives in the
// OrderConfirmation client component, which retrieves the order via
// the customer-scoped store API (requires the customer to be signed in).

import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export const metadata: Metadata = {
  title: "Order Confirmation",
};

/* Each order confirmation page is unique to one customer's order, so
   never statically prerender. */
export const dynamic = "force-dynamic";

interface OrderConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { id } = await params;
  return (
    <div className="bg-cream">
      <OrderConfirmation orderId={id} />
    </div>
  );
}
