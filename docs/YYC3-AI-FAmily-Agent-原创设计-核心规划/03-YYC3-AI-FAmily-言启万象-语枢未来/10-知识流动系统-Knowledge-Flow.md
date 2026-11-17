---
file: 10-知识流动系统-Knowledge-Flow.md
title: YYC3-AI-FAmily-Environment-Weaver · 第10部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 10/37 部分：
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
source_range: L11418-L13616
part_no: 10/37
section_title: 6. 知识流动系统（Knowledge Flow）
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第10部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 6. 知识流动系统（Knowledge Flow）

### 6.1 系统概述

知识流动系统是YYC3 AI Family的智慧血脉，负责确保智能体间、环境间的知识持续沉淀与流动。正如"道生一，一生二，二生三，三生万物"的哲学思想，知识在系统内不断生成、转化、重组，最终形成丰富的知识生态系统。本系统通过上下文管理、知识蒸馏和文档同步等机制，实现"以规范为脉"的核心理念，为整个YYC3 Family提供源源不断的智慧滋养。

### 6.2 上下文管理脚本

#### 6.2.1 向量数据库自动初始化与索引

1.  \#!/usr/bin/env python3

2.  \# 向量数据库管理脚本

3.  

4.  import os

5.  import sys

6.  import logging

7.  import asyncio

8.  import json

9.  import hashlib

10. from typing import Dict, List, Any, Optional, Union, Tuple

11. from datetime import datetime, timedelta

12. from pathlib import Path

13. import yaml

14. import argparse

15. 

16. \# 向量数据库库

17. import chromadb

18. from chromadb.config import Settings

19. import qdrant_client

20. from qdrant_client.models import Distance, VectorParams, PointStruct

21. import weaviate

22. 

23. \# 嵌入模型

24. import openai

25. import sentence_transformers

26. 

27. \# 配置日志

28. logging.basicConfig(level=logging.INFO)

29. logger = logging.getLogger("yyc3-knowledge")

30. 

31. class EmbeddingProvider:

32. """嵌入提供者抽象类"""

33. 

34. def \_\_init\_\_(self, config: Dict\[str, Any\]):

35. self.config = config

36. 

37. def embed(self, texts: List\[str\]) -\> List\[List\[float\]\]:

38. """将文本转换为向量嵌入"""

39. raise NotImplementedError

40. 

41. async def aembed(self, texts: List\[str\]) -\> List\[List\[float\]\]:

42. """异步将文本转换为向量嵌入"""

43. raise NotImplementedError

44. 

45. class OpenAIEmbeddingProvider(EmbeddingProvider):

46. """OpenAI嵌入提供者"""

47. 

48. def \_\_init\_\_(self, config: Dict\[str, Any\]):

49. super().\_\_init\_\_(config)

50. self.model = config.get("model", "text-embedding-ada-002")

51. self.api_key = config.get("api_key", os.environ.get("OPENAI_API_KEY"))

52. 

53. if not self.api_key:

54. raise ValueError("OpenAI API key is required")

55. 

56. def embed(self, texts: List\[str\]) -\> List\[List\[float\]\]:

57. """将文本转换为向量嵌入"""

58. try:

59. response = openai.Embedding.create(

60. model=self.model,

61. input=texts

62. )

63. return \[item\["embedding"\] for item in response\["data"\]\]

64. except Exception as e:

65. logger.error(f"Error generating embeddings: {e}")

66. raise

67. 

68. async def aembed(self, texts: List\[str\]) -\> List\[List\[float\]\]:

69. """异步将文本转换为向量嵌入"""

70. \# OpenAI Python库目前不支持异步，这里使用线程池模拟

71. loop = asyncio.get_event_loop()

72. return await loop.run_in_executor(None, self.embed, texts)

73. 

74. class SentenceTransformerProvider(EmbeddingProvider):

75. """Sentence Transformers嵌入提供者"""

76. 

77. def \_\_init\_\_(self, config: Dict\[str, Any\]):

78. super().\_\_init\_\_(config)

79. model_name = config.get("model", "all-MiniLM-L6-v2")

80. self.device = config.get("device", "cpu")

81. self.model = sentence_transformers.SentenceTransformer(model_name, device=self.device)

82. 

83. def embed(self, texts: List\[str\]) -\> List\[List\[float\]\]:

84. """将文本转换为向量嵌入"""

85. return self.model.encode(texts, convert_to_tensor=False).tolist()

86. 

87. async def aembed(self, texts: List\[str\]) -\> List\[List\[float\]\]:

88. """异步将文本转换为向量嵌入"""

89. loop = asyncio.get_event_loop()

90. return await loop.run_in_executor(None, self.embed, texts)

91. 

92. class VectorDatabase:

93. """向量数据库抽象类"""

94. 

95. def \_\_init\_\_(self, config: Dict\[str, Any\]):

96. self.config = config

97. self.embedding_provider = self.\_create_embedding_provider()

