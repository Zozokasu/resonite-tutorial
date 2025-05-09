# 動画・配信向け機能
ここでは、カメラコントロールに含まれる機能のうち、主に
- カメラの動きに関する設定
- カメラアンカー機能 （1カメ、2カメみたいなもの）
- OBS連携

など、撮影や配信との相性がいい機能をピックアップして説明します。  
動画・配信にかかわる機能をなるべく全て書くので、他のページで書いたことと一部重複があるかもしれません。

## カメラの動き
マニュアル以外の４つのカメラモードでは、ユーザーの動きに合わせてカメラが動きます。  
動きの素早さ、アングルを動かす速度などを細かく調整できます。

### プレビュー画面の左側の項目
#### 遮蔽物を避ける
三人称視点とグループモードで、カメラと被写体の間に壁などの障害物があった時に、障害物の前にカメラが移動します。

#### ゆらゆら動かす
カメラがゆらゆら揺れます。「なんか良い感じ」の揺れをつくることができます。

#### 頭の前方を狙う
カメラが自分の頭の前方を中心に収めるようになります。自分（被写体）ではなく、自分の前にあるもの、自分が操作しているものに注目させたい時に便利です。

#### カメラを非表示
カメラ自身がカメラに映らなくなります。カメラの影を消したいとき等に使います

#### カメラの位置で音を拾う
音を拾う位置が視点の位置ではなくカメラの位置になります。

### 歯車マークのボタンから開く設定画面
#### グループの判定範囲・グループの除外境界
グループモードで、被写体の人に対して他人がどれほど近づいたらグループとして認識するか、また、どれほど遠ざかったらグループから除外するかを設定します。

#### カメラの移動速度
グループモードで、グループに人が加わったり抜けたりしたときのカメラの移動速度を設定します。

#### カメラの旋回速度
三人称視点、グループモードで、カメラが被写体の顔の向きに合わせて旋回（頭の周りを周回）する際のスピードを設定します。
#### カメラの追跡速度
マニュアル以外のモードで、カメラが被写体の方に振り向くスピードを設定します。

### 矢っぽい形のボタンから開く設定画面
#### 画角
画角の角度です。デフォルトは60（度）です。垂直画角を設定します。
数字が小さければ小さいほど、いわゆるズーム倍率は高くなります。
#### 回転オフセット
どの方向から被写体を写すかを設定します。デフォルトは0（度）、正面です。

#### 距離
カメラと被写体との距離を設定します。デフォルトは1.5（メートル）です。

#### 高さ
カメラの被写体（の頭）からの高さを設定します。デフォルトは0（メートル）です。
数字を大きくすると、被写体を見下ろすアングルになり、マイナスの値にすると被写体を見上げるアングルになります。
#### ピッチ回転（一人称）
一人称視点での、カメラの上下方向の補正角度（頭で言うところの見上げる、見下ろす回転）を設定します。デフォルトは0（度）です。
#### ロール回転（一人称）
一人称視点での、カメラの左右方向の傾き（頭で言うところの首をかしげる回転）を設定します。デフォルトは0（度）です
#### 前後移動（一人称）
一人称視点での、カメラの前後方向の移動を設定します。デフォルトは0（メートル）です。
- 一人称視点モードで、アバターの一部が映り込んでしまった際の補正に使えます。

## カメラアンカー
【カメラアンカー設置】ボタンを押すと、カメラがあるその位置に、角度、画角が設定された「カメラアンカー」が設置されます。

ワールド内にはカメラアンカーを複数設置することができ、好きなタイミングで切り替えることができます。

カメラアンカーを切り替えると、カメラがその位置に移動し、カメラの角度、画角がカメラアンカー側の数値に自動的に変わります。

- アンカーとは、錨（いかり）のことです。

### カメラアンカーの設定
マップのピンみたいなアイコンをクリックすると、カメラアンカーの設定画面が開きます。

#### アンカー間をなめらかに移動する
オンにすると、カメラアンカーを切り替える際にカメラがアンカー間を移動するようになります。

オフにすると、カメラアンカーを切り替える際にカメラがアンカー間を瞬間移動するようになります。

#### アンカー間の移動速度
アンカー間を移動する際の速度を設定します。
数字が大きいほど早いです。

#### 等速移動・回転
オンにすると、カメラアンカー間の移動が直線的な動きになります。
オフにすると、カメラアンカー間の移動がなめらかな、曲線的な動きになります。

### カメラアンカーの名前の変え方
カメラアンカーの名前（カメラアンカー一覧に表示される名前）は好きに変えられます。

1. カメラアンカーをインスペクターで開きます
   - DevToolを装備し、カメラアンカーをセカンダリで選択。選択した状態でコンテキストメニュー -> 【インスペクターを開くをクリック】
   - パネル左上の「Root: Visual」という文字の右側の「↑=」みたいなボタンをクリック
   - 表示された「Camera Anchor」をクリック
2. パネル右上の「Name」の中身を編集します。ここがカメラアンカーの名前として表示されます。

## OBS連携
OBS Studioと連携してResonite内部から録画・配信の開始（終了）ができます。

ここでは、Resoniteとの連携方法を説明します。OBS Studioの基本操作などはここで説明しません。  
OBS Studioの公式サイトなどを参照してください。

### やり方
OBS側で他のソフトと連携できるようにする設定する必要があるので、その説明です。

### OBS Studioの設定
1. OBS Studio 上部の「ツール(T)」 -> 「WebSocket サーバー設定」をクリック
2. 「プラグイン設定」の中の「WebSocketサーバーを有効にする」にチェックを入れる
3. 「サーバー設定」の中の「サーバーポート」を好きな数字に設定する（デフォルトは4444）。
   - **言ってる意味がわからない場合は「4444」のままにしておいてください。**
   - ここで設定した数字はあとで使います。
   - 好きな数字と言っていますが、1024から65535の間でないといけません。
4. 「サーバー設定」の中の「パスワード」を好きな文字列に設定する（デフォルトは空欄）。
   - ここで設定したパスワードはあとで使います。
5. 右下の「適用」をクリック

### Resonite側の設定
1. カメラコントロールのプレビュー画面右側のOBSアイコンをクリックします。
2. OBS WebSocket IP: にアドレスを入力します。
   - OBS側で「サーバーポート」の数字をいじっていない場合は`` ws://127.0.0.1:4444``です。
   - OBS側で「サーバーポート」の数字を変更している場合は4444の部分を置き換えてください
3. パスワードに設定したパスワードを入力してください。
   - 設定していない場合は空欄のままで大丈夫です。
4. 「接続」をクリック
### 使い方
| 機能 | 説明                                         |
| --- |--------------------------------------------|
|配信開始| OBS Studioで配信を開始します。                       |
| 録画開始 | OBS Studioで録画を開始します。                       |
| 録画/配信時に自動でミラーリング| 録画・配信開始時にデスクトップ画面にカメラの映像がミラーリングされるようになります。 |