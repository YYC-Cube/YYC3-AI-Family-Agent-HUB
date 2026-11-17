---
file: 32-docsapiopenapi.yaml-全量API接口终极规范.md
title: YYC3-AI-FAmily-Environment-Weaver · 第32部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 32/37 部分：
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
source_range: L23578-L25574
part_no: 32/37
section_title: 5. docs/api/openapi.yaml (全量API接口终极规范)
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第32部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 5. docs/api/openapi.yaml (全量API接口终极规范)

1.  openapi: 3.0.3

2.  info:

3.  title: YYC3 AI Family API

4.  description: \|

5.  \*\*智亦师亦友亦伯乐，谱一言一语一华章\*\*

6.  

7.  YYC3 (YanYu Cloud Cube) AI Family 完整API接口规范。

8.  

9.  此API为人机协同智能生态系统提供了全面的编程接口，涵盖智能体管理、任务编排、知识流动、多模态处理等核心功能。

10. 

11. \*\*核心理念\*\*: 人机共生，智慧同行。

12. \*\*技术架构\*\*: 以AI为魂，以流程为骨，以规范为脉。

13. version: 1.0.0

14. contact:

15. name: YYC-Cube Team

16. url: https://github.com/YYC-Cube

17. license:

18. name: Apache 2.0

19. url: http://www.apache.org/licenses/LICENSE-2.0.html

20. 

21. servers:

22. \- url: http://localhost:8080

23. description: 本地开发服务器

24. \- url: https://api.yyc3.com

25. description: 生产环境服务器

26. 

27. paths:

28. \# ==============================================================================

29. \# \[认证授权 API\]

30. \# ==============================================================================

31. /auth/login:

32. post:

33. tags:

34. \- Authentication

35. summary: 用户登录

36. description: 使用用户名和密码进行身份验证，获取访问令牌。

37. requestBody:

38. required: true

39. content:

40. application/json:

41. schema:

42. \$ref: '#/components/schemas/LoginRequest'

43. responses:

44. '200':

45. description: 登录成功，返回令牌信息。

46. content:

47. application/json:

48. schema:

49. \$ref: '#/components/schemas/TokenResponse'

50. '401':

51. description: 用户名或密码错误。

52. content:

53. application/json:

54. schema:

55. \$ref: '#/components/schemas/ErrorResponse'

56. '422':

57. description: 请求体格式错误。

58. content:

59. application/json:

60. schema:

61. \$ref: '#/components/schemas/ErrorResponse'

62. 

63. /auth/refresh:

64. post:

65. tags:

66. \- Authentication

67. summary: 刷新访问令牌

68. description: 使用有效的刷新令牌获取新的访问令牌。

69. requestBody:

70. required: true

71. content:

72. application/json:

73. schema:

74. \$ref: '#/components/schemas/RefreshRequest'

75. responses:

76. '200':

77. description: 令牌刷新成功。

78. content:

79. application/json:

80. schema:

81. \$ref: '#/components/schemas/TokenResponse'

82. '401':

83. description: 刷新令牌无效或已过期。

84. content:

85. application/json:

86. schema:

87. \$ref: '#/components/schemas/ErrorResponse'

88. 

89. /auth/logout:

90. post:

91. tags:

92. \- Authentication

93. summary: 用户登出

94. description: 注销当前用户的令牌。

95. security:

96. \- bearerAuth: \[\]

97. responses:

98. '200':

99. description: 登出成功。

100. content:

101. application/json:

102. schema:

103. \$ref: '#/components/schemas/SuccessResponse'

104. '401':

105. description: 未授权或令牌无效。

106. content:

107. application/json:

108. schema:

109. \$ref: '#/components/schemas/ErrorResponse'

110. 

111. \# ==============================================================================

112. \# \[智能体管理 API\]

113. \# ==============================================================================

114. /agents:

115. get:

116. tags:

117. \- Agents

118. summary: 获取智能体列表

119. description: 列出所有已注册的智能体，支持分页和过滤。

120. security:

121. \- bearerAuth: \[\]

122. parameters:

123. \- name: page