98. 

99. def \_create_embedding_provider(self) -\> EmbeddingProvider:

100. """创建嵌入提供者"""

101. provider_config = self.config.get("embedding", {})

102. provider_type = provider_config.get("type", "openai")

103. 

104. if provider_type == "openai":

105. return OpenAIEmbeddingProvider(provider_config)

106. elif provider_type == "sentence_transformers":

107. return SentenceTransformerProvider(provider_config)

108. else:

109. raise ValueError(f"Unknown embedding provider: {provider_type}")

110. 

111. def initialize(self):

112. """初始化数据库"""

113. raise NotImplementedError

114. 

115. def add_texts(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

116. ids: List\[str\] = None) -\> List\[str\]:

117. """添加文本到数据库"""

118. raise NotImplementedError

119. 

120. async def aadd_texts(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

121. ids: List\[str\] = None) -\> List\[str\]:

122. """异步添加文本到数据库"""

123. raise NotImplementedError

124. 

125. def search(self, query: str, n_results: int = 5,

126. where: Dict\[str, Any\] = None) -\> Dict\[str, Any\]:

127. """搜索相似文本"""

128. raise NotImplementedError

129. 

130. async def asearch(self, query: str, n_results: int = 5,

131. where: Dict\[str, Any\] = None) -\> Dict\[str, Any\]:

132. """异步搜索相似文本"""

133. raise NotImplementedError

134. 

135. def delete(self, ids: List\[str\] = None, where: Dict\[str, Any\] = None):

136. """删除文档"""

137. raise NotImplementedError

138. 

139. async def adelete(self, ids: List\[str\] = None, where: Dict\[str, Any\] = None):

140. """异步删除文档"""

141. raise NotImplementedError

142. 

143. def get_collection_info(self) -\> Dict\[str, Any\]:

144. """获取集合信息"""

145. raise NotImplementedError

146. 

147. class ChromaDB(VectorDatabase):

148. """ChromaDB向量数据库实现"""

149. 

150. def \_\_init\_\_(self, config: Dict\[str, Any\]):

151. super().\_\_init\_\_(config)

152. self.client = None

153. self.collection = None

154. self.collection_name = config.get("collection_name", "yyc3_knowledge")

155. 

156. def initialize(self):

157. """初始化数据库"""

158. \# 创建客户端

159. settings = Settings(

160. persist_directory=self.config.get("persist_directory", "./chroma_db"),

161. allow_reset=self.config.get("allow_reset", False)

162. )

163. 

164. self.client = chromadb.Client(settings)

165. 

166. \# 获取或创建集合

167. try:

168. self.collection = self.client.get_collection(name=self.collection_name)

169. logger.info(f"Connected to existing collection: {self.collection_name}")

170. except Exception:

171. self.collection = self.client.create_collection(

172. name=self.collection_name,

173. metadata=self.config.get("collection_metadata", {})

174. )

175. logger.info(f"Created new collection: {self.collection_name}")

176. 

177. return self.collection

178. 

179. def add_texts(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

180. ids: List\[str\] = None) -\> List\[str\]:

181. """添加文本到数据库"""

182. if not ids:

183. ids = \[hashlib.md5(text.encode()).hexdigest() for text in texts\]

184. 

185. if not metadatas:

186. metadatas = \[{} for \_ in texts\]

187. 

188. \# 添加时间戳

189. for metadata in metadatas:

190. metadata\["added_at"\] = datetime.utcnow().isoformat()

191. 

192. self.collection.add(

193. documents=texts,

194. metadatas=metadatas,

195. ids=ids

196. )

197. 

198. return ids

199. 

200. async def aadd_texts(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

201. ids: List\[str\] = None) -\> List\[str\]:

202. """异步添加文本到数据库"""

203. loop = asyncio.get_event_loop()

204. return await loop.run_in_executor(None, self.add_texts, texts, metadatas, ids)

205. 

206. def search(self, query: str, n_results: int = 5,

207. where: Dict\[str, Any\] = None) -\> Dict\[str, Any\]:

208. """搜索相似文本"""

209. return self.collection.query(

210. query_texts=\[query\],

211. n_results=n_results,

212. where=where

213. )

214. 

215. async def asearch(self, query: str, n_results: int = 5,

216. where: Dict\[str, Any\] = None) -\> Dict\[str, Any\]:

217. """异步搜索相似文本"""

218. loop = asyncio.get_event_loop()

219. return await loop.run_in_executor(None, self.search, query, n_results, where)

220. 

221. def delete(self, ids: List\[str\] = None, where: Dict\[str, Any\] = None):

222. """删除文档"""

223. self.collection.delete(ids=ids, where=where)

224. 

225. async def adelete(self, ids: List\[str\] = None, where: Dict\[str, Any\] = None):

226. """异步删除文档"""

227. loop = asyncio.get_event_loop()

