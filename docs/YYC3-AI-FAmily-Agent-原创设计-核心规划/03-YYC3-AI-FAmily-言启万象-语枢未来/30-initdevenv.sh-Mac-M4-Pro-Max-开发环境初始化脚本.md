---
file: 30-initdevenv.sh-Mac-M4-Pro-Max-开发环境初始化脚本.md
title: YYC3-AI-FAmily-Environment-Weaver · 第30部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 30/37 部分：
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
source_range: L22670-L23304
part_no: 30/37
section_title: 3. init_dev_env.sh (Mac M4 Pro Max 开发环境初始化脚本)
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第30部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 3. init_dev_env.sh (Mac M4 Pro Max 开发环境初始化脚本)

1.  \#!/bin/bash

2.  \# ==============================================================================

3.  \# YYC3 (YanYu Cloud Cube) AI Family - 开发环境一键初始化脚本

4.  \#

5.  \# 适用于主开发机: Mac M4 Pro Max 128G

6.  \# 作者: YYC-Cube

7.  \# 版本: 1.0.0

8.  \#

9.  \# 此脚本将完成以下任务:

10. \# 1. 检查并安装核心依赖

11. \# 2. 配置用户信息

12. \# 3. 初始化前后端环境

13. \# 4. 设置Docker/Kubernetes环境

14. \# 5. 配置GitHub CLI与一人多端CI/CD

15. \# ==============================================================================

16. 

17. set -e \# 遇到错误立即退出

18. 

19. \# --- 颜色和格式定义 ---

20. COLOR_RED='\033\[0;31m'

21. COLOR_GREEN='\033\[0;32m'

22. COLOR_YELLOW='\033\[1;33m'

23. COLOR_BLUE='\033\[0;34m'

24. COLOR_PURPLE='\033\[0;35m'

25. COLOR_CYAN='\033\[0;36m'

26. NC='\033\[0m' \# No Color

27. 

28. BOLD=\$(tput bold)

29. NORMAL=\$(tput sgr0)

30. 

31. \# --- 日志函数 ---

32. log_info() {

33. echo -e "\${COLOR_BLUE}\[INFO\]\${NC} \$1"

34. }

35. log_success() {

36. echo -e "\${COLOR_GREEN}\[SUCCESS\]\${NC} \$1"

37. }

38. log_warning() {

39. echo -e "\${COLOR_YELLOW}\[WARNING\]\${NC} \$1"

40. }

41. log_error() {

42. echo -e "\${COLOR_RED}\[ERROR\]\${NC} \$1"

43. }

44. log_step() {

45. echo -e "\n\${COLOR_PURPLE}\${BOLD}--- \[STEP\] \$1 ---\${NORMAL}\${NC}"

46. }

47. 

48. \# --- 全局变量 ---

49. PROJECT_NAME="YYC3 AI Family"

50. GITHUB_USER="YYC-Cube"

51. DOCKER_USER="yanyuit"

52. 

53. \# ==============================================================================

54. \# \[STEP 1\] 系统环境检查

55. \# ==============================================================================

56. log_step "检查系统环境"

57. 

58. ARCH=\$(uname -m)

59. OS=\$(uname -s)

60. 

61. log_info "操作系统: \$OS"

62. log_info "架构: \$ARCH"

63. 

64. if \[\[ "\$OS" != "Darwin" \]\]; then

65. log_error "此脚本专为 macOS 设计。"

66. exit 1

67. fi

68. 

69. if \[\[ "\$ARCH" != "arm64" \]\]; then

70. log_warning "此脚本为 Apple Silicon (arm64) 优化，你的架构是 \$ARCH，某些部分可能无法按预期工作。"

71. fi

72. 

73. log_success "系统环境检查通过"

74. 

75. \# ==============================================================================

76. \# \[STEP 2\] 安装核心依赖

77. \# ==============================================================================

78. log_step "安装核心依赖 (Homebrew, Git, Python, Node, Docker, Colima)"

79. 

80. \# 2.1 安装或更新 Homebrew

81. if ! command -v brew &\> /dev/null; then

82. log_info "Homebrew 未安装，开始安装..."

83. /bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

84. eval "\$(/opt/homebrew/bin/brew shellenv)"

85. else

86. log_info "Homebrew 已安装，开始更新..."

87. brew update

88. fi

89. log_success "Homebrew 已就绪"

90. 

91. \# 2.2 安装核心工具

92. TOOLS_TO_INSTALL=("git" "python@3.11" "node@18" "docker" "docker-compose" "colima" "gh")

93. for tool in "\${TOOLS_TO_INSTALL\[@\]}"; do

94. if brew list "\$tool" &\> /dev/null; then

95. log_info "\$tool 已安装，跳过。"

96. else

97. log_info "正在安装 \$tool..."

98. brew install "\$tool"

