---
file: 11-知识流动系统-Knowledge-Flow-续2.md
title: YYC3-AI-FAmily-Environment-Weaver · 第11部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 11/37 部分：
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
source_range: L13618-L15354
part_no: 11/37
section_title: 6. 知识流动系统（Knowledge Flow）（续2）
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第11部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

405. def log_decision(agent_id: str, decision_type: str, context: Dict\[str, Any\] = None):

406. """智能体决策日志装饰器"""

407. def decorator(func):

408. async def async_wrapper(\*args, \*\*kwargs):

409. start_time = datetime.utcnow()

410. 

411. try:

412. \# 执行函数

413. result = await func(\*args, \*\*kwargs)

414. 

415. \# 记录成功决策

416. reasoning = f"Executed {func.\_\_name\_\_} with args {args} and kwargs {kwargs}"

417. 

418. \# 获取智能体集成实例

419. integration = get_agent_integration()

420. if integration:

421. await integration.log_decision(

422. agent_id=agent_id,

423. decision_type=decision_type,

424. reasoning=reasoning,

425. outcome=result,

426. context=context

427. )

428. 

429. return result

430. 

431. except Exception as e:

432. \# 记录失败决策

433. error_message = str(e)

434. 

435. \# 获取智能体集成实例

436. integration = get_agent_integration()

437. if integration:

438. await integration.log_decision(

439. agent_id=agent_id,

440. decision_type=decision_type,

441. reasoning=f"Failed to execute {func.\_\_name\_\_}: {error_message}",

442. outcome={"error": error_message},

443. context=context

444. )

445. 

446. raise

447. 

448. def sync_wrapper(\*args, \*\*kwargs):

449. start_time = datetime.utcnow()

450. 

451. try:

452. \# 执行函数

453. result = func(\*args, \*\*kwargs)

454. 

455. \# 记录成功决策

456. reasoning = f"Executed {func.\_\_name\_\_} with args {args} and kwargs {kwargs}"

457. 

458. \# 获取智能体集成实例

459. integration = get_agent_integration()

460. if integration and hasattr(integration, 'log_decision'):

461. \# 创建异步任务

462. loop = asyncio.new_event_loop()

463. asyncio.set_event_loop(loop)

464. loop.run_until_complete(

465. integration.log_decision(

466. agent_id=agent_id,

467. decision_type=decision_type,

468. reasoning=reasoning,

469. outcome=result,

470. context=context

471. )

472. )

473. loop.close()

474. 

475. return result

476. 

477. except Exception as e:

478. \# 记录失败决策

479. error_message = str(e)

480. 

481. \# 获取智能体集成实例

482. integration = get_agent_integration()

483. if integration and hasattr(integration, 'log_decision'):

484. \# 创建异步任务

485. loop = asyncio.new_event_loop()

486. asyncio.set_event_loop(loop)

487. loop.run_until_complete(

488. integration.log_decision(

489. agent_id=agent_id,

490. decision_type=decision_type,

491. reasoning=f"Failed to execute {func.\_\_name\_\_}: {error_message}",

492. outcome={"error": error_message},

493. context=context

494. )

495. )

496. loop.close()

497. 

498. raise

499. 

500. \# 返回适当的包装器

501. import asyncio

502. if asyncio.iscoroutinefunction(func):

503. return async_wrapper

504. else:

505. return sync_wrapper

506. 

507. return decorator

508. 

509. \# 全局智能体集成实例

510. \_agent_integration = None

511. 

512. def get_agent_integration() -\> Optional\[AgentIntegration\]:

513. """获取智能体集成实例"""

514. global \_agent_integration

515. return \_agent_integration

516. 

517. def set_agent_integration(integration: AgentIntegration):

518. """设置智能体集成实例"""

519. global \_agent_integration

520. \_agent_integration = integration

521. 

522. async def main():

523. parser = argparse.ArgumentParser(description="YYC3日志收集器")

524. parser.add_argument("--config", default="log_capture_config.yml", help="配置文件")

525. parser.add_argument("--mode", choices=\["collector", "agent"\], default="collector", help="运行模式")

526. 

527. args = parser.parse_args()

528. 

529. \# 加载配置

530. with open(args.config, 'r') as f:

531. config = yaml.safe_load(f)

532. 

533. if args.mode == "collector":

534. \# 启动日志收集器

535. collector_config = config.get("collector", {})

