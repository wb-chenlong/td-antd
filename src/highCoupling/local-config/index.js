function TdConfig() {}

const localConfig = {
  config: (params = {}) => {
    const {
      appStore,
      proxy,
      request,
      locale,
    } = params;

    if (appStore) {
      TdConfig.prototype.appStore = appStore;
    }

    if (proxy) {
      TdConfig.prototype.proxy = proxy;
    }

    if (request) {
      TdConfig.prototype.request = request;
    }

    if (locale) {
      TdConfig.prototype.locale = locale;
    }
  },
  newInstance: () => {
    return new TdConfig();
  },
};

export default localConfig;
