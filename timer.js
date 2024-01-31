//即時関数
(function () {
 
    var timer = document.getElementById('timer');
    timer.style.fontSize = "60px"
    var min = document.getElementById('min');
    min.style.fontSize = "60px"
    var sec = document.getElementById('sec');
    sec.style.fontSize = "60px"
    var reset = document.getElementById('reset');
    reset.style.fontSize = "60px"
    var start = document.getElementById('start');
    start.style.fontSize = "60px"
    var pause = document.getElementById('pause');
    pause.style.fontSize = "60px"
    const music = new Audio('pon34.mp3');

    // スタートタイムを押した時の時間を入れる変数
    var startTime;

    // 残り時間を計算するための変数
    var timeLeft;

    // 現在時刻と表示形式を合わせるために * 1000
    var timeToCountDown = 0;

    // Push.Permission.request(
    //     () => console.log('許可されました！'),
    //     () => console.log('許可されませんでした。')
    // );

    // clearTimeoutメソッドを使いたいので、その時用に変数定義
    var timerId;

    // カウントダウンの状態を管理できるようにする
    var isRunning = false;
    
    // 残り時間を表示するために、ミリ秒を渡すと、分や秒に直してくれる関数
    function updateTimer(t) {

        // 引数として渡されたtでデータオブジェクトを作りたいので変数dという変数名で作ってみる
        var d = new Date(t);
        var m = d.getMinutes();
        var s = d.getSeconds();
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        timer.textContent = m + ':' + s;
        
        // タイマーをタブにも表示する
        var title = timer.textContent = m + ':' + s;;
        document.title = title;

    }


    function countDown() {

        // 10ミリ秒後に実行する
        timerId = setTimeout(function () {

            // 残り時間 = カウントされる時間 - 現在時刻
            timeLeft = timeToCountDown - (Date.now() - startTime);

            // 残り時間が0になった時の処理
            if (timeLeft < 0) {
                isRunning = false;
                window.focus();
              
                // if (Push.Permission.has()) {
                //     Push.create("時間です！", {
                //         body: "これはpush.jsのテスト通知です。",
                //         icon: 'icon.png',
                //         timeout: 4000,
                //         onClick: function () {
                //             window.focus();
                //             this.close();
                //         }
                //     });
                // }
                // window.open(
                //     "https://www.mes.co.jp/",
                //     "_blank",
                //     "menubar=0,width=300,height=200,top=100,left=100"
                // );
                music.currentTime = 0;
                music.play();
                music.loop = true;
                window.focus();
                start.textContent = 'スタート';
                clearTimeout(timerId);
                timeLeft = 0;

                timeToCountDown = 0;

                updateTimer(timeLeft);

                return;
            }

            // countDownを再帰的に呼び出すために記述
            updateTimer(timeLeft)
            countDown();

        }, 10);
    }

    // スタートを押したときの処理
    start.addEventListener('click', function () {

        if (isRunning === false) {
            isRunning = true;

            start.textContent = 'ストップ';
            
            startTime = Date.now();

            // カウントダウンの機能は再帰的に実行
            countDown();
        } else {
            isRunning = false;

            // 表記をStartに戻す
            start.textContent = 'スタート';

            // この時点のtimeLeftで更新してあげる
            timeToCountDown = timeLeft;

            // カウントを止めたいのでclearTimeoutする
            clearTimeout(timerId);
        }
    });

    // 分を押した時の処理
    min.addEventListener('click', function () {

        // カウントダウン中に設定時間を変更できないようにする
        if (isRunning === true) {
            return;
        }

        // 分 = 60秒なので
        timeToCountDown += 60 * 1000;

        // 60分、60秒を超えたら0にする
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        // timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    // 秒を押した時の処理
    sec.addEventListener('click', function () {

        // カウントダウン中に設定時間を変更できないようにする
        if (isRunning === true) {
            return;
        }

        // 1秒なので
        timeToCountDown += 1000;

        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        // timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    // リセットを押した時の処理
    reset.addEventListener('click', function () {

        // カウントダウン中に設定時間を変更できないようにする
        if (isRunning === true) {
            return;
        }

        timeToCountDown = 0;

        // timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


 　　//ポーズを押した時の処理
    pause.addEventListener('click', function () {

        music.loop = false;
        music.pause();
    });
})();
