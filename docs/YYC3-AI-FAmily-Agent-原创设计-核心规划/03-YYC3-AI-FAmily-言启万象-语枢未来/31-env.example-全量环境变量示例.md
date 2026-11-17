---
file: 31-env.example-全量环境变量示例.md
title: YYC3-AI-FAmily-Environment-Weaver · 第31部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 31/37 部分：
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
source_range: L23306-L23576
part_no: 31/37
section_title: 4. .env.example (全量环境变量示例)
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第31部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 4. .env.example (全量环境变量示例)

1.  \# ==============================================================================

2.  \# YYC3 (YanYu Cloud Cube) AI Family - 环境变量配置示例

3.  \# ==============================================================================

4.  \# 使用方法:

5.  \# 1. 复制此文件为 .env

6.  \# 2. 填入你的真实配置信息

7.  \# 3. 将 .env 文件添加到 .gitignore 中，切勿提交到代码仓库！

8.  \# ==============================================================================

9.  

10. \# --- \[ 项目配置 \] ---

11. PROJECT_NAME="YYC3 AI Family"

12. VERSION="1.0.0"

13. ENVIRONMENT="development" \# development, staging, production

14. 

15. \# --- \[ API 密钥 \] ---

16. \# OpenAI API Key (用于GPT-4, GPT-3.5, Embeddings等)

17. OPENAI_API_KEY=sk-your-openai-api-key-here

18. 

19. \# Anthropic API Key (用于Claude系列模型)

20. ANTHROPIC_API_KEY=your-anthropic-api-key-here

21. 

22. \# Google AI API Key (用于Gemini等)

23. GOOGLE_AI_API_KEY=your-google-ai-api-key-here

24. 

25. \# Hugging Face Access Token (用于开源模型)

26. HUGGINGFACE_ACCESS_TOKEN=hf-your-huggingface-token-here

27. 

28. \# --- \[ 数据库配置 \] ---

29. \# PostgreSQL (元数据、用户、配置)

30. POSTGRES_HOST=localhost

31. POSTGRES_PORT=5432

32. POSTGRES_DB=yyc3

33. POSTGRES_USER=yyc3

34. POSTGRES_PASSWORD=yyc3postgrespassword

35. 

36. \# Redis (缓存、会话、Celery消息队列)

37. REDIS_HOST=localhost

38. REDIS_PORT=6379

39. REDIS_DB=0

40. REDIS_PASSWORD=yyc3redispassword

41. 

42. \# ChromaDB (向量数据库)

43. CHROMA_HOST=localhost

44. CHROMA_PORT=8000

45. CHROMA_PERSIST_DIRECTORY=./data/chroma

46. 

47. \# Qdrant (备选向量数据库)

48. QDRANT_HOST=localhost

49. QDRANT_PORT=6333

50. QDRANT_API_KEY=

51. 

52. \# RabbitMQ (Celery消息队列)

53. RABBITMQ_HOST=localhost

54. RABBITMQ_PORT=5672

55. RABBITMQ_DEFAULT_USER=yyc3

56. RABBITMQ_DEFAULT_PASS=yyc3rabbitmqpassword

57. RABBITMQ_DEFAULT_VHOST=/

58. 

59. \# MinIO (对象存储, S3兼容)

60. MINIO_ENDPOINT=localhost:9000

61. MINIO_ACCESS_KEY=yyc3

62. MINIO_SECRET_KEY=yyc3miniopassword

63. MINIO_SECURE=false

64. MINIO_BUCKET_NAME=yyc3-data

65. 

66. \# --- \[ 安全与认证 \] ---

67. \# JWT (JSON Web Token) 密钥，请使用强随机字符串

68. JWT_SECRET=your-super-secret-jwt-key-please-change-this-in-production

69. JWT_ALGORITHM=HS256

70. JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60

71. JWT_REFRESH_TOKEN_EXPIRE_DAYS=30

72. 

73. \# API 认证

74. API_KEY_HEADER_NAME="X-API-Key"

75. \# BCRYPT 加密轮次

76. BCRYPT_ROUNDS=12

77. 

78. \# --- \[ 服务端口 \] ---

79. API_GATEWAY_PORT=8080

80. AGENT_INCUBATOR_PORT=8081

81. ORCHESTRATION_PORT=8082

82. KNOWLEDGE_FLOW_PORT=8083

83. SELF_HEALING_PORT=8084

84. SECURITY_PORT=8085

85. SCRIPT_MANAGER_PORT=8086

86. MULTIMODAL_PORT=8087

87. WEB_UI_PORT=3001

88. 

89. \# --- \[ 日志配置 \] ---

90. LOG_LEVEL=INFO \# DEBUG, INFO, WARNING, ERROR, CRITICAL

91. LOG_FORMAT=json \# json, console

92. LOG_FILE=./logs/yyc3.log

93. 

94. \# --- \[ AI/LLM 配置 \] ---

95. \# 默认LLM模型

96. DEFAULT_LLM_MODEL=gpt-4

97. DEFAULT_LLM_TEMPERATURE=0.7

98. DEFAULT_LLM_MAX_TOKENS=4096

99. 

100. \# 嵌入模型

101. EMBEDDING_MODEL=text-embedding-ada-002

102. EMBEDDING_DIMENSION=1536

103. 

104. \# --- \[ 多模态配置 \] ---

105. \# 语音处理

106. WHISPER_MODEL=base

107. \# 图像处理

108. VISION_MODEL=gpt-4-vision-preview

109. 

110. \# --- \[ 监控与追踪 \] ---

111. \# Prometheus

112. PROMETHEUS_PORT=9090

113. PROMETHEUS_METRICS_PATH=/metrics

114. 

115. \# Jaeger (分布式追踪)

116. JAEGER_ENDPOINT=http://localhost:14268/api/traces

117. 

118. \# --- \[ 外部服务 \] ---

119. \# GitHub (用于脚本管理、CI/CD)

120. GITHUB_USER=YYC-Cube

121. GITHUB_TOKEN=ghp_your_github_personal_access_token_here

122. 

123. \# Docker Hub

124. DOCKER_USER=yanyuit

125. DOCKER_PASSWORD=your_docker_hub_password

126. 

127. \# --- \[ 功能开关 \] ---

128. \# 是否启用自动恢复

129. AUTO_RECOVERY_ENABLED=true

130. \# 是否启用知识蒸馏

131. KNOWLEDGE_DISTILLATION_ENABLED=true

132. \# 是否启用多模态处理

133. MULTIMODAL_PROCESSOR_ENABLED=true

134. \# 是否启用安全审计

135. SECURITY_AUDIT_ENABLED=true

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 31/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
