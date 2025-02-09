import { prisma } from '@/lib/prisma';

/** Fetch list of user for admin page */

const getUsers = async () => {
  try {
    const data = await prisma.user.findMany({
      select: {
        email: true,
        username: true,
        role: true,
      },
    });
    return data;
  } catch (error) {
    console.error('Error when fetching for users', error);
    throw new Error('Error when fetching for users');
  }
};

export default getUsers;
