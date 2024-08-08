import { FRONTEND_URL } from "../../helpers/env-variables";
import type { QueryResolvers } from "../../types/generated";

const lessonQueryResolvers: QueryResolvers = {
  browseLessons: async (_parent, { search, category }, { prisma, userId }) => {
    const lessons = await prisma.lesson.findMany({
      where: {
        isPublished: true,
        title: search ? { contains: search } : undefined,
        category: { name: category || undefined },
        teacherId: { not: userId },
      },
    });

    return lessons;
  },

  lesson: async (_parent, { lessonId }, { prisma, userId }) => {
    const isOwner = true; // TODO: unmock

    return prisma.lesson.findUniqueOrThrow({
      where: { id: lessonId, isPublished: isOwner ? true : undefined },
    });
  },

  lessonCheckoutUrl: async (
    _parent,
    { lessonId },
    { prisma, userId, stripe }
  ) => {
    if (!userId) throw new Error("userId missing");

    const lesson = await prisma.lesson.findUniqueOrThrow({
      where: { id: lessonId, teacherId: { not: userId } },
      include: {
        purchases: { where: { userId, lessonId } },
      },
    });

    if (!lesson.isPublished) throw new Error("Lesson is not published");
    if (!lesson.price) throw new Error("Lesson is not published");

    if (lesson.purchases.length > 0)
      throw new Error("user has already purchased lesson");

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "EUR",
            product_data: {
              name: lesson.title,
              description: lesson.description || undefined,
            },
            unit_amount: Math.round(lesson.price! * 100),
          },
        },
      ],
      mode: "payment",
      success_url: `${FRONTEND_URL}/student/lesson/${lesson.id}?success=1`,
      cancel_url: `${FRONTEND_URL}/student/lesson/${lesson.id}?error=1`,
      metadata: { lessonId: lesson.id, userId: user.id },
    });

    if (!session.url) throw new Error("Could not get session.url");

    return session.url;
  },
};

export default lessonQueryResolvers;
