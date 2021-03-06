export default function script () {
  $(function () { // 通常の記述はここに書いていく
    /*
    スムーススクロール
    ——————————— */
    $('a[href^="#"]').on('click', function () { // aタグのhref属性に # から始まるリンクが設定してある要素を、クリックしたら処理実行
      // スクロールの速度
      const speed = 400 // ミリ秒

      // 固定ヘッダーのズレを解消するため,ヘッダー分の高さを格納
      // その際、ヘッダーの高さがブレイクポイントで変わっていくに連れて、この値も合わせる
      if (window.matchMedia('(min-width: 1920px)').matches) {
        // PC表示の時の処理
        const height = -86
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        // スマホ表示の時の処理
        const height = -68
      } else {
        const height = -50 //
      }

      // クリックしたaタグのhref属性（#、#about等）を取得し、変数に格納
      const href = $(this).attr('href')
      // thisとする事で処理を切り分けている、thisにはクリックしたhtml要素が格納されている。
      // ちなみに$()で囲まないと生のオブジェクトとなりattrは使えないから$()でjqueryのオブジェクトにしている。

      // 上で取得した値が#か空白だったら'html'を(TOP用)、それ以外だったら先ほど取得したhref属性の値を変数に格納。つまりtargetにはhtmlか#about等が入る。
      const target = $(href === '#' || href === '' ? 'html' : href) // 「条件式 ? Trueの処理 : False(それ以外)の処理」
      // $()で取得した移動先の要素のオブジェクトを生成

      // 移動先を座標の数値で取得
      const position = target.offset().top + height

      // スムーススクロール
      $('body,html').animate({
        scrollTop: position
      }, speed, 'swing') // scrollTopはメソッドでその引数にpostionを指定
      // プロパティ, duratioin, easing

      return false // この記述が無くても動く
    })

    /*
    ハンバーガーメニュー
    ——————————— */
    $('.mobile-menu_btn,.nav-link,.cover').on('click', function () {
      if ($('.mobile-menu_btn, .header_nav, .cover').hasClass('active')) {
        $('.mobile-menu_btn, .header_nav, .cover').removeClass('active')
      } else {
        $('.mobile-menu_btn, .header_nav, .cover').addClass('active')
      }
    })

    /*
    モーダル
    ——————————— */
    $('.modal-open').each(function () { // 繰り返し処理
      $(this).on('click', function () {
        const target = $(this).data('target') // htmlで設定したdata-target(modal01や02)を取得

        const modal = $(target) // targetで取得したID名が付与されてるhtml要素をオブジェクト化して変数に格納

        $('.header').css('display', 'none')
        $('.square .content .title, .square .content .text').css('z-index', '0')
        $(modal).fadeIn()
        return false
      })
    })
    $('.overlay,.close-btn').on('click', function () {
      $('.header').css('display', 'flex')
      $('.modal').fadeOut()
      return false
    })
  })

  /*
hoverの切り替え
——————————— */
  $(window).on('load resize orientationchange', function () {
    if ($(window).width() <= 1024) { // 1024px以下はhover解除
      $('body').removeClass('active-hover')
    } else {
      $('body').addClass('active-hover')
    }
  })

  /*
ローディングアニメーション
——————————— */
  $(window).on('load', function () {
    $('.loading').delay(2000).fadeOut(1000) /* ページの読み込み完了の2秒後に1秒かけて消える */
    $('body').addClass('load')
  })
}
