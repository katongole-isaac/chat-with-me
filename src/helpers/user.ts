/**
 * Used to set token
 *
 */

import { useRouter } from "next/navigation";

const useCurrentUser = () => {
  const router = useRouter();

  if (!(typeof window !== "undefined" && window.localStorage)) return;

  const user = localStorage.getItem("user");

  if (!user) return router.replace("/login");

  return JSON.parse(user);
};

function setAuthUser(user: object) {
  if (!(typeof window !== "undefined" && window.localStorage)) return;

  localStorage.setItem("user", JSON.stringify(user));
}

function getCurrentUser(): null | object {
  
  if (!(typeof window !== "undefined" && window.localStorage)) return null;

  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export { useCurrentUser, setAuthUser, getCurrentUser };
