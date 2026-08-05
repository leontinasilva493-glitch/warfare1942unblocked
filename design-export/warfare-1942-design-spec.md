# Warfare 1942 小游戏站 — 前端复刻设计规范

> 交付对象：Codex（或任何前端实现方）
> 目标：严格还原视觉稿的单页小游戏站，内嵌 CrazyGames《Warfare 1942》
> 视觉参考图：同目录 `design-export/` 下的 7 张分区 PNG（01～07）
> 设计基准宽度：1440px（桌面优先，内容区固定 1200px 居中）

---

## 0. 游戏嵌入（核心功能区）

- 游戏：Warfare 1942（二战题材 3D 第三人称射击，PvP 多人，Unity WebGL）
- 嵌入方式：CrazyGames 官方 iframe，放置于页面「游戏主区」的 16:9 容器内
- 容器尺寸：宽 1200px、高 675px（严格 16:9），iframe 100% 撑满容器
- 容器视觉：1px 描边 `rgba(232,194,104,0.35)`，圆角 8px，外发光 `box-shadow: 0 0 80px rgba(232,194,104,0.12)`
- 加载占位：容器背景为斜向渐变 `#29261F → #0F0E0E`（约 45°），中央显示「WARFARE 1942」+ 说明文字（见 §4），游戏加载完成后由 iframe 覆盖
- 全屏功能：工具栏「全屏游玩」按钮对容器调用 `requestFullscreen()`

## 1. 设计令牌（建议直接写成 CSS 变量）

```css
:root {
  /* 色彩 */
  --bg: #0F0E0E;             /* 页面底色：深炭黑（非纯黑） */
  --surface: #1A1917;        /* 分区面板底（操作指南 / 相关推荐） */
  --card: #22211E;           /* 卡片底 */
  --kbd: #2A2925;            /* 键帽底 */
  --hairline: #2E2C28;       /* 1px 发丝分隔线 / 卡片描边 */
  --gold: #E8C268;           /* 哑光金：CTA、评分数据、章节标签、星标 */
  --gold-dark-text: #14120E; /* 金色按钮上的文字色 */
  --olive: #55604A;          /* 军绿（备用点缀，视觉稿中未大量使用） */
  --text-primary: #F2F2EF;
  --text-secondary: #A8A69F;
  --glass-bg: rgba(255,255,255,0.06);    /* 徽章 / 幽灵按钮底 */
  --glass-border: rgba(255,255,255,0.12);

  /* 字体 */
  --font-display: "Bebas Neue", "Oswald", sans-serif; /* 仅英文/数字，必须大写 */
  --font-body: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;

  /* 圆角：大区块一律 0（硬质军事风），仅以下例外 */
  --radius-btn: 6px;   /* 按钮 */
  --radius-media: 8px; /* 游戏容器 / 配图 / 卡片封面 */
  --radius-pill: 999px;/* 徽章 */
  --radius-kbd: 4px;   /* 键帽 */

  /* 间距基准：8px 网格 */
}
```

字体引入（Google Fonts）：

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**硬性规则**
- 金色 `#E8C268` 仅用于：主 CTA、星标 logo、章节英文小标签、数据标签数值、键帽键名、特性列表方块标记。不作大面积装饰。
- 大区块（分区、卡片）圆角 = 0；分隔用 1px 发丝线，不用投影做层级。
- 中文不要用 Bebas Neue（不含中文字形），中文标题用 Inter Bold。

## 2. 全局布局

- 页面宽 1440px，单列纵向流；每个分区 `padding-left/right: 120px`，内容区 1200px
- 分区背景交替：`--bg`（导航/Hero/游戏区/介绍/页脚）与 `--surface`（操作指南/相关推荐），`--surface` 分区上下各 1px `--hairline` 边线
- 页面自上而下顺序：**导航 → Hero → 游戏主区 → 操作指南 → 游戏介绍 → 相关推荐 → 页脚**

## 3. 分区规格