536. collector = WebSocketLogCollector(collector_config)

537. collector.start()

538. 

539. elif args.mode == "agent":

540. \# 启动智能体集成

541. agent_config = config.get("agent", {})

542. integration = AgentIntegration(agent_config)

543. 

544. \# 连接到日志收集器

545. client_id = await integration.connect()

546. 

547. if client_id:

548. \# 设置全局实例

549. set_agent_integration(integration)

550. 

551. \# 示例：记录决策

552. await integration.log_decision(

553. agent_id="example_agent",

554. decision_type="test_decision",

555. reasoning="Testing the logging system",

556. outcome={"status": "success"},

557. context={"test": True}

558. )

559. 

560. \# 保持连接

561. try:

562. while True:

563. await asyncio.sleep(1)

564. except KeyboardInterrupt:

565. await integration.disconnect()

566. 

567. if \_\_name\_\_ == "\_\_main\_\_":

568. asyncio.run(main())

### 6.3 知识蒸馏脚本

#### 6.3.1 代码仓库自动摘要生成

1.  \#!/usr/bin/env python3

2.  \# 代码仓库自动摘要生成脚本

3.  

4.  import os

5.  import sys

6.  import logging

7.  import asyncio

8.  import json

9.  import hashlib

10. import difflib

11. from typing import Dict, List, Any, Optional, Tuple, Set

12. from datetime import datetime, timedelta

13. from pathlib import Path

14. import yaml

15. import argparse

16. 

17. \# Git操作

18. import git

19. from git import Repo

20. 

21. \# AST解析

22. import ast

23. import astunparse

24. 

25. \# AI模型

26. import openai

27. 

28. \# 配置日志

29. logging.basicConfig(level=logging.INFO)

30. logger = logging.getLogger("yyc3-code-distillation")

31. 

32. class CodeChangeAnalyzer:

33. """代码变更分析器"""

34. 

35. def \_\_init\_\_(self, repo_path: str):

36. self.repo_path = repo_path

37. self.repo = Repo(repo_path)

38. self.cache_dir = Path(repo_path) / ".yyc3_cache"

39. self.cache_dir.mkdir(exist_ok=True)

40. 

41. def get_changed_files(self, commit_range: str = "HEAD~1..HEAD") -\> List\[str\]:

42. """获取变更的文件列表"""

43. try:

44. \# 获取提交范围内的变更

45. diffs = self.repo.git.diff("--name-only", commit_range).split()

46. return diffs

47. except Exception as e:

48. logger.error(f"Error getting changed files: {e}")

49. return \[\]

50. 

51. def get_file_diff(self, file_path: str, commit_range: str = "HEAD~1..HEAD") -\> Optional\[str\]:

52. """获取文件差异"""

53. try:

54. diff = self.repo.git.diff(commit_range, file_path)

55. return diff

56. except Exception as e:

57. logger.error(f"Error getting file diff for {file_path}: {e}")

58. return None

59. 

60. def analyze_file_changes(self, file_path: str, commit_range: str = "HEAD~1..HEAD") -\> Dict\[str, Any\]:

61. """分析文件变更"""

62. diff = self.get_file_diff(file_path, commit_range)

63. if not diff:

64. return {}

65. 

66. \# 计算文件哈希

67. try:

68. with open(os.path.join(self.repo_path, file_path), 'rb') as f:

69. current_content = f.read()

70. current_hash = hashlib.md5(current_content).hexdigest()

71. except:

72. current_hash = ""

73. 

74. \# 获取之前版本的哈希

75. try:

76. previous_content = self.repo.git.show(f"HEAD~1:{file_path}")

77. previous_hash = hashlib.md5(previous_content.encode()).hexdigest()

78. except:

79. previous_hash = ""

80. 

81. \# 分析差异

82. lines_added = diff.count('+') - diff.count('++')

83. lines_removed = diff.count('-') - diff.count('--')

84. 

85. \# 获取变更类型

86. change_type = "modified"

87. if not previous_hash:

88. change_type = "added"

89. elif not current_hash:

90. change_type = "deleted"

91. 

92. return {

93. "file_path": file_path,

94. "change_type": change_type,

95. "lines_added": lines_added,

96. "lines_removed": lines_removed,

97. "current_hash": current_hash,

98. "previous_hash": previous_hash,

99. "diff": diff

100. }

101. 

102. def analyze_commit(self, commit_hash: str) -\> Dict\[str, Any\]:

103. """分析单个提交"""

104. try:

105. commit = self.repo.commit(commit_hash)

106. 

107. \# 获取提交信息

108. return {

109. "hash": commit_hash,

110. "author": str(commit.author),

111. "date": datetime.fromtimestamp(commit.committed_date).isoformat(),

112. "message": commit.message.strip(),

113. "files_changed": \[item.a_path for item in commit.diff(commit.parents\[0\])\]

114. }

115. except Exception as e:

116. logger.error(f"Error analyzing commit {commit_hash}: {e}")

117. return {}

118. 

119. class CodeAnalyzer:

120. """代码分析器"""

121. 

122. def \_\_init\_\_(self, openai_api_key: str = None):

123. self.openai_api_key = openai_api_key or os.environ.get("OPENAI_API_KEY")

124. 

125. if not self.openai_api_key:

126. logger.warning("OpenAI API key not provided, some features may be limited")

127. 

128. def extract_functions(self, file_path: str) -\> List\[Dict\[str, Any\]\]:

129. """提取文件中的函数"""

130. try:

131. with open(file_path, 'r', encoding='utf-8') as f:

132. content = f.read()

133. 

134. tree = ast.parse(content)

135. functions = \[\]

136. 

137. for node in ast.walk(tree):

138. if isinstance(node, ast.FunctionDef):

139. \# 提取函数信息

140. start_line = node.lineno

141. end_line = node.end_lineno if hasattr(node, 'end_lineno') else start_line

142. function_code = '\n'.join(content.split('\n')\[start_line-1:end_line\])

143. 

144. \# 提取函数文档字符串

145. docstring = ast.get_docstring(node) or ""

146. 

147. functions.append({

148. "name": node.name,

149. "start_line": start_line,

150. "end_line": end_line,

151. "code": function_code,

152. "docstring": docstring,

153. "args": \[arg.arg for arg in node.args.args\],

154. "decorators": \[ast.unparse(dec) for dec in node.decorator_list\]

155. })

156. 

157. return functions

158. 

159. except Exception as e:

160. logger.error(f"Error extracting functions from {file_path}: {e}")

161. return \[\]

162. 

163. def extract_classes(self, file_path: str) -\> List\[Dict\[str, Any\]\]:

164. """提取文件中的类"""

165. try:

166. with open(file_path, 'r', encoding='utf-8') as f:

167. content = f.read()

168. 

169. tree = ast.parse(content)

170. classes = \[\]

171. 

172. for node in ast.walk(tree):

173. if isinstance(node, ast.ClassDef):

174. \# 提取类信息

175. start_line = node.lineno

176. end_line = node.end_lineno if hasattr(node, 'end_lineno') else start_line

177. class_code = '\n'.join(content.split('\n')\[start_line-1:end_line\])

178. 

179. \# 提取类文档字符串

180. docstring = ast.get_docstring(node) or ""

181. 

182. \# 提取类方法

183. methods = \[\]

184. for item in node.body:

185. if isinstance(item, ast.FunctionDef):

186. methods.append(item.name)

187. 

188. \# 提取基类

189. bases = \[\]

190. for base in node.bases:

191. if isinstance(base, ast.Name):

192. bases.append(base.id)

193. elif isinstance(base, ast.Attribute):

194. bases.append(ast.unparse(base))

195. 

196. classes.append({

197. "name": node.name,

198. "start_line": start_line,

199. "end_line": end_line,

200. "code": class_code,

201. "docstring": docstring,

202. "methods": methods,

203. "bases": bases,

204. "decorators": \[ast.unparse(dec) for dec in node.decorator_list\]

205. })

206. 

207. return classes

208. 

209. except Exception as e:

210. logger.error(f"Error extracting classes from {file_path}: {e}")

211. return \[\]

212. 

213. def generate_function_summary(self, function: Dict\[str, Any\]) -\> str:

214. """生成函数摘要"""

215. if not self.openai_api_key:

216. \# 简单摘要，不使用AI

217. return f"Function {function\['name'\]} takes {len(function\['args'\])} arguments."

218. 

219. try:

220. prompt = f"""

221. 请简要总结以下Python函数的功能，不超过两句话：

222. 

223. 函数名: {function\['name'\]}

224. 参数: {', '.join(function\['args'\])}

225. 代码:

{function\['code'\]}

1.  

2.  摘要:

3.  """

4.  

