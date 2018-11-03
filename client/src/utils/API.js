import axios from "axios-jsonp-pro";

export default {

    //get events from the seedDB file
    getEvents: () => {axios.get("/api/events");}
};