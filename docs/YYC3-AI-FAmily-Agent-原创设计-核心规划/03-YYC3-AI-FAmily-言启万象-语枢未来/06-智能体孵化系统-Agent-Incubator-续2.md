---
file: 06-智能体孵化系统-Agent-Incubator-续2.md
title: YYC3-AI-FAmily-Environment-Weaver · 第6部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 6/37 部分：4
author: YYC3 Team <admin@0379.email>
version: v1.0.0
created: 2026-11-08
updated: 2026-11-08
status: stable
tags: [split, design, family, document]
category: design
language: zh-CN
audience: developers,managers,stakeholders
complexity: intermediate
project: yyc3-ai-family-agent
scope: design
source_doc: YYC3-AI-FAmily-Environment-Weaver.md
source_range: L3792-L5658
part_no: 6/37
section_title: 4. 智能体孵化系统（Agent Incubator）（续2）
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第6部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

338. return False

339. 

340. def connect_grpc(self, address: str):

341. """连接到gRPC服务器"""

342. if self.communication_mode != "grpc":

343. raise ValueError("Communication mode is not set to grpc")

344. 

345. try:

346. channel = grpc.insecure_channel(address)

347. self.grpc_stub = agent_communication_pb2_grpc.AgentCommunicationStub(channel)

348. 

349. \# 注册智能体

350. response = self.grpc_stub.RegisterAgent(

351. agent_communication_pb2.RegisterRequest(

352. agent_id=self.agent_id,

353. capabilities=\["text_processing", "code_analysis"\] \# 示例能力

354. )

355. )

356. 

357. if response.status == "SUCCESS":

358. self.connected = True

359. logger.info(f"gRPC connected for agent {self.agent_id}: {response.message}")

360. return True

361. else:

362. logger.error(f"Failed to register gRPC agent: {response.message}")

363. return False

364. 

365. except Exception as e:

366. logger.error(f"gRPC connection error: {e}")

367. return False

368. 

369. async def \_handle_websocket_messages(self):

370. """处理WebSocket消息"""

371. try:

372. async for message in self.websocket:

373. data = json.loads(message)

374. message_type = data.get("type")

375. 

376. if message_type == "message":

377. \# 点对点消息

378. from_agent = data.get("from")

379. content = data.get("content")

380. 

381. \# 调用消息处理回调

382. if from_agent in self.message_handlers:

383. await self.message_handlers\[from_agent\](content)

384. else:

385. logger.warning(f"No handler for messages from {from_agent}")

386. 

387. elif message_type == "broadcast":

388. \# 广播消息

389. topic = data.get("topic")

390. content = data.get("message")

391. 

392. \# 调用广播处理回调

393. if topic in self.broadcast_handlers:

394. await self.broadcast_handlers\[topic\](content)

395. else:

396. logger.warning(f"No handler for broadcasts on topic {topic}")

397. 

398. except websockets.exceptions.ConnectionClosed:

399. logger.info("WebSocket connection closed")

400. self.connected = False

401. except Exception as e:

402. logger.error(f"Error handling WebSocket message: {e}")

403. self.connected = False

404. 

405. async def send_message_websocket(self, to_agent: str, content: Dict\[str, Any\]):

406. """通过WebSocket发送消息"""

407. if not self.connected or not self.websocket:

408. logger.error("Not connected to WebSocket server")

409. return False

410. 

411. try:

412. await self.websocket.send(json.dumps({

413. "type": "message",

414. "target": to_agent,

415. "content": content

416. }))

417. return True

418. except Exception as e:

419. logger.error(f"Error sending WebSocket message: {e}")

420. return False

421. 

422. def send_message_grpc(self, to_agent: str, message_type: str, payload: Dict\[str, Any\]):

423. """通过gRPC发送消息"""

424. if not self.connected or not self.grpc_stub:

425. logger.error("Not connected to gRPC server")

426. return False

427. 

428. try:

429. response = self.grpc_stub.SendMessage(

430. agent_communication_pb2.SendMessageRequest(

431. from_agent=self.agent_id,

432. to_agent=to_agent,

433. message_type=message_type,

434. payload=json.dumps(payload)

435. )

436. )

437. 

438. if response.status == "DELIVERED":

439. return True

440. else:

441. logger.error(f"Message delivery failed: {response.status}")

442. return False

443. 

444. except Exception as e:

445. logger.error(f"Error sending gRPC message: {e}")

446. return False

447. 

448. async def send_message(self, to_agent: str, message_type: str, payload: Dict\[str, Any\]):

449. """发送消息（自动选择通信方式）"""

450. if self.communication_mode == "websocket":

451. return await self.send_message_websocket(to_agent, {"type": message_type, "payload": payload})

452. elif self.communication_mode == "grpc":

453. return self.send_message_grpc(to_agent, message_type, payload)

454. else:

455. logger.error(f"Unknown communication mode: {self.communication_mode}")

456. return False

457. 

458. async def subscribe(self, topic: str):

459. """订阅主题"""

460. if self.communication_mode != "websocket":

461. logger.warning("Subscription is only supported with WebSocket communication")

462. return False

463. 

464. if not self.connected or not self.websocket:

465. logger.error("Not connected to WebSocket server")

466. return False

467. 

468. try:

469. await self.websocket.send(json.dumps({

470. "type": "subscribe",

471. "topic": topic

472. }))

473. return True

474. except Exception as e:

475. logger.error(f"Error subscribing to topic {topic}: {e}")

476. return False

477. 

478. def broadcast(self, topic: str, message_type: str, payload: Dict\[str, Any\]):

479. """广播消息"""

480. if self.communication_mode == "websocket":

481. \# WebSocket通过消息队列实现广播

482. if not self.connected or not self.websocket:

483. logger.error("Not connected to WebSocket server")

484. return False

485. 

486. try:

487. asyncio.create_task(

488. self.websocket.send(json.dumps({

489. "type": "broadcast",

490. "topic": topic,

491. "content": {

492. "type": message_type,

493. "payload": payload

494. }

495. }))

496. )

497. return True

498. except Exception as e:

499. logger.error(f"Error broadcasting message: {e}")

500. return False

501. 

502. elif self.communication_mode == "grpc":

503. \# gRPC直接支持广播

504. if not self.connected or not self.grpc_stub:

505. logger.error("Not connected to gRPC server")

506. return False

507. 

508. try:

509. response = self.grpc_stub.BroadcastMessage(

510. agent_communication_pb2.BroadcastMessageRequest(

511. from_agent=self.agent_id,

512. topic=topic,

513. message_type=message_type,

514. payload=json.dumps(payload)

515. )

516. )

517. 

518. if response.status == "BROADCASTED":

519. logger.info(f"Message broadcasted to {response.subscribers_count} subscribers")

520. return True

521. else:

522. logger.error(f"Broadcast failed: {response.status}")

523. return False

524. 

525. except Exception as e:

526. logger.error(f"Error broadcasting gRPC message: {e}")

527. return False

528. else:

529. logger.error(f"Unknown communication mode: {self.communication_mode}")

530. return False

531. 

532. def register_message_handler(self, from_agent: str, handler: Callable):

533. """注册消息处理回调"""

534. self.message_handlers\[from_agent\] = handler

535. 

536. def register_broadcast_handler(self, topic: str, handler: Callable):

537. """注册广播处理回调"""

538. self.broadcast_handlers\[topic\] = handler

539. 

540. def disconnect(self):

541. """断开连接"""

542. if self.websocket:

543. asyncio.create_task(self.websocket.close())

544. 

545. if self.grpc_stub:

546. \# 在gRPC中，我们可以发送注销消息

547. try:

548. self.grpc_stub.UnregisterAgent(

549. agent_communication_pb2.UnregisterRequest(

550. agent_id=self.agent_id

551. )

552. )

553. except:

554. pass

555. 

556. self.connected = False

557. 

558. def main():

559. parser = argparse.ArgumentParser(description="YYC3智能体通信管理器")

560. parser.add_argument("--mode", choices=\["server", "client"\], default="server", help="运行模式")

561. parser.add_argument("--protocol", choices=\["websocket", "grpc", "both"\], default="both", help="通信协议")

562. parser.add_argument("--host", default="0.0.0.0", help="服务器主机地址")

563. parser.add_argument("--ws-port", type=int, default=8765, help="WebSocket端口")

564. parser.add_argument("--grpc-port", type=int, default=50051, help="gRPC端口")

565. parser.add_argument("--uri", help="客户端连接URI (例如: ws://localhost:8765)")

566. parser.add_argument("--agent-id", help="智能体ID (客户端模式)")

567. 

