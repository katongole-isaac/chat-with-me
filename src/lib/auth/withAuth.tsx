/**
 * Auth - Used to check if the user is logged in
 *
 */
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getCurrentUser } from "@/helpers/user";
import LoadingUI from "@/components/loading";

function withAuth(Component: React.ComponentType) {
  return function ({ ...props }) {

    // this is used to prevent Flash of unwanted Content
    const [authenticating, setAuthenticating] = useState(true);

    const router = useRouter();

    const user = getCurrentUser();

    useEffect(() => {
      (() => {
        if (!user) {
          setAuthenticating(false);
          return router.replace("/login");
        }

        setAuthenticating(false);
      })();
    }, [user, authenticating]);

    if (authenticating)
      return (
        <div className=" text-[12px] w-screen h-screen flex flex-col gap-4 justify-center items-center">
          <LoadingUI />
          <span> Checking authentication... </span>
        </div>
      );

      return <Component {...props} />;
  };
}
export default withAuth;
