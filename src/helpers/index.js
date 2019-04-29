const buildUrlParams = (parameters, isCustomParam) => {
  let qs = '';
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs += key === 'customParams'
        ? buildUrlParams(value, true)
        : `${encodeURIComponent(isCustomParam ? `customParams[${key}]` : key)}=${encodeURIComponent(value)}&`;
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    if (!isCustomParam) qs = `?${qs}`;
  }
  return qs;
};
const cbBasePath = document.querySelector('meta[name=ngcb-base-path]').getAttribute('content');
const cbBaseApiPath = '/api/v1/';

export const buildUrl = (getState, path, params = {}, sendCustomParams = true) => {
  const urlParams = sendCustomParams ? buildUrlParams({
    ...params,
    customParams: getState().app.customParams,
  }) : '';
  return `${cbBasePath}${cbBaseApiPath}${getState().app.rootPath}/${path}${urlParams}`.replace(/\/{2,}/g, '/');
};

export const extractCustomParams = (params) => {
  const customParams = {};
  for (const key in params) {
    const m = key.match(/^custom(.*)/);
    let param_name;
    if (m) {
      param_name = m[1].trim();
      if (param_name !== '' && param_name !== '-'){
        param_name = param_name.charAt(0).toLowerCase() + param_name.slice(1);
        customParams[param_name] = params[key];
      }
    }
  };
  return customParams;
};

export const htmlParser = (domstring) => {
    const html = new DOMParser().parseFromString(domstring, 'text/html');
    return Array.from(html.body.childNodes);
};
