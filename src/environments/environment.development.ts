export const environment = {
  MASTER_KEY: atob(import.meta.env['NG_APP_MASTER_KEY']),
  ACCESS_KEY: import.meta.env['NG_APP_ACCESS_KEY'],
};
