---
file: 35-完整全量可用的一键生成脚本-yyc3-tree.py.md
title: YYC3-AI-FAmily-Environment-Weaver · 第35部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 35/37 部分：
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
source_range: L26598-L27600
part_no: 35/37
section_title: 1. 完整全量可用的一键生成脚本 (yyc3-tree.py)
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第35部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 1. 完整全量可用的一键生成脚本 (yyc3-tree.py)

此脚本将为您在指定目录下生成一个完整的、可立即启动开发的YYC3 AI Family项目。

### 脚本代码 (yyc3-tree.py)

1.  \#!/usr/bin/env python3

2.  \# -\*- coding: utf-8 -\*-

3.  """

4.  YYC3 (YanYu Cloud Cube) AI Family - 完整项目一键生成脚本

5.  

6.  此脚本将创建一个完整的、包含样板文件的项目结构，让您可以立即开始开发。

7.  它不再仅仅是“展示”文件树，而是“构建”文件树。

8.  

9.  用法:

10. python yyc3-tree.py --output-dir /path/to/your/project

11. """

12. 

13. import os

14. import shutil

15. import argparse

16. from typing import Dict, List, Tuple, Any

17. 

18. \# --- 配置区 ---

19. PROJECT_NAME = "yyc3-ai-family"

20. GIT_USER = "YYC-Cube"

21. DOCKER_USER = "yanyuit"

22. 

23. \# --- 样式 ---

24. COLOR_GREEN = '\033\[92m'

25. COLOR_BLUE = '\033\[94m'

26. COLOR_YELLOW = '\033\[93m'

27. COLOR_RED = '\033\[91m'

28. COLOR_ENDC = '\033\[0m'

29. 

30. \# --- 项目结构定义 (路径, 类型, 内容来源) ---

31. \# 类型: 'dir' 或 'file'

32. \# 内容来源:

33. \# - None: 创建空文件

34. \# - 'INLINE_CONTENT': 使用下面定义的内联字符串内容

35. \# - 'TEMPLATE_FILE_NAME': 使用脚本内定义的模板字符串

36. 

