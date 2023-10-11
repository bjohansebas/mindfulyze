import prisma from '@/lib/prisma'

export const getSubscriptionByUserId = async ({ userId }: { userId: string }) =>
  await prisma.subscription.findFirst({
    where: {
      userId: userId,
    },
    select: {
      isActive: true,
      subscriptionPlan: true,
    },
  })
