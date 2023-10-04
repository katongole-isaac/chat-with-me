/**
 * Service worker
 *
 */

// Detects the connectivity status of the browser
// Determine if the network is reachable or not.
// We ping any url e.g www.google.com every after 1 second to determine
// whether the network is reachable or not
const reportNetworkStatus = async (event) => {
  
  const pingUrl = `https://www.google.com`;

  if (!event.clientId) return;

  // getting the client
  const client = await clients.get(event.clientId);

  if (!client) return;

  const message = { type: "networkStatus", params: { onLine: null } };

  // test the network
  setInterval(async () => {
    try {

      await fetch(pingUrl, {mode: 'no-cors', });

      message.params.onLine = true;

      client.postMessage(JSON.stringify(message));

    } catch (error) {

      message.params.onLine = false;
      
      client.postMessage(JSON.stringify(message));
    }
  }, 2000);
};

const handleFetchEvent = (event) => {
  // event.waitUntil(reportNetworkStatus(event));
};

// self.addEventListener("fetch", handleFetchEvent);