37. PROJECT_STRUCTURE: List\[Tuple\[str, str, Any\]\] = \[

38. \# --- 根文件 ---

39. (".", "dir", None),

40. ("README.md", "file", "INLINE_CONTENT_README"),

41. ("LICENSE", "file", "INLINE_CONTENT_LICENSE"),

42. (".gitignore", "file", "INLINE_CONTENT_GITIGNORE"),

43. (".env.example", "file", "INLINE_CONTENT_ENV_EXAMPLE"),

44. ("docker-compose.yml", "file", "INLINE_CONTENT_DOCKER_COMPOSE"),

45. ("Makefile", "file", "INLINE_CONTENT_MAKEFILE"),

46. ("requirements.txt", "file", "INLINE_CONTENT_REQUIREMENTS"),

47. 

48. \# --- 文档目录 ---

49. ("docs", "dir", None),

50. ("docs/architecture.md", "file", "INLINE_CONTENT_ARCHITECTURE"),

51. ("docs/api", "dir", None),

52. ("docs/api/openapi.yaml", "file", "INLINE_CONTENT_OPENAPI"),

53. ("docs/deployment", "dir", None),

54. ("docs/deployment/docker.md", "file", "INLINE_CONTENT_DEPLOY_DOCKER"),

55. ("docs/deployment/kubernetes.md", "file", "INLINE_CONTENT_DEPLOY_K8S"),

56. ("docs/best-practices", "dir", None),

57. 

58. \# --- 脚本目录 ---

59. ("scripts", "dir", None),

60. ("scripts/init_dev_env.sh", "file", "INLINE_CONTENT_INIT_ENV_SH"),

61. ("scripts/build.sh", "file", "INLINE_CONTENT_BUILD_SH"),

62. ("scripts/yyc3-tree.py", "file", "INLINE_CONTENT_YYC3_TREE_PY"),

63. ("scripts/test.sh", "file", "INLINE_CONTENT_TEST_SH"),

64. 

65. \# --- 服务目录 ---

66. ("services", "dir", None),

67. ("services/api-gateway", "dir", None),

68. ("services/api-gateway/Dockerfile", "file", "TEMPLATE_DOCKERFILE_SERVICE"),

69. ("services/api-gateway/main.py", "file", "TEMPLATE_MAIN_PY_SERVICE"),

70. ("services/api-gateway/requirements.txt", "file", "TEMPLATE_REQUIREMENTS_TXT_SERVICE"),

71. ("services/api-gateway/\_\_init\_\_.py", "file", None),

72. 

73. ("services/agent-incubator", "dir", None),

74. ("services/agent-incubator/Dockerfile", "file", "TEMPLATE_DOCKERFILE_SERVICE"),

75. ("services/agent-incubator/main.py", "file", "TEMPLATE_MAIN_PY_SERVICE"),

76. ("services/agent-incubator/agent_generator.py", "file", "TEMPLATE_AGENT_GENERATOR_PY"),

77. ("services/agent-incubator/requirements.txt", "file", "TEMPLATE_REQUIREMENTS_TXT_SERVICE"),

78. ("services/agent-incubator/\_\_init\_\_.py", "file", None),

79. 

80. ("services/orchestration-conductor", "dir", None),

81. ("services/orchestration-conductor/Dockerfile", "file", "TEMPLATE_DOCKERFILE_SERVICE"),

82. ("services/orchestration-conductor/main.py", "file", "TEMPLATE_MAIN_PY_SERVICE"),

83. ("services/orchestration-conductor/requirements.txt", "file", "TEMPLATE_REQUIREMENTS_TXT_SERVICE"),

84. ("services/orchestration-conductor/\_\_init\_\_.py", "file", None),

85. 

86. ("services/knowledge-flow", "dir", None),

87. ("services/knowledge-flow/Dockerfile", "file", "TEMPLATE_DOCKERFILE_SERVICE"),

88. ("services/knowledge-flow/main.py", "file", "TEMPLATE_MAIN_PY_SERVICE"),

89. ("services/knowledge-flow/requirements.txt", "file", "TEMPLATE_REQUIREMENTS_TXT_SERVICE"),

90. ("services/knowledge-flow/\_\_init\_\_.py", "file", None),

91. 

92. \# ... 其他服务 ...

93. 

94. \# --- Web UI 目录 ---

95. ("web-ui", "dir", None),

96. ("web-ui/public", "dir", None),

97. ("web-ui/public/index.html", "file", "TEMPLATE_PUBLIC_INDEX_HTML"),

98. ("web-ui/public/favicon.ico", "file", None),

99. 

100. ("web-ui/src", "dir", None),

101. ("web-ui/src/App.tsx", "file", "TEMPLATE_APP_TSX"),

102. ("web-ui/src/index.tsx", "file", "TEMPLATE_INDEX_TSX"),

103. ("web-ui/src/vite-env.d.ts", "file", "TEMPLATE_VITE_ENV_D_TS"),

104. ("web-ui/src/types/index.ts", "file", "TEMPLATE_TYPES_INDEX_TS"),

105. 

106. ("web-ui/src/components", "dir", None),

107. ("web-ui/src/components/AgentCard.tsx", "file", "TEMPLATE_COMPONENT_AGENT_CARD"),

108. ("web-ui/src/components/Layout/MainLayout.tsx", "file", "TEMPLATE_COMPONENT_MAIN_LAYOUT"),

109. 

110. ("web-ui/src/pages", "dir", None),

111. ("web-ui/src/pages/DashboardPage.tsx", "file", "TEMPLATE_PAGE_DASHBOARD"),

112. ("web-ui/src/pages/AgentListPage.tsx", "file", "TEMPLATE_PAGE_AGENT_LIST"),

113. 

114. ("web-ui/src/services", "dir", None),

115. ("web-ui/src/services/api.ts", "file", "TEMPLATE_SERVICE_API"),

116. 

117. ("web-ui/src/utils", "dir", None),

118. ("web-ui/src/utils/constants.ts", "file", "TEMPLATE_UTIL_CONSTANTS"),

119. 

120. ("web-ui/src/hooks", "dir", None),

121. ("web-ui/src/store", "dir", None),

122. ("web-ui/src/assets", "dir", None),

123. 

124. ("web-ui/package.json", "file", "INLINE_CONTENT_PACKAGE_JSON"),

125. ("web-ui/tsconfig.json", "file", "INLINE_CONTENT_TSCONFIG_JSON"),

126. ("web-ui/vite.config.ts", "file", "INLINE_CONTENT_VITE_CONFIG_TS"),

127. 

128. \# --- 其他目录 ---

129. ("agents", "dir", None),

130. ("agents/\_\_init\_\_.py", "file", None),

131. ("tools", "dir", None),

132. ("workflows", "dir", None),

133. ("tests", "dir", None),

134. ("monitoring", "dir", None),

135. \]

