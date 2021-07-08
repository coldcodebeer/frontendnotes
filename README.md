## Search engine optimization (SEO)
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
    - 每个网页都有元描述
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
  - Angular：[Title service](https://angular.io/api/platform-browser/Title)&[Meta service](https://angular.io/api/platform-browser/Meta)


## 浏览器http缓存
### 缓存的的是什么
  存储在本地的web资源（如html页面、tup、js、数据deng）的副本
### 为什么要缓存
- 减少网络拥塞减少了等待时间
- 减少网络带宽消耗
- 降低服务器压力
### 如何缓存
缓存是由HTTP头决定的。浏览器在请求前，会先判断是否命中**强缓存**（本地缓存），如果命中则直接使用缓存的内容不会向服务器发起请求。强缓存是通过`Cache-Control`字段和`Expires`来进行新鲜度（过期机制，也就是缓存副本有效期）校验的，Cache-Control是HTTP1.1提出的特性，为了弥补 Expires 缺陷加入的，优先级高于Expires。Expires标识该资源过期的时间点，它是一个绝对值（GMT），受限于本地时间，如果修改了本地时间，可能会造成缓存失效，即在这个时间点之后，缓存的资源过期。

Cache-Control常见的值代表的含义：

- max-age=<seconds>: 设置缓存存储的最大周期，超过这个时间缓存被认为过期，后面跟一个以“秒”为单位的相对于请求的时间
- no-store：表示当前请求资源禁用缓存 
- public：表示可以在发送请求的客户端、代理服务器等地方进行缓存
- private：表示只有用户自己的浏览器能够进行缓存，公共的代理服务器不允许缓存

若强缓存未命中，浏览器会向服务器发送请求，服务器会依据请求头中的字段来判断是否命中**协商缓存**（弱缓存）。如果命中，服务器会返回304状态码且不携带响应实体，来告知浏览器继续使用缓存的资源。若未命中，服务器则再次返回资源。协商缓存会会使用`ETag If-None-Match `和`Last-Modified If-Modified-Since`这两对字段来进行控制。前者是http1.1中的属性，是对http上一版本的优化，优先级高。
  
If-Modified-Since是一个请求首部字段，但限于在GET或者HEAD请求中使用。Last-Modified是一个响应首部字段，其值未服务器认定的该资源修改的日期时间。当含有If-Modified-Since头字段的请求发送给服务器时，服务器会检查Last-Modified，如果Last-Modified的时间早于或等于 If-Modified-Since则命中弱缓存。Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内被修改多次的话，则将不能准确标注文件的新鲜度。

ETag（响应首部字段）是根据实体内容生成的一段hash字符串（文件指纹），由服务端产生。If-None-Match是一个条件式的请求首部，如果请求资源时在请求首部加上这个字段，值为之前服务器端返回的资源上的ETag，当且仅当服务器上没有任何资源的ETag属性值与这个首部中列出的相匹配的时候，服务器才会返重新发送资源，否则命中弱缓存。这个过程就是是校验值验证机制。

#### 被缓存的资源存储在哪里了 [[ref: A Tale of Four Caches](https://blog.yoav.ws/tale-of-four-caches/)]
请求一个资源时，会按照`Service Worker -> Memory Cache -> Disk Cache -> Push Cache`的顺序依次查找缓存；若未找到则会发起资源请求。
  
- Service Worker [[ref](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)]

  出于安全考量，Service workers只能使用HTTPS。Service Worker运气在后台其他线程，不会影响主JavaScript线程，可使用它编写js脚本控制缓存资源，拦截并修改访问和资源请求。Service Worker中使用cache API来控制缓存；所存内容可持久化，即使关闭页面或者浏览器，缓存依然存在，需开发者要明确删除缓存的操作(using cache.delete(resource))；受限于同源策略，非 CORS 默认失败。

- Memory Cache

  存储在内存中，读取速度快，但持久性不好，对缓存的内容容量有限制，关闭页面后即被释放。内存缓存会对`Content-Type，CORS`等其他特性做校验，却不太在乎`max-age=0 or no-cache Cache-Control `头字段直接缓存这份资源，但对`no-store `指令除外。另外预加载（<link rel=preload）的资源会缓存在这里。
- Disk Cache

  根据Header中的字段进行缓存控制；存储在硬盘中，读取速度较慢，持久性好，电脑重启后也可访问到，容量大；可以跨站缓存。绝大部分的缓存都来自Disk Cache。
- Push Cache [[ref](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)]

  其主要思想是服务器可以预测客户端将要发出的请求，然后提前把一对 请求/响应 发送给客户端，客户端使用时从缓存拿取。该缓存是基于HTTP/2链接的，链接关闭，也就无法接受到缓存，即是这份资源已经需要更新；多个页面如果共用一个HTTP/2链接，也可以共用一个push cache；推送缓存中的项目只能使用一次；但是其应用并不广泛[[ref](https://evertpot.com/http-2-push-is-dead/)]暂不做进一步探索。
## 设计模式
### 状态模式: 一种行为设计模式
状态模式与有限状态机的概念紧密相关。
  - 状态机：全称有限状态机(Finite State Machine)，缩写为 FSM。

其主要思想是程序仅有几种有限的状态，在任何一个特定状态中，程序的行为都不相同，且可从一个状态切换到另一个状态。

由以下3个部分组成：
- State(状态)
- Event(事件): 也称为转移条件(Transition Condition)，触发状态的转移及动作的执行
- Action(动作): 非必须，如只转移状态，不执行其他操作(side effects)

其模式好比这样一个计算公式：`current state + event = next state + side effects`

Finite State Machines in JavaScript
- [Simple state machine in JavaScipt](./state-machine.js) [[ref](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)]
- [xstate:State machines and statecharts for the modern web.](https://github.com/statelyai/xstate)
- [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine)
