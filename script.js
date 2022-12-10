import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: '2m',
  thresholds: {
    http_req_duration: ['max<2000'],
    http_req_failed: ['rate<.01'],
    http_reqs: ['count>=100']
  }
}

const API_BASE_URL = `http://localhost:3001`

export default () => {
  http.batch([
    ['GET', `${API_BASE_URL}/products/920500/related`]
  ])
}