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