124. in: query

125. description: 页码

126. schema:

127. type: integer

128. default: 1

129. \- name: size

130. in: query

131. description: 每页数量

132. schema:

133. type: integer

134. default: 20

135. \- name: type

136. in: query

137. description: 按类型过滤

138. schema:

139. type: string

140. responses:

141. '200':

142. description: 成功获取智能体列表。

143. content:

144. application/json:

145. schema:

146. \$ref: '#/components/schemas/AgentListResponse'

147. '401':

148. description: 未授权。

149. content:

150. application/json:

151. schema:

152. \$ref: '#/components/schemas/ErrorResponse'

153. 

154. post:

155. tags:

156. \- Agents

157. summary: 创建新智能体

158. description: 根据提供的配置创建一个新的智能体。

159. security:

160. \- bearerAuth: \[\]

161. requestBody:

162. required: true

163. content:

164. application/json:

165. schema:

166. \$ref: '#/components/schemas/CreateAgentRequest'

167. responses:

168. '201':

169. description: 智能体创建成功。

170. content:

171. application/json:

172. schema:

173. \$ref: '#/components/schemas/AgentResponse'

174. '400':

175. description: 请求体无效或智能体已存在。

176. content:

177. application/json:

178. schema:

179. \$ref: '#/components/schemas/ErrorResponse'

180. '401':

181. description: 未授权。

182. content:

183. application/json:

184. schema:

185. \$ref: '#/components/schemas/ErrorResponse'

186. 

187. /agents/{agent_id}:

188. get:

189. tags:

190. \- Agents

191. summary: 获取智能体详情

192. description: 获取指定ID的智能体的详细配置信息。

193. security:

194. \- bearerAuth: \[\]

195. parameters:

196. \- name: agent_id

197. in: path

198. required: true

199. description: 智能体ID

200. schema:

201. type: string

202. responses:

203. '200':

204. description: 成功获取智能体详情。

205. content:

206. application/json:

207. schema:

208. \$ref: '#/components/schemas/AgentResponse'

209. '404':

210. description: 智能体不存在。

211. content:

212. application/json:

213. schema:

214. \$ref: '#/components/schemas/ErrorResponse'

215. '401':

216. description: 未授权。

217. content:

218. application/json:

219. schema:

220. \$ref: '#/components/schemas/ErrorResponse'

221. 

222. put:

223. tags:

224. \- Agents

225. summary: 更新智能体

226. description: 更新指定ID的智能体的配置。

227. security:

228. \- bearerAuth: \[\]

229. parameters:

230. \- name: agent_id

231. in: path

232. required: true

233. description: 智能体ID

234. schema:

235. type: string

236. requestBody:

237. required: true

238. content:

239. application/json:

240. schema:

241. \$ref: '#/components/schemas/UpdateAgentRequest'

242. responses:

243. '200':

244. description: 智能体更新成功。

245. content:

246. application/json:

247. schema:

248. \$ref: '#/components/schemas/AgentResponse'

249. '400':

250. description: 请求体无效。

251. content:

252. application/json:

253. schema:

254. \$ref: '#/components/schemas/ErrorResponse'

255. '404':

256. description: 智能体不存在。

257. content:

258. application/json:

259. schema:

260. \$ref: '#/components/schemas/ErrorResponse'

261. '401':

262. description: 未授权。

263. content:

264. application/json:

265. schema:

266. \$ref: '#/components/schemas/ErrorResponse'

267. 

268. delete:

269. tags:

270. \- Agents

271. summary: 删除智能体

272. description: 删除指定ID的智能体。

273. security:

274. \- bearerAuth: \[\]

275. parameters:

276. \- name: agent_id

277. in: path

278. required: true

279. description: 智能体ID

280. schema:

281. type: string

282. responses:

283. '200':

284. description: 智能体删除成功。

285. content:

286. application/json:

287. schema:

288. \$ref: '#/components/schemas/SuccessResponse'

289. '404':

290. description: 智能体不存在。

291. content:

292. application/json:

293. schema:

294. \$ref: '#/components/schemas/ErrorResponse'

