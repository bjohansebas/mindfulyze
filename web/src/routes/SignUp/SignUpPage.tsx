import { SignUpForm } from "@/components/Forms/SignUp"
import { Helmet } from "react-helmet-async"

function SignUpPage() {
  return (
    <>
      <Helmet>
        <title>Sign up | Mindfulyze</title>
      </Helmet>
      <SignUpForm />
    </>
  )
}

export { SignUpPage }