568. args = parser.parse_args()

569. 

570. if args.mode == "server":

571. if args.protocol in \["websocket", "both"\]:

572. \# 启动WebSocket服务器

573. ws_broker = WebSocketMessageBroker(args.host, args.ws_port)

574. asyncio.get_event_loop().run_until_complete(ws_broker.start())

575. 

576. if args.protocol in \["grpc", "both"\]:

577. \# 启动gRPC服务器

578. grpc_server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

579. 

580. \# 创建WebSocket代理（即使只运行gRPC也需要）

581. ws_broker = WebSocketMessageBroker()

582. agent_communication_pb2_grpc.add_AgentCommunicationServicer_to_server(

583. GRPCCommunicationServicer(ws_broker), grpc_server

584. )

585. 

586. grpc_server.add_insecure_port(f'\[::\]:{args.grpc_port}')

587. grpc_server.start()

588. 

589. logger.info(f"gRPC server started on port {args.grpc_port}")

590. grpc_server.wait_for_termination()

591. 

592. elif args.mode == "client":

593. if not args.uri or not args.agent_id:

594. print("错误：客户端模式需要指定--uri和--agent-id")

595. return

596. 

597. \# 确定通信协议

598. protocol = "websocket" if args.uri.startswith("ws://") or args.uri.startswith("wss://") else "grpc"

599. 

600. async def run_client():

601. client = AgentClient(args.agent_id, protocol)

602. 

603. if protocol == "websocket":

604. success = await client.connect_websocket(args.uri)

605. else:

606. success = client.connect_grpc(args.uri)

607. 

608. if success:

609. logger.info(f"Agent {args.agent_id} connected successfully")

610. 

611. \# 注册消息处理回调

612. def message_handler(content):

613. logger.info(f"Received message: {content}")

614. 

615. def broadcast_handler(content):

616. logger.info(f"Received broadcast: {content}")

617. 

618. client.register_message_handler("\*", message_handler)

619. client.register_broadcast_handler("\*", broadcast_handler)

620. 

621. \# 保持连接

622. try:

623. while client.connected:

624. await asyncio.sleep(1)

625. except KeyboardInterrupt:

626. logger.info("Client disconnected by user")

627. 

628. client.disconnect()

629. else:

630. logger.error("Failed to connect")

631. 

632. asyncio.get_event_loop().run_until_complete(run_client())

633. 

634. if \_\_name\_\_ == "\_\_main\_\_":

635. main()

#### 4.3.2 消息队列初始化与监控脚本

1.  \#!/usr/bin/env python3

2.  \# 示例：消息队列初始化与监控脚本

3.  

4.  import redis

5.  import pika

6.  import json

7.  import time

8.  import argparse

9.  import logging

10. from typing import Dict, List, Any, Optional, Callable, Union

11. from datetime import datetime, timedelta

12. import threading

13. 

14. \# 配置日志

15. logging.basicConfig(level=logging.INFO)

16. logger = logging.getLogger("yyc3-message-queue")

17. 

18. class RedisMessageQueue:

19. """基于Redis的消息队列实现"""

20. 

21. def \_\_init\_\_(self, host: str = "localhost", port: int = 6379, db: int = 0, password: Optional\[str\] = None):

22. self.redis_client = redis.Redis(

23. host=host,

24. port=port,

25. db=db,

26. password=password,

27. decode_responses=True

28. )

29. 

30. \# 检查连接

31. try:

32. self.redis_client.ping()

33. logger.info(f"Connected to Redis at {host}:{port}")

34. except redis.ConnectionError as e:

35. logger.error(f"Failed to connect to Redis: {e}")

36. raise

37. 

38. def create_queue(self, queue_name: str, max_length: Optional\[int\] = None):

39. """创建队列"""

40. \# Redis的列表天然支持队列功能，不需要显式创建

41. \# 但可以设置最大长度

42. if max_length:

43. self.redis_client.config_set(f"list-max-ziplist-size", str(max_length))

44. 

45. logger.info(f"Queue {queue_name} created (or already exists)")

46. 

47. def delete_queue(self, queue_name: str):

48. """删除队列"""

49. self.redis_client.delete(queue_name)

50. logger.info(f"Queue {queue_name} deleted")

51. 

52. def publish(self, queue_name: str, message: Dict\[str, Any\]):

53. """发布消息到队列"""

