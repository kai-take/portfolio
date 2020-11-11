module.exports = {
    plugins: [
      "stylelint-scss",
      "stylelint-order",
      "stylelint-declaration-block-no-ignored-properties", // displayの値によって無視されてしまうプロパティを見つける
    ],
    extends: [
      'stylelint-config-standard', //ベースの設定ファイル
      "stylelint-config-recess-order",  // rulesへの記述はしない
    ],
    rules: { // 追加したいルールがあれば
      'color-hex-case': 'lower',
      'color-hex-length': 'short',
      'no-duplicate-selectors': null, // ファイル内の同じ階層に同セレクタを2回書いても良い。エラーを出さないため
      'max-line-length': null, // max文字数を無視
      'font-family-no-missing-generic-family-keyword': null, // fontawesomeでエラーを出さない
      'no-descending-specificity': null, //セレクタの詳細度に関する警告を出さない
      'at-rule-no-unknown': null, //scssで使える @include などにエラーがでないように
      'scss/at-rule-no-unknown': true, //scssでもサポートしていない @ルールにはエラーを出す
      'declaration-block-single-line-max-declarations': null, // 一行ブロック内でのプロパティの数を制限しない、圧縮時にエラーを出さない
    },
  }