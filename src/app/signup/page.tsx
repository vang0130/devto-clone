import SignUpClient from './SignUpClient';
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return <SignUpClient providers={providers} />;
}