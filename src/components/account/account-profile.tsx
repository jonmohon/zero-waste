/**
 * AccountProfile — displays and edits the customer's profile information.
 * Used in: /account page.
 *
 * Toggles between a read-only view and an edit form. Saves changes
 * via updateCustomer() and refreshes the auth context on success.
 */
"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { updateCustomer } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

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
      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-900">Edit Profile</h2>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
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

          <div className="flex gap-3">
            <Button type="submit" disabled={saving} size="sm">
              {saving ? "Saving..." : "Save"}
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
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Profile</h2>
          <Button variant="secondary" size="sm" onClick={() => {
            setFirstName(customer.first_name || "");
            setLastName(customer.last_name || "");
            setPhone(customer.phone || "");
            setEditing(true);
          }}>
            Edit
          </Button>
        </div>
        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="font-medium text-neutral-500">Name</dt>
            <dd className="text-neutral-900">
              {customer.first_name || customer.last_name
                ? `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
                : "Not set"}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Email</dt>
            <dd className="text-neutral-900">{customer.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-500">Phone</dt>
            <dd className="text-neutral-900">{customer.phone || "Not set"}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
