/**
 * Created by Jackie.Wu on 2017/2/23.
 */

const symbol = data => data ? `${(data.includes('-') ? data : `+${data}`)}%` : '';


export { symbol };