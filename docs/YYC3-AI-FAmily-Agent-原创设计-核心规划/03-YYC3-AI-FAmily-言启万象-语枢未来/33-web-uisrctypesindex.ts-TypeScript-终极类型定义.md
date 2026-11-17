---
file: 33-web-uisrctypesindex.ts-TypeScript-终极类型定义.md
title: YYC3-AI-FAmily-Environment-Weaver · 第33部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 33/37 部分：
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
source_range: L25576-L26198
part_no: 33/37
section_title: 6. web-ui/src/types/index.ts (TypeScript 终极类型定义)
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第33部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 6. web-ui/src/types/index.ts (TypeScript 终极类型定义)

1.  // ==============================================================================

2.  // YYC3 (YanYu Cloud Cube) AI Family - 前端终极类型定义

3.  // ==============================================================================

4.  

5.  // --- \[核心通用类型\] ---

6.  export type ID = string;

7.  export type Timestamp = string; // ISO 8601 format

8.  

9.  export interface BaseEntity {

10. id: ID;

11. createdAt: Timestamp;

12. updatedAt: Timestamp;

13. }

14. 

15. export interface PaginationParams {

16. page?: number;

17. size?: number;

18. }

19. 

20. export interface PaginatedResponse\<T\> extends BaseEntity {

21. items: T\[\];

22. total: number;

23. page: number;

24. size: number;

25. }

26. 

27. // --- \[API响应类型\] ---

28. export interface ApiResponse\<T = any\> {

29. data?: T;

30. success: boolean;

31. message: string;

32. error?: string;

33. details?: Record\<string, any\>;

34. }

35. 

36. // --- \[认证授权类型\] ---

37. export interface User extends BaseEntity {

38. username: string;

39. email: string;

40. roles: string\[\];

41. permissions: string\[\];

42. }

43. 

44. export interface LoginRequest {

45. username: string;

46. password: string;

47. }

48. 

49. export interface LoginResponse {

50. accessToken: string;

51. refreshToken: string;

52. tokenType: 'Bearer';

53. expiresIn: number;

54. user: User;

55. }

56. 

57. export interface AuthState {

58. isAuthenticated: boolean;

59. user: User \| null;

60. token: string \| null;

61. }

62. 

63. // --- \[智能体类型\] ---

64. export type AgentStatus = 'active' \| 'inactive' \| 'error' \| 'updating';

65. export type AgentFramework = 'langchain' \| 'autogen' \| 'crewai';

66. export type LLMProvider = 'openai' \| 'anthropic' \| 'google' \| 'huggingface';

67. 

68. export interface LLMConfig {

69. provider: LLMProvider;

70. model: string;

71. temperature?: number;

72. maxTokens?: number;

73. topP?: number;

74. frequencyPenalty?: number;

75. presencePenalty?: number;

76. }

77. 

78. export interface Tool {

79. name: string;

80. description: string;

81. type: 'builtin' \| 'custom';

82. category: string;

83. }

84. 

85. export interface Agent extends BaseEntity {

86. name: string;

87. type: string;

88. role: string;

89. goal: string;

90. backstory?: string;

91. framework: AgentFramework;

92. status: AgentStatus;

93. llm: LLMConfig;

94. tools: string\[\];

95. capabilities: string\[\];

96. tags: string\[\];

97. config?: Record\<string, any\>;

98. }

99. 

100. export interface CreateAgentRequest extends Omit\<Agent, 'id' \| 'createdAt' \| 'updatedAt' \| 'status'\> {}

101. export interface UpdateAgentRequest extends Partial\<Omit\<Agent, 'id' \| 'createdAt' \| 'updatedAt'\>\> {}

102. export interface ExecuteAgentRequest {

103. input: string;

104. parameters?: Record\<string, any\>;

105. }

106. 

107. export interface ExecuteAgentResponse {

108. executionId: string;

109. result: string;

110. intermediateSteps?: Array\<{

111. action: string;

112. observation: string;

113. }\>;

114. durationMs: number;

115. agent: Agent; // The agent that was executed

116. }

117. 

118. // --- \[任务与工作流类型\] ---

119. export type TaskStatus = 'pending' \| 'running' \| 'success' \| 'failed' \| 'cancelled' \| 'retry';

120. export type TaskDependency = { taskId: ID };

121. 

122. export interface Task extends BaseEntity {

123. name: string;

124. agentType: string;

125. agentId?: ID;

126. parameters: Record\<string, any\>;

127. dependencies: ID\[\];

128. status: TaskStatus;

129. startTime?: Timestamp;

130. endTime?: Timestamp;

131. duration?: number; // in seconds

132. result?: any;

133. error?: string;

134. checkpointData?: Record\<string, any\>;

135. }

136. 

137. export type PipelineStatus = TaskStatus;

138. 

139. export interface Pipeline extends BaseEntity {

140. name: string;

141. description: string;

142. tasks: Task\[\];

143. status: PipelineStatus;

144. variables: Record\<string, any\>;

145. triggers: Array\<Record\<string, any\>\>;

146. notifiers: Array\<Record\<string, any\>\>;

147. }

