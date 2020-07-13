/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */


// prod
export const environment = {
  production: false,
  apiUrl: 'https://aqueous-sierra-56466.herokuapp.com',
  defaultLang: window.navigator.language,
};

export const REGISTRY: any = {
  LOGIN: {
    INIT: '/auth/login?language=' + environment.defaultLang,
    LOGINUSER: '/auth/loginUser'
  },
  ADMINMENU: {
    INIT: '/menu/ADMINMENU',
  },
  RCVGRID: {
    POST: '/rec/receive/save',
  },
  PTNKEYGRID: {
    GET: '/searchHelp/SHPTNGRID?',
  },
  SKUKEYGRID: {
    GET: '/searchHelp/SHSKUGRID?',
  },
  RCVMASTERGRID: {
    GET: '/rec/receive/listRcv?',
    POST: '/rec/receive/saveRcv',
    DELETE: '/rec/receive/deleteRcv/',
  },
  RCVDETAILGRID: {
    GET: '/rec/receive/listRcvDetail?',
    POST: '/rec/receive/saveRcvDetail',
    DELETE: '/rec/receive/deleteRcvDetail/',
  },
}

export function getURI(uri: string): string {
  return environment.apiUrl + uri;
}