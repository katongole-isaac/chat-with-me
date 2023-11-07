/**
 * Auth - Used to check if the user is logged in
 *
 */
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getCurrentUser } from "@/helpers/user";
import LoadingUI from "@/components/common/loading";

function withAuth(Component: React.ComponentType) {
  return function ({ ...props }) {

    // this is used to prevent Flash of unwanted Content
    const [authenticating, setAuthenticating] = useState(true);
    const [user, setUser] = useState(getCurrentUser());

    const router = useRouter();

    const _ = () => {

      if (!user) return router.replace("/login");

      setAuthenticating(false);
    };

    useEffect(() => {
      _();
    }, [user, authenticating]);

    if (authenticating)
      return (
        <div className=" text-[12px] w-screen h-screen flex flex-col gap-4 justify-center items-center">
          <LoadingUI />
          <span> Checking authentication... </span>
        </div>
      );

      if (user && !authenticating) return <Component {...props} />;

      return null;
  };
}
export default withAuth;
