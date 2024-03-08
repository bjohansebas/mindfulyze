import { MINDFULYZE_LOGO } from '@mindfulyze/utils'

import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components'

export const FeedbackEmail = ({
  email = 'panic@thedis.co',
  feedback = 'I love Mindfulyze!',
}: {
  email: string
  feedback: string
}) => {
  return (
    <Html>
      <Head />
      <Preview>New Feedback Received</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-gray-200 border-solid px-10 py-5">
            <Section className="mt-8">
              <Img src={MINDFULYZE_LOGO} width="40" height="40" alt="Mindfulyze" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center font-semibold text-black text-xl">
              New Feedback Received
            </Heading>
            <Text className="text-black text-sm leading-6">
              New feedback from <span className="font-semibold">{email}</span>
            </Text>
            <Text className="text-black text-sm leading-6">{feedback}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
