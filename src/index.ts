import { AxiosRequestConfig } from 'axios' ;
import buildUrl from 'axios/lib/helpers/buildURL';
import utils from 'axios/lib/utils';
import settle from 'axios/lib/core/settle';
import createError from 'axios/lib/core/createError';

function wxAdapter(config: AxiosRequestConfig) {
  return new Promise(function dispatchWxRequest(resolve, reject) {
    let requestTask: void|requestTask;
    const requestConfig: NetworkRequestOpts = {
      url: buildUrl(config.url, config.params, config.paramsSerializer),
      method: config.method as NetworkRequestMethod,
      responseType: 'text',
      success(response: NetworkRequestRes) {
        const settleResponse = {
          data: response.data,
          status: response.statusCode,
          statusText: '',
          headers: response.header,
          config,
          request: requestConfig,
        };

        settle(resolve, reject, settleResponse);
      },
      fail(response: NetworkRequestRes) {
        reject(createError('Network Error', config, response.statusCode, requestTask, {
          data: response.data,
        }));
      },
      complete() {
        requestTask = undefined;
      },
    };

    // Transform request method
    if (typeof config.method === 'string') {
      requestConfig.method = config.method.toUpperCase() as NetworkRequestMethod;
    }

    // Validate data
    if (typeof config.data === 'object' || typeof config.data === 'string') {
      requestConfig.data = config.data;
    } else if (typeof config.data !== 'undefined') {
      throw new Error(`unknown data type: ${typeof config.data}`);
    }

    // Validate responseType
    if (config.responseType === 'json') {
      requestConfig.dataType = 'json';
    } else if (config.responseType) {
      throw new Error(`unknown responseType: ${config.responseType}`);
    }

    // Add request headers
    if (config.headers) {
      utils.forEach(config.headers, function setRequestHeader(val: any, key: string) {
        if (typeof config.data !== 'undefined' && key.toLowerCase() !== 'content-type') {
          requestConfig.header = requestConfig.header  || {};
          requestConfig.header![key] = val;
        }
      });
    }

    // Proxy requestTask abort
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!requestTask) {
          return;
        }
        requestTask.abort();
        reject(cancel);
        requestTask = undefined;
      });
    }
    requestTask = wx.request(requestConfig);
  });
}

export default wxAdapter;
