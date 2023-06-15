import{_ as o,r,o as i,c as h,a as e,b as n,d as s,e as c}from"./app-16539cd9.js";const d={},l=c('<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>当我们开发一个canvas应用的时候，出于效率的考量，免不了要选择一个渲染引擎（比如<strong>PixiJS</strong>)或者工具链更完备的游戏引擎（比如<strong>Cocos Creator</strong>、<strong>Layabox</strong>)。</p><p>渲染引擎通常会有Sprite的概念，一个完整的界面会由很多的Sprite组成，如果编写复杂一点的界面，代码里面会充斥创建精灵、设置精灵位置和样式的“重复代码”，最终我们得到了极致的渲染性能却牺牲了代码的可读性。</p><p>为了解决这个问题，游戏引擎通常会有配套的IDE，界面通过拖拽即可生成，最终导出场景配置文件，这大大方便了UI开发，但是游戏引擎一般都很庞大，有时候我们仅仅想开发个好友排行榜。</p><p>如果有一款渲染引擎，既能用配置文件的方式来表达界面，又可以做到轻量级，将会大大满足我们开发轻量级 canvas 应用的场景，minigame-canvas-engine 应运而生(后面简称 <strong>Layout</strong> )</p><p>Layout 的目标在于用 Web 的开发方式来开发简单的 Canvas 应用。</p>',6),g={href:"https://segmentfault.com/a/1190000021297495?_ea=27021986",target:"_blank",rel:"noopener noreferrer"},_=e("h2",{id:"web端调试",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#web端调试","aria-hidden":"true"},"#"),n(" web端调试")],-1),p={href:"https://codepen.io/pen?template=VwEeLKw",target:"_blank",rel:"noopener noreferrer"},u={href:"https://wechat-miniprogram.github.io/minigame-canvas-engine/playground.html",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"效果预览",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#效果预览","aria-hidden":"true"},"#"),n(" 效果预览")],-1),f=["src"],w=e("h2",{id:"谁在使用",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#谁在使用","aria-hidden":"true"},"#"),n(" 谁在使用")],-1),b=e("p",null,"目前在微信小游戏平台已经超过1000+游戏使用 Layout 来开发开放数据域能力。",-1),B=["src"],v=["src"],x=["src"],L=["src"],k=["src"],y=e("h2",{id:"交流群",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#交流群","aria-hidden":"true"},"#"),n(" 交流群")],-1),$=["src"];function j(t,E){const a=r("ExternalLinkIcon");return i(),h("div",null,[l,e("p",null,[n("有兴趣可以查看详细原理介绍"),e("a",g,[n("文章"),s(a)]),n("。")]),_,e("p",null,[n("为了方便调试，可以基于 codepen "),e("a",p,[n("模板"),s(a)]),n(" 构建demo，旧版本"),e("a",u,[n("Playground"),s(a)]),n("已不再维护。")]),m,e("img",{src:t.$withBase("/imgs/screenshot.gif"),width:"300"},null,8,f),w,b,e("p",null,[e("img",{src:t.$withBase("/imgs/demo.png"),width:"100"},null,8,B),n(),e("img",{src:t.$withBase("/imgs/ditiepaoku.png"),width:"100"},null,8,v),n(),e("img",{src:t.$withBase("/imgs/dazhanggui.jpeg"),width:"100"},null,8,x),n(),e("img",{src:t.$withBase("/imgs/jiuchongshilian.jpeg"),width:"100"},null,8,L),n(),e("img",{src:t.$withBase("/imgs/lvxingchuanchuan.jpeg"),width:"100"},null,8,k)]),y,e("p",null,[n("如果遇到 Layout 是用上的问题或者有合理的需求想要支持，欢迎加入 Layout 交流QQ群探讨。 "),e("img",{src:t.$withBase("/imgs/qq.jpg"),width:"200"},null,8,$)])])}const C=o(d,[["render",j],["__file","index.html.vue"]]);export{C as default};