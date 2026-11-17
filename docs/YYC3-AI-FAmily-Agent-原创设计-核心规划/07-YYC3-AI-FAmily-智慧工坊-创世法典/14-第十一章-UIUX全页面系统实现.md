---
file: 14-第十一章-UIUX全页面系统实现.md
title: YYC3-AI-FAmily-智慧工坊的创世法典 · 第14部分
description: YYC3-AI-FAmily-智慧工坊的创世法典 结构化拆分第 14/77 部分：第十一章：UI/U
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
source_doc: YYC3-AI-FAmily-智慧工坊的创世法典.md
source_range: L4193-L4469
part_no: 14/77
section_title: 第十一章：UI/UX全页面系统实现
---

<!--
  ============================================================
  YYC3-AI-FAmily-Agent- 原创设计结构化拆分
  人从众曌众从人 · 亦师亦友亦伯乐
  ============================================================
-->

# YYC3-AI-FAmily-智慧工坊的创世法典 · 第14部分

> **_YYC3-AI-FAmily-Agent-_**
> _亦师亦友亦伯乐，一言一语一协同_
> _拟人为本 · AI为核 · 纯粹为心_
> _万象归元于云枢 | 深栈智启新纪元_

---

## 第十一章：UI/UX全页面系统实现

### 11.1 全局设计系统实现

#### 色彩系统深度定义

1.  // 设计令牌 (Design Tokens)

2.  :root {

3.  // 主色彩体系

4.  --sm-color-primary: \#1890ff;

5.  --sm-color-success: \#52c41a;

6.  --sm-color-warning: \#faad14;

7.  --sm-color-danger: \#f5222d;

8.  --sm-color-info: \#722ed1;

9.  --sm-color-navigation: \#13c2c2;

10. 

11. // 功能阴影映射

12. --sm-shadow-primary: 4px 0 0 0 rgba(24, 144, 255, 0.1);

13. --sm-shadow-success: 4px 0 0 0 rgba(82, 196, 26, 0.1);

14. --sm-shadow-warning: 4px 0 0 0 rgba(250, 173, 20, 0.1);

15. --sm-shadow-danger: 4px 0 0 0 rgba(245, 34, 45, 0.1);

16. --sm-shadow-info: 4px 0 0 0 rgba(114, 46, 209, 0.1);

17. 

18. // 交互状态

19. --sm-state-hover: rgba(0, 0, 0, 0.04);

20. --sm-state-active: rgba(0, 0, 0, 0.08);

21. --sm-state-disabled: rgba(0, 0, 0, 0.12);

22. }

#### 智能导航栏组件

1.  \<template\>

2.  \<div class="smart-navigation"\>

3.  \<!-- Logo区域 --\>

4.  \<div class="nav-logo"\>

5.  \<img src="@/assets/logo.svg" alt="Smart Menu"\>

6.  \<span class="system-name"\>智能餐饮系统\</span\>

7.  \</div\>

8.  

9.  \<!-- 主导航 --\>

10. \<div class="nav-menu"\>

11. \<div

12. v-for="item in menuItems"

13. :key="item.id"

14. class="nav-item"

15. :class="{ active: activeMenu === item.id }"

16. @click="handleMenuClick(item)"

17. \>

18. \<i :class="item.icon"\>\</i\>

19. \<span class="nav-text"\>{{ item.name }}\</span\>

20. \<div class="nav-indicator" :style="getIndicatorStyle(item.type)"\>\</div\>

21. \</div\>

22. \</div\>

23. 

24. \<!-- 用户区域 --\>

25. \<div class="nav-user"\>

26. \<el-dropdown @command="handleUserCommand"\>

27. \<div class="user-info"\>

28. \<el-avatar :size="32" :src="user.avatar" /\>

29. \<span class="user-name"\>{{ user.name }}\</span\>

30. \</div\>

31. \<template \#dropdown\>

32. \<el-dropdown-menu\>

33. \<el-dropdown-item command="profile"\>个人中心\</el-dropdown-item\>

34. \<el-dropdown-item command="settings"\>系统设置\</el-dropdown-item\>

35. \<el-dropdown-item divided command="logout"\>退出登录\</el-dropdown-item\>

36. \</el-dropdown-menu\>

37. \</template\>

38. \</el-dropdown\>

39. \</div\>

40. \</div\>

41. \</template\>

42. 

43. \<script setup lang="ts"\>

44. import { ref, computed } from 'vue'

45. 

46. const activeMenu = ref('dashboard')

47. 

48. const menuItems = \[

49. { id: 'dashboard', name: '智能看板', icon: 'el-icon-data-analysis', type: 'primary' },

50. { id: 'menu', name: '智能菜单', icon: 'el-icon-notebook-2', type: 'success' },

51. { id: 'form', name: '智能表单', icon: 'el-icon-document', type: 'warning' },

52. { id: 'operation', name: '运营管理', icon: 'el-icon-operation', type: 'info' },

53. { id: 'analysis', name: '智能分析', icon: 'el-icon-trend-charts', type: 'navigation' }

54. \]

55. 

56. const getIndicatorStyle = (type: string) =\> {

57. const colorMap = {

58. primary: 'var(--sm-color-primary)',

59. success: 'var(--sm-color-success)',

60. warning: 'var(--sm-color-warning)',

61. info: 'var(--sm-color-info)',

62. navigation: 'var(--sm-color-navigation)'

63. }

64. return {

65. 'background-color': colorMap\[type as keyof typeof colorMap\],

66. 'box-shadow': \`var(--sm-shadow-\${type})\`

67. }

68. }

69. \</script\>

70. 

71. \<style scoped\>

72. .smart-navigation {

73. display: flex;

74. align-items: center;

75. height: 60px;

76. background: \#fff;

77. box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

78. padding: 0 24px;

79. }

80. 

81. .nav-menu {

82. display: flex;

83. margin: 0 auto;

84. }

85. 

86. .nav-item {

87. position: relative;

88. display: flex;

89. align-items: center;

90. padding: 0 20px;

91. height: 60px;

92. cursor: pointer;

93. transition: all 0.3s ease;

94. 

95. &:hover {

96. background: var(--sm-state-hover);

97. }

98. 

99. &.active {

100. background: var(--sm-state-active);

101. }

102. }

103. 

104. .nav-indicator {

105. position: absolute;

106. right: 0;

107. top: 50%;

108. transform: translateY(-50%);

109. width: 4px;

110. height: 24px;

111. border-radius: 2px;

112. }

113. \</style\>

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-08 | 由《YYC3-AI-FAmily-智慧工坊的创世法典.md》结构化拆分生成（第 14/77 部分） | YYC3 Team |

---

<p align="center">
  🌹 <b>YYC3-AI-FAmily-Agent-</b>（YanYuCloudCube™ · 永久开源）<br>
  人从众曌众从人 · 亦师亦友亦伯乐<br>
  <i>拟人为本 · AI为核 · 纯粹为心</i><br>
  言启象限 | 语枢未来 · 万象归元于云枢 | 深栈智启新纪元<br>
  <sub>© 2026 YanYuCloudCube™（YYC3）· <a href="mailto:admin@0379.email">admin@0379.email</a> · <a href="https://matrix.yyc3.top">matrix.yyc3.top</a></sub>
</p>
