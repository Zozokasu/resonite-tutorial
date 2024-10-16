# 権限の管理方法
Resoniteには、セッション内での権限の管理機能があります。  
知らない人はアイテムを出せないようにしたり、信頼できる人にキック権限を渡す、などの設定ができます。
ダッシュメニュー【セッション】タブ内、上部の【権限】で開ける画面で設定できます。  
## 権限の種類
| 権限                            | 簡単な説明                                   |
|-------------------------------|-----------------------------------------|
| Admin（アドミン）                   | セッション内の全ての権限を持ちます。           |
| Builder（ビルダー）                 | DevToolや、ProtoFluxToolなど、ワールドに干渉できる編集系ツールを使用できます。               |
| Moderator（モデレーター）[^moderator] | キック、BAN、などの権限を持ちます。                  |
| Guest（ゲスト）                    | ワールドのギミックに触れたり、アイテムを出したりできます。          |
| Spectator（スペクテイター）            | 動く、喋る以外のことができません。              |
[^moderator]: Resoiteモデレーションチームの「モデレーター」とは異なります。

## できること早見表
|               | Admin | Builder | Moderator | Guest | Spectator |
|---------------|---|---|---|---|---|
| セッション名の変更     |○|×|×|×|×|
| アクセスレベルの設定    |○|×|×|×|×|
| 編集系ツールの使用     |○|○|×|×|×|
| ユーザーのキック      |○|○|○|×|×|
| ユーザーのBAN      |○|○|○|×|×|
| 他人の権限の変更      |○|○|○|×|×|
| アイテムを出す       |○|○|○|○|×|
| アイテムを持つ       |○|○|○|○|×|
| ボタンを押す[^dash] |○|○|○|○|×|
| 移動する          | ○|○|○|○|○|
| 喋る            | ○|○|○|○|○|
[^dash]: Spectatorの場合、ミラーのオンオフもできなくなります。ただし、権限にかかわらず、ダッシュメニューは常に操作できます。