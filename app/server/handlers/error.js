/**
 * @file エラーハンドラ
 */


/**
 * 500エラーページを返す。
 *
 * @param {*} err エラー情報
 * @param {*} req リクエスト情報
 * @param {*} res レスポンス情報
 * @param {*} next 次のミドルウェア関数
 */
exports.handle500 = (err, req, res, next) => {  // eslint-disable-line

  // エラー内容を出力する
  console.error(err.stack); // eslint-disable-line

  // 500ページを返す
  res.status(500).render('errors/500');

};

/**
 * 404エラーページを返す。
 *
 * @param {*} req リクエスト情報
 * @param {*} res レスポンス情報
 * @param {*} next 次のミドルウェア関数
 */
exports.handle404 = (req, res, next) => {  // eslint-disable-line

  // URLを出力する
  console.error(req.originalUrl); // eslint-disable-line

  // 404ページを返す
  res.status(404).render('errors/404');

};
