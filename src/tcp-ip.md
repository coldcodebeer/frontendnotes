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

#### TCP fast open(TFO)
- 请求Fast Open Cookie
  1. 客户端发送SYN数据包，该数据包包含Fast Open选项，且该选项的Cookie为空，这表明客户端请求Fast Open Cookie；
  2. 支持TCP Fast Open的服务器生成Cookie，并将其置于SYN-ACK数据包中的Fast Open选项以发回客户端；
  3. 客户端收到SYN-ACK后，缓存Fast Open选项中的Cookie。
- 实施TCP Fast Open
  1. 客户端发送SYN数据包，**该数据包包含数据**（对于非TFO的普通TCP握手过程，SYN数据包中不包含数据）以及此前记录的Cookie；
  2. 支持TCP Fast Open的服务器会对收到Cookie进行校验：如果Cookie有效，服务器将在SYN-ACK数据包中对SYN和数据进行确认（Acknowledgement），服务器随后将数据递送至相应的应用程序；否则，服务器将丢弃SYN数据包中包含的数据，且其随后发出的SYN-ACK数据包将仅确认（Acknowledgement）SYN的对应序列号；
  3. **如果服务器接受了SYN数据包中的数据，服务器可在握手完成之前发送数据；**
  4. 客户端将发送ACK确认服务器发回的SYN以及数据，但如果客户端在初始的SYN数据包中发送的数据未被确认，则客户端将重新发送数据；
  5. 此后的TCP连接和非TFO的正常情况一致。
- [TCP快速打开](https://zh.wikipedia.org/wiki/TCP%E5%BF%AB%E9%80%9F%E6%89%93%E5%BC%80)


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