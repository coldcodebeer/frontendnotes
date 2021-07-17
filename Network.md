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