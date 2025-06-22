import { prisma } from "~/server/services/auth/db.server";

/*
 * update user
 * @param name - the name of the user
 * @param email - the email of the user
 * @param phone - the phone of the user
 * @param role - the role of the user
 * @param emailVerified - the email verified of the user
 * @param phoneVerified - the phone verified of the user
 * @param profileCompleted - the profile completed of the user
 * @returns the updated user
 */
export const updateUser = async (
  id: string,
  name: string,
  phone: string,
  role: string
) => {
  const data: {
    name?: string;
    phone?: string;
    role?: string;
  } = {
    name,
  };

  if (phone) {
    data.phone = phone;
  }

  if (role) {
    data.role = role;
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  const profileCompleted =
    (user?.phone || data.phone) && (user?.role || data.role) && user?.email
      ? true
      : false;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...data,
      profileCompleted,
    },
  });
  return updatedUser;
};
