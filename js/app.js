// 最初はログイン画面だけ表示させる
$("#mypage").hide();
$("#input-page").hide();
$("#records-page").hide();



// ⭐ログイン画面⭐
// ログイン判定
$("#login-btn").on("click",function(){

    // 入力されたIDとパスワードを取得
    const loginId = $("#login-id").val();
    const password = $("#login-password").val();

    // ログイン情報の判定
    if(loginId === "test" && password === "pass2026"){

        // ログイン成功
        $("#login-error").text("");
        // ログイン画面を非表示にして、マイページを表示する
        $("#login-page").hide();
        $("#mypage").show();
    
    } else {

        // ログイン失敗
        $("#login-error").text("IDまたはパスワードが違います。");
    }
});

// ⭐マイページ⭐
// ログアウト動作
$("#logout-btn").on("click",function(){
    // マイページを非表示にして、ログイン画面に戻る
    $("#mypage").hide();
    $("#login-page").show();
    
    // IDとパスワードを空にする
    $("#login-id").val("");
    $("#login-password").val("");
})

// 入力画面に移動する
$("#go-input-btn").on("click",function(){
    // マイページを非表示にして、入力画面を表示させる
    $("#mypage").hide();
    $("#input-page").show();
})

// 入力内容を記録する
$("#save-btn").on("click",function(){

    // 入力欄からlocalstrageに値を反映する
    const event = $("#event").val();
    const emotion = $("#emotion").val();
    const reason = $("#reason").val();
    const value = $("#value").val();

    // すべて空欄で保存しようとしたときの挙動
    if(
        event.trim() === "" &&
        emotion.trim() === "" &&
        reason.trim() === "" &&
        value.trim() === ""
    ){
        alert("どれか1つは入力してね！");
        return;
    }

    
    // ローカルストレージに保存
    // 複数の入力内容を１つのオブジェクトにまとめる
    const record = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        event: event,
        emotion: emotion,
        reason: reason,
        value: value
    };

    // ローカルストレージから過去の記録を取得する
    const savedRecords = localStorage.getItem("mypocket_v1_records");

    // 保存済みの記録を配列に変換する
    const records = savedRecords ? JSON.parse(savedRecords) : [];

    // 新しい記録を配列に追加する
    records.push(record);

    // 配列を文字列に変換して保存する
    localStorage.setItem("mypocket_v1_records", JSON.stringify(records));

    alert("マイポケットに仕舞いました！");

    // 保存した後、入力欄をクリアする
    $("#event").val("");
    $("#emotion").val("");
    $("#reason").val("");
    $("#value").val("");
    
});



// 入力画面からマイページへ戻る
$("#input-back-btn").on("click", function() {

    $("#input-page").hide();
    $("#mypage").show();

});




// 記録/閲覧画面に移動する
$("#go-records-btn").on("click",function(){
    // マイページを非表示にして、記録/閲覧画面を表示させる
    $("#mypage").hide();
    $("#records-page").show();

    // ローカルストレージから保存データを取得する
    const savedRecords = localStorage.getItem("mypocket_v1_records");

    // 保存データを配列に変換する
    const records = savedRecords ? JSON.parse(savedRecords) :[];

    // 表示中の記録を一度消して、重複表示させないようにする
    $("#records-list").empty();

        // 記録＝マイピースがない場合の表示
        if(records.length === 0){
            $("#records-list").text("まだマイピースはありません。");
        } else {
            // 記録＝マイピースを新しい順に表示する
            for(let i = records.length - 1; i >= 0; i--){
                const record = records[i];

                // 記録日時を読みやすい形にする
                const date = new Date(record.createdAt).toLocaleString("ja-JP");

                // 記録を表示するカード＝枠を作る
                const card = $("<div>").addClass("record-card");

                // カードに日時と回答を追加する
                card.append($("<h3>").text(date));

                card.append($("<p>").text("出来事：" + record.event));
                card.append($("<p>").text("感情：" + record.emotion));
                card.append($("<p>").text("理由：" + record.reason));
                card.append($("<p>").text("価値観：" + record.value));

                // 記録一覧にカードを追加する
                $("#records-list").append(card);
                
                console.log(JSON.parse(localStorage.getItem("mypocket_v1_records") || "[]").length);
            }
        }




})





// 記録/閲覧画面からマイページへ戻る
$("#records-back-btn").on("click", function() {

    $("#records-page").hide();
    $("#mypage").show();

});