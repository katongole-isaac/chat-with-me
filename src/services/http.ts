/**
 * This module provides methods used 
 * in data fetching to external APIs
 * 
 */

import axios from "axios";

// you can set the defaults




export default {
    get: axios.get,
    post: axios.post,
    put: axios.put
}