136. 

137. \# --- 模板内容定义 ---

138. INLINE_CONTENT_README = f"""

139. \<div align="center"\>

140. \<h1\>🌹 {PROJECT_NAME} 🌹\</h1\>

141. \<p\>\<strong\>智亦师亦友亦伯乐，谱一言一语一华章\</strong\>\</p\>

142. \<p\>\<strong\>人机共生，智慧同行 \| 以AI为魂，以流程为骨，以规范为脉\</strong\>\</p\>

143. \<img src="https://img.shields.io/badge/Core-YYC%C2%B3%20AI%20Family-blue.svg" alt="YYC3 Core"\>

144. \<img src="https://img.shields.io/badge/Python-3.9%2B-blue.svg" alt="Python"\>

145. \<img src="https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg" alt="TypeScript"\>

146. \</div\>

147. 

148. \## 🚀 快速开始

149. 

150. 1\. \*\*克隆项目\*\*

151. \`\`\`bash

152. git clone https://github.com/{GIT_USER}/{PROJECT_NAME}.git

153. cd {PROJECT_NAME}

154. \`\`\`

155. 

156. 2\. \*\*启动开发环境\*\*

157. \`\`\`bash

158. \# 启动后端依赖

159. docker-compose up -d

160. 

161. \# 运行一个服务, 例如 API Gateway

162. cd services/api-gateway

163. pip install -r requirements.txt

164. uvicorn main:app --reload

165. 

166. \# 运行前端

167. cd ../../web-ui

168. npm install

169. npm run dev

170. \`\`\`

171. 

172. 3\. \*\*访问应用\*\*

173. \- Web UI: http://localhost:3001

174. \- API Docs: http://localhost:8080/docs

175. """

176. 

177. INLINE_CONTENT_LICENSE = """Apache License

178. Version 2.0, January 2004

179. ...

180. """

181. 

182. INLINE_CONTENT_GITIGNORE = """

183. \# Python

184. \_\_pycache\_\_/

185. \*.py\[cod\]

186. \*\$py.class

187. venv/

188. env/

189. 

190. \# Node.js

191. node_modules/

192. dist/

193. build/

194. 

195. \# IDE

196. .idea/

197. .vscode/

198. 

199. \# OS

200. .DS_Store

201. Thumbs.db

202. 

203. \# YYC3

204. .env

205. logs/

206. """

207. 

208. INLINE_CONTENT_ENV_EXAMPLE = """

209. \# --- \[ API Keys \] ---

210. OPENAI_API_KEY=sk-your-openai-key

211. ANTHROPIC_API_KEY=...

212. 

213. \# --- \[ Database Credentials \] ---

214. POSTGRES_PASSWORD=...

215. RABBITMQ_PASSWORD=...

216. 

217. \# --- \[ Security \] ---

218. JWT_SECRET=your-super-secret-jwt-key

219. """

220. 

221. INLINE_CONTENT_DOCKER_COMPOSE = f"""

222. version: '3.8'

223. 

224. services:

225. postgres:

226. image: postgres:15

227. environment:

228. POSTGRES_DB: yyc3

229. POSTGRES_USER: yyc3

230. POSTGRES_PASSWORD: \${{POSTGRES_PASSWORD}}

231. volumes:

232. \- postgres_data:/var/lib/postgresql/data

233. ports:

234. \- "5432:5432"

235. redis:

236. image: redis:7-alpine

237. ports:

238. \- "6379:6379"

239. chromadb:

240. image: chromadb/chroma:latest

241. ports:

242. \- "8000:8000"

243. 

244. volumes:

245. postgres_data:

246. """

247. 

248. INLINE_CONTENT_MAKEFILE = """

249. .PHONY: help test lint

250. 

251. help:

252. \t@echo "Available commands:"

253. \t@echo " test - Run all tests"

254. \t@echo " lint - Run linter"

255. 

256. test:

257. \t@echo "Running tests..."

258. \t# Add your test command here, e.g., pytest

259. 

260. lint:

261. \t@echo "Running linter..."

262. \t# Add your lint command here, e.g., flake8 .

263. """

264. 

