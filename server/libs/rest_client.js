/**
 * @file REST通信用クライアント
 */

const axios = require('axios').default;


/**
 * REST通信用クライアント。
 *
 * @author Koichi Nagaoka
 */
class RESTClient {


  /**
   * クライアントを初期化する。
   *
   * @param {string} url    接続先URL
   * @param {object} params パラメータ
   */
  constructor(url, params) {

    this.url    = url;
    this.params = params;
    this.usingAxios = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Proto': 'https'
      }
    });

  }

  /**
   * GETメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  get() {

    return this.connect('get');

  }

  /**
   * DELETEメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  delete() {

    return this.connect('delete');

  }

  /**
   * HEADメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  head() {

    return this.connect('head');

  }

  /**
   * OPTIONSメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  options() {

    return this.connect('options');

  }

  /**
   * POSTメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  post() {

    return this.connect('post');

  }

  /**
   * PUTメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  put() {

    return this.connect('put');

  }

  /**
   * PATCHメソッドで通信を開始する。
   *
   * @returns {Promise} 通信用Promise
   */
  patch() {

    return this.connect('patch');

  }

  /**
   * 指定されたメソッドで通信を開始する。
   *
   * @param {string} method メソッド名
   * @returns {Promise} 通信用Promise
   */
  connect(method) {

    return new Promise((resolve, reject) => {

      // 通信を開始する
      this.usingAxios.request({
        url: this.url,
        method,
        params: this.params
      }).then((response) => {

        resolve(response);

      }).catch((error) => {

        reject(error);

      });

    });

  }


}

/**
 * クライアントを初期化する。
 *
 * @param {string} url    接続先URL
 * @param {object} params パラメータ
 */
module.exports = (url, params) => {

  return new RESTClient(url, params);

};
