// Route: /account/addresses
// Customer address management page. Protected by AuthGuard via account layout.
// Renders the AddressList client component.

import { AddressList } from "@/components/account/address-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Addresses" };

export default function AddressesPage() {
  return <AddressList />;
}
