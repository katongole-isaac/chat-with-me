/**
 * Checks if firebase token has expired and request for a new token;
 *
 */

import { firebaseAuth } from "@/lib/firebaseApp";
import { getCurrentUser, setAuthUser } from "./user";

const checkTokenExpiryAndRenew = () => {
  const user = getCurrentUser();

  if (Boolean(user)) {
    const { expirationTime, accessToken } = user.stsTokenManager;

    const isTokenExpired = Date.now() > expirationTime;

    const expiryTimeInMins = !isTokenExpired  ? Math.floor((expirationTime - Date.now()) / 6000) : null;
    const fiveMins = 5;

    if (!isTokenExpired && expiryTimeInMins && expiryTimeInMins > fiveMins)
      return new Promise( (res, rej) => res(accessToken as string));

    // when the token has expired
    else {

        return new Promise((resolve, reject)=> {

          firebaseAuth.onAuthStateChanged( async (user) => {
            if(!user) return reject(null);

             setAuthUser(user);
             const token = await user.getIdToken();
             resolve( token); 

          });

        });
        

    }
  }
};

export default checkTokenExpiryAndRenew;


