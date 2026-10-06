export const FORM_SUBMISSIONS = {
  registration: {
    label: "event registration",
    adminSubject: "New event registration",
    confirmationSubject: "We received your event registration",
  },
  contact: {
    label: "contact message",
    adminSubject: "New contact message",
    confirmationSubject: "We received your message",
  },
  prayerRequest: {
    label: "prayer request",
    adminSubject: "New prayer request",
    confirmationSubject: "We received your prayer request",
  },
  volunteer: {
    label: "volunteer application",
    adminSubject: "New volunteer application",
    confirmationSubject: "We received your volunteer application",
  },
  testimony: {
    label: "testimony",
    adminSubject: "New testimony submission",
    confirmationSubject: "We received your testimony",
  },
  newsletter: {
    label: "newsletter subscription",
    adminSubject: "New newsletter subscription",
    confirmationSubject: "We received your newsletter request",
  },
} as const;

export type FormSubmissionType = keyof typeof FORM_SUBMISSIONS;
