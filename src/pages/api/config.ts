import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function getApiUrl() {
  return publicRuntimeConfig.REACT_APP_API_URL || 'http://localhost:4000';
}

function getStoreId() {
  return process.env.REACT_STORE_ID || '1';
}

function getDomainName() {
  return process.env.REACT_APP_DOMAIN;
}

export default {
  apiUrl: getApiUrl(),
  storeId: getStoreId(),
  appDomain: getDomainName(),
};
