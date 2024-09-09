import SignOutClient from './SignOutClient';
import { getProviders } from "next-auth/react";

export default async function SignOutPage() {
  const providers = await getProviders();

  return <SignOutClient providers={providers} />;
}