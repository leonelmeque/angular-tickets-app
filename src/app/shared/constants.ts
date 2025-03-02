import { environment } from '../../environments/environment';

const BASE_URL = 'https://api.jsonbin.io/v3';

const HEADERS: Record<string, string | undefined> = {
  'X-Master-Key': environment.MASTER_KEY,
  'X-Access-Key': environment.ACCESS_KEY,
};

const BINS = {
  tickets: '67c37654ad19ca34f814c994',
};

export const constants = {
  BASE_URL,
  HEADERS,
  BINS,
};
