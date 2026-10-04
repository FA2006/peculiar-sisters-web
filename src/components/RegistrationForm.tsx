import { useState } from "react";

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
  const [submitted, setSubmitted] = useState(false);

  return (
    <aside className="rounded-3xl bg-royal p-8 text-primary-foreground shadow-elegant">
      <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">{eyebrow}</div>
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // TODO: Connect this form to the backend or registration service.
            setSubmitted(true);
          }}
          className="mt-5 space-y-3"
        >
          <input required aria-label="Full name" placeholder="Full name" className={inputClass} />
          <input required type="email" aria-label="Email" placeholder="Email" className={inputClass} />
          <input type="tel" aria-label="Phone or WhatsApp" placeholder="Phone / WhatsApp" className={inputClass} />
          <input aria-label="Country or city" placeholder="Country / City" className={inputClass} />
          <button className="w-full rounded-full bg-[--gold] py-3 font-semibold text-white shadow-gold transition hover:brightness-110">
            {submitLabel}
          </button>
        </form>
      )}
    </aside>
  );
}