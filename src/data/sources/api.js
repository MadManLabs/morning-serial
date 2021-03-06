const axios = require('axios');
const { toHumanName, hostName, findFavicon } = require('../../utils');
// Prototype for sources
class API {
  static fetch(axiosConfig) {
    const request = axios.create(axiosConfig);
    return (endpoint, config = {}) => (
      request.get(endpoint, config).then(x => x.data)
    );
  }

  static createAxiosConfig(baseURL, apiKey) {
    let params = {};

    if (!apiKey) {
      return {
        baseURL,
        timeout: 10000,
      };
    }

    if (typeof apiKey === 'string') {
      params = { apiKey };
    } else {
      const keyName = Object.keys(apiKey)[0];
      params = { [keyName]: apiKey[keyName] };
    }

    return {
      baseURL,
      timeout: 10000,
      params,
    };
  }

  constructor(uri, type, baseHost, apiKey) {
    const axiosConfig = API.createAxiosConfig(uri, apiKey);
    const host = baseHost || hostName(uri);
    this.fetch = API.fetch(axiosConfig);
    this.name = toHumanName(type);
    this.host = host;
    this.type = type;
    this.faviconURL = findFavicon(host);
  }
}

module.exports = API;
