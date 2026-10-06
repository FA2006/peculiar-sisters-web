import { Html, Text } from "@react-email/components";

type AdminEmailProps = {
  type: string;
  name: string;
  email: string;
  message?: string;
};

export default function AdminEmail({
  type,
  name,
  email,
  message,
}: AdminEmailProps) {
  return (
    <Html>
      <Text>New {type} submission received:</Text>

      <Text>Name: {name}</Text>

      <Text>Email: {email}</Text>

      {message && <Text>Message: {message}</Text>}
    </Html>
  );
}