99. fi

100. done

101. log_success "核心工具安装完成"

102. 

103. \# 2.3 验证安装

104. command -v git &\> /dev/null \|\| { log_error "Git 安装失败"; exit 1; }

105. command -v python3 &\> /dev/null \|\| { log_error "Python 安装失败"; exit 1; }

106. command -v node &\> /dev/null \|\| { log_error "Node.js 安装失败"; exit 1; }

107. command -v docker &\> /dev/null \|\| { log_error "Docker 安装失败"; exit 1; }

108. command -v colima &\> /dev/null \|\| { log_error "Colima 安装失败"; exit 1; }

109. command -v gh &\> /dev/null \|\| { log_error "GitHub CLI 安装失败"; exit 1; }

110. 

111. log_success "核心工具验证通过"

112. 

113. \# ==============================================================================

114. \# \[STEP 3\] 配置用户与Git

115. \# ==============================================================================

116. log_step "配置用户信息与Git"

117. 

118. \# 3.1 Git 配置

119. if \[\[ -z \$(git config --global user.name) \]\]; then

120. read -p "请输入你的Git用户名: " git_username

121. git config --global user.name "\$git_username"

122. fi

123. 

124. if \[\[ -z \$(git config --global user.email) \]\]; then

125. read -p "请输入你的Git邮箱: " git_email

126. git config --global user.email "\$git_email"

127. fi

128. 

129. log_info "Git用户: \$(git config --global user.name)"

130. log_info "Git邮箱: \$(git config --global user.email)"

131. 

132. \# 3.2 GitHub CLI 登录

133. log_info "尝试使用 GitHub CLI 进行认证..."

134. if gh auth status &\> /dev/null; then

135. log_success "已登录GitHub"

136. else

137. log_warning "未登录GitHub，请运行 'gh auth login' 进行认证"

138. fi

139. 

140. log_success "用户配置完成"

141. 

142. \# ==============================================================================

143. \# \[STEP 4\] 初始化后端Python环境

144. \# ==============================================================================

145. log_step "初始化后端 Python 环境"

146. 

147. \# 4.1 创建项目根目录的虚拟环境 (如果不存在)

148. if \[\[ ! -d "venv" \]\]; then

149. log_info "创建根目录虚拟环境..."

150. python3 -m venv venv

151. fi

152. 

153. log_info "激活虚拟环境..."

154. source venv/bin/activate

155. 

156. \# 4.2 升级pip

157. pip install --upgrade pip

158. 

159. \# 4.3 安装项目依赖

160. if \[\[ -f "requirements.txt" \]\]; then

161. log_info "安装项目根目录依赖..."

162. pip install -r requirements.txt

163. else

164. log_warning "项目根目录未找到 requirements.txt，将单独安装核心库。"

165. pip install fastapi uvicorn "sqlalchemy\[postgresql\]" psycopg2-binary redis celery "python-multipart\[bcrypt\]" "python-jose\[cryptography\]" passlib langchain openai chromadb qdrant-client prometheus-client

166. fi

167. 

168. log_success "后端Python环境初始化完成"

169. 

170. \# ==============================================================================

171. \# \[STEP 5\] 初始化前端Node.js环境

172. \# ==============================================================================

173. log_step "初始化前端 Node.js 环境"

174. 

175. \# 5.1 检查并进入web-ui目录

176. if \[\[ ! -d "web-ui" \]\]; then

177. log_warning "web-ui 目录不存在，跳过前端初始化。"

178. else

179. cd web-ui

180. 

181. \# 5.2 安装依赖

182. if \[\[ ! -d "node_modules" \]\]; then

183. log_info "安装前端依赖..."

184. npm install

185. else

186. log_info "前端依赖已存在，检查更新..."

187. npm update

188. fi

189. 

190. cd - \# 返回项目根目录

191. log_success "前端Node.js环境初始化完成"

192. fi

193. 

194. 

195. \# ==============================================================================

196. \# \[STEP 6\] 配置Docker与Kubernetes环境

197. \# ==============================================================================

198. log_step "配置 Docker 与 Kubernetes (Colima) 环境"

199. 

200. \# 6.1 启动Colima (Kubernetes on Apple Silicon)

201. colima status &\> /dev/null

202. if \[\[ \$? -ne 0 \]\]; then

203. log_info "Colima 未运行，正在启动..."

204. colima start --cpu 8 --memory 12 --kubernetes

205. else

206. log_info "Colima 已运行"

207. fi

208. 

209. \# 6.2 验证Kubernetes集群

210. kubectl cluster-info &\> /dev/null

211. if \[\[ \$? -ne 0 \]\]; then

212. log_error "Kubernetes 集群不可用"

213. exit 1

214. fi

215. 

216. log_success "Docker 与 Kubernetes 环境配置完成"