148. 

149. export interface RunPipelineRequest {

150. input?: Record\<string, any\>;

151. parameters?: Record\<string, any\>;

152. }

153. 

154. export interface RunPipelineResponse {

155. executionId: ID;

156. status: PipelineStatus;

157. }

158. 

159. // --- \[知识库类型\] ---

160. export interface KnowledgeSource {

161. id: ID;

162. name: string;

163. type: 'file' \| 'url' \| 'text';

164. metadata?: Record\<string, any\>;

165. }

166. 

167. export interface SearchKnowledgeRequest {

168. query: string;

169. nResults?: number;

170. sourceFilter?: string\[\];

171. where?: Record\<string, any\>;

172. }

173. 

174. export interface KnowledgeResult {

175. id: ID;

176. content: string;

177. metadata: Record\<string, any\>;

178. distance?: number;

179. }

180. 

181. export interface SearchKnowledgeResponse {

182. ids: ID\[\];

183. documents: string\[\];

184. metadatas: Record\<string, any\>\[\];

185. distances: number\[\];

186. }

187. 

188. export interface AddKnowledgeRequest {

189. texts: string\[\];

190. metadatas?: Record\<string, any\>\[\];

191. source?: string;

192. }

193. 

194. // --- \[多模态类型\] ---

195. export type ModalityType = 'text' \| 'speech' \| 'image' \| 'video' \| 'document';

196. 

197. export interface ModalityData\<T = any\> {

198. type: ModalityType;

199. content: T; // Raw content (string for text, File for image/speech, etc.)

200. metadata?: Record\<string, any\>;

201. embedding?: number\[\]; // Vector representation

202. transcription?: string; // For speech/video

203. description?: string; // For image/video

204. confidence?: number;

205. }

206. 

207. export interface ProcessMultimodalRequest {

208. inputs: ModalityData\[\];

209. }

210. 

211. // --- \[系统管理类型\] ---

212. export type ServiceStatus = 'healthy' \| 'unhealthy' \| 'degraded';

213. 

214. export interface ServiceHealth {

215. name: string;

216. status: ServiceStatus;

217. lastCheck: Timestamp;

218. uptime?: number;

219. version?: string;

220. }

221. 

222. export interface SystemHealthResponse {

223. status: ServiceStatus;

224. services: Record\<string, ServiceHealth\>;

225. uptimeSeconds: number;

226. }

227. 

228. export type LogLevel = 'DEBUG' \| 'INFO' \| 'WARNING' \| 'ERROR' \| 'CRITICAL';

229. 

230. export interface SystemConfig {

231. \[key: string\]: any; // Dynamic key-value pairs

232. }

233. 

234. // --- \[UI 状态类型\] ---

235. export interface AppState {

236. auth: AuthState;

237. agents: {

238. list: Agent\[\];

239. loading: boolean;

240. error: string \| null;

241. };

242. workflows: {

243. list: Pipeline\[\];

244. activeExecutions: Record\<string, any\>;

245. loading: boolean;

246. error: string \| null;

247. };

248. knowledge: {

249. searchResults: KnowledgeResult\[\];

250. loading: boolean;

251. error: string \| null;

252. };

253. system: {

254. health: SystemHealthResponse \| null;

255. config: SystemConfig \| null;

256. loading: boolean;

257. error: string \| null;

258. };

259. ui: {

260. theme: 'light' \| 'dark';

261. sidebarCollapsed: boolean;

262. };

263. }

264. 

265. // --- \[表单/组件Props类型\] ---

266. export interface AgentFormProps {

267. agent?: Agent; // For editing, undefined for creating

268. onSubmit: (agent: CreateAgentRequest \| UpdateAgentRequest) =\> void;

269. loading?: boolean;

270. }

271. 

272. export interface WorkflowEditorProps {

273. pipeline?: Pipeline;

274. onSave: (pipeline: Pipeline) =\> void;

275. }

276. 

277. export interface KnowledgeSearchProps {

278. onSearch: (query: string) =\> void;

279. }

280. 

281. // --- \[图表/可视化类型\] ---

282. export interface ChartDataPoint {

283. name: string;

284. value: number;

285. // ... other properties

286. }

287. 

288. export interface TimeSeriesDataPoint {

289. timestamp: Timestamp;

290. value: number;

291. }

292. 

293. // --- \[配置类型\] ---

294. export interface ApiConfig {

295. baseURL: string;

296. timeout: number;

297. }

298. 

299. export interface ThemeConfig {

300. primaryColor: string;

301. mode: 'light' \| 'dark';

302. }

303. 

304. // Utility type for making all properties of an object optional recursively

305. export type DeepPartial\<T\> = {

306. \[P in keyof T\]?: T\[P\] extends (infer U)\[\]

307. ? DeepPartial\<U\>\[\]

308. : T\[P\] extends object

309. ? DeepPartial\<T\[P\]\>

310. : T\[P\];

311. };

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 33/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