5.  response = openai.Completion.create(

6.  model="text-davinci-003",

7.  prompt=prompt,

8.  max_tokens=150,

9.  temperature=0.3

10. )

11. 

12. return response.choices\[0\].text.strip()

13. 

14. except Exception as e:

15. logger.error(f"Error generating function summary: {e}")

16. return f"Function {function\['name'\]} takes {len(function\['args'\])} arguments."

17. 

18. def generate_class_summary(self, class_info: Dict\[str, Any\]) -\> str:

19. """生成类摘要"""

20. if not self.openai_api_key:

21. \# 简单摘要，不使用AI

22. return f"Class {class_info\['name'\]} has {len(class_info\['methods'\])} methods."

23. 

24. try:

25. methods_str = ', '.join(class_info\['methods'\])

26. bases_str = ', '.join(class_info\['bases'\]) if class_info\['bases'\] else 'no base classes'

27. 

28. prompt = f"""

29. 请简要总结以下Python类的功能和用途，不超过两句话：

30. 

31. 类名: {class_info\['name'\]}

32. 基类: {bases_str}

33. 方法: {methods_str}

34. 文档字符串:

35. {class_info\['docstring'\]}

36. 

37. 摘要:

38. """

39. 

40. response = openai.Completion.create(

41. model="text-davinci-003",

42. prompt=prompt,

43. max_tokens=150,

44. temperature=0.3

45. )

46. 

47. return response.choices\[0\].text.strip()

48. 

49. except Exception as e:

50. logger.error(f"Error generating class summary: {e}")

51. return f"Class {class_info\['name'\]} has {len(class_info\['methods'\])} methods."

52. 

53. class CommitSummarizer:

54. """提交摘要生成器"""

55. 

56. def \_\_init\_\_(self, repo_path: str, openai_api_key: str = None):

57. self.repo_path = repo_path

58. self.change_analyzer = CodeChangeAnalyzer(repo_path)

59. self.code_analyzer = CodeAnalyzer(openai_api_key)

60. self.cache_dir = Path(repo_path) / ".yyc3_cache"

61. self.cache_dir.mkdir(exist_ok=True)

62. 

63. def generate_commit_summary(self, commit_hash: str) -\> Dict\[str, Any\]:

64. """生成提交摘要"""

65. \# 获取提交信息

66. commit_info = self.change_analyzer.analyze_commit(commit_hash)

67. if not commit_info:

68. return {}

69. 

70. \# 获取变更文件

71. changed_files = commit_info.get("files_changed", \[\])

72. 

73. \# 分析每个文件

74. file_analyses = \[\]

75. total_lines_added = 0

76. total_lines_removed = 0

77. 

78. for file_path in changed_files:

79. \# 获取文件变更

80. change_info = self.change_analyzer.analyze_file_changes(file_path, f"{commit_hash}~1..{commit_hash}")

81. if not change_info:

82. continue

83. 

84. total_lines_added += change_info.get("lines_added", 0)

85. total_lines_removed += change_info.get("lines_removed", 0)

86. 

87. \# 如果是Python文件，进行代码分析

88. code_analysis = {}

89. if file_path.endswith('.py') and change_info.get("change_type") != "deleted":

90. full_path = os.path.join(self.repo_path, file_path)

91. 

92. \# 提取函数和类

93. functions = self.code_analyzer.extract_functions(full_path)

94. classes = self.code_analyzer.extract_classes(full_path)

95. 

96. \# 生成摘要

97. function_summaries = \[self.code_analyzer.generate_function_summary(f) for f in functions\]

98. class_summaries = \[self.code_analyzer.generate_class_summary(c) for c in classes\]

99. 

100. code_analysis = {

101. "functions": \[

102. {

103. "name": f\["name"\],

104. "summary": summary

105. }

106. for f, summary in zip(functions, function_summaries)

107. \],

108. "classes": \[

109. {

110. "name": c\["name"\],

111. "summary": summary

112. }

113. for c, summary in zip(classes, class_summaries)

114. \]

115. }

116. 

117. file_analyses.append({

118. "file_path": file_path,

119. "change_type": change_info.get("change_type"),

120. "lines_added": change_info.get("lines_added", 0),

121. "lines_removed": change_info.get("lines_removed", 0),

122. "code_analysis": code_analysis

123. })

124. 

125. \# 使用AI生成整体摘要