228. await loop.run_in_executor(None, self.delete, ids, where)

229. 

230. def get_collection_info(self) -\> Dict\[str, Any\]:

231. """获取集合信息"""

232. return self.collection.get()

233. 

234. class QdrantDB(VectorDatabase):

235. """Qdrant向量数据库实现"""

236. 

237. def \_\_init\_\_(self, config: Dict\[str, Any\]):

238. super().\_\_init\_\_(config)

239. self.client = None

240. self.collection_name = config.get("collection_name", "yyc3_knowledge")

241. self.vector_size = config.get("vector_size", 384)

242. 

243. def initialize(self):

244. """初始化数据库"""

245. \# 创建客户端

246. host = self.config.get("host", "localhost")

247. port = self.config.get("port", 6333)

248. 

249. self.client = qdrant_client.QdrantClient(host=host, port=port)

250. 

251. \# 获取或创建集合

252. try:

253. self.client.get_collection(self.collection_name)

254. logger.info(f"Connected to existing collection: {self.collection_name}")

255. except Exception:

256. self.client.create_collection(

257. collection_name=self.collection_name,

258. vectors_config=VectorParams(

259. size=self.vector_size,

260. distance=Distance.COSINE

261. )

262. )

263. logger.info(f"Created new collection: {self.collection_name}")

264. 

265. return self.client

266. 

267. def add_texts(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

268. ids: List\[str\] = None) -\> List\[str\]:

269. """添加文本到数据库"""

270. if not ids:

271. ids = \[hashlib.md5(text.encode()).hexdigest() for text in texts\]

272. 

273. if not metadatas:

274. metadatas = \[{} for \_ in texts\]

275. 

276. \# 生成嵌入

277. embeddings = self.embedding_provider.embed(texts)

278. 

279. \# 添加时间戳

280. for metadata in metadatas:

281. metadata\["added_at"\] = datetime.utcnow().isoformat()

282. 

283. \# 创建点

284. points = \[

285. PointStruct(

286. id=ids\[i\],

287. vector=embeddings\[i\],

288. payload={

289. "text": texts\[i\],

290. "metadata": metadatas\[i\]

291. }

292. )

293. for i in range(len(texts))

294. \]

295. 

296. \# 添加到集合

297. self.client.upsert(

298. collection_name=self.collection_name,

299. points=points

300. )

301. 

302. return ids

303. 

304. async def aadd_texts(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

305. ids: List\[str\] = None) -\> List\[str\]:

306. """异步添加文本到数据库"""

307. embeddings = await self.embedding_provider.aembed(texts)

308. 

309. if not ids:

310. ids = \[hashlib.md5(text.encode()).hexdigest() for text in texts\]

311. 

312. if not metadatas:

313. metadatas = \[{} for \_ in texts\]

314. 

315. \# 添加时间戳

316. for metadata in metadatas:

317. metadata\["added_at"\] = datetime.utcnow().isoformat()

318. 

319. \# 创建点

320. points = \[

321. PointStruct(

322. id=ids\[i\],

323. vector=embeddings\[i\],

324. payload={

325. "text": texts\[i\],

326. "metadata": metadatas\[i\]

327. }

328. )

329. for i in range(len(texts))

330. \]

331. 

332. \# 添加到集合

333. await self.client.upsert(

334. collection_name=self.collection_name,

335. points=points

336. )

337. 

338. return ids

339. 

340. def search(self, query: str, n_results: int = 5,

341. where: Dict\[str, Any\] = None) -\> Dict\[str, Any\]:

342. """搜索相似文本"""

343. \# 生成查询嵌入

344. query_embedding = self.embedding_provider.embed(\[query\])\[0\]

345. 

346. \# 构建过滤器

347. query_filter = None

348. if where:

349. query_filter = qdrant_client.models.Filter(\*\*where)

350. 

351. \# 搜索

352. search_result = self.client.search(

353. collection_name=self.collection_name,

354. query_vector=query_embedding,

355. query_filter=query_filter,

356. limit=n_results

357. )

358. 

359. \# 格式化结果

360. return {

361. "ids": \[hit.id for hit in search_result\],

362. "documents": \[hit.payload\["text"\] for hit in search_result\],

363. "metadatas": \[hit.payload\["metadata"\] for hit in search_result\],

364. "distances": \[hit.score for hit in search_result\]

365. }

366. 

367. async def asearch(self, query: str, n_results: int = 5,

368. where: Dict\[str, Any\] = None) -\> Dict\[str, Any\]:

369. """异步搜索相似文本"""

370. query_embedding = await self.embedding_provider.aembed(\[query\])

371. 

372. \# 构建过滤器

373. query_filter = None

374. if where:

375. query_filter = qdrant_client.models.Filter(\*\*where)

376. 

377. \# 搜索

378. search_result = await self.client.search(

379. collection_name=self.collection_name,

380. query_vector=query_embedding\[0\],

381. query_filter=query_filter,

382. limit=n_results

383. )

