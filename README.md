# Household FastAPI+React

## Endpoint

```
# categories
GET   /categories
POST  /categories
DEL   /categories/{category_id}
PATCH /categories/{category_id}

# households
GET   /households
GET   /households/search?year=0000&month=00
POST  /households
GET   /households/{household_id}
DEL   /households/{household_id}
PATCH /households/{household_id}
```


### Thinking  🤔

- 今日のHouseholdsのデータが欲しい場合
  - 1. 専用のAPIを用意しておく
    - `/households/search?year=<int>&month=<int>&day=<int>`
    - 利点: 楽
    - 欠点: APIが大量に必要になる？ response_schema たくさん必要になるし修正点が増えまくる気がする

  - 2. 大雑把に取得して Frontend 側で処理をする
    - 常に今月、今週、今日のデータを表示しておくので月ごとに取得すれば全部表示できる
    - API はここまでで抑えておいて`/households/search?year=<int>&month=<int>`
    - React で filter かけてデータを変換して Nivo に渡してChartを描画
    - 利点: 楽 こっちのほうが柔軟性はありそう
    - 欠点: Frontend 側での処理は単純に重い？
    - 今月分のデータだと一日10回もの購入していると仮定しても(ありえない)大した量のデータにはならないけど
    - 31 days * 10 items = 310 `{id, category, amount, registered_at}` というだけのデータなのでやっぱり少ない


## Examples

入力

- date
- amount
- category (予め大量の項目が設定されている)
- paid_by (支払い元)
- shop_name
- memo

- Query
  - POST: https://zaim.net/money
  - Headers
    - y=08f70a9548ab1d25ea256fd0ab32eaf0;
    - XSRF-TOKEN=eyJpdiI6IjlpT3NiNDJnSk91...=;
    - zv2=eyJpdiI6ImZSME40NnU5My83UGYwV1h...=

eyJから始まってるけど JWTじゃないっぽい?

- Home
  - 今月の利用料金
  - 今週の利用料金
  - 今日の利用料金

- 詳細
  - 今月の利用料金のCategory別の詳細が表示されている

いい感じこれを実装してみよう


## Chart

- [https://nivo.rocks/](Nivo)
