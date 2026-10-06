import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

import AdminEmail from "@/emails/AdminEmail";
import ConfirmationEmail from "@/emails/ConfirmationEmail";
import {
  FORM_SUBMISSIONS,
  type FormSubmissionType,
} from "@/lib/form-submissions";

type EmailRequestBody = {
  type?: string;
  name?: string;
  email?: string;
  message?: string;
};

export const Route = createFileRoute("/api/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        const adminEmail = process.env.ADMIN_EMAIL;
        const fromEmail = process.env.RESEND_FROM_EMAIL;

        if (!apiKey || !adminEmail || !fromEmail) {
          console.error("Missing email environment variables.");

          return Response.json(
            {
              error:
                "Email service is not configured. Check RESEND_API_KEY, ADMIN_EMAIL, and RESEND_FROM_EMAIL.",
            },
            {
              status: 500,
            },
          );
        }

        let body: EmailRequestBody;

        try {
          body = (await request.json()) as EmailRequestBody;
        } catch {
          return Response.json(
            {
              error: "Invalid JSON payload.",
            },
            {
              status: 400,
            },
          );
        }

        // Subjects come from this allowlist, never from client-provided text.
        if (!body.type || !Object.hasOwn(FORM_SUBMISSIONS, body.type)) {
          return Response.json(
            { error: "Unknown form type." },
            { status: 400 },
          );
        }

        const type = body.type as FormSubmissionType;
        const details = FORM_SUBMISSIONS[type];
        const name = body.name?.trim() || "";
        const email = body.email?.trim();
        const message = body.message?.trim() || "";

        if (!email || (!name && type !== "newsletter")) {
          return Response.json(
            { error: "Name and email are required for this form." },
            { status: 400 },
          );
        }

        const resend = new Resend(apiKey);

        try {
          // Keep these sequential so a partial delivery failure is reported accurately.
          const adminResult = await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            subject: details.adminSubject,
            react: AdminEmail({
              type: details.label,
              name: name || "Newsletter subscriber",
              email,
              message,
            }),
          });

          if (adminResult.error) {
            console.error("Resend admin email failed:", adminResult.error);

            return Response.json(
              {
                error:
                  adminResult.error.message ||
                  "Could not send the notification email.",
              },
              {
                status: 502,
              },
            );
          }

          const confirmationResult = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: details.confirmationSubject,
            react: ConfirmationEmail({
              name: name || "there",
            }),
          });

          if (confirmationResult.error) {
            console.error(
              "Resend confirmation email failed:",
              confirmationResult.error,
            );

            return Response.json(
              {
                error:
                  confirmationResult.error.message ||
                  "The notification was sent, but the confirmation email could not be sent.",
              },
              {
                status: 502,
              },
            );
          }

          return Response.json(
            {
              success: true,
              message: "Registration submitted successfully.",
            },
            {
              status: 200,
            },
          );
        } catch (error) {
          console.error("Resend request failed:", error);

          return Response.json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Email delivery failed.",
            },
            {
              status: 500,
            },
          );
        }
      },
    },
  },
});
