import prisma from '@/lib/prisma'
import { SubscriptionPlanSlug } from '@prisma/client'

export const getSubscriptionPlanById = async ({ id }: { id: string }) =>
  await prisma.subscriptionPlan.findUnique({ where: { id } })

export const getSubscriptionPlanBySlug = async ({ slug }: { slug: SubscriptionPlanSlug }) =>
  await prisma.subscriptionPlan.findUnique({ where: { slug } })

export const getSubscriptionPlanByProductId = async ({ productId }: { productId: string }) =>
  await prisma.subscriptionPlan.findFirst({ where: { productId } })

export const getAllSubscriptionPlans = async () =>
  await prisma.subscriptionPlan.findMany({ orderBy: { createdAt: 'asc' } })
