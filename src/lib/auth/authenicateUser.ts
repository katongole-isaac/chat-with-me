/**
 * This is used to authenicate user on the server 
 * 
 */

import http from "@/services/http";
import config from '@/config/defaults.json';

const authenicateUser = async (token: string) => {
  try {
    const res = await http.get(config.serverAuthenticateURL, {
      headers: {
        "x-auth-token": token,
      },
    });

    if (res.status >= 200 && res.status <= 299)
      return { message: res.data.message };

  } catch (error: any) {
    
    // redirection Errors
    if (error && error?.response) {
      const { status, data } = error.response;
      if (status >= 300 && status <= 399)
        return { redirectUrl: data.redirectUrl };
    }

    // handle Expect errors ( client erro 400 >= 499 )

    // unexpect error
    // 500
    console.log(error);
  }
};

export default authenicateUser ; 