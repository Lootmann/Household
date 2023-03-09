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


## Todo

- backend
  - [x] `/households/search?year=<int>&month=<int>&day=<int>`]
  - [ ] `/households?limit=<int>&offset=<int>` for page nation
  - [x] `/households` order by registered_at
    - registered_at は `yyyy-mm-dd` なので細かく同日のソート順は適当だけどこれでいいや
    - 見栄えのために一応 category_id でソートする


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
