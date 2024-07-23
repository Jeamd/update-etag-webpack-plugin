## update-etag-webpack-plugin

---

为本次构建生成一个具有时间戳的 json 文件，并输出到静态资源目录中

### <center>Install</center>

`npm i --save-dev update-etag-webpack-plugin`

`yarn add --dev update-etag-webpack-plugin`

### 方法属性配置

| 属性       | 说明               | 类型               | 默认值 |
| ---------- | ------------------ | ------------------ | ------ |
| name       | 文本内容           | string             | -      |
| ignoreMode | 维护的关键字信息表 | HighlightKeyWord[] | -      |

### <center>Usage</center>

---

webpack.config.js

```
  const UpdateEtagWebpackPlugin = require("update-etag-webpack-plugin");

  module.exports = {
      mode: 'production',
      entry:'./src/index.js',
      output: {
          filename: 'index.js',
          path: path.resolve(__dirname, 'dist')
      },
      plugins: [
          new UpdateEtagWebpackPlugin({ name: "release_time" }),
      ]
  }
```

index.js

```
  fetch('/release_time.json').then((data)=>{
    const { latest_release_at } = data || {};

    const local_latest_release_at = localStorage.getItem('latest_release_at');
    if(latest_release_at !== local_latest_release_at) {
      // do update
      update()
    }
  });
```
