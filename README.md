### Search engine optimization (SEO)
- 良好的文档内容
  - html文档具有语意化的结构
  - 非装饰性图片要设置好alt属性的值
  - 重要的内容要保证在HTML中可见，爬虫是从上至下检索的，如果该内容不可见，将无法被索引
- metadata
  - 独特的描述性标题
    - 每个网页分别指定一个标题
    - 网页标题应具有描述性并且简明扼要
    - 避免关键字堆砌
  - 有用的元描述可
    - 确保您网站上的每个网页都有元描述
    - 为不同网页创建不同的描述
    - 在描述中包含清楚标记的信息
  - 避免用于提示错误的页面出现在搜索结果中
    ```html
    <meta name="robots" content="noindex" />
    ```
  - 多个链接指向同一内容，明确哪一个url显示在搜索结果中
    ```html
      <link rel="canonical" href="your specified url" />
    ```
  上面html部分仅为示意，具体以前端框架中自己的API或者第三方库来实现
- 提高网站加载速度
  - 采用服务端渲染
  - 使用长效缓存
  - 延迟加载图片
- 其他
    <details>
      <summary>使用有意义的 HTTP 状态代码</summary>

      使用有意义的状态代码告知 Googlebot 是否应抓取某个网页或是否将某个网页编入索引（例如：404 代码表示找不到网页，401 代码表示必须登录才能访问网页）。使用 HTTP 状态代码告知 Googlebot 某个网页是否已移至新网址，以便系统相应地更新索引。
    </details>
    <details>
      <summary>使用 History API 而非片段</summary>

      Googlebot在网页中查找链接时，只考虑 href HTML 链接属性中的网址。所以抓取不到使用片段加载的网页内容。
    </details>
    <details>
    <summary>让Google搜索引擎能够突出显示网站内容：</summary>

    添加结构化数据（structured data）
    以react-helmet举例
    ```javascript
    const structuredData = {
      "@context": "http://www.yoursite.com",
      "@type": "buiness",
      "name": "xxx store",
      "image": yourproductimag.url,
    }
    return (
      <helmet>
        <script type="application/ld+json">{structuredData}</script>
      </helmet>
    )
    ```
    </details>

#### Reference
- [JavaScript Web 应用的 3x3 个 SEO 提示](https://www.youtube.com/watch?v=y1UzfahXfao&ab_channel=GoogleChromeDevelopers)
  - [react-helmet: A document head manager for React](https://github.com/nfl/react-helmet#readme)
  - [vue-meta: Manage HTML metadata in Vue.js components with SSR support](https://github.com/nuxt/vue-meta)
  - Angula：[Title service](https://angular.io/api/platform-browser/Title)&[Meta service](https://angular.io/api/platform-browser/Meta)