54. \# 添加时间戳

55. message\["timestamp"\] = datetime.utcnow().isoformat()

56. message_str = json.dumps(message)

57. 

58. self.redis_client.rpush(queue_name, message_str)

59. logger.info(f"Message published to queue {queue_name}")

60. 

61. def consume(self, queue_name: str, callback: Callable, timeout: int = 0, auto_ack: bool = True):

62. """消费队列中的消息"""

63. while True:

64. try:

65. \# 从队列左侧获取消息

66. result = self.redis_client.blpop(queue_name, timeout=timeout)

67. 

68. if result:

69. \_, message_str = result

70. message = json.loads(message_str)

71. 

72. try:

73. callback(message)

74. if not auto_ack:

75. \# 如果不自动确认，需要手动确认

76. pass

77. except Exception as e:

78. logger.error(f"Error processing message: {e}")

79. \# 如果处理失败，可以选择重新入队或丢弃

80. if not auto_ack:

81. \# 将消息放回队列右侧

82. self.redis_client.rpush(queue_name, message_str)

83. elif timeout == 0:

84. \# 如果超时为0，立即返回

85. break

86. else:

87. logger.debug(f"No messages in queue {queue_name} after timeout")

88. 

89. except KeyboardInterrupt:

90. logger.info("Consumer stopped by user")

91. break

92. except Exception as e:

93. logger.error(f"Error in consumer: {e}")

94. time.sleep(1) \# 等待一秒后重试

95. 

96. def peek(self, queue_name: str, count: int = 1) -\> List\[Dict\[str, Any\]\]:

97. """查看队列中的消息（不消费）"""

98. messages = \[\]

99. 

100. for i in range(count):

101. message_str = self.redis_client.lindex(queue_name, i)

102. if message_str:

103. messages.append(json.loads(message_str))

104. else:

105. break

106. 

107. return messages

108. 

109. def get_queue_length(self, queue_name: str) -\> int:

110. """获取队列长度"""

111. return self.redis_client.llen(queue_name)

112. 

113. def clear_queue(self, queue_name: str):

114. """清空队列"""

115. self.redis_client.delete(queue_name)

116. logger.info(f"Queue {queue_name} cleared")

117. 

118. def get_queue_info(self, queue_name: str) -\> Dict\[str, Any\]:

119. """获取队列信息"""

120. length = self.get_queue_length(queue_name)

121. 

122. \# 获取第一个和最后一个消息的时间戳

123. oldest_timestamp = None

124. newest_timestamp = None

125. 

126. if length \> 0:

127. oldest_msg_str = self.redis_client.lindex(queue_name, 0)

128. oldest_msg = json.loads(oldest_msg_str)

129. oldest_timestamp = oldest_msg.get("timestamp")

130. 

131. newest_msg_str = self.redis_client.lindex(queue_name, -1)

132. newest_msg = json.loads(newest_msg_str)

133. newest_timestamp = newest_msg.get("timestamp")

134. 

135. return {

136. "name": queue_name,

137. "length": length,

138. "oldest_timestamp": oldest_timestamp,

139. "newest_timestamp": newest_timestamp

140. }

141. 

142. class RabbitMQMessageQueue:

143. """基于RabbitMQ的消息队列实现"""

144. 

145. def \_\_init\_\_(self, host: str = "localhost", port: int = 5672,

146. username: str = "guest", password: str = "guest",

147. virtual_host: str = "/"):

148. self.connection_params = pika.ConnectionParameters(

149. host=host,

150. port=port,

151. virtual_host=virtual_host,

152. credentials=pika.PlainCredentials(username, password)

153. )

154. 

155. try:

156. self.connection = pika.BlockingConnection(self.connection_params)

157. self.channel = self.connection.channel()

158. logger.info(f"Connected to RabbitMQ at {host}:{port}")

159. except pika.exceptions.AMQPConnectionError as e:

160. logger.error(f"Failed to connect to RabbitMQ: {e}")

161. raise

162. 

163. def create_queue(self, queue_name: str, durable: bool = True, arguments: Optional\[Dict\] = None):

164. """创建队列"""

165. self.channel.queue_declare(

166. queue=queue_name,

167. durable=durable,

168. arguments=arguments

169. )

170. logger.info(f"Queue {queue_name} created")

171. 

172. def delete_queue(self, queue_name: str, if_unused: bool = False, if_empty: bool = False):

