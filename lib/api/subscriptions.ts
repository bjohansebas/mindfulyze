import prisma from '@/lib/prisma'

import { z } from 'zod'
import type { AddUserSubscriptionType } from '@/schemas/subscriptions'
import { getUserById } from './utils'

export const getUserSubscription = async ({ userId }: { userId: string }) =>
  await prisma.subscription.findFirst({
    where: {
      userId: userId,
    },
    select: {
      subscriptionPlan: true,
    },
  })

export const createUserSubscription = async ({
  userId,
  subscriptionPlanId,
  frequency,
  startsAt,
  endsAt,
  renewsAt,
}: AddUserSubscriptionType) => {
  try {
    // Check if user exist
    const user = await getUserById({ id: userId })

    // Check if user already has a subscription
    if (user.Subscription !== null) {
      const message = 'user already has a subscription'
      return {
        code: 400,
        message,
      }
    }

    // Add subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        subscriptionPlanId,
        frequency,
        startsAt,
        endsAt,
        renewsAt,
      },
    })

    return {
      status: 201,
      data: {
        subscription,
      },
    }
  } catch (e) {
    return {}
  }
}

// /**
//  * Update user subscription
//  * @param ctx Ctx
//  * @param input UpdateUserSubscriptionInputType
//  * @returns Subscription
//  */
// export const updateUserSubscriptionHandler = async ({
//   ctx,
//   input,
// }: Params<UpdateUserSubscriptionInputType>) => {
//   try {
//     const { userId, subscriptionPlanId, frequency, startsAt, endsAt, renewsAt, isActive } = input;

//     // Check if user exist
//     const user = await getUserByIdHandler({ ctx, input: { id: userId } });
//     if (!user) {
//       const message = 'updateUserSubscription: user not found';
//       throw new TRPCError({
//         code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
//         message,
//       });
//     }

//     // Check if user already has a subscription
//     if (!user.subscription) {
//       const message = 'updateUserSubscription: user has no subscription';
//       throw new TRPCError({
//         code: TRPCErrorCode.BAD_REQUEST,
//         message,
//       });
//     }

//     // Update subscription
//     const subscription = await ctx.prisma.subscription.update({
//       where: {
//         userId: user.id,
//       },
//       data: {
//         subscriptionPlan: {
//           connect: {
//             id: subscriptionPlanId,
//           },
//         },
//         frequency,
//         startsAt,
//         endsAt,
//         renewsAt,
//         isActive,
//       },
//     });

//     return {
//       status: Response.SUCCESS,
//       result: {
//         subscription,
//       },
//     };
//   } catch (error: unknown) {
//     // Zod error (Invalid input)
//     if (error instanceof z.ZodError) {
//       const message = 'updateUserSubscription: invalid input';
//       throw new TRPCError({
//         code: TRPCErrorCode.BAD_REQUEST,
//         message,
//       });
//     }

//     // TRPC error (Custom error)
//     if (error instanceof TRPCError) {
//       throw new TRPCError({
//         code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
//         message: error.message,
//       });
//     }
//   }
// };

// /**
//  * Delete user subscription
//  * @param ctx Ctx
//  * @param input DeleteUserSubscriptionInputType
//  * @returns Subscription
//  */
// export const deleteUserSubscriptionHandler = async ({
//   ctx,
//   input,
// }: Params<DeleteUserSubscriptionInputType>) => {
//   try {
//     const { userId } = input;

//     // Check if user exist
//     const user = await getUserByIdHandler({ ctx, input: { id: userId } });
//     if (!user) {
//       const message = 'deleteUserSubscription: user not found';
//       throw new TRPCError({
//         code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
//         message,
//       });
//     }

//     // Delete subscription
//     const deletedSubscription = await ctx.prisma.subscription.delete({
//       where: {
//         userId: user.id,
//       },
//     });

//     return {
//       status: Response.SUCCESS,
//       result: {
//         subscription: deletedSubscription,
//       },
//     };
//   } catch (error: unknown) {
//     // Zod error (Invalid input)
//     if (error instanceof z.ZodError) {
//       const message = 'deleteUserSubscription: invalid input';
//       throw new TRPCError({
//         code: TRPCErrorCode.BAD_REQUEST,
//         message,
//       });
//     }

//     // TRPC error (Custom error)
//     if (error instanceof TRPCError) {
//       if (error.code === TRPCErrorCode.UNAUTHORIZED) {
//         const message = 'deleteUserSubscription: unauthorized';
//         throw new TRPCError({
//           code: TRPCErrorCode.UNAUTHORIZED,
//           message,
//         });
//       }

//       throw new TRPCError({
//         code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
//         message: error.message,
//       });
//     }
//   }
// };
