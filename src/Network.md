### Model模型
网络的组成：连接设备的线路 + 设备所使用的协议

Model（模型）：
- OSI 七层模型
- 五层模型
- 四层模型

五层模型（从底向上）：
1. Physical 物理层：
  - 它代表了连接计算机的实体设备，包括：
    - 网络线路的具体型号(the specifications for the networking cables)
    - 连接器的具体型号(the connectors that join devices together)
    - 信号是如何在这些连接中传递的(the specifications describing how signals are sent over these connections)
2. Data Link 连接层/数据链路层
  - 指定一个规范来翻译物理层中发送的信号，使得网络设备可以相互联通(Responsible for defining a common way of interpreting these signals, so network devices can communicate.)
    - 连接层中常用的协议：
      - Ethernet(以太网)
        - 一个把数据传输去同网络内节点的协议(a protocol responsible for getting data to nodes on the same network or link)
      - WiFi
3. Network 网络层/因特网层
  - 不同的网络通过路由器来相互交流
    - This layer allows different networks to communicate with each other through devices known as routers(路由器).
    - A collection of networks connected together through routers is an internetwork(内网), the most famous of these being the Internet(因特网).
    ---
    - IP(Internet Protocol)：网络的核心协议
    - BGP(Border Gateway Protocol): Routers share data with each other via this protocol,which lets them learn about the most optimal paths to forword traffic
4. Transport 传输层
  - 明确计算机上哪一个客户端或者服务端应当得到哪些数据(the transport layer sorts out which client and server programs are supposed to get that data)
    - TCP(Transmission Control Protocol)传输控制协议
    - UDP(User Datagram Protocol)用户数据报协议
    - TCP确保可靠的数据传输，而UDP不能确保
5. Application 应用层
    - 针对于各个应用而不同的协议
    - http, smtp

#### 总结
用快递包裹来比喻网络分层模型。物理层好比快递车和道路，数据链路层是路口，快递车从一个路口去到下一个路口。

网络层确定从一个地址到下一个地址的道路。

传输层告知快递员将快递送至接受人的门口而不是邻居老王家。

应用层就是快递包裹中的内容。

### TCP
- TCP是一个面向连接的、可靠的、基于字节流的传输层协议。
#### Three way handshake
1. 客户端向服务器发送SYN数据包
  - 客户端选择一个随机数x作为序列号
  - 客户端将带有`SYN`标识位和`Sequence Number`值为x的数据包发送出去
2. 服务器响应发送`SYN-ACK`数据包
  - 服务器端将x的值加一
  - 服务器选取一个随机序列数字y
  - 服务器将带有标识为`ACK`与`SYN`和`Sequence Number`为y，`Acknowledgement Number`为x的数据包发送给客户端
3. 客户端发送ACK数据包，确认握连接建立成功
  - 客户端将x、y的值加一
  - 客户端发送标识位为`ACK`,且`Sequence Number`为y，`Acknowledgement Number`为x的数据包给服务器
- [ref](https://sookocheff.com/post/networking/how-does-tcp-work/) 

####[为什么 TCP 建立连接需要三次握手](https://draveness.me/whys-the-design-tcp-three-way-handshake/)
为了阻止历史的重复连接初始化造成的混乱问题，防止使用 TCP 协议通信的双方建立了错误的连接。
  - 如果当前连接是历史连接，即 SEQ 过期或者超时，那么发送方就会直接发送 RST 控制消息中止这一次连接；
  - 如果当前连接不是历史连接，那么发送方就会发送 ACK 控制消息，通信双方就会成功建立连接；
初始序列号
  - 接收方可以通过序列号对重复的数据包进行去重；
  - 发送方会在对应数据包未被 ACK 时进行重复发送；
  - 接收方可以根据数据包的序列号对它们进行重新排序；
为什么不是四次
  - TCP 协议的设计可以让我们同时传递 ACK 和 SYN 两个控制信息，减少了通信次数，所以不需要使用更多的通信次数传输相同的信息；

### DNS(Domain Name System)
- Resolves domain names to IP addresses.将域名解析为IP地址。
- 过程
  1. 操作系统无法在自己的缓存中找到ip地址，它将向解析器服务器（RESOLVER，ISP服务提供商）发送请求查询
  2. RESOLVER检查自己是否有这个ip地址的缓存信息，如果找不到就向根域名服务器（ROOT SERVER，DNS层次结构的顶部或根目录，共13组，每组多有一个唯一的ip地址，全球部署，由12个不同的组织运营）请求数据
  3. DNS系统中的根服务器定向到TLD（top level domain，存储顶级域的信息，如.com,.org,.net etc）服务器，然后解析器服务器向TLD服务器询问，TLD确定了ip的顶级域名，将请求定向到权威名称服务器（Authoritative name server，存储域的所有信息，包括IP地址）
  4. 解析器服务器向权威名称服务器询问IP地址，名称服务器将IP信息发送给解析器服务器
  5. 解析器服务器将IP地址缓存并返回给客户端

### CND(Content Delivery Network) 内容分发网络
- 定义：是指一组分布在不同地理位置的服务器，协同工作以提供互联网内容的快速交付
- 分发/交付的内容是什么
  - 包括 HTML 页面、javascript 文件、样式表、图像和视频。
- CDN 如何改善网站加载时间？
  - CDN 的全球分布性可缩短用户与网站资源之间的距离。用户不必访问源网站，而是连接到一个能够最快响应（如内容类型、地理区域、网络负载状况等）用户的服务器
  - CDN会对文件进行处理（压缩、最小化），从而减少传输的数据量
  - 硬件和软件优化，例如有效的负载均衡和固态硬盘驱动器，可以帮助数据更快地到达用户。
  - CDN 还可以通过优化连接重用和启用 TLS 假启动来加速使用 TLS/SSL 的站点。
- 功能：
  - 缓存：cdn服务器将资源缓存起来
  - 回源：cdn缓存未命中，向源服务器重新请求资源
- 注意：
  - 如果引用 CDN 的 SVG 浏览器报错，使用svg-inline-loader，手动在 HTML 里面注入 SVG 文件。
  - 注册 Service Worker 的 JS 文件是不能放在 CDN 上的，因为这是官方的规定。
- references
  - [CDN](https://www.cloudflare.com/zh-cn/learning/cdn/what-is-a-cdn/)
  - [前端部署之CDN的那些事情](https://blog.icehoney.me/posts/2020-01-14-frontend-deploy/)
  - [前端性能优化-CDN 缓存](https://jkfhto.github.io/2019-10-17/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-CDN-%E7%BC%93%E5%AD%98/)