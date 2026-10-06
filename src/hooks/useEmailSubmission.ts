import { useState, type FormEvent } from "react";
import type { FormSubmissionType } from "@/lib/form-submissions";

const fieldLabels: Record<string, string> = {
  subject: "Subject",
  phone: "Phone / WhatsApp",
  city: "City / Country",
  requestType: "Request type",
  message: "Message",
  areas: "Area of interest",
  reason: "Why I want to volunteer",
  private: "Privacy preference",
};

export function useEmailSubmission(type: FormSubmissionType) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    // Keep identity fields separate and include all other named controls in the admin message.
    const message = Array.from(formData.entries())
      .filter(([key]) => !["name", "email"].includes(key))
      .map(([key, value]) => {
        const label =
          fieldLabels[key] ??
          key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (letter) => letter.toUpperCase());
        return `${label}: ${String(value).trim()}`;
      })
      .join("\n");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, email, message }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error ||
            `Request failed (${response.status}). Please try again.`,
        );
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return { submitted, loading, error, handleSubmit };
}
