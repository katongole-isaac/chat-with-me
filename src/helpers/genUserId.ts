/**
 * generates and stores userId
 * 
 */

import { genId } from "@/lib/uuid";

export function genUserId( ) {

    if(typeof window !== 'undefined' && typeof window.localStorage){

        let userId = window.localStorage.getItem('userId');

        if(!userId) {
            userId = genId();
            window.localStorage.setItem('userId', userId);
        }

        return userId;
    }

}