384. 

385. \# 格式化结果

386. return {

387. "ids": \[hit.id for hit in search_result\],

388. "documents": \[hit.payload\["text"\] for hit in search_result\],

389. "metadatas": \[hit.payload\["metadata"\] for hit in search_result\],

390. "distances": \[hit.score for hit in search_result\]

391. }

392. 

393. def delete(self, ids: List\[str\] = None, where: Dict\[str, Any\] = None):

394. """删除文档"""

395. if ids:

396. self.client.delete(

397. collection_name=self.collection_name,

398. points_selector=ids

399. )

400. elif where:

401. self.client.delete(

402. collection_name=self.collection_name,

403. points_selector=qdrant_client.models.Filter(\*\*where)

404. )

405. 

406. async def adelete(self, ids: List\[str\] = None, where: Dict\[str, Any\] = None):

407. """异步删除文档"""

408. if ids:

409. await self.client.delete(

410. collection_name=self.collection_name,

411. points_selector=ids

412. )

413. elif where:

414. await self.client.delete(

415. collection_name=self.collection_name,

416. points_selector=qdrant_client.models.Filter(\*\*where)

417. )

418. 

419. def get_collection_info(self) -\> Dict\[str, Any\]:

420. """获取集合信息"""

421. collection_info = self.client.get_collection(self.collection_name)

422. return {

423. "name": self.collection_name,

424. "vectors_count": collection_info.vectors_count,

425. "indexed_vectors_count": collection_info.indexed_vectors_count,

426. "points_count": collection_info.points_count,

427. "status": collection_info.status,

428. "optimizer_status": collection_info.optimizer_status,

429. "vector_size": collection_info.config.params.vectors.size

430. }

431. 

432. class KnowledgeManager:

433. """知识管理器"""

434. 

435. def \_\_init\_\_(self, config_file: str = "knowledge_config.yml"):

436. self.config = self.\_load_config(config_file)

437. self.db = self.\_create_db()

438. self.db.initialize()

439. 

440. \# 初始化日志抓取器

441. self.log_capturers = \[\]

442. for log_config in self.config.get("log_sources", \[\]):

443. capturer = LogCapturer(log_config, self.db)

444. self.log_capturers.append(capturer)

445. 

446. def \_load_config(self, config_file: str) -\> Dict\[str, Any\]:

447. """加载配置"""

448. if os.path.exists(config_file):

449. with open(config_file, 'r') as f:

450. return yaml.safe_load(f)

451. return {}

452. 

453. def \_create_db(self) -\> VectorDatabase:

454. """创建向量数据库"""

455. db_type = self.config.get("type", "chroma")

456. db_config = self.config.get(db_type, {})

457. 

458. if db_type == "chroma":

459. return ChromaDB(db_config)

460. elif db_type == "qdrant":

461. return QdrantDB(db_config)

462. else:

463. raise ValueError(f"Unknown vector database type: {db_type}")

464. 

465. def add_documents(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

466. ids: List\[str\] = None, source: str = "manual") -\> List\[str\]:

467. """添加文档到知识库"""

468. if not metadatas:

469. metadatas = \[{} for \_ in texts\]

470. 

471. \# 添加源信息

472. for metadata in metadatas:

473. metadata\["source"\] = source

474. 

475. return self.db.add_texts(texts, metadatas, ids)

476. 

477. async def aadd_documents(self, texts: List\[str\], metadatas: List\[Dict\[str, Any\]\] = None,

478. ids: List\[str\] = None, source: str = "manual") -\> List\[str\]:

479. """异步添加文档到知识库"""

480. if not metadatas:

481. metadatas = \[{} for \_ in texts\]

482. 

483. \# 添加源信息

484. for metadata in metadatas:

485. metadata\["source"\] = source

486. 

487. return await self.db.aadd_texts(texts, metadatas, ids)

488. 

489. def search_knowledge(self, query: str, n_results: int = 5,

490. source_filter: List\[str\] = None) -\> Dict\[str, Any\]:

491. """搜索知识库"""

492. where = None

493. if source_filter:

494. where = {"key": "source", "match": {"any": source_filter}}

495. 

496. return self.db.search(query, n_results, where)

497. 

498. async def asearch_knowledge(self, query: str, n_results: int = 5,

499. source_filter: List\[str\] = None) -\> Dict\[str, Any\]:

500. """异步搜索知识库"""

501. where = None

502. if source_filter:

503. where = {"key": "source", "match": {"any": source_filter}}

504. 

505. return await self.db.asearch(query, n_results, where)

506. 

507. def start_log_capturing(self):

508. """启动日志抓取"""

509. for capturer in self.log_capturers:

510. capturer.start()

511. 

512. def stop_log_capturing(self):

513. """停止日志抓取"""

514. for capturer in self.log_capturers:

515. capturer.stop()

516. 

517. class LogCapturer:

518. """日志抓取器"""

519. 

520. def \_\_init\_\_(self, config: Dict\[str, Any\], db: VectorDatabase):

521. self.config = config

522. self.db = db

523. self.running = False

524. 

525. def start(self):

526. """启动日志抓取"""

527. self.running = True

528. 

529. \# 根据配置类型启动不同的抓取器

530. log_type = self.config.get("type")

531. 

532. if log_type == "file":

533. self.\_start_file_watcher()

534. elif log_type == "syslog":

535. self.\_start_syslog_listener()

536. elif log_type == "application":

537. self.\_start_application_log_listener()

538. 

539. def stop(self):

540. """停止日志抓取"""

541. self.running = False

542. 

543. def \_start_file_watcher(self):

544. """启动文件监视器"""

545. import threading

546. from watchdog.observers import Observer

547. from watchdog.events import FileSystemEventHandler

548. 

549. class LogFileHandler(FileSystemEventHandler):

550. def \_\_init\_\_(self, capturer):

551. self.capturer = capturer

552. self.buffer = \[\]

553. self.last_flush = datetime.utcnow()

554. self.flush_interval = timedelta(seconds=10)

555. 

556. def on_modified(self, event):

557. if event.is_directory:

558. return

559. 

560. file_path = event.src_path

561. if file_path != self.capturer.config.get("path"):

562. return

563. 

564. \# 读取新添加的行

565. try:

566. with open(file_path, 'r', encoding='utf-8') as f:

567. \# 获取文件大小

568. f.seek(0, 2) \# 移动到文件末尾

569. file_size = f.tell()

570. f.seek(0, 0) \# 移动到文件开头

571. 

572. \# 读取最后几KB（简化处理）

573. chunk_size = 1024 \* 10 \# 10KB

574. if file_size \> chunk_size:

575. f.seek(file_size - chunk_size)

576. 

577. content = f.read()

578. lines = content.split('\n')

579. 

580. \# 处理新行

581. new_lines = \[line for line in lines if line.strip()\]

582. self.buffer.extend(new_lines)

583. 

584. \# 检查是否需要刷新

585. now = datetime.utcnow()

586. if now - self.last_flush \> self.flush_interval:

587. self.\_flush_buffer()

588. self.last_flush = now

589. except Exception as e:

590. print(f"Error reading log file: {e}")

591. 

592. def \_flush_buffer(self):

593. """刷新缓冲区到数据库"""

594. if not self.buffer:

595. return

596. 

597. \# 批量处理日志条目

598. batch_size = 50

599. for i in range(0, len(self.buffer), batch_size):

600. batch = self.buffer\[i:i+batch_size\]

601. 

602. \# 创建元数据

603. metadatas = \[{

604. "source": "log",

605. "log_file": self.capturer.config.get("path"),

606. "captured_at": datetime.utcnow().isoformat()

607. } for \_ in batch\]

608. 

609. \# 添加到数据库

610. self.capturer.db.add_texts(batch, metadatas)

611. 

612. \# 清空缓冲区

613. self.buffer = \[\]

614. print(f"Flushed {len(self.buffer)} log entries to database")

615. 

616. \# 创建观察者

617. event_handler = LogFileHandler(self)

618. observer = Observer()

619. observer.schedule(event_handler, path=os.path.dirname(self.config.get("path")), recursive=False)

620. observer.start()

621. 

622. print(f"Started file watcher for {self.config.get('path')}")

623. 

624. def \_start_syslog_listener(self):

625. """启动系统日志监听器"""

626. \# 这里可以实现系统日志监听逻辑

627. pass

628. 

629. def \_start_application_log_listener(self):

630. """启动应用程序日志监听器"""

631. \# 这里可以实现应用程序日志监听逻辑

632. pass

633. 

634. def main():

635. parser = argparse.ArgumentParser(description="YYC3知识流动系统")

636. parser.add_argument("--config", default="knowledge_config.yml", help="配置文件")

637. parser.add_argument("--init", action="store_true", help="初始化知识库")

638. parser.add_argument("--add", nargs="+", help="添加文档到知识库")

639. parser.add_argument("--search", help="搜索知识库")

640. parser.add_argument("--n-results", type=int, default=5, help="搜索结果数量")

641. parser.add_argument("--start-capturing", action="store_true", help="启动日志抓取")

642. parser.add_argument("--source-filter", nargs="+", help="源过滤器")

643. 

644. args = parser.parse_args()

645. 

646. \# 创建知识管理器

647. km = KnowledgeManager(args.config)

648. 

649. if args.init:

650. \# 初始化知识库

651. db = km.db.initialize()

652. print(f"Knowledge database initialized: {db}")

653. 

654. elif args.add:

655. \# 添加文档

656. texts = args.add

657. ids = km.add_documents(texts)

658. print(f"Added {len(texts)} documents with IDs: {ids}")

659. 

660. elif args.search:

661. \# 搜索知识库

662. source_filter = args.source_filter

663. result = km.search_knowledge(args.search, args.n_results, source_filter)

664. 

665. print(f"Search results for '{args.search}':")

666. for i in range(len(result\["ids"\])):

667. print(f"\n{i+1}. ID: {result\['ids'\]\[i\]}")

668. print(f" Document: {result\['documents'\]\[i\]}")

669. print(f" Metadata: {result\['metadatas'\]\[i\]}")

670. print(f" Distance: {result\['distances'\]\[i\]}")

671. 

672. elif args.start_capturing:

673. \# 启动日志抓取

674. km.start_log_capturing()

675. print("Log capturing started. Press Ctrl+C to stop.")

676. 

677. try:

678. import time

679. while True:

680. time.sleep(1)

681. except KeyboardInterrupt:

682. km.stop_log_capturing()

683. print("Log capturing stopped.")

684. 

685. else:

686. \# 默认操作：显示帮助

687. parser.print_help()

688. 

689. if \_\_name\_\_ == "\_\_main\_\_":

690. main()

#### 6.2.2 实时日志与对话抓取

1.  \#!/usr/bin/env python3

2.  \# 实时日志与对话抓取脚本

3.  

4.  import os

5.  import sys

6.  import logging

7.  import asyncio

8.  import json

9.  import time

10. from typing import Dict, List, Any, Optional, Callable, Union

11. from datetime import datetime, timedelta

12. from pathlib import Path

13. import yaml

14. import argparse

15. 

16. \# WebSocket库

17. import websockets

18. from websockets.server import WebSocketServerProtocol

19. 

20. \# 向量数据库

21. from vector_db import VectorDatabase, ChromaDB, QdrantDB, KnowledgeManager

22. 

23. \# 配置日志

24. logging.basicConfig(level=logging.INFO)

25. logger = logging.getLogger("yyc3-log-capture")

26. 

27. class LogProcessor:

28. """日志处理器"""

29. 

30. def \_\_init\_\_(self, config: Dict\[str, Any\]):

31. self.config = config

32. self.processors = {

33. "agent_decision": self.process_agent_decision,

34. "conversation": self.process_conversation,

35. "system_event": self.process_system_event,

36. "error": self.process_error

37. }

38. 

39. \# 初始化知识管理器

40. km_config = config.get("knowledge_manager", {})

41. self.km = KnowledgeManager(km_config.get("config_file", "knowledge_config.yml"))

42. 

43. def process_log_entry(self, log_entry: Dict\[str, Any\]) -\> Optional\[Dict\[str, Any\]\]:

44. """处理日志条目"""

45. log_type = log_entry.get("type")

46. 

47. if log_type in self.processors:

48. return self.processors\[log_type\](log_entry)

49. else:

50. \# 通用日志处理

51. return self.process_generic(log_entry)

52. 

53. def process_agent_decision(self, log_entry: Dict\[str, Any\]) -\> Dict\[str, Any\]:

54. """处理智能体决策日志"""

55. \# 提取决策相关信息

56. agent_id = log_entry.get("agent_id")

57. decision_type = log_entry.get("decision_type")

58. context = log_entry.get("context", {})

59. outcome = log_entry.get("outcome")

60. reasoning = log_entry.get("reasoning")

61. 

62. \# 创建结构化文档

63. document = {

64. "content": f"Agent {agent_id} made a {decision_type} decision. Reasoning: {reasoning}",

65. "metadata": {

66. "type": "agent_decision",

67. "agent_id": agent_id,

68. "decision_type": decision_type,

69. "context": context,

70. "outcome": outcome,

71. "timestamp": log_entry.get("timestamp", datetime.utcnow().isoformat())

72. }

73. }

74. 

75. \# 添加到知识库

76. self.km.add_documents(\[document\["content"\]\], \[document\["metadata"\]\], source="agent_decision")

77. 

78. return document

79. 

80. def process_conversation(self, log_entry: Dict\[str, Any\]) -\> Dict\[str, Any\]:

81. """处理对话日志"""

82. \# 提取对话相关信息

83. participants = log_entry.get("participants", \[\])

84. messages = log_entry.get("messages", \[\])

85. context = log_entry.get("context", {})

86. outcome = log_entry.get("outcome")

87. 

88. \# 创建结构化文档

89. message_contents = \[\]

90. for message in messages:

91. role = message.get("role", "unknown")

92. content = message.get("content", "")

93. message_contents.append(f"{role}: {content}")

94. 

95. full_conversation = "\n".join(message_contents)

96. 

97. document = {

98. "content": f"Conversation between {', '.join(participants)}: {full_conversation}",

99. "metadata": {

100. "type": "conversation",

101. "participants": participants,

102. "context": context,

103. "outcome": outcome,

104. "timestamp": log_entry.get("timestamp", datetime.utcnow().isoformat()),

105. "message_count": len(messages)

106. }

107. }