126. overall_summary = self.\_generate_overall_summary(

127. commit_info.get("message", ""),

128. file_analyses,

129. total_lines_added,

130. total_lines_removed

131. )

132. 

133. \# 构建结果

134. summary = {

135. "commit": commit_info,

136. "overall_summary": overall_summary,

137. "total_lines_added": total_lines_added,

138. "total_lines_removed": total_lines_removed,

139. "file_analyses": file_analyses,

140. "generated_at": datetime.utcnow().isoformat()

141. }

142. 

143. \# 保存到缓存

144. summary_file = self.cache_dir / f"commit_summary\_{commit_hash}.json"

145. with open(summary_file, 'w') as f:

146. json.dump(summary, f, indent=2)

147. 

148. return summary

149. 

150. def \_generate_overall_summary(self, commit_message: str, file_analyses: List\[Dict\[str, Any\]\],

151. total_lines_added: int, total_lines_removed: int) -\> str:

152. """生成整体摘要"""

153. \# 如果没有API密钥，使用简单摘要

154. if not self.code_analyzer.openai_api_key:

155. return f"Commit with message: {commit_message}. Changed {len(file_analyses)} files, added {total_lines_added} lines and removed {total_lines_removed} lines."

156. 

157. \# 准备文件变更摘要

158. file_summaries = \[\]

159. for analysis in file_analyses:

160. file_path = analysis.get("file_path", "")

161. change_type = analysis.get("change_type", "")

162. 

163. if change_type == "added":

164. file_summaries.append(f"Added new file {file_path}")

165. elif change_type == "deleted":

166. file_summaries.append(f"Deleted file {file_path}")

167. else:

168. lines_added = analysis.get("lines_added", 0)

169. lines_removed = analysis.get("lines_removed", 0)

170. file_summaries.append(f"Modified {file_path} (+{lines_added}/-{lines_removed})")

171. 

172. \# 准备代码变更摘要

173. code_changes = \[\]

174. for analysis in file_analyses:

175. code_analysis = analysis.get("code_analysis", {})

176. if code_analysis:

177. file_path = analysis.get("file_path", "")

178. 

179. functions = code_analysis.get("functions", \[\])

180. if functions:

181. func_names = \[f.get("name", "") for f in functions\]

182. code_changes.append(f"In {file_path}, modified functions: {', '.join(func_names)}")

183. 

184. classes = code_analysis.get("classes", \[\])

185. if classes:

186. class_names = \[c.get("name", "") for c in classes\]

187. code_changes.append(f"In {file_path}, modified classes: {', '.join(class_names)}")

188. 

189. \# 构建提示

190. file_changes_str = "\n".join(file_summaries)

191. code_changes_str = "\n".join(code_changes) if code_changes else "No significant code changes detected."

192. 

193. prompt = f"""

194. 请为以下Git提交生成一个简洁的摘要，不超过三句话。重点描述代码变更的主要影响和目的。

195. 

196. 提交消息:

197. {commit_message}

198. 

199. 文件变更:

200. {file_changes_str}

201. 

202. 代码变更:

203. {code_changes_str}

204. 

205. 摘要:

206. """

207. 

208. try:

209. response = openai.Completion.create(

210. model="text-davinci-003",

211. prompt=prompt,

212. max_tokens=200,

213. temperature=0.3

214. )

215. 

216. return response.choices\[0\].text.strip()

217. 

218. except Exception as e:

219. logger.error(f"Error generating overall summary: {e}")

220. return f"Commit with message: {commit_message}. Changed {len(file_analyses)} files, added {total_lines_added} lines and removed {total_lines_removed} lines."

221. 

222. class RepositoryDistiller:

223. """代码仓库蒸馏器"""

224. 

225. def \_\_init\_\_(self, repo_path: str, openai_api_key: str = None):

226. self.repo_path = repo_path

227. self.summarizer = CommitSummarizer(repo_path, openai_api_key)

228. self.cache_dir = Path(repo_path) / ".yyc3_cache"

229. self.cache_dir.mkdir(exist_ok=True)

230. 

231. def generate_daily_summary(self, date: datetime = None) -\> Dict\[str, Any\]:

232. """生成每日摘要"""

233. if not date:

234. date = datetime.utcnow().date()

235. 

236. \# 获取当天的提交

237. repo = Repo(self.repo_path)

238. 

239. \# 获取当天的提交哈希

240. commits = \[\]