295. '401':

296. description: 未授权。

297. content:

298. application/json:

299. schema:

300. \$ref: '#/components/schemas/ErrorResponse'

301. 

302. /agents/{agent_id}/execute:

303. post:

304. tags:

305. \- Agents

306. summary: 执行智能体任务

307. description: 启动指定智能体，并传入参数执行一个任务。

308. security:

309. \- bearerAuth: \[\]

310. parameters:

311. \- name: agent_id

312. in: path

313. required: true

314. description: 智能体ID

315. schema:

316. type: string

317. requestBody:

318. required: true

319. content:

320. application/json:

321. schema:

322. \$ref: '#/components/schemas/ExecuteAgentRequest'

323. responses:

324. '200':

325. description: 任务执行成功，返回结果。

326. content:

327. application/json:

328. schema:

329. \$ref: '#/components/schemas/ExecuteAgentResponse'

330. '400':

331. description: 请求参数无效。

332. content:

333. application/json:

334. schema:

335. \$ref: '#/components/schemas/ErrorResponse'

336. '404':

337. description: 智能体不存在。

338. content:

339. application/json:

340. schema:

341. \$ref: '#/components/schemas/ErrorResponse'

342. '500':

343. description: 智能体执行内部错误。

344. content:

345. application/json:

346. schema:

347. \$ref: '#/components/schemas/ErrorResponse'

348. 

349. \# ==============================================================================

350. \# \[知识管理 API\]

351. \# ==============================================================================

352. /knowledge/search:

353. post:

354. tags:

355. \- Knowledge

356. summary: 语义搜索知识库

357. description: 在知识库中进行语义搜索，找到与查询最相关的内容。

358. security:

359. \- bearerAuth: \[\]

360. requestBody:

361. required: true

362. content:

363. application/json:

364. schema:

365. \$ref: '#/components/schemas/SearchKnowledgeRequest'

366. responses:

367. '200':

368. description: 搜索成功，返回相关文档。

369. content:

370. application/json:

371. schema:

372. \$ref: '#/components/schemas/SearchKnowledgeResponse'

373. '400':

374. description: 请求体无效。

375. content:

376. application/json:

377. schema:

378. \$ref: '#/components/schemas/ErrorResponse'

379. '401':

380. description: 未授权。

381. content:

382. application/json:

383. schema:

384. \$ref: '#/components/schemas/ErrorResponse'

385. 

386. /knowledge/add:

387. post:

388. tags:

389. \- Knowledge

390. summary: 添加知识条目

391. description: 向知识库中添加新的文本或文档。

392. security:

393. \- bearerAuth: \[\]

394. requestBody:

395. required: true

396. content:

397. application/json:

398. schema:

399. \$ref: '#/components/schemas/AddKnowledgeRequest'

400. responses:

401. '200':

402. description: 知识添加成功。

403. content:

404. application/json:

405. schema:

406. \$ref: '#/components/schemas/SuccessResponse'

407. '400':

408. description: 请求体无效。

409. content:

410. application/json:

411. schema:

412. \$ref: '#/components/schemas/ErrorResponse'

413. '401':

414. description: 未授权。

415. content:

416. application/json:

417. schema:

418. \$ref: '#/components/schemas/ErrorResponse'

419. 

420. \# ==============================================================================

421. \# \[工作流管理 API\]

422. \# ==============================================================================

423. /workflows:

424. get:

425. tags:

426. \- Workflows

427. summary: 获取工作流列表

428. description: 列出所有可用的工作流模板。

429. security:

430. \- bearerAuth: \[\]

431. responses:

432. '200':

433. description: 成功获取工作流列表。

434. content:

435. application/json:

436. schema:

437. \$ref: '#/components/schemas/WorkflowListResponse'

438. '401':

439. description: 未授权。

440. content:

441. application/json:

442. schema:

443. \$ref: '#/components/schemas/ErrorResponse'

444. 

445. post:

446. tags:

447. \- Workflows

448. summary: 创建工作流

449. description: 创建一个新的自定义工作流。

450. security:

451. \- bearerAuth: \[\]

452. requestBody:

453. required: true

454. content:

455. application/json:

456. schema:

457. \$ref: '#/components/schemas/CreateWorkflowRequest'

458. responses:

459. '201':

460. description: 工作流创建成功。

461. content:

462. application/json:

463. schema:

464. \$ref: '#/components/schemas/WorkflowResponse'

465. '400':

466. description: 请求体无效。

467. content:

468. application/json:

469. schema:

470. \$ref: '#/components/schemas/ErrorResponse'

471. '401':

472. description: 未授权。

473. content:

474. application/json:

475. schema:

476. \$ref: '#/components/schemas/ErrorResponse'

477. 

478. /workflows/{workflow_id}/run:

479. post:

480. tags:

481. \- Workflows

482. summary: 运行工作流

483. description: 启动并运行指定ID的工作流。

484. security:

485. \- bearerAuth: \[\]

486. parameters:

487. \- name: workflow_id

488. in: path

489. required: true

490. description: 工作流ID

491. schema:

492. type: string

493. requestBody:

494. required: true

495. content:

496. application/json:

497. schema:

498. \$ref: '#/components/schemas/RunWorkflowRequest'

499. responses:

500. '200':

501. description: 工作流已成功启动，返回执行ID。

502. content:

503. application/json:

504. schema:

505. \$ref: '#/components/schemas/RunWorkflowResponse'

506. '404':

507. description: 工作流不存在。

508. content:

509. application/json:

510. schema:

511. \$ref: '#/components/schemas/ErrorResponse'

512. '401':

513. description: 未授权。

514. content:

515. application/json:

516. schema:

517. \$ref: '#/components/schemas/ErrorResponse'

518. 

519. \# ==============================================================================

520. \# \[系统管理增强 API\]

521. \# ==============================================================================

522. /system/health:

523. get:

524. tags:

525. \- System

526. summary: 获取系统健康状态

527. description: 返回系统整体及各核心服务的健康状态。

528. security:

529. \- bearerAuth: \[\]

530. responses:

531. '200':

532. description: 系统健康状态。

533. content:

534. application/json:

535. schema:

536. \$ref: '#/components/schemas/SystemHealthResponse'

537. 

538. /system/metrics:

539. get:

540. tags:

541. \- System

542. summary: 获取Prometheus指标

543. description: 返回用于Prometheus监控的文本格式指标。

544. security:

545. \- bearerAuth: \[\]

546. responses:

547. '200':

548. description: Prometheus格式的指标文本。

549. content:

550. text/plain:

551. schema:

552. type: string

553. 

554. /system/config:

555. get:

556. tags:

557. \- System

558. summary: 获取系统配置

559. description: 获取当前系统的配置信息（需要管理员权限）。

560. security:

561. \- bearerAuth: \[\]

562. responses:

563. '200':

564. description: 系统配置信息。

565. content:

566. application/json:

567. schema:

568. \$ref: '#/components/schemas/SystemConfigResponse'

569. '403':

570. description: 权限不足。

571. content:

572. application/json:

573. schema:

574. \$ref: '#/components/schemas/ErrorResponse'

575. 

576. put:

577. tags:

578. \- System

579. summary: 更新系统配置

580. description: 更新系统配置（需要管理员权限）。

581. security:

582. \- bearerAuth: \[\]

583. requestBody:

584. required: true

585. content:

586. application/json:

587. schema:

588. \$ref: '#/components/schemas/UpdateSystemConfigRequest'

589. responses:

590. '200':

591. description: 配置更新成功。

592. content:

593. application/json:

594. schema:

595. \$ref: '#/components/schemas/SuccessResponse'

596. '400':

597. description: 无效的配置。

598. content:

599. application/json:

600. schema:

601. \$ref: '#/components/schemas/ErrorResponse'

602. '403':

603. description: 权限不足。

604. content:

605. application/json:

606. schema:

607. \$ref: '#/components/schemas/ErrorResponse'

608. 

609. components:

610. securitySchemes:

611. bearerAuth:

612. type: http

