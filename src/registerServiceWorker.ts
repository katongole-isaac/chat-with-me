/**
 * Experimental
 * -- Registering service worker --
 *
 */

export default async () => {

 if(typeof window !== 'undefined'){

     if (!("serviceWorker" in navigator))
       return console.warn(`Browser doesn't support service worker.`);
    
       try {
           
           const registration = await navigator.serviceWorker.register('sw.js', {scope: '/'});
           if(registration.active) console.log(`[Service Worker]: Activated`);
    
       } catch (error) {
           console.log(`[Service Worker]: ${error}`);
       }
 }


};
