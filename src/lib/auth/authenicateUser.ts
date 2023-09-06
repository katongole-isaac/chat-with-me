/**
 * This is used to authenicate user on the server 
 * 
 */

import http from "@/services/http";
import config from '@/config/defaults.json';

const authenicateUser =  async ( ) => {

    try {

       const res  =  await http.get(config.serverAuthenticateURL);
       
       if(res.status >= 200 && res.status <= 299) return res;
       
    } catch (error) {

        console.log(error);

    }


}

export default authenicateUser ; 