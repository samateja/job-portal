import axios from 'axios';
import {checkTillTimeout} from './utils'
import {result} from "./mockResult";

/**
 * Calls the search api and respond woth the result
 * @param queryString
 * @return {Promise<AxiosResponse<any> | never>}
 */
export const initJobSearch = ({queryString}) => {
  return axios.get('/search' + queryString).then(
    resp => resp.data
  );
};

/**
 * Takes in a pollId and poll on the /poll endpoint untill timeout/end-result
 * @param pollId
 * @return {*}
 */
export const pollResults = ({pollId}) => {
  const thunk = () => {
    return axios.get('./poll/' + pollId);
  };
  return checkTillTimeout(thunk).withRetries((resp) => {
    if(resp.data && typeof resp.data.done != 'undefined') {
      if(resp.data.done === true) {
        return resp.data.data;
      }else {
        throw true;
      }
    } else {
      throw resp.data.message;
    }
  }).done()
};