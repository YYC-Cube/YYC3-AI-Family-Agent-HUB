---
file: 29-yyc3-tree.py-一键文件树脚本.md
title: YYC3-AI-FAmily-Environment-Weaver · 第29部分
description: YYC3-AI-FAmily-Environment-Weaver 结构化拆分第 29/37 部分：
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
source_range: L22398-L22668
part_no: 29/37
section_title: 2. yyc3-tree.py (一键文件树脚本)
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-Environment-Weaver · 第29部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 2. yyc3-tree.py (一键文件树脚本)

1.  \#!/usr/bin/env python3

2.  \# -\*- coding: utf-8 -\*-

3.  """

4.  YYC3 AI Family - 项目文件树生成器

5.  用于生成项目目录结构的可视化树状图。

6.  

7.  用法:

8.  python yyc3-tree.py \[--output \<file\>\] \[--exclude \<dir1,dir2,...\>\]

9.  """

10. import os

11. import argparse

12. from typing import List, Set

13. 

14. \# YYC3 AI Family 项目的特殊目录释义

15. DIR_DESCRIPTIONS = {

16. "docs": "📚 文档中心 - 系统架构、API、部署指南与最佳实践",

17. "scripts": "🔧 脚本与工具 - 环境初始化、构建、部署与测试",

18. "services": "🔬 微服务实现 - 八大核心系统的后端服务",

19. "web-ui": "🖥 前端用户界面 - TypeScript/React构建的现代化UI",

20. "agents": "🤖 智能体定义 - 通用、领域特定及自定义智能体",

21. "tools": "🔧 工具函数库 - 文件、数据处理与外部API集成",

22. "workflows": "⚙ 预定义工作流 - 代码审查、数据处理等自动化流程",

23. "tests": "🧪 测试代码 - 单元、集成与端到端测试",

24. "monitoring": "📈 监控配置 - Prometheus、Grafana与告警规则"

25. }

26. 

27. \# 默认忽略的目录和文件

28. DEFAULT_EXCLUDES = {

29. ".git", ".idea", ".vscode", "node_modules", "\_\_pycache\_\_", ".DS_Store",

30. "venv", ".venv", "dist", "build"

31. }

32. 

33. class YYC3TreeGenerator:

34. def \_\_init\_\_(self, root_dir: str = ".", exclude_dirs: Set\[str\] = None):

35. self.root_dir = os.path.abspath(root_dir)

36. self.exclude_dirs = exclude_dirs or DEFAULT_EXCLUDES

37. self.tree_output = \[\]

38. 

39. def \_is_excluded(self, path: str) -\> bool:

40. """检查路径是否应被排除"""

41. basename = os.path.basename(path)

42. return basename in self.exclude_dirs

43. 

44. def \_get_file_icon(self, filename: str) -\> str:

45. """根据文件类型返回图标"""

46. if filename == "README.md":

47. return "📖"

48. if filename == "LICENSE":

49. return "📜"

50. if filename == ".gitignore":

51. return "🚫"

52. if filename == ".env.example":

53. return "🔑"

54. if filename == "docker-compose.yml":

55. return "🐳"

56. if filename == "Makefile":

57. return "⚙"

58. if filename.endswith(".py"):

59. return "🐍"

60. if filename.endswith(".js") or filename.endswith(".ts") or filename.endswith(".tsx"):

61. return "📜"

62. if filename.endswith(".json") or filename.endswith(".yaml") or filename.endswith(".yml"):

63. return "📄"

64. if filename == "Dockerfile":

65. return "🐳"

66. return "📄"

67. 

68. def \_build_tree_recursive(self, current_dir: str, prefix: str = "", is_last: bool = True):

69. """递归构建目录树"""

70. \# 获取当前目录下所有文件和目录，并排序

71. items = sorted(os.listdir(current_dir), key=lambda x: (os.path.isdir(os.path.join(current_dir, x)), x.lower()))

72. 

73. for i, item in enumerate(items):

74. item_path = os.path.join(current_dir, item)

75. 

76. if self.\_is_excluded(item_path):

77. continue

78. 

79. \# 判断是否为当前层级的最后一项

80. is_current_last = (i == len(items) - 1)

81. 

82. \# 构建当前项的前缀

83. new_prefix = prefix + ("└── " if is_current_last else "├── ")

84. 

85. if os.path.isdir(item_path):

86. \# 目录

87. dir_desc = DIR_DESCRIPTIONS.get(item, "")

88. self.tree_output.append(f"{new_prefix}📂 {item}/ {dir_desc}")

89. 

90. \# 递归进入子目录

91. extension = " " if is_current_last else "│ "

92. self.\_build_tree_recursive(item_path, prefix + extension, is_current_last)

93. else:

94. \# 文件

95. icon = self.\_get_file_icon(item)

96. self.tree_output.append(f"{new_prefix}{icon} {item}")

97. 

98. def generate_tree(self):

99. """生成完整的文件树"""

100. project_name = os.path.basename(self.root_dir)

101. self.tree_output.append(f"🌹 {project_name} /")

102. self.tree_output.append("")

103. self.\_build_tree_recursive(self.root_dir)

104. return "\n".join(self.tree_output)

105. 

106. def main():

107. parser = argparse.ArgumentParser(description="生成YYC3 AI Family项目文件树。")

108. parser.add_argument(

109. "--output", "-o",

110. help="输出到文件。如果不指定，则打印到标准输出。"

111. )

112. parser.add_argument(

113. "--exclude",

114. help="指定要排除的目录/文件名，用逗号分隔。",

115. default=",".join(DEFAULT_EXCLUDES)

116. )

117. 

118. args = parser.parse_args()

119. 

120. \# 解析排除列表

121. exclude_set = set(filter(None, args.exclude.split(',')))

122. 

123. \# 生成文件树

124. generator = YYC3TreeGenerator(root_dir=".", exclude_dirs=exclude_set)

125. tree_str = generator.generate_tree()

126. 

127. if args.output:

128. with open(args.output, 'w', encoding='utf-8') as f:

129. f.write(tree_str)

130. print(f"文件树已生成到: {args.output}")

131. else:

132. print(tree_str)

133. 

134. if \_\_name\_\_ == "\_\_main\_\_":

135. main()

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-Environment-Weaver.md》结构化拆分生成（第 29/37 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