217. 

218. \# ==============================================================================

219. \# \[STEP 7\] 配置一人多端CI/CD (GitHub Actions)

220. \# ==============================================================================

221. log_step "配置一人多端 CI/CD (GitHub Actions)"

222. 

223. \# 7.1 检查是否为Git仓库

224. if \[\[ ! -d ".git" \]\]; then

225. log_info "当前不是Git仓库，进行初始化..."

226. git init

227. git add .

228. git commit -m "chore: Initial commit with YYC3 AI Family"

229. 

230. \# 7.2 在GitHub创建仓库并推送

231. log_info "在GitHub上创建远程仓库 '\$(basename "\$PWD")'..."

232. gh repo create "\$(basename "\$PWD")" --public --source=. --remote=origin --push

233. else

234. log_info "Git仓库已存在"

235. \# 7.3 检查远程仓库

236. if git remote get-url origin &\> /dev/null; then

237. log_info "远程仓库已设置"

238. else

239. log_warning "未设置远程仓库，请手动添加"

240. fi

241. fi

242. 

243. log_success "CI/CD 初始配置完成"

244. 

245. \# ==============================================================================

246. \# \[STEP 8\] 生成环境变量文件

247. \# ==============================================================================

248. log_step "生成环境变量文件 (.env)"

249. 

250. if \[\[ ! -f ".env" \]\]; then

251. if \[\[ -f ".env.example" \]\]; then

252. cp .env.example .env

253. log_success "已从 .env.example 创建 .env 文件"

254. log_warning "请编辑 .env 文件，填入你的API密钥！"

255. else

256. log_error ".env.example 文件不存在，无法创建 .env 文件。"

257. \# 创建一个基础的.env文件

258. cat \<\<EOF \> .env

259. \# YYC3 AI Family Environment Variables

260. \# ==============================================================================

261. \# --- API Keys (请填入你的密钥) ---

262. OPENAI_API_KEY=sk-your-openai-api-key-here

263. ANTHROPIC_API_KEY=your-anthropic-api-key-here

264. 

265. \# --- Database Credentials ---

266. POSTGRES_PASSWORD=yyc3postgrespassword

267. RABBITMQ_PASSWORD=yyc3rabbitmqpassword

268. REDIS_PASSWORD=yyc3redispassword

269. 

270. \# --- Security ---

271. JWT_SECRET=your-super-secret-jwt-key-here

272. \# ==============================================================================

273. EOF

274. log_success "已创建基础 .env 文件，请务必填入API密钥！"

275. fi

276. else

277. log_info ".env 文件已存在"

278. fi

279. 

280. 

281. \# ==============================================================================

282. \# \[STEP 9\] 启动开发环境

283. \# ==============================================================================

284. log_step "启动所有开发服务 (Docker Compose)"

285. 

286. if \[\[ -f "docker-compose.yml" \]\]; then

287. log_info "使用 Docker Compose 启动所有服务..."

288. docker-compose up -d

289. 

290. log_info "等待服务启动..."

291. sleep 15 \# 等待服务启动

292. 

293. \# 检查服务状态

294. log_info "检查服务状态..."

295. docker-compose ps

296. else

297. log_warning "未找到 docker-compose.yml，无法启动服务。"

298. fi

299. 

300. \# ==============================================================================

301. \# --- 完成 ---

302. \# ==============================================================================

303. log_step "🎉 YYC3 AI Family 开发环境初始化完成！"

304. 

305. echo -e "\n\${COLOR_CYAN}\${BOLD}========================================\${NORMAL}\${NC}"

306. echo -e "\${COLOR_CYAN}\${BOLD} YYC3 AI Family 开发环境已就绪! \${NORMAL}\${NC}"

307. echo -e "\${COLOR_CYAN}\${BOLD}========================================\${NORMAL}\${NC}"

308. echo -e "\n\${COLOR_GREEN}🌹 智亦师亦友亦伯乐，谱一言一语一华章! \${NC}\n"

309. 

310. echo -e "\${COLOR_YELLOW}下一步:\${NC}"

311. echo -e " 1. 请编辑 \${COLOR_BLUE}.env\${NC} 文件，填入你的 \${COLOR_BLUE}OPENAI_API_KEY\${NC} 等密钥。"

312. echo -e " 2. 前端访问: \${COLOR_CYAN}http://localhost:3001\${NC}"

313. echo -e " 3. API文档: \${COLOR_CYAN}http://localhost:8080/docs\${NC}"

314. echo -e " 4. Grafana: \${COLOR_CYAN}http://localhost:3000\${NC} (admin/admin)"

315. echo -e " 5. 运行测试: \${COLOR_CYAN}make test\${NC}"

316. 

317. echo -e "\n\${COLOR_PURPLE}祝您开发愉快！\${NC}\n"

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 30/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