108. 

109. \# 添加到知识库

110. self.km.add_documents(\[document\["content"\]\], \[document\["metadata"\]\], source="conversation")

111. 

112. return document

113. 

114. def process_system_event(self, log_entry: Dict\[str, Any\]) -\> Dict\[str, Any\]:

115. """处理系统事件日志"""

116. \# 提取事件相关信息

117. event_type = log_entry.get("event_type")

118. component = log_entry.get("component")

119. details = log_entry.get("details", {})

120. 

121. \# 创建结构化文档

122. document = {

123. "content": f"System event: {event_type} in component {component}",

124. "metadata": {

125. "type": "system_event",

126. "event_type": event_type,

127. "component": component,

128. "details": details,

129. "timestamp": log_entry.get("timestamp", datetime.utcnow().isoformat())

130. }

131. }

132. 

133. \# 添加到知识库

134. self.km.add_documents(\[document\["content"\]\], \[document\["metadata"\]\], source="system_event")

135. 

136. return document

137. 

138. def process_error(self, log_entry: Dict\[str, Any\]) -\> Dict\[str, Any\]:

139. """处理错误日志"""

140. \# 提取错误相关信息

141. error_type = log_entry.get("error_type")

142. component = log_entry.get("component")

143. error_message = log_entry.get("error_message")

144. stack_trace = log_entry.get("stack_trace", "")

145. context = log_entry.get("context", {})

146. 

147. \# 创建结构化文档

148. document = {

149. "content": f"Error in {component}: {error_type} - {error_message}",

150. "metadata": {

151. "type": "error",

152. "error_type": error_type,

153. "component": component,

154. "error_message": error_message,

155. "stack_trace": stack_trace,

156. "context": context,

157. "timestamp": log_entry.get("timestamp", datetime.utcnow().isoformat())

158. }

159. }

160. 

161. \# 添加到知识库

162. self.km.add_documents(\[document\["content"\]\], \[document\["metadata"\]\], source="error")

163. 

164. return document

165. 

166. def process_generic(self, log_entry: Dict\[str, Any\]) -\> Dict\[str, Any\]:

167. """处理通用日志"""

168. \# 提取通用信息

169. level = log_entry.get("level", "info")

170. message = log_entry.get("message", "")

171. component = log_entry.get("component", "unknown")

172. 

173. \# 创建结构化文档

174. document = {

175. "content": f"{level.upper()} in {component}: {message}",

176. "metadata": {

177. "type": "generic",

178. "level": level,

179. "component": component,

180. "timestamp": log_entry.get("timestamp", datetime.utcnow().isoformat())

181. }

182. }

183. 

184. \# 添加到知识库

185. self.km.add_documents(\[document\["content"\]\], \[document\["metadata"\]\], source="log")

186. 

187. return document

188. 

189. class WebSocketLogCollector:

190. """WebSocket日志收集器"""

191. 

192. def \_\_init\_\_(self, config: Dict\[str, Any\]):

193. self.config = config

194. self.host = config.get("host", "localhost")

195. self.port = config.get("port", 8766)

196. self.processors = \[\]

197. 

198. \# 创建日志处理器

199. for processor_config in config.get("processors", \[\]):

200. processor = LogProcessor(processor_config)

201. self.processors.append(processor)

202. 

203. async def register_client(self, websocket: WebSocketServerProtocol, path: str):

204. """注册客户端连接"""

205. client_id = f"{websocket.remote_address\[0\]}:{websocket.remote_address\[1\]}\_{int(time.time())}"

206. 

207. logger.info(f"Client {client_id} connected from {path}")

208. 

209. try:

210. \# 发送欢迎消息

211. await websocket.send(json.dumps({

212. "type": "welcome",

213. "client_id": client_id,

214. "timestamp": datetime.utcnow().isoformat()

215. }))

216. 

217. \# 处理客户端消息

218. async for message in websocket:

219. try:

220. data = json.loads(message)

221. 

222. if data.get("type") == "log":

223. \# 处理日志消息

224. log_entries = data.get("entries", \[\])

225. 

226. for log_entry in log_entries:

227. \# 添加接收时间戳

228. if "timestamp" not in log_entry:

229. log_entry\["timestamp"\] = datetime.utcnow().isoformat()

230. 

231. \# 处理日志条目

232. for processor in self.processors:

233. processor.process_log_entry(log_entry)

234. 

235. \# 发送确认消息

236. await websocket.send(json.dumps({

237. "type": "log_ack",

238. "processed": len(log_entries),

239. "timestamp": datetime.utcnow().isoformat()

240. }))

241. 

242. elif data.get("type") == "ping":

243. \# 心跳消息

244. await websocket.send(json.dumps({

245. "type": "pong",

246. "timestamp": datetime.utcnow().isoformat()

247. }))

248. 

249. else:

250. logger.warning(f"Unknown message type: {data.get('type')}")

