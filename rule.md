# AI 图文生成项目规范

我需要生成一套用于小红书发帖的页面。内容需要通过 React 网页实现，方便我手动截图。
目前的系统已经升级为一个简单的 CMS（内容管理系统），后续开发请严格遵守以下规范。

## 1. 核心设计要求 (Visual Design)

*   **垂直安全区 (Safety Zone)**：
    *   小红书顶部有搜索栏，底部有评论框和标签，右侧有点赞和头像。
    *   **必须**通过 CSS（如 `pt-[25%] pb-[30%] px-[15%]`）将所有文字和图标内容压缩在屏幕垂直正中央的 50%-60% 区域内。
*   **手机容器设计**：
    *   将内容包裹在一个 `aspect-[9/16]` 的容器中，模拟手机全屏效果。
    *   背景颜色要明亮、高饱和（如黄色、绿色、靛蓝色），适合信息流抓眼。
*   **极简视觉传达**：
    *   **字体**：标题字号要极大（如 `text-5xl` 或 `6xl`），加粗。
    *   **对比**：关键短句必须使用“色块衬底”（如黄底黑字，红底白色），方便缩略图阅读。
    *   **图标**：每页配合一个 `lucide-react` 大图标，增加 Vlog 吐槽感。
*   **交互逻辑**：
    *   实现一个 `handleNext` 点击事件，点击屏幕任意位置即自动切换到下一张幻灯片。
    *   顶部必须带有进度指示条。
    *   **禁止使用任何 CSS 动画**（如 `animate-bounce`），因为页面最终会被静态截图。

## 2. 排版内容策略 (Content Strategy)

*   **第一页**：必须是吸引人的“标题党”封面。
*   **中间页**：每页只讲 1 个核心观点，禁止出现大段长文本。
*   **最后一页**：要有明显的“升华金句”和“引导互动”动作。
*   **设计避坑**：
    *   **非对称边距**：底部留白比顶部多 5%，因为底部遮挡更严重。
    *   **强制聚拢**：使用 `max-w-[280px]` 限制文字宽度，避开右侧按钮区。
    *   **视觉风格**：手绘风、新野兽派阴影。
    *   **文字对齐**：对于带背景色的强调文字（Highlight），使用 `inline-block` 配合 `leading-none`。
        *   **关键兼容性处理**：`html2canvas` 导出时和浏览器预览时的垂直对齐有差异。
        *   必须在组件中接收 `isExport` 属性。
        *   如果是 `isExport={true}`，使用 `pt-2 pb-3`；如果是预览模式，使用 `pt-1 pb-2`。
        *   示例：`const highlightPadding = isExport ? 'pt-2 pb-3' : 'pt-1 pb-2';`

## 3. 代码输出规范 (Code Structure)

**非常重要：请遵循新的 CMS 架构进行输出。**

### 3.1 文件路径
最终生成的页面存放到 `src/pages/xxxx` 内，`xxxx` 按照用户的文案内容自己生成英文 Slug 文件夹名。
例如：`src/pages/eth-price-drop-introduce/index.jsx`

### 3.2 代码模板
每个页面文件 (`index.jsx`) 必须包含三部分导出：
1.  **`default` 导出**：React 组件本身（配图页面）。
2.  **`slides` 导出**：幻灯片数据数组（用于自动生成图片）。
3.  **`meta` 导出**：包含页面 ID、标题和小红书文案。

**组件必须接收 `pageIndex` 属性**，用于控制显示哪一张幻灯片（下载功能依赖此属性）。

**标准模板如下：**

```jsx
import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, Trash2, Brain } from 'lucide-react';

// 1. 导出幻灯片数据 (必须 export！)
export const slides = [
  // ... 你的幻灯片数据
];

// 2. 定义 React 组件 (必须接收 pageIndex 和 isExport 参数)
const MyPage = ({ pageIndex, isExport }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  // 3. 确定当前显示的幻灯片 (优先使用 pageIndex，用于导出图片)
  const activeIndex = pageIndex !== undefined ? pageIndex : currentSlide;
  const slide = slides[activeIndex];
  const Icon = slide.icon;

  // 4. 样式兼容处理 (导出时文字垂直对齐修正)
  const highlightPadding = isExport ? 'pt-2 pb-3' : 'pt-1 pb-2';

  // ... 渲染逻辑，务必遵守“核心设计要求”中的安全区和样式
  return (
      // ... 在使用 highlight 样式的地方使用 ${highlightPadding}
  );
};

// 4. 导出元数据 (关键步骤！)
export const meta = {
  id: 'unique-slug-id',      // 与文件夹名保持一致
  title: '这里写列表显示的标题', // 侧边栏显示的中文标题
  copy: `这里写生成好的小红书文案...
  
  包括标题、正文、Emoji 和 标签。
  
  #标签1 #标签2`
};

// 5. 默认导出组件
export default MyPage;
```

## 4. 文案生成策略 (Copywriting)

在生成 `meta.copy` 时，请遵循以下原则：
*   **标题 Hook**：包含情绪词（救命、翻车、血泪史），制造反差。
*   **开篇 Hook**：Vlog 风格开场（“家人们谁懂啊”）。
*   **正文排版**：分段短，多用 Emoji，每段不超过 3 行。
*   **标签**：包含 5 个相关标签。

---
**给 AI 的指令：**
当你接收到新的文案需求时，请直接按照上述结构在 `src/pages/` 下创建新的文件夹和文件。无需修改 `App.jsx`，系统会自动读取新页面。