173. """删除队列"""

174. self.channel.queue_delete(

175. queue=queue_name,

176. if_unused=if_unused,

177. if_empty=if_empty

178. )

179. logger.info(f"Queue {queue_name} deleted")

180. 

181. def publish(self, queue_name: str, message: Dict\[str, Any\],

182. persistent: bool = True, priority: Optional\[int\] = None):

183. """发布消息到队列"""

184. \# 添加时间戳

185. message\["timestamp"\] = datetime.utcnow().isoformat()

186. message_str = json.dumps(message)

187. 

188. properties = pika.BasicProperties(

189. delivery_mode=2 if persistent else 1, \# 2表示持久化

190. priority=priority

191. )

192. 

193. self.channel.basic_publish(

194. exchange='',

195. routing_key=queue_name,

196. body=message_str,

197. properties=properties

198. )

199. logger.info(f"Message published to queue {queue_name}")

200. 

201. def consume(self, queue_name: str, callback: Callable, auto_ack: bool = True,

202. prefetch_count: int = 1, consumer_tag: str = ""):

203. """消费队列中的消息"""

204. def wrapped_callback(ch, method, properties, body):

205. try:

206. message = json.loads(body.decode('utf-8'))

207. callback(message)

208. 

209. if not auto_ack:

210. \# 手动确认消息

211. ch.basic_ack(delivery_tag=method.delivery_tag)

212. except Exception as e:

213. logger.error(f"Error processing message: {e}")

214. 

215. if not auto_ack:

216. \# 拒绝消息，可以选择是否重新入队

217. ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

218. 

219. \# 设置预取数量

220. self.channel.basic_qos(prefetch_count=prefetch_count)

221. 

222. \# 开始消费

223. self.channel.basic_consume(

224. queue=queue_name,

225. on_message_callback=wrapped_callback,

226. auto_ack=auto_ack,

227. consumer_tag=consumer_tag

228. )

229. 

230. logger.info(f"Started consuming from queue {queue_name}")

231. 

232. try:

233. self.channel.start_consuming()

234. except KeyboardInterrupt:

235. logger.info("Consumer stopped by user")

236. self.channel.stop_consuming()

237. 

238. def peek(self, queue_name: str, count: int = 1, requeue: bool = True) -\> List\[Dict\[str, Any\]\]:

239. """查看队列中的消息（不消费）"""

240. messages = \[\]

241. 

242. \# 获取队列状态

243. method_frame, header_frame, body = self.channel.basic_get(queue=queue_name, auto_ack=False)

244. 

245. while method_frame and len(messages) \< count:

246. try:

247. message = json.loads(body.decode('utf-8'))

248. messages.append(message)

249. 

250. \# 如果不确认，消息会重新入队

251. if requeue:

252. self.channel.basic_nack(delivery_tag=method_frame.delivery_tag, requeue=True)

253. else:

254. self.channel.basic_ack(delivery_tag=method_frame.delivery_tag)

255. 

256. \# 获取下一条消息

257. method_frame, header_frame, body = self.channel.basic_get(queue=queue_name, auto_ack=False)

258. except Exception as e:

259. logger.error(f"Error peeking message: {e}")

260. break

261. 

262. return messages

263. 

264. def get_queue_length(self, queue_name: str) -\> int:

265. """获取队列长度"""

266. method_frame = self.channel.queue_declare(queue=queue_name, passive=True)

267. return method_frame.method.message_count

268. 

269. def clear_queue(self, queue_name: str):

270. """清空队列"""

271. self.channel.queue_purge(queue=queue_name)

272. logger.info(f"Queue {queue_name} cleared")

273. 

274. def get_queue_info(self, queue_name: str) -\> Dict\[str, Any\]:

275. """获取队列信息"""

276. method_frame = self.channel.queue_declare(queue=queue_name, passive=True)

277. 

278. length = method_frame.method.message_count

279. 

280. \# 获取队列中的第一条和最后一条消息（如果有）

281. oldest_timestamp = None

282. newest_timestamp = None

283. 

284. if length \> 0:

285. \# 获取第一条消息（队列前端）

286. method_frame, header_frame, body = self.channel.basic_get(queue=queue_name, auto_ack=False)

287. if body:

288. try:

289. oldest_message = json.loads(body.decode('utf-8'))

290. oldest_timestamp = oldest_message.get("timestamp")

