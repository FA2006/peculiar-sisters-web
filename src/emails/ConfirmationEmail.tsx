import { Html, Text } from "@react-email/components";

type ConfirmationEmailProps = {
  name: string;
};

export default function ConfirmationEmail({ name }: ConfirmationEmailProps) {
  return (
    <Html>
      <Text>Dear {name},</Text>

      <Text>Thank you for reaching out to Peculiar Sisters Fellowship.</Text>

      <Text>
        We’ve received your submission and will follow up if a response is
        needed.
      </Text>

      <Text>Stay blessed,</Text>

      <Text>Peculiar Sisters Fellowship</Text>
    </Html>
  );
}
