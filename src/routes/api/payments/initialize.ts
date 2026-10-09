import { createFileRoute } from "@tanstack/react-router";

type DonationInitBody = {
  email?: string;
  amount?: number | string;
};

type PaystackInitResponse = {
  status?: boolean;
  message?: string;
  data?: {
    authorization_url?: string;
    access_code?: string;
    reference?: string;
  };
};

export const Route = createFileRoute("/api/payments/initialize")({
  server: {
    handlers: {
      // Initializes a Paystack checkout session for a one-time donation.
      POST: async ({ request }) => {
        // Keep your secret key on the server only.
        const secretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!secretKey) {
          console.error("PAYSTACK_SECRET_KEY is not configured.");

          return Response.json(
            { message: "Payment service is not configured." },
            { status: 500 },
          );
        }

        // Read and validate the submitted data.
        let body: DonationInitBody;

        try {
          body = (await request.json()) as DonationInitBody;
        } catch {
          return Response.json(
            { message: "Invalid JSON payload." },
            { status: 400 },
          );
        }

        const email =
          typeof body.email === "string" ? body.email.trim() : "";

        const amount = Number(body.amount);

        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailIsValid) {
          return Response.json(
            { message: "Please provide a valid email address." },
            { status: 400 },
          );
        }

        // Minimum donation: ₦100.
        // Maximum donation: ₦10,000,000.
        if (
          !Number.isSafeInteger(amount) ||
          amount < 100 ||
          amount > 10_000_000
        ) {
          return Response.json(
            {
              message:
                "Donation amount must be a whole number between ₦100 and ₦10,000,000.",
            },
            { status: 400 },
          );
        }

        try {
          const response = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email,
                amount: amount * 100, // Paystack expects kobo, not naira.
                currency: "NGN",
              }),
            },
          );

          let data: PaystackInitResponse;

          try {
            data = (await response.json()) as PaystackInitResponse;
          } catch {
            console.error("Paystack returned an invalid response.");

            return Response.json(
              { message: "Unable to process the payment response." },
              { status: 502 },
            );
          }

          // Paystack returns authorization_url inside data.data.
          const authorizationUrl = data.data?.authorization_url;
          const reference = data.data?.reference;

          if (!response.ok || !data.status || !authorizationUrl) {
            console.error("Paystack initialization failed:", data.message);

            return Response.json(
              {
                message:
                  data.message || "Could not start your donation. Please try again.",
              },
              { status: response.ok ? 502 : 502 },
            );
          }

          return Response.json(
            {
              authorizationUrl,
              reference,
              message: "Donation initialized successfully.",
            },
            { status: 200 },
          );
        } catch (error) {
          console.error("Payment initialization error:", error);

          return Response.json(
            {
              message:
                "Unable to connect to the payment service. Please try again.",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