241. for commit in repo.iter_commits(since=date, until=date + timedelta(days=1)):

242. commits.append(commit.hexsha)

243. 

244. \# 生成每个提交的摘要

245. commit_summaries = \[\]

246. for commit_hash in commits:

247. \# 检查缓存

248. summary_file = self.cache_dir / f"commit_summary\_{commit_hash}.json"

249. if summary_file.exists():

250. with open(summary_file, 'r') as f:

251. summary = json.load(f)

252. else:

253. summary = self.summarizer.generate_commit_summary(commit_hash)

254. 

255. if summary:

256. commit_summaries.append(summary)

257. 

258. \# 生成每日整体摘要

259. daily_summary = self.\_generate_daily_summary(date, commit_summaries)

260. 

261. \# 构建结果

262. result = {

263. "date": date.isoformat(),

264. "commit_count": len(commits),

265. "commit_summaries": commit_summaries,

266. "daily_summary": daily_summary,

267. "generated_at": datetime.utcnow().isoformat()

268. }

269. 

270. \# 保存结果

271. output_file = self.cache_dir / f"daily_summary\_{date.strftime('%Y%m%d')}.json"

272. with open(output_file, 'w') as f:

273. json.dump(result, f, indent=2)

274. 

275. return result

276. 

277. def generate_weekly_summary(self, week_start: datetime = None) -\> Dict\[str, Any\]:

278. """生成每周摘要"""

279. if not week_start:

280. \# 获取本周一的日期

281. today = datetime.utcnow().date()

282. week_start = today - timedelta(days=today.weekday())

283. 

284. week_end = week_start + timedelta(days=7)

285. 

286. \# 获取本周的每日摘要

287. daily_summaries = \[\]

288. current_day = week_start

289. while current_day \< week_end:

290. \# 检查缓存

291. summary_file = self.cache_dir / f"daily_summary\_{current_day.strftime('%Y%m%d')}.json"

292. if summary_file.exists():

293. with open(summary_file, 'r') as f:

294. summary = json.load(f)

295. daily_summaries.append(summary)

296. 

297. current_day += timedelta(days=1)

298. 

299. \# 生成每周整体摘要

300. weekly_summary = self.\_generate_weekly_summary(week_start, daily_summaries)

301. 

302. \# 计算统计信息

303. total_commits = sum(s.get("commit_count", 0) for s in daily_summaries)

304. total_lines_added = 0

305. total_lines_removed = 0

306. 

307. for daily in daily_summaries:

308. for commit in daily.get("commit_summaries", \[\]):

309. total_lines_added += commit.get("total_lines_added", 0)

310. total_lines_removed += commit.get("total_lines_removed", 0)

311. 

312. \# 构建结果

313. result = {

314. "week_start": week_start.isoformat(),

315. "week_end": week_end.isoformat(),

316. "daily_summaries": daily_summaries,

317. "weekly_summary": weekly_summary,

318. "statistics": {

319. "total_commits": total_commits,

320. "total_lines_added": total_lines_added,

321. "total_lines_removed": total_lines_removed,

322. "net_lines": total_lines_added - total_lines_removed

323. },

324. "generated_at": datetime.utcnow().isoformat()

325. }

326. 

327. \# 保存结果

328. output_file = self.cache_dir / f"weekly_summary\_{week_start.strftime('%Y%m%d')}.json"

329. with open(output_file, 'w') as f:

330. json.dump(result, f, indent=2)

331. 

332. return result

333. 

334. def \_generate_daily_summary(self, date: datetime, commit_summaries: List\[Dict\[str, Any\]\]) -\> str:

335. """生成每日整体摘要"""

336. if not self.summarizer.code_analyzer.openai_api_key:

337. return f"Day {date} had {len(commit_summaries)} commits."

338. 

339. \# 提取关键信息

340. commit_messages = \[s.get("commit", {}).get("message", "") for s in commit_summaries\]

341. overall_summaries = \[s.get("overall_summary", "") for s in commit_summaries\]

342. 

343. \# 构建提示

344. commit_messages_str = "\n".join(f"- {msg}" for msg in commit_messages)

345. summaries_str = "\n".join(f"- {summary}" for summary in overall_summaries)

346. 

347. prompt = f"""

348. 请为以下每日代码变更生成一个简洁的摘要，不超过三句话。重点描述当日开发的主要进展和重点。

349. 

350. 日期: {date}

351. 

352. 提交消息:

353. {commit_messages_str}

354. 

355. 提交摘要:

356. {summaries_str}

357. 

358. 每日摘要:

359. """

