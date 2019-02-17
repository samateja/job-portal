import moment from 'moment';

/**
 * Polling util function to assert till success or timeout
 * @param iteratee
 * @return {{intervalms: number, withRetries: (function(*=, *, *): {times: number, counter: number, done: (function(): Promise<any>)}), timeout: number}}
 */
export function checkTillTimeout (iteratee) {
  return {
    intervalms: 500,
    timeout: 10000 * 6,
    withRetries: function (cb, intervalms, timeout) {
    this.intervalms = intervalms ? intervalms : this.intervalms;
    this.timeout = timeout ? timeout : this.timeout;
    let vm = this;
    return {
      times: this.timeout/this.intervalms,
      counter: 0,
      done: function () {
        return new Promise((resolve, reject) => {
          (function recursiveHandler() {
            return iteratee().then(cb)
              .then(resolve)
              .catch(err => {
                if(this.counter < this.times && err === true){
                  this.counter++;
                  setTimeout(recursiveHandler.bind(this), vm.intervalms);
                }else {
                  reject(err);
                }
              });
          }.bind(this))();
        })
      }
    }
  }
}
}

/**
 * Parse date with moment
 * @param date
 * @return {string}
 */
export const getDateParsed = (date) => {
  return moment(Date.parse(date)).format("MMM D YYYY");
};