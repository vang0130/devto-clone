import SignInClient from './SignInClient';
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return <SignInClient providers={providers} />;
}