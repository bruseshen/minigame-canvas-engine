# 微信小游戏插件

除了通过 npm 的方式引用，在微信小游戏场景下，还支持通过插件的方式引用。

::: tip
通过插件的方式，玩家本地有其他游戏使用了相同版本插件可以免去下载，达到提升启动速度的效果。
:::

## 安装使用

### 开放数据域引用

1.在game.json配置插件引用:
``` json
{
  "deviceOrientation": "portrait",
  "openDataContext": "sub",
  "plugins": {
    "Layout": {
      "version": "0.0.14",
      "provider": "wx7a727ff7d940bb3f",
      "contexts":[{"type":"openDataContext"}]
    }
  }
}

```

2.在开放数据域内引用插件：
``` js
const Layout = requirePlugin('Layout').default;
```

3. 正常使用Layout来进行渲染。

### 在游戏域引用
::: tip
在游戏域引用和在开放数据域引用的差别在于 contexts 的类型，在游戏域为 **isolatedContext**，在开放数据域为 **openDataContext**
:::


1.在game.json配置插件引用:
``` json
{
  "deviceOrientation": "portrait",
  "plugins": {
    "Layout": {
      "version": "0.0.14",
      "provider": "wx7a727ff7d940bb3f",
      "contexts":[{"type":"isolatedContext"}]
    }
  }
}

```

2.在开放数据域内引用插件：
``` js
const Layout = requirePlugin('Layout').default;
```

3. 正常使用Layout来进行渲染。

## 版本列表
| 版本          | 特性      | 
| --------------- | ------------------- |
| 0.0.14        | 起始版本，之前的版本小修小补一些问题，不建议引用 |