291. except:

292. pass

293. 

294. \# 重新入队

295. self.channel.basic_nack(delivery_tag=method_frame.delivery_tag, requeue=True)

296. 

297. return {

298. "name": queue_name,

299. "length": length,

300. "oldest_timestamp": oldest_timestamp,

301. "newest_timestamp": newest_timestamp,

302. "durable": method_frame.method.durable,

303. "auto_delete": method_frame.method.auto_delete

304. }

305. 

306. def close(self):

307. """关闭连接"""

308. if self.connection and self.connection.is_open:

309. self.connection.close()

310. logger.info("RabbitMQ connection closed")

311. 

312. class MessageQueueManager:

313. """消息队列管理器，支持多种消息队列后端"""

314. 

315. def \_\_init\_\_(self, backend: str = "redis", \*\*kwargs):

316. self.backend = backend.lower()

317. 

318. if self.backend == "redis":

319. self.queue = RedisMessageQueue(\*\*kwargs)

320. elif self.backend == "rabbitmq":

321. self.queue = RabbitMQMessageQueue(\*\*kwargs)

322. else:

323. raise ValueError(f"Unsupported backend: {backend}")

324. 

325. def create_queue(self, queue_name: str, \*\*kwargs):

326. """创建队列"""

327. self.queue.create_queue(queue_name, \*\*kwargs)

328. 

329. def delete_queue(self, queue_name: str, \*\*kwargs):

330. """删除队列"""

331. self.queue.delete_queue(queue_name, \*\*kwargs)

332. 

333. def publish(self, queue_name: str, message: Dict\[str, Any\], \*\*kwargs):

334. """发布消息到队列"""

335. self.queue.publish(queue_name, message, \*\*kwargs)

336. 

337. def consume(self, queue_name: str, callback: Callable, \*\*kwargs):

338. """消费队列中的消息"""

339. self.queue.consume(queue_name, callback, \*\*kwargs)

340. 

341. def peek(self, queue_name: str, count: int = 1, \*\*kwargs) -\> List\[Dict\[str, Any\]\]:

342. """查看队列中的消息（不消费）"""

343. return self.queue.peek(queue_name, count, \*\*kwargs)

344. 

345. def get_queue_length(self, queue_name: str) -\> int:

346. """获取队列长度"""

347. return self.queue.get_queue_length(queue_name)

348. 

349. def clear_queue(self, queue_name: str):

350. """清空队列"""

351. self.queue.clear_queue(queue_name)

352. 

353. def get_queue_info(self, queue_name: str) -\> Dict\[str, Any\]:

354. """获取队列信息"""

355. return self.queue.get_queue_info(queue_name)

356. 

357. def close(self):

358. """关闭连接"""

359. if hasattr(self.queue, 'close'):

360. self.queue.close()

361. 

362. class MessageQueueMonitor:

363. """消息队列监控器"""

364. 

365. def \_\_init\_\_(self, queue_manager: MessageQueueManager, check_interval: int = 60):

366. self.queue_manager = queue_manager

367. self.check_interval = check_interval

368. self.queue_configs = {} \# queue_name -\> {threshold, alert_callback}

369. self.running = False

370. self.monitor_thread = None

371. 

372. \# 历史数据

373. self.history = {} \# queue_name -\> \[{timestamp, length}\]

374. 

375. def add_queue_monitor(self, queue_name: str, threshold: int, alert_callback: Callable):

376. """添加队列监控"""

377. self.queue_configs\[queue_name\] = {

378. "threshold": threshold,

379. "alert_callback": alert_callback

380. }

381. 

382. if queue_name not in self.history:

383. self.history\[queue_name\] = \[\]

384. 

385. def remove_queue_monitor(self, queue_name: str):

386. """移除队列监控"""

387. if queue_name in self.queue_configs:

388. del self.queue_configs\[queue_name\]

389. 

390. def start(self):

391. """启动监控"""

392. if not self.running:

393. self.running = True

394. self.monitor_thread = threading.Thread(target=self.\_monitor_loop)

395. self.monitor_thread.daemon = True

396. self.monitor_thread.start()

397. logger.info(f"Message queue monitor started (interval: {self.check_interval}s)")

398. 

399. def stop(self):

400. """停止监控"""

401. self.running = False

402. if self.monitor_thread:

403. self.monitor_thread.join(timeout=self.check_interval)

