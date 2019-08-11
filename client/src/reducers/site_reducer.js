 import {
     GET_SITE_DATA,
     UPDATE_SITE_DATA
 } from '../actions/types';

export default function(state={},action){
    switch(action.type){
         case GET_SITE_DATA:
             return { ...state, siteData: action.payload }
         case UPDATE_SITE_DATA:
             return { ...state, siteData: action.payload.siteInfo }
             //to get the siteInfo from server app.post /api/site/site_data
        default:
            return state;
    }
}