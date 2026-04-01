/**
 * AddressForm — form for creating a new customer address.
 * Used in: AddressList component on /account/addresses.
 *
 * Calls createAddress() from lib/auth and triggers the onComplete
 * callback so the parent can refresh the address list.
 *
 * @param onComplete - callback fired after successful address creation
 * @param onCancel - callback to hide the form without saving
 */
"use client";

import { useState, type FormEvent } from "react";
import { createAddress } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AddressFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function AddressForm({ onComplete, onCancel }: AddressFormProps) {
  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    province: "",
    postal_code: "",
    country_code: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const result = await createAddress(fields);
    if (result.success) {
      onComplete();
    } else {
      setError(result.error || "Failed to create address");
    }
    setSaving(false);
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-bold text-neutral-900">New Address</h3>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="addr-first" label="First Name" value={fields.first_name} onChange={(e) => update("first_name", e.target.value)} />
          <Input id="addr-last" label="Last Name" value={fields.last_name} onChange={(e) => update("last_name", e.target.value)} />
        </div>
        <Input id="addr-1" label="Address Line 1" required value={fields.address_1} onChange={(e) => update("address_1", e.target.value)} />
        <Input id="addr-2" label="Address Line 2" value={fields.address_2} onChange={(e) => update("address_2", e.target.value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="addr-city" label="City" required value={fields.city} onChange={(e) => update("city", e.target.value)} />
          <Input id="addr-province" label="State / Province" value={fields.province} onChange={(e) => update("province", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="addr-postal" label="Postal Code" required value={fields.postal_code} onChange={(e) => update("postal_code", e.target.value)} />
          <Input id="addr-country" label="Country Code" required placeholder="us" value={fields.country_code} onChange={(e) => update("country_code", e.target.value)} />
        </div>
        <Input id="addr-phone" label="Phone" type="tel" value={fields.phone} onChange={(e) => update("phone", e.target.value)} />

        <div className="flex gap-3">
          <Button type="submit" disabled={saving} size="sm">
            {saving ? "Saving..." : "Save Address"}
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