404. logger.info("Message queue monitor stopped")

405. 

406. def \_monitor_loop(self):

407. """监控循环"""

408. while self.running:

409. for queue_name, config in self.queue_configs.items():

410. try:

411. \# 获取队列长度

412. length = self.queue_manager.get_queue_length(queue_name)

413. 

414. \# 记录历史

415. timestamp = datetime.utcnow().isoformat()

416. self.history\[queue_name\].append({

417. "timestamp": timestamp,

418. "length": length

419. })

420. 

421. \# 限制历史记录数量（保留最近100条）

422. if len(self.history\[queue_name\]) \> 100:

423. self.history\[queue_name\] = self.history\[queue_name\]\[-100:\]

424. 

425. \# 检查是否超过阈值

426. if length \> config\["threshold"\]:

427. logger.warning(f"Queue {queue_name} length ({length}) exceeds threshold ({config\['threshold'\]})")

428. 

429. \# 调用告警回调

430. try:

431. config\["alert_callback"\](queue_name, length, config\["threshold"\])

432. except Exception as e:

433. logger.error(f"Error in alert callback: {e}")

434. 

435. except Exception as e:

436. logger.error(f"Error monitoring queue {queue_name}: {e}")

437. 

438. \# 等待下一次检查

439. time.sleep(self.check_interval)

440. 

441. def get_queue_history(self, queue_name: str, hours: int = 24) -\> List\[Dict\[str, Any\]\]:

442. """获取队列历史数据"""

443. if queue_name not in self.history:

444. return \[\]

445. 

446. \# 过滤时间范围

447. cutoff_time = datetime.utcnow() - timedelta(hours=hours)

448. cutoff_str = cutoff_time.isoformat()

449. 

450. return \[

451. entry for entry in self.history\[queue_name\]

452. if entry\["timestamp"\] \>= cutoff_str

453. \]

454. 

455. def get_all_queue_info(self) -\> Dict\[str, Dict\[str, Any\]\]:

456. """获取所有监控队列的当前信息"""

457. result = {}

458. 

459. for queue_name in self.queue_configs:

460. try:

461. queue_info = self.queue_manager.get_queue_info(queue_name)

462. history = self.get_queue_history(queue_name, hours=1)

463. 

464. \# 计算平均长度

465. avg_length = sum(entry\["length"\] for entry in history) / len(history) if history else 0

466. 

467. result\[queue_name\] = {

468. \*\*queue_info,

469. "avg_length_1h": avg_length,

470. "threshold": self.queue_configs\[queue_name\]\["threshold"\],

471. "threshold_exceeded": queue_info\["length"\] \> self.queue_configs\[queue_name\]\["threshold"\]

472. }

473. 

474. except Exception as e:

475. logger.error(f"Error getting info for queue {queue_name}: {e}")

476. result\[queue_name\] = {"error": str(e)}

477. 

478. return result

479. 

480. def setup_yyc3_queues(backend: str = "redis", \*\*kwargs):

481. """设置YYC3系统所需的消息队列"""

482. manager = MessageQueueManager(backend, \*\*kwargs)

483. 

484. \# 创建队列

485. queues = \[

486. {

487. "name": "agent-tasks",

488. "description": "智能体任务队列"

489. },

490. {

491. "name": "agent-responses",

492. "description": "智能体响应队列"

493. },

494. {

495. "name": "system-events",

496. "description": "系统事件队列"

497. },

498. {

499. "name": "user-commands",

500. "description": "用户命令队列"

501. },

502. {

503. "name": "file-operations",

504. "description": "文件操作队列"

505. },

506. {

507. "name": "code-analysis",

508. "description": "代码分析队列"

509. }

510. \]

511. 

512. for queue in queues:

513. try:

514. manager.create_queue(queue\["name"\])

515. logger.info(f"Created queue: {queue\['name'\]} - {queue\['description'\]}")

516. except Exception as e:

517. logger.error(f"Failed to create queue {queue\['name'\]}: {e}")

518. 

519. return manager

520. 

521. def default_alert_callback(queue_name: str, length: int, threshold: int):

522. """默认的告警回调"""

523. print(f"ALERT: Queue {queue_name} length ({length}) exceeds threshold ({threshold})")

524. 

525. def main():

526. parser = argparse.ArgumentParser(description="YYC3消息队列初始化与监控")

