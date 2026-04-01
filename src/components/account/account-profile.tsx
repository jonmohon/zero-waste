/**
 * AccountProfile — displays and edits the customer's profile information.
 * Used in: /account page.
 *
 * Toggles between a read-only view and an edit form. Saves changes
 * via updateCustomer() and refreshes the auth context on success.
 * Premium card styling with refined typography.
 */
"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { updateCustomer } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AccountProfile() {
  const { customer, refreshCustomer } = useAuth();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(customer?.first_name || "");
  const [lastName, setLastName] = useState(customer?.last_name || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const result = await updateCustomer({
      first_name: firstName,
      last_name: lastName,
      phone: phone || undefined,
    });

    if (result.success) {
      await refreshCustomer();
      setEditing(false);
    } else {
      setError(result.error || "Failed to save changes");
    }
    setSaving(false);
  }

  if (!customer) return null;

  if (editing) {
    return (
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] lg:p-8">
        <form onSubmit={handleSave} className="space-y-5">
          <h2 className="font-heading text-lg font-extrabold text-primary">
            Edit Profile
          </h2>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="first-name"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              id="last-name"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input
            id="phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} size="sm">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] lg:p-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-extrabold text-primary">
            Profile
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setFirstName(customer.first_name || "");
              setLastName(customer.last_name || "");
              setPhone(customer.phone || "");
              setEditing(true);
            }}
          >
            Edit
          </Button>
        </div>

        <div className="h-px bg-neutral-100" />

        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <ProfileField label="Name">
            {customer.first_name || customer.last_name
              ? `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
              : "Not set"}
          </ProfileField>
          <ProfileField label="Email">{customer.email}</ProfileField>
          <ProfileField label="Phone">
            {customer.phone || "Not set"}
          </ProfileField>
        </dl>
      </div>
    </div>
  );
}

/**
 * ProfileField — labeled value display used in the profile read-only view.
 */
function ProfileField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-primary">{children}</dd>
    </div>
  );
}