360. 

361. try:

362. response = openai.Completion.create(

363. model="text-davinci-003",

364. prompt=prompt,

365. max_tokens=200,

366. temperature=0.3

367. )

368. 

369. return response.choices\[0\].text.strip()

370. 

371. except Exception as e:

372. logger.error(f"Error generating daily summary: {e}")

373. return f"Day {date} had {len(commit_summaries)} commits."

374. 

375. def \_generate_weekly_summary(self, week_start: datetime, daily_summaries: List\[Dict\[str, Any\]\]) -\> str:

376. """生成每周整体摘要"""

377. if not self.summarizer.code_analyzer.openai_api_key:

378. return f"Week of {week_start} had {len(daily_summaries)} active days."

379. 

380. \# 提取每日摘要

381. daily_summaries_text = \[\]

382. for daily in daily_summaries:

383. date = daily.get("date", "")

384. summary = daily.get("daily_summary", "")

385. daily_summaries_text.append(f"{date}: {summary}")

386. 

387. \# 构建提示

388. daily_summaries_str = "\n".join(daily_summaries_text)

389. 

390. prompt = f"""

391. 请为以下每周代码变更生成一个简洁的摘要，不超过四句话。重点描述本周开发的主要进展、关键变化和整体趋势。

392. 

393. 周开始日期: {week_start}

394. 

395. 每日摘要:

396. {daily_summaries_str}

397. 

398. 每周摘要:

399. """

400. 

401. try:

402. response = openai.Completion.create(

403. model="text-davinci-003",

404. prompt=prompt,

405. max_tokens=250,

406. temperature=0.3

407. )

408. 

409. return response.choices\[0\].text.strip()

410. 

411. except Exception as e:

412. logger.error(f"Error generating weekly summary: {e}")

413. return f"Week of {week_start} had {len(daily_summaries)} active days."

414. 

415. def main():

416. parser = argparse.ArgumentParser(description="YYC3代码仓库摘要生成器")

417. parser.add_argument("--repo-path", default=".", help="代码仓库路径")

418. parser.add_argument("--openai-key", help="OpenAI API密钥")

419. parser.add_argument("--commit", help="为指定提交生成摘要")

420. parser.add_argument("--daily", action="store_true", help="生成每日摘要")

421. parser.add_argument("--weekly", action="store_true", help="生成每周摘要")

422. parser.add_argument("--date", help="指定日期 (YYYY-MM-DD)")

423. parser.add_argument("--output", help="输出文件路径")

424. 

425. args = parser.parse_args()

426. 

427. \# 创建仓库蒸馏器

428. distiller = RepositoryDistiller(args.repo_path, args.openai_key)

429. 

430. if args.commit:

431. \# 为指定提交生成摘要

432. summary = distiller.summarizer.generate_commit_summary(args.commit)

433. 

434. if args.output:

435. with open(args.output, 'w') as f:

436. json.dump(summary, f, indent=2)

437. else:

438. print(json.dumps(summary, indent=2))

439. 

440. elif args.daily:

441. \# 生成每日摘要

442. date = None

443. if args.date:

444. date = datetime.strptime(args.date, "%Y-%m-%d").date()

445. 

446. summary = distiller.generate_daily_summary(date)

447. 

448. if args.output:

449. with open(args.output, 'w') as f:

450. json.dump(summary, f, indent=2)

451. else:

452. print(json.dumps(summary, indent=2))

453. 

454. elif args.weekly:

455. \# 生成每周摘要

456. week_start = None

457. if args.date:

458. week_start = datetime.strptime(args.date, "%Y-%m-%d").date()

459. 

460. summary = distiller.generate_weekly_summary(week_start)

461. 

462. if args.output:

463. with open(args.output, 'w') as f:

464. json.dump(summary, f, indent=2)

465. else:

466. print(json.dumps(summary, indent=2))

467. 

468. else:

469. \# 默认操作：为最新提交生成摘要

470. repo = Repo(args.repo_path)

471. latest_commit = repo.head.commit.hexsha

472. 

473. summary = distiller.summarizer.generate_commit_summary(latest_commit)

474. print(json.dumps(summary, indent=2))

475. 

476. if \_\_name\_\_ == "\_\_main\_\_":

477. main()

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 11/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