### 3.1 顶部导航（参考 01-nav.png）
- 高度约 60px（`padding: 18px 120px`），flex 两端对齐，垂直居中；底部 1px `--hairline`
- 左：金色五角星 SVG（22px，`fill: #E8C268`）+「1942 战场」Inter Bold 18px `--text-primary`，间距 10px
- 中：链接组（间距 36px，14px）：首页（Medium，`--text-primary`）/ 操作指南 / 游戏介绍 / 相关推荐（Regular，`--text-secondary`），锚点跳转对应分区
- 右：「立即开战」按钮 — 底 `--gold`，圆角 6px，`padding: 10px 22px`，文字 Inter SemiBold 14px `--gold-dark-text`，点击滚动到游戏区
- 建议 `position: sticky; top: 0`，滚动时保持

### 3.2 Hero（参考 02-hero.png）
- `padding: 72px 120px 48px`，纵向 flex，水平居中，间距 28px
- 在线徽章：胶囊（`--glass-bg` + 1px `--glass-border`，`padding: 8px 16px`），金色圆点 8px + 文字「在线畅玩 · 无需下载 · 免费」Inter Medium 13px `--text-secondary`
- 主标题：「WARFARE 1942」Bebas Neue 110px，`letter-spacing: 2px`，`--text-primary`
- 副标题：「重返二战前线 —— 坦克轰鸣、军犬协同，每一场战斗都是生存之战」Inter 18px `--text-secondary`
- 数据标签行：4 个面板横排，间距 16px；每个面板底 `--surface`、1px `--hairline`、`padding: 12px 24px`，纵向两行：
  | 数值（Bebas 24px `--gold`） | 标签（Inter 12px `--text-secondary`） |
  |---|---|
  | 9.2 | 玩家评分 |
  | PvP | 多人在线对战 |
  | 3D | 第三人称射击 |
  | 坦克 × 军犬（Inter Bold 18px） | 特色作战单位 |

### 3.3 游戏主区（参考 03-game.png）
- `padding: 8px 120px 72px`，间距 16px
- 嵌入容器：见 §0（1200×675，金色描边 + 金色外发光）
- 占位文字（游戏加载前显示，加载后隐藏）：「WARFARE 1942」Bebas 48px `letter-spacing: 4px`；下方「此处嵌入 CrazyGames 游戏 iframe（16:9），页面加载后自动就绪」Inter 14px `--text-secondary`
- 工具栏（容器下方，flex 两端对齐）：
  - 左：「横屏体验最佳 · 支持桌面 / 平板 / 手机」Inter 13px `--text-secondary`
  - 右：「收藏」「分享」幽灵按钮（`--glass-bg` 0.05 + 1px 白 0.15 描边，圆角 6px，`padding: 9px 18px`，Inter Medium 14px `--text-primary`）+「全屏游玩」金色按钮（同导航 CTA 样式，`padding: 9px 18px`），间距 12px

### 3.4 操作指南（参考 04-controls.png，底 `--surface`）
- `padding: 64px 120px`，纵向间距 32px
- 章节标签：「FIELD MANUAL」Bebas 15px，`letter-spacing: 5px`，`--gold`
- 标题：「操作指南」Inter Bold 36px `--text-primary`
- 描述：「键鼠操作一览，新手 30 秒上手。对局中按 Tab 呼出暂停菜单。」Inter 15px `--text-secondary`
- 按键网格：flex wrap，间距 12px；10 张卡片，每张宽 234px、`padding: 14px 16px`、底 `--card`、1px `--hairline`、圆角 0，横排垂直居中：
  - 键帽：底 `--kbd`、1px 白 0.12 描边、圆角 4px、`padding: 6px 10px`，键名 Inter SemiBold 13px `--gold`
  - 说明文字：Inter 14px `--text-primary`，与键帽间距 12px
- 键位内容（与游戏官方一致）：
  WASD 移动 / 鼠标左键 射击 / 鼠标右键 瞄准 / R 换弹 / Space 跳跃 / C 蹲下 / M 打开地图 / 1-5 切换装备 / U 军犬技能 / T 局内聊天