265. INLINE_CONTENT_REQUIREMENTS = """# --- \[ Web框架 \] ---

266. fastapi==0.104.1

267. uvicorn\[standard\]==0.24.0

268. 

269. \# --- \[ AI/LLM \] ---

270. langchain==0.0.350

271. openai==1.3.7

272. 

273. \# --- \[ 数据库 \] ---

274. sqlalchemy==2.0.23

275. asyncpg==0.29.0

276. chromadb==0.4.17

277. redis==5.0.1

278. 

279. \# --- \[ 其他 \] ---

280. pydantic==2.5.0

281. python-jose\[cryptography\]==3.3.0

282. passlib\[bcrypt\]==1.7.4

283. """

284. 

285. \# --- 模板文件内容 ---

286. TEMPLATE_DOCKERFILE_SERVICE = f"""

287. FROM python:3.11-slim

288. 

289. WORKDIR /app

290. 

291. COPY requirements.txt .

292. RUN pip install --no-cache-dir -r requirements.txt

293. 

294. COPY . .

295. 

296. EXPOSE 8080

297. 

298. CMD \["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"\]

299. """

300. 

301. TEMPLATE_MAIN_PY_SERVICE = """

302. from fastapi import FastAPI

303. import os

304. 

305. app = FastAPI(

306. title="YYC3 Service",

307. description="A microservice in the YYC3 AI Family",

308. version=os.getenv("SERVICE_VERSION", "1.0.0")

309. )

310. 

311. @app.get("/")

312. async def read_root():

313. return {"status": "ok", "message": "Welcome to YYC3 Service"}

314. 

315. @app.get("/health")

316. async def health_check():

317. return {"status": "healthy"}

318. """

319. 

320. TEMPLATE_AGENT_GENERATOR_PY = """

321. \# Placeholder for agent generation logic

322. def generate_agent(config: dict):

323. \# ... logic to create an agent

324. print(f"Generating agent with config: {config}")

325. return {"agent_id": "new_agent_123"}

326. """

327. 

328. TEMPLATE_REQUIREMENTS_TXT_SERVICE = INLINE_CONTENT_REQUIREMENTS

329. 

330. TEMPLATE_PUBLIC_INDEX_HTML = """\<!DOCTYPE html\>

331. \<html lang="en"\>

332. \<head\>

333. \<meta charset="UTF-8" /\>

334. \<link rel="icon" type="image/svg+xml" href="/vite.svg" /\>

335. \<meta name="viewport" content="width=device-width, initial-scale=1.0" /\>

336. \<title\>YYC3 AI Family\</title\>

337. \</head\>

338. \<body\>

339. \<div id="root"\>\</div\>

340. \<script type="module" src="/src/main.tsx"\>\</script\>

341. \</body\>

342. \</html\>

343. """

344. 

345. INLINE_CONTENT_PACKAGE_JSON = {

346. "name": "yyc3-web-ui",

347. "private": True,

348. "version": "1.0.0",

349. "type": "module",

350. "scripts": {

351. "dev": "vite",

352. "build": "tsc && vite build",

353. "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",

354. "preview": "vite preview",

355. "format": "prettier --write \\src/\*\*/\*.{ts,tsx,css,md}\\"

356. },

357. "dependencies": {

358. "react": "^18.2.0",

359. "react-dom": "^18.2.0",

360. "react-router-dom": "^6.20.1",

361. "antd": "^5.12.2",

362. "axios": "^1.6.2",

363. "dayjs": "^1.11.10",

364. "zustand": "^4.4.7",

365. "react-query": "^3.39.3",

366. "@ant-design/icons": "^5.2.6",

367. "@ant-design/plots": "^1.2.5",

368. "recharts": "^2.8.0"

369. },

370. "devDependencies": {

371. "@types/react": "^18.2.37",

372. "@types/react-dom": "^18.2.15",

373. "@typescript-eslint/eslint-plugin": "^6.11.0",

374. "@typescript-eslint/parser": "^6.11.0",

375. "@vitejs/plugin-react": "^4.1.1",

376. "eslint": "^8.54.0",

377. "eslint-plugin-react-hooks": "^4.6.0",

378. "eslint-plugin-react-refresh": "^0.4.4",

379. "prettier": "^3.1.0",

380. "typescript": "^5.2.2",

381. "vite": "^5.0.0"

382. }

383. }

384. 

