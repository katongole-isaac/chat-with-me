/**
 * Used to set token
 *
 */

import { useRouter } from "next/navigation";

const useCurrentUser = () => {
  const router = useRouter();

  const user = localStorage.getItem("user");

  if (!user) return router.replace("/login");

  return JSON.parse(user);
};

function setAuthUser(user: object) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getCurrentUser(): null | object {
 "use client"

  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export { useCurrentUser, setAuthUser, getCurrentUser };
