import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHero, Section } from "@/components/SiteLayout";
import {
  Heart,
  Gift,
  Users,
  Sparkles,
  CreditCard,
  Landmark,
  ChevronDown,
  Copy,
  Check,
  Wallet,
  Globe,
} from "lucide-react";

type PaymentMethod = "paystack" | "flutterwave" | "stripe" | "bank";

export const Route = createFileRoute("/give")({
  head: () => ({
    meta: [
      { title: "Give / Partner — Peculiar Sisters Fellowship" },
      {
        name: "description",
        content:
          "Partner with PSF through offerings, donations, and conference sponsorship.",
      },
    ],
  }),
  component: Give,
});

function Give() {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod | null>(null);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("5000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const accountNumber = "9138865110";

  const donationOptions = [
    {
      icon: Heart,
      name: "Offerings",
      desc: "Freewill giving into the daily work of the fellowship.",
    },
    {
      icon: Gift,
      name: "Donations",
      desc: "One-time gifts toward outreach, welfare, and resources.",
    },
    {
      icon: Sparkles,
      name: "Conference Sponsorship",
      desc: "Sponsor a woman or an entire session at PSF Conference.",
    },
    {
      icon: Users,
      name: "Partnership",
      desc: "Monthly partners standing with the vision long-term.",
    },
  ];

  const paymentMethods = [
    {
      id: "paystack" as const,
      name: "Paystack",
      description: "Pay securely online with supported payment methods.",
      icon: CreditCard,
      configured: true,
    },
    {
      id: "flutterwave" as const,
      name: "Flutterwave",
      description: "Online donations through Flutterwave.",
      icon: Wallet,
      configured: false,
    },
    {
      id: "stripe" as const,
      name: "Stripe",
      description: "Online donations through Stripe.",
      icon: Globe,
      configured: false,
    },
    {
      id: "bank" as const,
      name: "Bank Transfer",
      description: "Transfer your donation directly to the PSF bank account.",
      icon: Landmark,
      configured: true,
    },
  ];

  async function handleDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          amount: Number(amount),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not start your donation. Please try again.",
        );
      }

      if (!result.authorizationUrl) {
        throw new Error("Paystack did not return a checkout link.");
      }

      window.location.href = result.authorizationUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  }

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(
        "Unable to copy automatically. Please select and copy the account number.",
      );
    }
  }

  function toggleMethod(method: PaymentMethod) {
    setActiveMethod((current) => (current === method ? null : method));
    setError("");
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Give & Partner"
        title="Sow Into Kingdom Impact"
        subtitle="Every seed sown into PSF helps raise, disciple, and empower women across the nations."
      />

      <Section>
        {/* Donation categories: key giving opportunities and ministry focus areas. */}
        <div className="container-app grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {donationOptions.map(({ icon: Icon, name, desc }) => (
            <div
              key={name}
              className="rounded-3xl border border-border bg-card p-6 transition hover:shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-royal text-white">
                <Icon className="h-4 w-4" />
              </div>

              <h3 className="mt-4 font-display text-xl text-primary">
                {name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        {/* Payment options */}
        {/* Payment panel: choose a funding method and complete the checkout flow. */}
        <div className="container-app mt-14">
          <div className="rounded-3xl bg-royal p-6 text-primary-foreground shadow-elegant md:p-12">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.35em] text-[--gold]">
                Give Online
              </div>

              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Choose a Payment Method
              </h2>

              <p className="mx-auto mt-3 max-w-lg opacity-85">
                Choose your preferred way to support Peculiar Sisters
                Fellowship. Select an option below to continue.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-2xl space-y-3">
              {/* Payment methods are rendered as an accordion so each option can expand details. */}
              {paymentMethods.map(
                ({ id, name, description, icon: Icon, configured }) => {
                  const isOpen = activeMethod === id;

                  return (
                    <div
                      key={id}
                      className={`overflow-hidden rounded-2xl border transition ${
                        isOpen
                          ? "border-[--gold]/70 bg-white/10"
                          : "border-white/15 bg-white/5"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMethod(id)}
                        aria-expanded={isOpen}
                        aria-controls={`payment-panel-${id}`}
                        className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-white/5 sm:p-5"
                      >
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[--gold] text-white">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold">{name}</span>

                            {!configured && (
                              <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                                Coming soon
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm text-white/70">
                            {description}
                          </p>
                        </div>

                        <ChevronDown
                          className={`h-5 w-5 shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div
                          id={`payment-panel-${id}`}
                          className="border-t border-white/15 px-4 pb-5 pt-5 sm:px-6"
                        >
                          {id === "paystack" && (
                            <div>
                              <h3 className="font-display text-xl">
                                Make a One-Time Donation
                              </h3>

                              <p className="mt-2 text-sm text-white/75">
                                Enter your email and donation amount. You will
                                be redirected to Paystack's secure checkout.
                              </p>

                              <form
                                onSubmit={handleDonation}
                                className="mt-5 space-y-4"
                              >
                                <div>
                                  <label
                                    htmlFor="donor-email"
                                    className="mb-2 block text-sm font-medium"
                                  >
                                    Your email address
                                  </label>

                                  <input
                                    id="donor-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) =>
                                      setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-[--gold]"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="donation-amount"
                                    className="mb-2 block text-sm font-medium"
                                  >
                                    Donation amount (NGN)
                                  </label>

                                  <input
                                    id="donation-amount"
                                    name="amount"
                                    type="number"
                                    min="100"
                                    max="10000000"
                                    step="1"
                                    inputMode="numeric"
                                    value={amount}
                                    onChange={(event) =>
                                      setAmount(event.target.value)
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[--gold]"
                                  />

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {[1000, 5000, 10000, 25000].map(
                                      (value) => (
                                        <button
                                          key={value}
                                          type="button"
                                          onClick={() =>
                                            setAmount(String(value))
                                          }
                                          aria-pressed={
                                            amount === String(value)
                                          }
                                          className={`rounded-full border px-3 py-2 text-sm transition ${
                                            amount === String(value)
                                              ? "border-[--gold] bg-[--gold] text-white"
                                              : "border-white/30 hover:bg-white/10"
                                          }`}
                                        >
                                          ₦{value.toLocaleString("en-NG")}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                </div>

                                {error && (
                                  <p
                                    role="alert"
                                    className="rounded-xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-100"
                                  >
                                    {error}
                                  </p>
                                )}

                                <button
                                  type="submit"
                                  disabled={loading}
                                  className="w-full rounded-full bg-[--gold] px-6 py-3 font-semibold text-white shadow-gold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {loading
                                    ? "Connecting to Paystack..."
                                    : "Continue to Secure Payment"}
                                </button>

                                <p className="text-center text-xs text-white/65">
                                  One-time donation · Checkout powered by
                                  Paystack
                                </p>
                              </form>
                            </div>
                          )}

                          {id === "flutterwave" && (
                            <div>
                              <h3 className="font-display text-xl">
                                Flutterwave Donations
                              </h3>
                              <p className="mt-2 text-sm text-white/75">
                                Flutterwave checkout has not been configured
                                yet. Please choose Paystack or Bank Transfer
                                for now.
                              </p>
                            </div>
                          )}

                          {id === "stripe" && (
                            <div>
                              <h3 className="font-display text-xl">
                                Stripe Donations
                              </h3>
                              <p className="mt-2 text-sm text-white/75">
                                Stripe checkout has not been configured yet.
                                Please choose Paystack or Bank Transfer for
                                now.
                              </p>
                            </div>
                          )}

                          {id === "bank" && (
                            <div>
                              <h3 className="font-display text-xl">
                                Donate by Bank Transfer
                              </h3>

                              <p className="mt-2 text-sm text-white/75">
                                Transfer your donation directly to the official
                                PSF account using the details below.
                              </p>

                              <div className="mt-5 space-y-4 rounded-2xl border border-white/15 bg-black/10 p-4 sm:p-5">
                                <div>
                                  <p className="text-xs uppercase tracking-wider text-white/60">
                                    Bank
                                  </p>
                                  <p className="mt-1 font-semibold">GTBank</p>
                                </div>

                                <div>
                                  <p className="text-xs uppercase tracking-wider text-white/60">
                                    Account Name
                                  </p>
                                  <p className="mt-1 break-words font-semibold">
                                    PSF-peculiar sisters felloship
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs uppercase tracking-wider text-white/60">
                                    Account Number
                                  </p>

                                  <div className="mt-2 flex flex-wrap items-center gap-3">
                                    <span className="text-2xl font-semibold tracking-wider">
                                      {accountNumber}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={copyAccountNumber}
                                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-sm transition hover:bg-white/10"
                                    >
                                      {copied ? (
                                        <Check className="h-4 w-4" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                      {copied ? "Copied!" : "Copy number"}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-5 rounded-xl border border-[--gold]/30 bg-white/5 p-4">
                                <h4 className="font-semibold text-[--gold]">
                                  Important: Payment Description
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-white/80">
                                  Please add a payment description when making
                                  your transfer so your donation can be
                                  properly identified and allocated.
                                </p>
                                <p className="mt-2 text-sm font-medium">
                                  Suggested description:{" "}
                                  <span className="text-[--gold]">
                                    PSF Donation - Your Full Name
                                  </span>
                                </p>
                              </div>

                              {error && (
                                <p
                                  role="alert"
                                  className="mt-4 text-sm text-red-200"
                                >
                                  {error}
                                </p>
                              )}

                              <p className="mt-4 text-xs leading-relaxed text-white/60">
                                Please keep your transfer receipt for your
                                records. Bank transfers are not automatically
                                verified by this website, so your donation may
                                need to be confirmed separately.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-white/60">
              Thank you for partnering with Peculiar Sisters Fellowship.
              Every gift helps support the vision and its work.
            </p>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
