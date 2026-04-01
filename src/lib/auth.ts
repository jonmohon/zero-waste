/**
 * Customer authentication helpers for the Zero Waste storefront.
 *
 * All auth business logic lives here — components should never call the
 * Medusa SDK directly for auth operations. Every function returns a
 * consistent { success, data?, error? } shape for easy consumption.
 *
 * @see https://docs.medusajs.com/resources/js-sdk/auth
 */
import { medusa } from "@/lib/medusa";

/** Standard return shape for all auth operations */
interface AuthResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

/**
 * Registers a new customer account.
 * First creates auth identity, then creates the customer record.
 *
 * @param email - customer email address
 * @param password - chosen password
 * @returns success with customer data, or error message
 *
 * @example
 * const result = await registerCustomer("jane@example.com", "s3cret");
 */
export async function registerCustomer(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    await medusa.auth.register("customer", "emailpass", { email, password });
    const { customer } = await medusa.store.customer.create({ email });
    return { success: true, data: customer };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Registration failed";
    return { success: false, error: message };
  }
}

/**
 * Logs in an existing customer.
 *
 * @param email - customer email address
 * @param password - account password
 * @returns success or error message
 *
 * @example
 * const result = await loginCustomer("jane@example.com", "s3cret");
 */
export async function loginCustomer(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    await medusa.auth.login("customer", "emailpass", { email, password });
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Invalid email or password";
    return { success: false, error: message };
  }
}

/**
 * Logs out the current customer session.
 *
 * @returns success or error message
 */
export async function logoutCustomer(): Promise<AuthResult> {
  try {
    await medusa.auth.logout();
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Logout failed";
    return { success: false, error: message };
  }
}

/**
 * Retrieves the currently authenticated customer profile.
 * Returns null in data if no session exists.
 *
 * @returns customer object or null
 */
export async function getCustomer(): Promise<AuthResult> {
  try {
    const { customer } = await medusa.store.customer.retrieve();
    return { success: true, data: customer };
  } catch {
    return { success: false, data: null };
  }
}

/**
 * Updates the authenticated customer's profile fields.
 *
 * @param body - partial customer fields to update (first_name, last_name, phone, etc.)
 * @returns updated customer or error
 *
 * @example
 * await updateCustomer({ first_name: "Jane", last_name: "Doe" });
 */
export async function updateCustomer(
  body: Record<string, unknown>
): Promise<AuthResult> {
  try {
    const { customer } = await medusa.store.customer.update(body);
    return { success: true, data: customer };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update profile";
    return { success: false, error: message };
  }
}

/**
 * Requests a password reset email for the given customer email.
 *
 * @param email - customer email address
 * @returns success (always true to avoid email enumeration)
 */
export async function requestPasswordReset(
  email: string
): Promise<AuthResult> {
  try {
    await medusa.auth.resetPassword("customer", "emailpass", {
      identifier: email,
    });
    return { success: true };
  } catch {
    // Return success even on error to prevent email enumeration
    return { success: true };
  }
}

/**
 * Completes a password reset using the token from the reset email.
 *
 * @param token - reset token from email link
 * @param password - new password
 * @returns success or error
 */
export async function completePasswordReset(
  token: string,
  password: string
): Promise<AuthResult> {
  try {
    await medusa.auth.updateProvider("customer", "emailpass", { password }, token);
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Password reset failed";
    return { success: false, error: message };
  }
}

/**
 * Lists all addresses for the authenticated customer.
 *
 * @returns array of address objects
 */
export async function getAddresses(): Promise<AuthResult> {
  try {
    const { addresses } = await medusa.store.customer.listAddress();
    return { success: true, data: addresses };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load addresses";
    return { success: false, error: message };
  }
}

/**
 * Creates a new address for the authenticated customer.
 *
 * @param body - address fields (address_1, city, postal_code, country_code, etc.)
 * @returns created address or error
 *
 * @example
 * await createAddress({ address_1: "123 Green St", city: "Portland", country_code: "us" });
 */
export async function createAddress(
  body: Record<string, unknown>
): Promise<AuthResult> {
  try {
    const { address } = await medusa.store.customer.createAddress(body);
    return { success: true, data: address };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create address";
    return { success: false, error: message };
  }
}
