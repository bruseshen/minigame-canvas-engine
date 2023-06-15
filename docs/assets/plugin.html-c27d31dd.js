import{_ as n,o as s,c as a,e as t}from"./app-16539cd9.js";const o={},e=t(`<h1 id="微信小游戏插件" tabindex="-1"><a class="header-anchor" href="#微信小游戏插件" aria-hidden="true">#</a> 微信小游戏插件</h1><p>除了通过 npm 的方式引用，在微信小游戏场景下，还支持通过插件的方式引用。</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>通过插件的方式，玩家本地有其他游戏使用了相同版本插件可以免去下载，达到提升启动速度的效果。</p></div><h2 id="安装使用" tabindex="-1"><a class="header-anchor" href="#安装使用" aria-hidden="true">#</a> 安装使用</h2><h3 id="开放数据域引用" tabindex="-1"><a class="header-anchor" href="#开放数据域引用" aria-hidden="true">#</a> 开放数据域引用</h3><p>1.在game.json配置插件引用:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;deviceOrientation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portrait&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;openDataContext&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sub&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Layout&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.2&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;provider&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wx7a727ff7d940bb3f&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;contexts&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;openDataContext&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.在开放数据域内引用插件：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Layout <span class="token operator">=</span> <span class="token function">requirePlugin</span><span class="token punctuation">(</span><span class="token string">&#39;Layout&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>default<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>正常使用Layout来进行渲染。</li></ol><h3 id="在游戏域引用" tabindex="-1"><a class="header-anchor" href="#在游戏域引用" aria-hidden="true">#</a> 在游戏域引用</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>在游戏域引用和在开放数据域引用的差别在于 contexts 的类型，在游戏域为 <strong>isolatedContext</strong>，在开放数据域为 <strong>openDataContext</strong></p></div><p>1.在game.json配置插件引用:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;deviceOrientation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portrait&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Layout&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.1&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;provider&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wx7a727ff7d940bb3f&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;contexts&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;gameContext&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.在开放数据域内引用插件：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Layout <span class="token operator">=</span> <span class="token function">requirePlugin</span><span class="token punctuation">(</span><span class="token string">&#39;Layout&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>default<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>正常使用Layout来进行渲染。</li></ol><h3 id="同时在游戏域和开放数据域使用" tabindex="-1"><a class="header-anchor" href="#同时在游戏域和开放数据域使用" aria-hidden="true">#</a> 同时在游戏域和开放数据域使用</h3><p>配置方式如下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;deviceOrientation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;portrait&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Layout&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.2&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;provider&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wx7a727ff7d940bb3f&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;contexts&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;gameContext&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;openDataContext&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本列表" tabindex="-1"><a class="header-anchor" href="#版本列表" aria-hidden="true">#</a> 版本列表</h2><table><thead><tr><th>版本</th><th>特性</th></tr></thead><tbody><tr><td>1.0.2</td><td>ts重构项目，支持富文本插件能力</td></tr><tr><td>1.0.1</td><td>修复style.backgroundImage调用不生效问题</td></tr><tr><td>1.0.0</td><td>修复一些渲染问题；支持缓动特性；支持canvas组件</td></tr><tr><td>0.0.14</td><td>起始版本，之前的版本小修小补一些问题，不建议引用</td></tr></tbody></table>`,22),p=[e];function i(c,u){return s(),a("div",null,p)}const l=n(o,[["render",i],["__file","plugin.html.vue"]]);export{l as default};