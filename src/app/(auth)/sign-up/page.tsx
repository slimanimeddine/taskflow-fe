import SignUpForm from '@/components/sign-up-form'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Sign Up', 'Create a new account'),
}

export default function Page() {
  return <SignUpForm />
}