251. 

252. except json.JSONDecodeError:

253. logger.error("Invalid JSON message received")

254. except Exception as e:

255. logger.error(f"Error processing message: {e}")

256. 

257. except websockets.exceptions.ConnectionClosed:

258. logger.info(f"Client {client_id} disconnected")

259. except Exception as e:

260. logger.error(f"Error handling client {client_id}: {e}")

261. 

262. def start(self):

263. """启动WebSocket服务器"""

264. logger.info(f"Starting WebSocket log collector on {self.host}:{self.port}")

265. 

266. start_server = websockets.serve(

267. self.register_client,

268. self.host,

269. self.port

270. )

271. 

272. asyncio.get_event_loop().run_until_complete(start_server)

273. asyncio.get_event_loop().run_forever()

274. 

275. class AgentIntegration:

276. """智能体集成"""

277. 

278. def \_\_init\_\_(self, config: Dict\[str, Any\]):

279. self.config = config

280. self.log_endpoint = config.get("log_endpoint", "ws://localhost:8766")

281. self.websocket = None

282. self.connected = False

283. 

284. \# 创建日志处理器

285. processor_config = config.get("log_processor", {})

286. self.log_processor = LogProcessor(processor_config)

287. 

288. async def connect(self):

289. """连接到日志收集器"""

290. try:

291. self.websocket = await websockets.connect(self.log_endpoint)

292. self.connected = True

293. 

294. \# 接收欢迎消息

295. welcome_msg = await self.websocket.recv()

296. data = json.loads(welcome_msg)

297. 

298. if data.get("type") == "welcome":

299. client_id = data.get("client_id")

300. logger.info(f"Connected to log collector with client ID: {client_id}")

301. return client_id

302. else:

303. logger.error("Unexpected welcome message")

304. return None

305. 

306. except Exception as e:

307. logger.error(f"Failed to connect to log collector: {e}")

308. return None

309. 

310. async def disconnect(self):

311. """断开连接"""

312. if self.websocket:

313. await self.websocket.close()

314. self.connected = False

315. logger.info("Disconnected from log collector")

316. 

317. async def send_logs(self, log_entries: List\[Dict\[str, Any\]\]):

318. """发送日志条目"""

319. if not self.connected:

320. logger.warning("Not connected to log collector")

321. return False

322. 

323. try:

324. message = json.dumps({

325. "type": "log",

326. "entries": log_entries

327. })

328. 

329. await self.websocket.send(message)

330. 

331. \# 等待确认

332. response = await self.websocket.recv()

333. data = json.loads(response)

334. 

335. if data.get("type") == "log_ack":

336. processed = data.get("processed", 0)

337. logger.debug(f"Log collector processed {processed} entries")

338. return True

339. else:

340. logger.warning(f"Unexpected response: {data}")

341. return False

342. 

343. except Exception as e:

344. logger.error(f"Error sending logs: {e}")

345. return False

346. 

347. async def log_decision(self, agent_id: str, decision_type: str,

348. reasoning: str, outcome: Any, context: Dict\[str, Any\] = None):

349. """记录智能体决策"""

350. log_entry = {

351. "type": "agent_decision",

352. "agent_id": agent_id,

353. "decision_type": decision_type,

354. "reasoning": reasoning,

355. "outcome": outcome,

356. "context": context or {},

357. "timestamp": datetime.utcnow().isoformat()

358. }

359. 

360. return await self.send_logs(\[log_entry\])

361. 

362. async def log_conversation(self, participants: List\[str\], messages: List\[Dict\[str, str\]\],

363. context: Dict\[str, Any\] = None, outcome: Any = None):

364. """记录对话"""

365. log_entry = {

366. "type": "conversation",

367. "participants": participants,

368. "messages": messages,

369. "context": context or {},

370. "outcome": outcome,

371. "timestamp": datetime.utcnow().isoformat()

372. }

373. 

374. return await self.send_logs(\[log_entry\])

375. 

376. async def log_system_event(self, event_type: str, component: str,

377. details: Dict\[str, Any\] = None):

378. """记录系统事件"""

379. log_entry = {

380. "type": "system_event",

381. "event_type": event_type,

382. "component": component,

383. "details": details or {},

384. "timestamp": datetime.utcnow().isoformat()

385. }

386. 

387. return await self.send_logs(\[log_entry\])

388. 

389. async def log_error(self, error_type: str, component: str, error_message: str,

390. stack_trace: str = "", context: Dict\[str, Any\] = None):

391. """记录错误"""

392. log_entry = {

393. "type": "error",

394. "error_type": error_type,

395. "component": component,

396. "error_message": error_message,

397. "stack_trace": stack_trace,

398. "context": context or {},

399. "timestamp": datetime.utcnow().isoformat()

400. }

401. 

402. return await self.send_logs(\[log_entry\])

403. 

404. \# Agent装饰器，用于自动记录决策

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 10/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