613. scheme: bearer

614. bearerFormat: JWT

615. 

616. schemas:

617. \# --- \[通用模型\] ---

618. ErrorResponse:

619. type: object

620. properties:

621. error:

622. type: string

623. description: 错误码

624. message:

625. type: string

626. description: 错误信息

627. details:

628. type: object

629. description: 错误详情

630. example:

631. error: "ValidationError"

632. message: "请求参数 'username' 是必需的"

633. details: {}

634. 

635. SuccessResponse:

636. type: object

637. properties:

638. success:

639. type: boolean

640. example: true

641. message:

642. type: string

643. example: "操作成功"

644. 

645. \# --- \[认证模型\] ---

646. LoginRequest:

647. type: object

648. required:

649. \- username

650. \- password

651. properties:

652. username:

653. type: string

654. description: 用户名

655. example: "yyc3_admin"

656. password:

657. type: string

658. format: password

659. description: 密码

660. example: "strong_password_123"

661. 

662. RefreshRequest:

663. type: object

664. required:

665. \- refresh_token

666. properties:

667. refresh_token:

668. type: string

669. description: 刷新令牌

670. example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

671. 

672. TokenResponse:

673. type: object

674. properties:

675. access_token:

676. type: string

677. description: JWT访问令牌

678. example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

679. refresh_token:

680. type: string

681. description: JWT刷新令牌

682. example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

683. token_type:

684. type: string

685. example: "Bearer"

686. expires_in:

687. type: integer

688. description: 访问令牌过期时间（秒）

689. example: 3600

690. 

691. \# --- \[智能体模型\] ---

692. AgentBase:

693. type: object

694. properties:

695. id:

696. type: string

697. description: 智能体唯一ID

698. example: "code_reviewer_v1"

699. name:

700. type: string

701. description: 智能体名称

702. example: "代码审查专家"

703. type:

704. type: string

705. description: 智能体类型

706. example: "generic"

707. description:

708. type: string

709. description: 智能体描述

710. example: "一个专注于代码质量和安全审查的智能体。"

711. status:

712. type: string

713. enum: \[active, inactive, error\]

714. description: 智能体状态

715. example: "active"

716. created_at:

717. type: string

718. format: date-time

719. description: 创建时间

720. example: "2023-10-27T10:00:00Z"

721. updated_at:

722. type: string

723. format: date-time

724. description: 最后更新时间

725. example: "2023-10-27T12:00:00Z"

726. 

727. CreateAgentRequest:

728. allOf:

729. \- \$ref: '#/components/schemas/AgentBase'

730. \- type: object

731. required:

732. \- name

733. \- role

734. \- goal

735. \- framework

736. properties:

737. role:

738. type: string

739. description: 智能体角色定义

740. example: "你是一个资深软件工程师，负责代码审查。"

741. goal:

742. type: string

743. description: 智能体核心目标

744. example: "审查代码，发现潜在问题，提供优化建议。"

745. framework:

746. type: string

747. description: 使用的LLM框架

748. enum: \[langchain, autogen, crewai\]

749. example: "langchain"

750. llm:

751. type: object

752. description: LLM配置

753. properties:

754. model:

755. type: string

756. example: "gpt-4"

757. temperature:

758. type: number

759. example: 0.3

760. tools:

761. type: array

762. items:

763. type: string

764. description: 智能体可用的工具列表

765. example: \["file_reader", "code_analyzer", "git_fetcher"\]

766. 

767. UpdateAgentRequest:

768. type: object

769. properties:

770. name:

771. type: string

772. description:

773. type: string

774. role:

775. type: string

776. goal:

777. type: string

778. llm:

779. type: object

780. properties:

781. model:

782. type: string

783. temperature:

784. type: number

785. tools:

786. type: array

787. items:

788. type: string

789. 

790. AgentResponse:

791. allOf:

792. \- \$ref: '#/components/schemas/AgentBase'

793. \- type: object

794. properties:

795. role:

796. type: string

797. goal:

798. type: string

799. framework:

800. type: string

801. llm:

802. type: object

803. tools:

804. type: array