527. parser.add_argument("--backend", choices=\["redis", "rabbitmq"\], default="redis", help="消息队列后端")

528. parser.add_argument("--host", default="localhost", help="消息队列主机地址")

529. parser.add_argument("--port", type=int, help="消息队列端口")

530. parser.add_argument("--action", choices=\["init", "monitor", "info"\], default="init", help="执行的操作")

531. parser.add_argument("--queue", help="指定队列名称（用于info操作）")

532. parser.add_argument("--redis-password", help="Redis密码")

533. parser.add_argument("--rabbitmq-user", default="guest", help="RabbitMQ用户名")

534. parser.add_argument("--rabbitmq-pass", default="guest", help="RabbitMQ密码")

535. parser.add_argument("--rabbitmq-vhost", default="/", help="RabbitMQ虚拟主机")

536. parser.add_argument("--monitor-interval", type=int, default=60, help="监控检查间隔（秒）")

537. parser.add_argument("--threshold", type=int, default=100, help="队列长度告警阈值")

538. parser.add_argument("--config", help="队列配置文件（YAML格式）")

539. 

540. args = parser.parse_args()

541. 

542. \# 准备连接参数

543. if args.backend == "redis":

544. port = args.port or 6379

545. connection_params = {

546. "host": args.host,

547. "port": port,

548. "password": args.redis_password

549. }

550. else: \# rabbitmq

551. port = args.port or 5672

552. connection_params = {

553. "host": args.host,

554. "port": port,

555. "username": args.rabbitmq_user,

556. "password": args.rabbitmq_pass,

557. "virtual_host": args.rabbitmq_vhost

558. }

559. 

560. if args.action == "init":

561. \# 初始化消息队列

562. manager = setup_yyc3_queues(args.backend, \*\*connection_params)

563. 

564. \# 如果提供了配置文件，则创建额外队列

565. if args.config:

566. with open(args.config, 'r') as f:

567. config = yaml.safe_load(f)

568. 

569. for queue_config in config.get("queues", \[\]):

570. name = queue_config.get("name")

571. if name:

572. manager.create_queue(name, \*\*queue_config.get("options", {}))

573. logger.info(f"Created custom queue: {name}")

574. 

575. logger.info("Message queue initialization complete")

576. 

577. elif args.action == "monitor":

578. \# 启动监控

579. manager = MessageQueueManager(args.backend, \*\*connection_params)

580. 

581. \# 创建监控器

582. monitor = MessageQueueMonitor(manager, args.monitor_interval)

583. 

584. \# 添加默认监控队列

585. default_queues = \["agent-tasks", "agent-responses", "system-events", "user-commands"\]

586. 

587. for queue in default_queues:

588. try:

589. monitor.add_queue_monitor(queue, args.threshold, default_alert_callback)

590. logger.info(f"Added monitor for queue: {queue} (threshold: {args.threshold})")

591. except Exception as e:

592. logger.error(f"Failed to add monitor for queue {queue}: {e}")

593. 

594. \# 启动监控

595. monitor.start()

596. 

597. try:

598. \# 保持运行

599. while True:

600. time.sleep(1)

601. except KeyboardInterrupt:

602. monitor.stop()

603. 

604. elif args.action == "info":

605. \# 显示队列信息

606. if not args.queue:

607. print("Error: --queue is required for info action")

608. return

609. 

610. manager = MessageQueueManager(args.backend, \*\*connection_params)

611. 

612. try:

613. info = manager.get_queue_info(args.queue)

614. print(f"Queue info for {args.queue}:")

615. print(f" Name: {info\['name'\]}")

616. print(f" Length: {info\['length'\]}")

617. print(f" Oldest timestamp: {info.get('oldest_timestamp', 'N/A')}")

618. print(f" Newest timestamp: {info.get('newest_timestamp', 'N/A')}")

619. 

620. \# 显示队列中的前几条消息

621. messages = manager.peek(args.queue, count=3)

622. if messages:

623. print(" Sample messages:")

624. for i, msg in enumerate(messages, 1):

625. print(f" {i}. {msg.get('type', 'Unknown type')}: {msg.get('payload', {})}")

626. else:

627. print(" No messages in queue")

628. 

629. except Exception as e:

630. print(f"Error getting queue info: {e}")

631. 

632. if \_\_name\_\_ == "\_\_main\_\_":

633. main()



---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 6/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
