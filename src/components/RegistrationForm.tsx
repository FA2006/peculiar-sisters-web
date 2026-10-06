import { useState } from "react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

type RegistrationFormProps = {
  eyebrow: string;
  title: string;
  submitLabel: string;
  successMessage: string;
  joinUrl?: string;
  joinLabel?: string;
};

const inputClass =
  "w-full rounded-xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-[--gold]";

export function RegistrationForm({
  eyebrow,
  title,
  submitLabel,
  successMessage,
  joinUrl,
  joinLabel,
}: RegistrationFormProps) {
  const { submitted, loading, error, handleSubmit } =
    useEmailSubmission("registration");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  return (
    <aside className="rounded-3xl bg-royal p-8 text-primary-foreground shadow-elegant">
      <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">
        {eyebrow}
      </div>

      <h3 className="mt-2 font-display text-2xl">{title}</h3>

      {submitted ? (
        <div className="mt-5 space-y-4">
          <p className="text-sm opacity-90">{successMessage}</p>

          {joinUrl && joinLabel && (
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-[--gold] py-3 text-center font-semibold text-white shadow-gold transition hover:brightness-110"
            >
              {joinLabel}
            </a>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            required
            type="text"
            name="name"
            aria-label="Full name"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />

          <input
            required
            type="email"
            name="email"
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />

          <input
            type="tel"
            name="phone"
            aria-label="Phone or WhatsApp"
            placeholder="Phone / WhatsApp"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            name="city"
            aria-label="Country or city"
            placeholder="Country / City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={inputClass}
          />

          {error && <p className="mt-2 text-sm text-red-300">Error: {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[--gold] py-3 font-semibold text-white shadow-gold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : submitLabel}
          </button>
        </form>
      )}
    </aside>
  );
}