805. items:

806. type: string

807. 

808. AgentListResponse:

809. type: object

810. properties:

811. items:

812. type: array

813. items:

814. \$ref: '#/components/schemas/AgentBase'

815. total:

816. type: integer

817. description: 总数量

818. page:

819. type: integer

820. description: 当前页码

821. size:

822. type: integer

823. description: 每页数量

824. 

825. ExecuteAgentRequest:

826. type: object

827. required:

828. \- input

829. properties:

830. input:

831. type: string

832. description: 传递给智能体的输入文本或指令

833. example: "请审查这个Python文件: /path/to/file.py"

834. parameters:

835. type: object

836. description: 额外的执行参数

837. example: { "deep_scan": true }

838. 

839. ExecuteAgentResponse:

840. type: object

841. properties:

842. execution_id:

843. type: string

844. description: 执行ID，用于追踪任务

845. result:

846. type: string

847. description: 智能体的执行结果

848. intermediate_steps:

849. type: array

850. items:

851. type: object

852. description: 中间推理步骤

853. duration_ms:

854. type: integer

855. description: 执行耗时（毫秒）

856. 

857. \# --- \[知识模型\] ---

858. SearchKnowledgeRequest:

859. type: object

860. required:

861. \- query

862. properties:

863. query:

864. type: string

865. description: 搜索查询

866. example: "Python异步编程的最佳实践是什么？"

867. n_results:

868. type: integer

869. description: 返回结果数量

870. default: 5

871. example: 5

872. where:

873. type: object

874. description: 元数据过滤条件

875. example: { "source": "official_docs" }

876. 

877. SearchKnowledgeResponse:

878. type: object

879. properties:

880. ids:

881. type: array

882. items:

883. type: string

884. documents:

885. type: array

886. items:

887. type: string

888. metadatas:

889. type: array

890. items:

891. type: object

892. distances:

893. type: array

894. items:

895. type: number

896. 

897. AddKnowledgeRequest:

898. type: object

899. required:

900. \- texts

901. properties:

902. texts:

903. type: array

904. items:

905. type: string

906. description: 要添加的文本列表

907. metadatas:

908. type: array

909. items:

910. type: object

911. description: 对应的元数据列表

912. 

913. \# --- \[工作流模型\] ---

914. CreateWorkflowRequest:

915. type: object

916. required:

917. \- name

918. \- definition

919. properties:

920. name:

921. type: string

922. description: 工作流名称

923. description:

924. type: string

925. description: 工作流描述

926. definition:

927. type: object

928. description: 工作流定义（可以是DAG或JSON格式）

929. 

930. RunWorkflowRequest:

931. type: object

932. required:

933. \- input

934. properties:

935. input:

936. type: object

937. description: 启动工作流的输入数据

938. parameters:

939. type: object

940. description: 执行参数

941. 

942. WorkflowListResponse:

943. type: object

944. properties:

945. items:

946. type: array

947. items:

948. \$ref: '#/components/schemas/WorkflowResponse'

949. 

950. WorkflowResponse:

951. type: object

952. properties:

953. id:

954. type: string

955. name:

956. type: string

957. description:

958. type: string

959. definition:

960. type: object

961. 

962. RunWorkflowResponse:

963. type: object

964. properties:

965. execution_id:

966. type: string

967. status:

968. type: string

969. enum: \[pending, running, success, failed\]

970. 

971. \# --- \[系统模型\] ---

972. SystemHealthResponse:

973. type: object

974. properties:

975. status:

976. type: string

977. enum: \[healthy, unhealthy, degraded\]

978. services:

979. type: object

980. additionalProperties:

981. type: object

982. properties:

983. status:

984. type: string

985. enum: \[up, down\]

986. last_check:

987. type: string

988. format: date-time

989. uptime_seconds:

990. type: number

991. 

992. SystemConfigResponse:

993. type: object

994. description: 系统配置，键值对形式，内容动态可变

995. 

996. UpdateSystemConfigRequest:

997. type: object

998. description: 系统配置更新，键值对形式，内容动态可变

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 32/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
