/**
 * AddressList — displays all customer addresses with an option to add new ones.
 * Used in: /account/addresses page.
 *
 * Fetches addresses on mount via getAddresses() and renders each in a Card.
 * Includes a toggle to show/hide the AddressForm for creating new addresses.
 */
"use client";

import { useEffect, useState, useCallback } from "react";
import { getAddresses } from "@/lib/auth";
import type { CustomerAddress } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddressForm } from "@/components/account/address-form";

export function AddressList() {
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    const result = await getAddresses();
    if (result.success && Array.isArray(result.data)) {
      setAddresses(result.data as CustomerAddress[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  function handleComplete() {
    setShowForm(false);
    fetchAddresses();
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-accent" />
        <p className="text-sm text-text-secondary">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-extrabold text-primary">Addresses</h2>
        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            Add Address
          </Button>
        )}
      </div>

      {showForm && (
        <AddressForm onComplete={handleComplete} onCancel={() => setShowForm(false)} />
      )}

      {addresses.length === 0 && !showForm && (
        <p className="text-sm text-text-secondary">No addresses saved yet.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <Card key={addr.id}>
            <p className="font-heading text-sm font-bold text-primary">
              {addr.first_name} {addr.last_name}
            </p>
            {addr.company && <p className="text-sm text-text-secondary">{addr.company}</p>}
            <p className="text-sm text-text-secondary">{addr.address_1}</p>
            {addr.address_2 && <p className="text-sm text-text-secondary">{addr.address_2}</p>}
            <p className="text-sm text-text-secondary">
              {addr.city}{addr.province ? `, ${addr.province}` : ""} {addr.postal_code}
            </p>
            <p className="text-sm text-text-secondary">{addr.country_code?.toUpperCase()}</p>
            {addr.phone && <p className="text-sm text-text-secondary">{addr.phone}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
