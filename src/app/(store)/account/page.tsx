// Route: /account
// Customer profile page. Protected by AuthGuard via the account layout.
// Renders the AccountProfile client component for viewing/editing profile data.

import { AccountProfile } from "@/components/account/account-profile";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Account" };

export default function AccountPage() {
  return <AccountProfile />;
}