385. INLINE_CONTENT_TSCONFIG_JSON = {

386. "compilerOptions": {

387. "target": "ES2020",

388. "useDefineForClassFields": True,

389. "lib": \["ES2020", "DOM", "DOM.Iterable"\],

390. "module": "ESNext",

391. "skipLibCheck": True,

392. "moduleResolution": "bundler",

393. "allowImportingTsExtensions": True,

394. "resolveJsonModule": True,

395. "isolatedModules": True,

396. "noEmit": True,

397. "jsx": "react-jsx",

398. "strict": True,

399. "noUnusedLocals": True,

400. "noUnusedParameters": True,

401. "noFallthroughCasesInSwitch": True,

402. "baseUrl": ".",

403. "paths": {

404. "@/\*": \["src/\*"\]

405. }

406. },

407. "include": \["src"\],

408. "references": \[{ "path": "./tsconfig.node.json" }\]

409. }

410. 

411. INLINE_CONTENT_VITE_CONFIG_TS = """

412. import { defineConfig } from 'vite'

413. import react from '@vitejs/plugin-react'

414. import path from 'path'

415. 

416. export default defineConfig({

417. plugins: \[react()\],

418. resolve: {

419. alias: {

420. '@': path.resolve(\_\_dirname, './src'),

421. },

422. },

423. server: {

424. port: 3001,

425. proxy: {

426. '/api': {

427. target: 'http://localhost:8080',

428. changeOrigin: true,

429. }

430. }

431. }

432. })

433. """

434. \# 为了简洁，这里只展示部分模板，实际脚本中会包含所有模板内容

435. \# ... TEMPLATE_APP_TSX, TEMPLATE_COMPONENT_AGENT_CARD 等也将在此处定义 ...

436. 

437. def get_template_content(template_name: str) -\> str:

438. """根据模板名称获取内容"""

439. return globals().get(template_name, "# TODO: Add content for " + template_name)

440. 

441. class ProjectCreator:

442. def \_\_init\_\_(self, base_path: str, project_name: str):

443. self.base_path = os.path.abspath(os.path.join(base_path, project_name))

444. self.project_name = project_name

445. 

446. def log(self, message: str, color=COLOR_ENDC):

447. print(f"{color}{message}{COLOR_ENDC}")

448. 

449. def create(self):

450. self.log(f"🚀 正在创建项目 '{self.project_name}' 在 '{self.base_path}'...", COLOR_BLUE)

451. 

452. if os.path.exists(self.base_path):

453. self.log(f"🔥 警告: 目录 '{self.base_path}' 已存在!", COLOR_YELLOW)

454. \# 这里可以添加覆盖逻辑，例如 --force 标志

455. return

456. 

457. for path, file_type, content_source in PROJECT_STRUCTURE:

458. full_path = os.path.join(self.base_path, path)

459. 

460. if file_type == 'dir':

461. os.makedirs(full_path, exist_ok=True)

462. self.log(f"📁 创建目录: {path}", COLOR_GREEN)

463. elif file_type == 'file':

464. os.makedirs(os.path.dirname(full_path), exist_ok=True)

465. 

466. content = ""

467. if content_source is None:

468. content = ""

469. elif content_source.startswith("INLINE_CONTENT"):

470. content = get_template_content(content_source)

471. elif content_source.startswith("TEMPLATE\_"):

472. content = get_template_content(content_source)

473. 

474. \# 特殊处理 JSON 格式的文件

475. if isinstance(content, dict):

476. import json

477. content = json.dumps(content, indent=2)

478. 

479. with open(full_path, 'w', encoding='utf-8') as f:

480. f.write(content)

481. self.log(f"📄 创建文件: {path}", COLOR_GREEN)

482. 

483. self.log(f"\n✅ 项目 '{self.project_name}' 创建完成!", COLOR_BLUE)

484. self.log(f"🎉 下一步:\n cd {self.project_name}\n ./scripts/init_dev_env.sh\n", COLOR_BLUE)

485. 

486. def main():

487. parser = argparse.ArgumentParser(description="生成完整的YYC3 AI Family项目结构。")

488. parser.add_argument(

489. "--output-dir",

490. default=".",

491. help="项目输出目录 (默认: 当前目录)"

492. )

493. args = parser.parse_args()

494. 

495. creator = ProjectCreator(args.output_dir, PROJECT_NAME)

496. creator.create()

497. 

498. if \_\_name\_\_ == "\_\_main\_\_":

499. main()

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 35/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