### 3.5 游戏介绍（参考 05-about.png）
- `padding: 72px 120px`，左右两栏，垂直居中，栏间距 56px
- 左栏（自适应宽，纵向间距 20px）：
  - 标签「ABOUT THE GAME」Bebas 15px `letter-spacing: 5px` `--gold`
  - 标题「沉浸在二战的硝烟里」Inter Bold 36px
  - 正文 Inter 15px `line-height: 26px` `--text-secondary`：
    「Warfare 1942 是一款二战题材的多人在线第三人称射击游戏。丰富的武器库、深度角色自定义，还有忠诚的军犬与强力的坦克与你并肩作战。节奏紧凑的回合制战斗，既考验枪法，也考验战术。」
  - 特性列表（间距 14px）：每行 8×8 金色方块 + Inter Medium 15px `--text-primary`：
    - 庞大武器库 —— 从步枪到狙击枪，还原二战经典枪械
    - 角色自定义 —— 打造属于你的前线士兵
    - 忠诚军犬 —— 召唤战友，扭转战场局势
    - 强力坦克 —— 驾驶钢铁巨兽碾过战线
- 右栏配图：460×420px，圆角 8px，1px `--hairline` 描边
  - 图为 AI 生成的二战战场氛围图（士兵剪影 + 坦克 + 硝烟，暗调橄榄绿/琥珀色）。可用 `05-about.png` 中右半部分裁切，或按此提示词重新生成：`World War II battlefield cinematic scene, soldier silhouette walking through smoke and ruins, a tank in the background, dark moody atmosphere, olive green and amber fire tones, film grain, dramatic lighting`

### 3.6 相关推荐（参考 06-recommend.png，底 `--surface`）
- `padding: 64px 120px`，纵向间距 32px
- 标签「MORE BATTLES」+ 标题「你可能还喜欢」（样式同 §3.4）
- 3 张卡片横排，间距 24px，等宽（约 384px）；卡片底 `--card`、1px `--hairline`、圆角 0
- 卡片结构：封面图（宽 100%、高 190px、顶边圆角 0）+ 内容区 `padding: 20px`（游戏名 Inter Bold 18px + 标签行 Inter 13px `--text-secondary`，间距 6px）
- 卡片内容（占位，可替换为实际要推的游戏）：
  1. Call of War — 策略 · 二战 · 多人
  2. Tank Off 2 — 载具 · 坦克对战 · 3D
  3. War Brokers — 射击 · 方块风 · 多人
- 封面为 AI 图，可直接裁切 `06-recommend.png` 或按以下提示词重新生成：
  1. `WWII strategy war map with military unit markers and arrows, dark tabletop command room, moody olive and amber tones, cinematic`
  2. `military tank charging across a dusty battlefield at dusk, explosions in distance, dark cinematic olive and orange tones`
  3. `blocky voxel style first person shooter battlefield, soldiers with rifles in a war-torn city, dark moody lighting, amber highlights`

### 3.7 页脚（参考 07-footer.png）
- `padding: 48px 120px 32px`，纵向间距 28px
- 上区 flex 两端对齐：左侧星标 20px +「1942 战场」Inter Bold 16px；右侧「免下载 · 点开即玩的二战前线」Inter 13px `--text-secondary`
- 1px `--hairline` 分隔线
- 底部居中：「2026 1942 战场 · 游戏内容由 CrazyGames 平台提供，本站仅做嵌入展示，仅供学习交流」Inter 13px `--text-secondary`

## 4. 响应式要求（视觉稿为桌面稿，移动端按此适配）

- ≥1200px：按本规范
- 768–1199px：分区左右 padding 缩到 48px；数据标签行 2×2 换行；游戏介绍改为上下单栏（图在上）；推荐卡片纵向堆叠
- <768px：padding 24px；主标题缩到 64px；导航只保留 logo + CTA（链接收进汉堡菜单）；按键网格单列；游戏容器保持 16:9 等比缩放

## 5. 实现注意

- 全站禁用表情符号；星标用 SVG（五角星 path：`M12 2L14.5 8.5L21 9L16 13.5L17.5 20.5L12 16.8L6.5 20.5L8 13.5L3 9L9.5 8.5L12 2Z`，`fill: #E8C268`）
- 推荐卡片游戏如替换，保持「封面 + 名称 + 3 个标签」结构不变
- SEO：`<title>` 建议「Warfare 1942 在线玩 - 1942 战场」，meta description 用 §3.5 正文
