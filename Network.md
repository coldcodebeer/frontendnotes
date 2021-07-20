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

### IP Layer
- A router is performing basic routing functions
  1. A router receives a packet of data.
  2. The router examines the destination IP.
  3. The router looks up the destination network in its routing table.
- non-routable address space
  - Ranges of IP addresses that anyone can use for their internal networks
  - allows for nodes on a network to communicate with each other, but prevents any gateway router from forwarding traffic there, and are reserved for internal networks
    - 10.0.0.0/8
    - 172.16.0.0/12
    - 192.168.0.0/16
#### hard part
- network ID, host ID, subnet ID, subnetmask

### TCP
- The transport layer is responsible for lots of important functions of reliable computer networking. These include multiplexing and demultiplexing traffic, establishing long running connections and ensuring data integrity through error checking and data verification. 
- headers
  - Data offset
    - A device receives a Transmission Control Protocol (TCP) packet. The device understands where the actual data payload begins. This portion of the TCP header provides this information.
- Six TCP contral flags
  1. URG
    - The control flag that isn't really in use by modern networks is the URG flag.
  2. ACK
    - What does a value of one in an ACK control flag represent?
      - The acknowledgement number field should be examined.
  3. PSH
    - You are sending a very small amount of information that you need the listening program to respond to immediately. 
  4. SYN
  5. RST
  6. FIN
- A communication between two devices is over the maximum limit of an ethernet frame size. The Transmission Control Protocol (TCP) splits up the data into segments. Which field in the header helps keep track of the many segments?
  - Sequence number
- The Three way handshake
  - SYN(Client) -> SYN/ACK(Server) -> ACK(Server)
- The four way handshake
  - FIN(Computer A) -> ACK(Computer B) -> FIN(Computer B) -> ACK(Computer A)


### data package in every layer
- Data Link Layer 物理层：Ethernet frame
- Network Layer 网络层：IP datagram
- Transport Layer 传输层：TCP segment

### Terms
- What is a cyclical redundancy check(CRC)?
  - A mathematical calculation used to ensure that all data arrived intact
- ARP(address resolution protocol): 
  - a protocol used to discover the hardware address of a node with a certain IP address.
  - ARP table:
    - a list of IP addresses an the Mac addresses associated with them
- Fragmentation
  - the process of taking a single IP datagram and splitting it up into several smaller datagrams
- TTL
  - Time To Live
  - the standard number for number for a TTL field is 64
- port
  - A port is a 16-bit number that's used to direct traffic to specific services running on a networked computer.
- ephemeral port
  - Ports that are generally used to establish outbound connections are known as port ports.
- A DNS TTL determines what?
  - How long a DNS entry is allowed to be cached