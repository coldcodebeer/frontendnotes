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
- Disk Cache(http cache)

  根据Header中的字段进行缓存控制；存储在硬盘中，读取速度较慢，持久性好，电脑重启后也可访问到，容量大；可以跨站缓存。绝大部分的缓存都来自Disk Cache。
- Push Cache [[ref](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)]

  其[主要思想](http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)是服务器可以预测客户端将要发出的请求，然后提前把一对 请求/响应 发送给客户端，客户端使用时从缓存拿取。该缓存是基于HTTP/2链接的，链接关闭，也就无法接受到缓存，即是这份资源已经需要更新；多个页面如果共用一个HTTP/2链接，也可以共用一个push cache；推送缓存中的项目只能使用一次。但由于各种限制及其支持情况并不理想[[ref](https://evertpot.com/http-2-push-is-dead/)]暂不做进一步探索。

## JavaScript modules 模块
模块化：将JavaScript程序拆分为可按需导入的单独模块的机制

模块规范：[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)、 [CommonJS](https://en.wikipedia.org/wiki/CommonJS)、[UMD](https://github.com/umdjs/umd)、[ES6 module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### AMD
AMD(Asynchronous Module Definition)是一种异步模块规范，主要应用于浏览器端，[RequireJS](https://requirejs.org/)就是采用的该规范。与其类似的另一规范是[SeaJS](https://github.com/seajs/seajs)所遵循的[CMD](https://github.com/seajs/seajs/issues/242)([Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md))的规范。俩者都是解决客户端异步加载模块的方案，皆是从库的使用推广后形成的规范，CMD推崇依赖就近，AMD推崇依赖前置。

### CommonJS
CommonJS模块使用require()加载和module.exports输出，代码是同步加载的，所以不适合浏览器。
CommonJS规范规定，一个文件就是一个模块，每个模块内部，module变量代表当前模块。module其实就是一个对象，它的exports属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
因为CommonJS模块的输出的是一个对象，无法被静态分析，只能整体加载，且CommonJS模块输出的是值的拷贝，不存在动态更新。

### UMD (Universal Module Definition)
旨在提供一个B/S端跨平台的解决方案(结合AMD与CommonJS模块方式)[[ref](https://leohxj.gitbooks.io/front-end-database/content/javascript-modules/about-umd.html)]

原理：
  1. 先判断是否支持Node.js模块格式（exports是否存在），若存在则使用Node.js模块格式
  2. 再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块
  3. 前两个都不存在，则将模块公开到全局（window或global）

### ES6 module
ES6module是浏览器原生支持的模块异步加载功能，使用`import`和`export`实现导入与导出，在ECMAScript2015版中提出，旨在成为服务端与客户端标准的模块化方案。ES6模块默认开启严格模式、顶层作用域是基于模块而非全局、可以动态加载模块。export语句输出的是接口，是绑定关系，即可获取所输出的变量时时的值，这是因为JS引擎对模块里的代码做了静态分析，遇到模块加载命令`import`，就会生成一个只读引用；等到脚本真正执行时，再根据这个只读引用去对应模块里取值。在浏览器中模块化的script标签`<script type="module" src="...">`默认向带有deferred属性的功能(与其他资源一起加载但脚本会在文档解析完后才去执行)，且受同源策略限制。从Node.js v13.2版本开始，默认开启ES6模块。
- [Modules, introduction](https://javascript.info/modules-intro)
- [Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)

## [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Messages)
HTTP（超文本传输协议）是基于TCP/IP的应用层协议。用于规范服务器与客户端间的数据的传输格式。
- HTTP请求报文 = 请求行 + 请求头 + 空行 + 请求内容
  - 请求行： 请求方法 + URL + 协议版本
  - 请求头： 由key/value对组成，每行为一对，用于描述客户端的情况
  - 空行：用于分割请求头与请求内容
  - 请求内容： 请求携带的数据；get请求不会有请求正文；

- 响应报文=状态行 + 响应头 + 空行 + 响应内容
  - 状态行： HTTP协议版本 + 状态码 + 状态码描述
  - 响应头：与请求头结构相同：不区分大小写的字符串
  - 空行： 一个空行指示所有头部的元数据已经发送完毕
  - 响应内容：服务端返回给客户端的数据

1. 数据压缩：http1.1可对响应内容先进行压缩处理后在发送；`Content-Encoding`字段说明数据采用的压缩方法；`Accept-Encoding`说明客户端支持的压缩方法。
2. 长链接：http1.1中可设置`Connection: keep-alive`来告知服务器不要关闭当前的TCP链接，以便其他请求复用，直到客户端或服务器主动关闭连接。
3. 分块传输：如果头字段（请求头或者响应头）里Transfer-Encoding的值未`chunked`，就代要返回的数据采用le"流模式"（stream），非为像"缓存模式"（buffer）那样等数据全部处理完后才发送；每处理好一数据块，就会标明其大小然后发送出去，最后会发送一个大小为0的数据块来标识数据已经发送完毕。
4. 管道化(HTTP Pipelining)：在长链接的前提下，同一个TCP连接里面，客户端可以同时发送多个请求。（支持GET、HEAD，对POST有所限制）但是服务器还是按照顺序响应。HTTP1.1中在服务器端也只是保证了成功处理请求的管线话，响应时并非是管线话；且服务器端与浏览器端对管线化的支持都不理想。所以这方面带来的性能提升并不大。

### POST VS GET
1. GET用于获取信息，一般不会有副作用，是安全且幂等的（不操作数据，同一个url重复获取得到的数据是一样的）。
2. GET只允许ASCII字符且对URL长度有限制，而POST在数据格式与大小上无限制
3. 刷新、后退等浏览器操作于GET请求是无害的，操作会再次提交表单请求
4. POST的数据因为在请求主体内，所以有一定的隐蔽性，而GET的数据在URL中，通过历史记录，缓存很容易查到数据信息
5. get 请求会被浏览器主动缓存，而post不会，除非手动设置
6. get请求在发送过程中会产生一个TCP 数据包；post在发送过程中会产生两个TCP 数据包。对于get方式的请求，浏览器会把http header和 data一并发送出去，服务器响应200（返回数据）；而对于post，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应 200 ok（返回数据）

#### HTTP METHODS
- HEAD: 该请求对应的响应不会返回响应实体(body)，用于确认URL的有效性、获取资源更新的日期时间等

#### reference
- [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)

## HTTPS
超文本传输协议安全（HTTPS）是 HTTP 的安全版本，相较于http提供了对数据完整性的校验（验证数据是否被篡改）、数据隐私性的保护（对传输内容进行加密）、以及身份认证（识别客户端/服务端就是你想要进行通信的）。

`HTTPS = HTTP + SSL / TLS` 。关键点在于HTTPS使用了加密协议对通信进行加密。该协议称为传输层安全性（TLS）是SSL（安全套接字层）的升级版本，SSL已经逐渐被TLS取代。

TSL工作原理[[ref](https://www.cloudflare.com/zh-cn/learning/ssl/what-happens-in-a-tls-handshake/)]：
1. ClientHello：客户端向服务器发送建立加密通信的请求，该请求被称作ClientHello请求；主要是为了向服务器发送客户端支持的TSL协议版本、支持的加密算法以及一个由客户端生成的随机数（client random）。
2. SeverHello：服务器回应客户端的hello请求，告知客户端如下信息
    1. [服务器证书](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-an-ssl-certificate/)
    2. 确认加密算法
    3. 服务器生成的随机数（server random）
3. 客户端收到服务器返回的信息后，首先会对证书进行验证，如果证书颁布机构是不可信的、证书的域名不是想要请求的域名、或者证书过期，就会发出警告，询问客户端用户是否继续[[ref](https://cattail.me/tech/2015/11/30/how-https-works.html)]
    - [证书验证](https://juejin.cn/post/6844903865410650126)：
    如果中间人篡改了证书，那么身份证明是不是就无效了？这个证明就白买了，这个时候需要一个新的技术，数字签名。
    数字签名就是用CA自带的HASH算法对证书的内容进行HASH得到一个摘要，再用CA的私钥加密，最终组成数字签名。
    当别人把他的证书发过来的时候,我再用同样的Hash算法,再次生成消息摘要，然后用CA的公钥对数字签名解密,得到CA创建的消息摘要,两者一比,就知道中间有没有被人篡改了。
4. 如果上述对证书的认证通过后，客户端会在生成一个随机数（premaster secret），并用服务器证书中的公钥加码随机数，发送给服务器
5. 服务器使用私钥解密客户端新发过来的随机数（premaster secret）
6. 服务器和客户端都使用`client random`、`server random`、`premaster secret`计算生成本次会话所用的`会话密钥`，使用对称加码的信息信息传输，提高响应速度（对称加密，计算量小，加密/解密速度快）
7. Client is ready: 客户端向服务器发送通过会话密钥加密过的“finished”信息
8. Server is ready: 服务器向客户端发送通过会话密钥加密过的“finished”信息

以上步骤就是TSL的握手过程，得到以非对称方式加密的密钥，然后在用这个密钥以对称加密的方式进行通信。

然而HTTPS也不是绝对安全的，可以通过中间人攻击。可以通过让HTTPS网站支持[HSTS](https://developers.google.com/search/docs/advanced/security/https?hl=zh-cn)等方式提高安全性。

## [HTTP/2 简介](https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn)
- 数据流: 已建立的连接内的双向字节流，可以承载一条或多条消息。
- 消息: 与逻辑请求或响应消息对应的完整的一系列帧。
- 帧: HTTP/2 通信的最小单位，每个帧都包含帧头，至少也会标识出当前帧所属的数据流。

- 所有通信都在一个TCP连接上完成，此连接可以承载任意数量的双向数据流。
- 每个数据流都有一个唯一的标识符和可选的优先级信息，用于承载双向消息。
- 每条消息都是一条逻辑 HTTP 消息（例如请求或响应），包含一个或多个帧。
- 帧是最小的通信单位，承载着特定类型的数据，例如 HTTP 标头、消息负载等等。 来自不同数据流的帧可以**交错发送**，然后再根据每个帧头的数据流标识符重新组装。

- HTTP/2 二进制分帧层: 
  - 实现了完整的请求和响应复用: 客户端和服务器可以将 HTTP 消息**分解为互不依赖的帧**，然后交错发送，最后再在另一端把它们重新组装起来。
    - 并行交错地发送多个请求，请求之间互不影响。
    - 并行交错地发送多个响应，响应之间互不干扰。
    - 使用一个连接并行发送多个请求和响应。
  - 消除不必要的延迟(队首阻塞从而造成底层 TCP 连接的效率低下)和提高现有网络容量的利用率(在 HTTP/1.x 中，如果客户端要想发起多个并行请求以提升性能，则必须使用多个 TCP 连接)，从而减少页面加载时间。

- 头信息压缩
  - 头信息使用gzip或compress压缩后再发送
  - 客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号

- 服务器推送
  - HTTP/2 新增的另一个强大的新功能是，服务器可以对一个客户端请求发送多个响应。 换句话说，除了对最初请求的响应外，服务器还可以向客户端推送额外资源，而无需客户端明确地请求。

## Cookie
- Cookies是由Http服务器设置的一小段数据，用于在无状态的http通信之上维护状态，服务器将设置好的cookie发送客户端，随后客户端的请求中都会携带该信息，并在客户端中进行保存。
- 在浏览器端可以通过`document.cookie`设置与访问cookie；但无法访问带有`HttpOnly`属性的cookie，有助于防御跨站脚本（XSS）攻击。
- SameSite属性限定了跨站请求时cookie数据是否携带，该属性可以阻止跨站请求伪造攻击（CSRF）：
  - `None`: 跨站请求下继续发送 cookies
  - `Strict`: 在cookie的作用域内（cookie的domain与path属性）发送cookie
  - `Lax`: 只有顶级跳转（如 link 链接）才跨域发送Cookie，子请求(subrequest)不发送（如图片加载或者frames的调用）；该属性是新版现代浏览器的默认值
- Secure：Cookie只应通过HTTPS请求发送给服务端；
- Cookie的生命周期：会话cookie，即没有设置过期时间（Expires）或者有效期（Max-Age），浏览器关闭后被删除；持久性cookie取决于Expires或Max-Ages

## CSRF & XSS
### CSRF
CSRF(Cross Site Request Forgery)跨站请求伪造：攻击者盗用了用户的身份，以用户的名义发送恶意请求。
#### 防御：
  - 加入验证码
  - 验证refer（但会被篡改）
  - Anti CSRF Token（随机保密的token）
    - 在form表单或者头信息中传递token
    ```html
    <meta name="csrf-token" content="{{ csrf_token() }}">
    ```
    - token存储在服务器
    - 服务器通过拦截器验证有效性
    - 校验失败就拒绝请求
  - 加入自定义header（只是把token放入到了header中）
  ```javascript
  <script type="text/javascript">
    var csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS)$/.test(method));
    }
    var o = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(){
        var res = o.apply(this, arguments);
        var err = new Error();
        if (!csrfSafeMethod(arguments[0])) {
            this.setRequestHeader('anti-csrf-token', csrf_token);
        }
        return res;
    };
 </script>
  ```

#### References
- [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### XSS
- Cross Site Scripting（跨站脚本）：客户端中有被插入的恶意脚本，恶意代码被执行获取用户数据
- 种类：反射型、存储型、DOM型
- 防范：
  - 对输入进行过滤
  - 对输出进行编码
  - 使用http-only
  - 使用Content-Security-Policy [ref](https://content-security-policy.com/)
- [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)

### CORS
CORS(Cross-origin resource sharing)跨域资源共享是一种允许服务器让除自身外的其他Origin(域，协议和端口)访问加载资源的机制。
对于非简单请求，会先触发一个预检请求(一个 OPTIONS 请求)，该请求成功后猜后发送真正的请求。需要服务器与浏览器的对该机制的支持，且
在服务器端实现CORS接口。
- 简单请求：请求方法是`简单方法`并且请求头是`简单头`
  - 简单方法：`GET HEAD POST`
  - 简单头: 字段不超过`Accept, Accept-Language, Content-Language, Last-Event-ID, Content-Type`， 且Content-Type的值是`application/x-www-form-urlencoded, multipart/form-data, text/plain`其中之一
- 非简单请求：不符合简单请求条件的

## [Web Performance](https://developer.mozilla.org/zh-CN/docs/Web/Performance)
### 重排(reflow)与重绘(repaint)
- DOM的多个读操作（或写操作）放在一起执行，比如不在读操作后进行写操作，这样会导致浏览器立即进行重排/重绘
- 对数据进行缓存，比如某个标签的属性（div.style.marginTop）会多次使用，那么就将其用一个变量存储起来，下次直接使用，每次都使用`div.style.marginTop`来获取值的话，浏览器就要给出该元素的位置，所以浏览器不得不立即重排。
- 不直接操作DOM，操作[Document Fragment对象](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)或使用虚拟DOM的脚本库
- 利用`display`属性，先设置为`none`（需要1次重排和重绘），然后进行操作等待修改完毕后（这里的任意次修改都不会导致reflow/repaint），在将其恢复显示（需要1次重排和重绘）。另外`visibility : hidden`只会涉及重绘。
- 使用`position: absolute`或者`position: fixed`，它们已脱离文档流，重排的开销会很小。
- 使用requestAnimationFrame API，将某些代码放到下一次重新渲染时执行
- 不要一条条地改变样式，而要通过改变class，或者csstext属性，一次性地改变样式
  ``` javascript
  // bad
  var left = 10;
  var top = 10;
  el.style.left = left + "px";
  el.style.top  = top  + "px";

  // good 
  el.className += " theclassname";

  // good
  el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
  ```
- 主线程只用于UI渲染，然后跟UI渲染不相干的任务，都放在Web Worker线程
#### references
- [网页性能管理详解](https://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)

### CSS Animation(transition & animation) vs JavaScript Animation
- 在只涉及重绘的时候，俩者差别不大
- [Hardware-Accelerated CSS](https://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css)：transform属性动画就可以在GPU中进行。
- 总结：尽可能通过CSS过渡/动画创建动画，复杂动画时候考虑使用js实现。

### 使用DNS-prefetch (DNS 预获取)
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com/"> 
```
  - [Is there a limit to how many domains we should “dns-prefetch preconnect” with Chrome?](https://stackoverflow.com/questions/55445293/is-there-a-limit-to-how-many-domains-we-should-dns-prefetch-preconnect-with-ch)
#### [preload](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/HTML/Preloading_content)
- preload 加载资源一般是当前页面需要的（关键的脚本，字体，主要图片等）；prefetch 一般是其它页面有可能用到的资源
- 可以强制浏览器在不阻塞 document 的 onload 事件的情况下请求资源
- preload 字体不带 crossorigin 也将会二次获取
- preload 用 “as” 或者用 “type” 属性来表示他们请求资源的优先级（比如说 preload 使用 as="style" 属性将获得最高的优先级）;不带 “as” 属性的 preload 的优先级将会等同于异步请求；使用`as`否则资源会被加载两次
### [浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
### 解析
1. 处理HTML标记并构造DOM树
2. 处理CSS并构建CSSOM树
3. 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成
5. 将布局绘制（paint）在屏幕上

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
- [Simple state machine in JavaScipt](./src/state-machine.js) [[ref](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)]
- [xstate:State machines and statecharts for the modern web.](https://github.com/statelyai/xstate)
- [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine)

### Publish–subscribe pattern
- [publish–subscribe.js](./src/publish–subscribe.js)
### Observer Design Pattern
- [observer–pattern.js](./src/observer–pattern.js)

## 手写代码系列
- [实现 call，apply，bind 函数](./src/myCallApplyBind.js)
- [实现 Object.crete function，new 关键字](./src/func-object-crete.js)
- [防抖（debounce）与节流（throttle）](./src/debounce-throttle.js)

## 其他
### [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)
1. base64编码规则：将一个3x8bit的二进制数据转换为4x6bit的二进制数据
例如:11111111,11111111,11111111 切割一下成：111111，111111，111111，111111
再转换为8位的二进制：00111111，00111111，00111111，00111111。
2. 所以一个24位的二进制数据转换为了32的数据，增加了（32-24）/24=1/3的长度
所以2M的二进制文件，经过base64编码之后，大小会增加 (2x1024)/3=682.667byte
(由于最后两个8bit的不够编写成一个64位编码对应的 "A"~"/" 之间的字符，就在最后面一个字符为“=”，所以增加683byte)
3. reference: [假如一个二进制文件大小是2M，经过base64编码之后，大小大概会增加多少？](https://github.com/azl397985856/fe-interview/issues/3)


## [Computer Networking Basic](./Network.md)