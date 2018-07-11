'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var buildUrl = _interopDefault(require('axios/lib/helpers/buildURL'));
var utils = _interopDefault(require('axios/lib/utils'));
var settle = _interopDefault(require('axios/lib/core/settle'));
var createError = _interopDefault(require('axios/lib/core/createError'));

function mpAdapter(config) {
    return new Promise(function dispatchMpRequest(resolve, reject) {
        var requestTask;
        var requestConfig = {
            url: buildUrl(config.url, config.params, config.paramsSerializer),
            method: config.method,
            responseType: 'text',
            success: function (response) {
                var settleResponse = {
                    data: response.data,
                    status: response.statusCode,
                    statusText: '',
                    headers: response.header,
                    config: config,
                    request: requestConfig
                };
                settle(resolve, reject, settleResponse);
            },
            fail: function (response) {
                reject(createError('Network Error', config, response.statusCode, requestTask, {
                    data: response.data
                }));
            },
            complete: function () {
                requestTask = undefined;
            }
        };
        // Transform request method
        if (typeof config.method === 'string') {
            requestConfig.method = config.method.toUpperCase();
        }
        // Validate data
        if (typeof config.data === 'object' || typeof config.data === 'string') {
            requestConfig.data = config.data;
        }
        else if (typeof config.data !== 'undefined') {
            throw new Error("unknown data type: " + typeof config.data);
        }
        // Validate responseType
        if (config.responseType === 'json') {
            requestConfig.dataType = 'json';
        }
        else if (config.responseType) {
            throw new Error("unknown responseType: " + config.responseType);
        }
        // Add request headers
        if (config.headers) {
            utils.forEach(config.headers, function setRequestHeader(val, key) {
                if (typeof config.data !== 'undefined' || key.toLowerCase() !== 'content-type') {
                    requestConfig.header = requestConfig.header || {};
                    requestConfig.header[key] = val;
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

module.exports = mpAdapter;
