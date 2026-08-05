# Warfare 1942 快速上站更新版规格书

> 可直接交给 Codex 执行。版本：2026-08-05。
>
> 项目目标不是复制一个小游戏门户，而是在 18 小时内上线一个“可验证、可收录、可继续扩展”的 Warfare 1942 专题站，优先承接 `promo code`、`download`、`how to play` 等信息需求；`unblocked` 只有在获得合法、稳定的游戏嵌入来源后才上线。

---

## 0. 项目判断与执行原则

### 0.1 当前机会判断

- Warfare 1942 并非刚发布的新游戏。它至少从 2024 年底开始出现在 GamePix、Y8 等小游戏站，随后进入 Miniplay、Playgama 等渠道。
- 2026 年 8 月进入 CrazyGames，更像一次渠道扩散或二次起量，而不是全球首发。
- Google 已出现 `warfare 1942 promo code`、`warfare 1942 unblocked` 等下拉词；`warfare 1942 game download` 在输入到 `game` 后出现。
- YouTube 只稳定出现 `promo code` 下拉词，近期视频整体播放量不高；Google Trends 全球 12 个月数据不足。因此目前属于“值得低成本抢位”，还不能判断为确定的大爆款。
- 最值得优先占位的内容缺口是 `promo codes`，其次是不同版本和下载入口的辨别。通用 `play online` 搜索结果已被大型门户占据，不适合正面硬碰。
- 原方案中的 KD 34.3、41.9、12.4 没有标明工具、地区、时间和搜索量，不能作为硬结论。只有在同一关键词工具、同一国家和同一时间重新核验后，才把 KD 用作辅助指标。

### 0.2 本站定位

站点定位为：

> **Warfare 1942 的非官方验证型指南站：代码状态、官方下载安装入口、版本辨别、玩法与在线入口。**

核心差异化不是字数，也不是换一个域名镜像游戏，而是：

1. 明确区分 Web、当前 Android 和历史 Android 版本。
2. 对礼包码采用“已验证 / 未验证 / 已失效”的证据化状态，不编造代码。
3. 使用亲自测试得到的操作、模式和截图，不拼接其他站的模糊描述。
4. 只有在嵌入授权明确时才提供站内试玩；否则使用清晰的官方/平台跳转链接。

### 0.3 MVP 成功标准

上线后 7–14 天内，至少出现以下一种正向信号：

- Google Search Console 对 `promo code`、`download`、`how to play` 或 `unblocked` 相关查询产生稳定展示；
- 某个落地页进入前 30 名并继续改善；
- 获得可追踪的自然点击或外链；
- 游戏在 CrazyGames、YouTube 或搜索联想中继续上升。

如果没有这些信号，不继续批量建设武器、地图、皮肤等长尾页面。

### 0.4 对原方案的取舍

| 原方案元素 | 本版处理 | 原因 |
|---|---|---|
| 逐页 Title/H1/模块规格 | 保留并校正 | 适合直接交给 Codex 施工 |
| 静态站、Cloudflare Pages、少量 JS | 保留 | 速度快、成本低、维护简单 |
| 清晰目录、导航、内链、sitemap | 保留并精简 | 有利于抓取和后续扩展 |
| 首页以 `unblocked` 为唯一核心 | 改为综合 Hub | 嵌入授权未确认，且 codes/download 意图更稳 |
| 一次购买多个 EMD 域名 | 删除 | 在验证需求前增加成本，也不能代替内容质量 |
| 固定 1200/800 字门槛 | 删除 | 字数本身不构成排名优势，容易制造低价值重复内容 |
| 示例 active/expired codes | 删除 | 可能直接变成虚假信息并损害整站可信度 |
| PC、Mac、Android、iOS 全平台下载 | 改为逐平台核验 | Web 版不等于 PC 客户端，iOS 身份尚未确认 |
| 首发拆分 Tips、Weapons 等页面 | 延后 | 先避免薄页，再根据 Search Console 查询拆分 |
| Day 2–3 接入高干扰广告 | 延后 | 先验证搜索需求、体验和授权，再商业化 |

---

## 1. 域名与部署

### 1.1 域名决策

优先级如下：

1. **已有小游戏或攻略站的子目录**：如果手上已有被 Google 收录的相关站点，优先使用 `/games/warfare-1942/` 或类似目录，能更快验证需求。
2. **独立站只买一个宽口径域名**：可重新核验 `warfare1942.org`、`playwarfare1942.com` 等候选的可注册性、历史记录和商标风险。
3. 不建议把整个项目锁死在 `warfare1942unblocked.com`。`unblocked` 页面受嵌入授权和校园网络策略影响，而站点还有 codes、download、guide 等更稳定的意图。

不要在验证流量前一次购买多个域名，也不要把多个精确匹配域名互相跳转作为主要 SEO 策略。

### 1.2 站点名称与声明

- 站点名建议：`Warfare 1942 Guide`
- 页脚声明：`Warfare 1942 Guide is an independent fan-made resource and is not affiliated with or endorsed by the game's developers or distribution platforms.`
- 不在 Logo、标题或结构化数据中把站点包装成“官方网站”。

### 1.3 技术与托管

- 首选：Cloudflare Pages、Vercel 或已有静态站托管。
- MVP 使用静态 HTML/CSS 和少量原生 JavaScript，或复用现有项目的静态生成框架。
- 全站 HTTPS、自动部署、可回滚。
- 使用 Git 管理版本；不要在生产环境直接改文件。

---

## 2. MVP 信息架构

```text
/
├── promo-codes/
├── download/
├── how-to-play/
├── unblocked/          # 条件页面：仅在嵌入授权通过后发布
├── privacy/
├── contact/
├── 404.html
├── robots.txt
├── sitemap.xml
└── ads.txt             # 获得广告平台账号和正式记录后再生成
```

### 2.1 首版页面优先级

| 优先级 | 页面 | 是否首发 | 目的 |
|---|---|---:|---|
| P0 | `/promo-codes/` | 是 | 承接最明显的信息缺口和 Google/YouTube 联想词 |
| P0 | `/download/` | 是 | 澄清 PC、Android、历史版本与假 APK 风险 |
| P0 | `/` | 是 | 品牌/实体总页，并把权重分发到高意图页面 |
| P1 | `/how-to-play/` | 是 | 承接基础玩法并建立第一手内容可信度 |
| P1 | `/unblocked/` | 条件发布 | 只有合法稳定的嵌入来源通过验收才上线 |
| P2 | 武器、地图、模式等 | 暂缓 | 由 Search Console 查询和实际游戏资料触发拆分 |

首版不单独创建 `/guide/`、`/guide/tips/`、`/guide/weapons/`。把这些内容先整合到 `/how-to-play/`，避免薄页和重复意图。

### 2.2 内链关系

- 首页必须链接到 Promo Codes、Download、How to Play。
- Promo Codes 页面链接到 Download 和版本对照表，帮助用户判断代码适用版本。
- Download 页面链接到 How to Play，并提醒 Web 版无需安装。
- How to Play 页面链接回 Promo Codes 和 Download。
- 若 `/unblocked/` 获准上线，则从首页和 How to Play 导航到该页；未上线时导航中不得出现死链接或“即将上线”占位页。

---

## 3. 全站通用组件

### 3.1 顶部导航

桌面端：

```text
Logo | Promo Codes | Download | How to Play | Play Online（条件）
```

移动端使用折叠菜单；首屏保留一个主 CTA，不要同时堆放多个红色按钮。

### 3.2 验证状态组件

首页、Promo Codes 和 Download 页面复用同一个状态组件，显示：

- `Last checked`：实际人工核验时间，使用完整日期；
- `Code status`：Active / No verified active codes / Redemption system not found；
- `Web version`：已核验的平台和开发者标识；
- `Android version`：当前 Google Play 开发者、包名和更新时间；
- `Evidence`：可点击的官方或一手来源。

只有真正重新核验后才能更新日期。不要用构建时间自动制造“Updated today”。

### 3.3 版本辨别表

全站至少在首页和 Download 页面展示以下版本结构；发布前用最新页面再次核验具体字段：

| 版本 | 开发者/发行标识 | 包名或入口 | 当前处理方式 |
|---|---|---|---|
| CrazyGames Web | App1 | CrazyGames 页面 | 作为 Web 版参考入口，不直接 iframe CrazyGames |
| 当前 Android | Mosaic Games LLC | `com.warfare.ww2.online` | 只链接官方 Google Play 页面 |
| 历史 Android | Full HP Ltd | `com.ww2.shooter.war.games.online` | 用于解释版本差异，不托管旧 APK |
| iOS | 待核验 | 待核验 | 未确认同一版本前不得写“支持 iPhone/iPad” |

如果不同版本之间的账号、礼包码或进度不能互通，必须在相关页面醒目标注；没有证据时写“尚未验证”，不得猜测。

### 3.4 页脚

包含：

- About / Privacy / Contact；
- 非官方声明；
- 当前年份；
- 不使用“Official Warfare 1942”字样；
- 不堆砌关键词和重复导航。

### 3.5 视觉方向

- 色彩：炭黑、军绿色、沙色作为基础，红色只用于主 CTA 和重要警告；
- 字体：系统字体栈，避免为视觉效果加载多个外部字体；
- 截图：使用自己测试游戏时截取的图片，并压缩为 WebP/AVIF；
- 不下载 CrazyGames、Y8 等门户的 Logo、缩略图或页面素材用于本站；
- 保证正文对比度、键盘焦点状态和移动端可读性。

---

## 4. 逐页内容与 SEO 规格

### 4.1 首页 `/`

#### 搜索意图

- Warfare 1942 game
- Warfare 1942 online
- Warfare 1942 guide
- Warfare 1942 CrazyGames

首页是实体总页，不把 `unblocked` 设为唯一主题。

#### 建议元信息

**Title**

```text
Warfare 1942 Guide: Promo Codes, Download & Online Play
```

**Meta description**

```text
Verified Warfare 1942 promo code status, official PC and Android options, browser play links, controls, game modes, and version differences.
```

**H1**

```text
Warfare 1942 Game Guide: Codes, Download & How to Play
```

#### 页面结构

1. 首屏：一句话说明游戏类型、验证日期、三个入口按钮（Codes / Download / How to Play）。
2. `What is Warfare 1942?`：说明它是二战题材的 Web/移动射击游戏；所有模式和功能只写已测试内容。
3. `Where can you play it?`：Web 与移动平台对照。
4. `Which Warfare 1942 version do you have?`：展示版本辨别表。
5. `Are there any promo codes?`：显示当前真实状态，链接到详情页。
6. `How to start playing`：三至五步简要说明。
7. `Frequently asked questions`：回答是否免费、是否需要下载、是否支持移动端、版本是否相同。

#### 首屏 CTA 规则

- 如果授权嵌入通过：主按钮为 `Play Warfare 1942`，锚点指向站内播放器。
- 如果没有授权嵌入：主按钮为 `Play on CrazyGames` 或经核验的平台名，并清楚标记为外部链接。
- 不使用 `Play at School`、`Bypass Blocks`、`Works Everywhere` 等无法保证的承诺。

#### 内容长度

不设置“必须 1200 字”的机械门槛。建议 700–1000 个英文单词，但每一段必须解决一个真实问题；信息不足时宁可短而准确，也不要扩写同义句。

---

### 4.2 Promo Codes `/promo-codes/`

#### 搜索意图与优先级

这是首版最重要的页面，对应 Google 和 YouTube 均可观察到的搜索联想。

#### 建议元信息

**Title**

```text
Warfare 1942 Promo Codes: Any Working Codes? (August 2026)
```

月份和年份必须来自内容数据，且仅在重新核验后更新。

**Meta description**

```text
Check the current Warfare 1942 promo code status, verified rewards, expired codes, redemption steps, platform compatibility, and last checked time.
```

**H1**

```text
Warfare 1942 Promo Codes: Are Any Codes Working?
```

#### 页面结构

1. 顶部状态框：`Last checked`、适用版本、是否找到兑换入口、当前有效代码数量。
2. `Working Warfare 1942 codes`：只显示已亲自验证或有可靠官方证据的代码。
3. `No verified active codes`：没有有效代码时，用此状态代替空表或虚假代码。
4. `How we verify codes`：列出测试版本、测试日期、结果和证据来源。
5. `How to redeem a code`：只有实际找到兑换入口后才提供步骤；没有入口时明确说明尚未找到。
6. `Expired codes`：只收录曾有可靠来源、目前经测试失效的历史代码。
7. `Why a code may not work`：版本、地区、过期、大小写、一次性使用、活动资格等。
8. FAQ：不同 Web/Android 版本是否通用、是否需要账号、何时检查更新。

#### 代码数据状态

每条代码使用以下字段：

```json
{
  "code": "EXAMPLE_ONLY_NOT_FOR_PRODUCTION",
  "status": "active | unverified | expired",
  "reward": "",
  "platform": "web | android-current | android-legacy | unknown",
  "sourceUrl": "",
  "firstSeen": "YYYY-MM-DD",
  "lastChecked": "YYYY-MM-DD",
  "evidence": ""
}
```

`EXAMPLE_ONLY_NOT_FOR_PRODUCTION` 只用于说明数据结构，构建时不得渲染到生产页面。

#### 绝对禁止

- 不编造 3–5 个“过期代码”来制造页面厚度；
- 不把别的游戏代码换个名称后发布；
- 不根据第三方页面标题直接断言代码有效；
- 不写“Updated daily”，除非确实有人每天检查；
- 不用倒计时器、虚假在线人数或“刚刚验证”动画。

---

### 4.3 Download `/download/`

#### 搜索意图

- warfare 1942 game download
- warfare 1942 download pc
- warfare 1942 android
- warfare 1942 apk

#### 建议元信息

**Title**

```text
Warfare 1942 Game Download for PC & Android – Official Links
```

**Meta description**

```text
Use official Warfare 1942 links for Android or play in a PC or Mac browser with no download. Compare current and legacy versions before installing.
```

**H1**

```text
Warfare 1942 Download: Official PC and Android Options
```

#### 页面核心结论

| 平台 | 推荐回答 | CTA |
|---|---|---|
| Windows PC | Web 版通常可直接在浏览器运行，无需下载独立安装包 | `Play in Browser` |
| macOS | Web 版通常可直接在浏览器运行 | `Play in Browser` |
| Android | 提供当前开发者的 Google Play 官方链接 | `Get it on Google Play` |
| iPhone/iPad | 同一游戏身份未核验前写“尚未确认” | 无下载按钮 |
| APK | 不自行托管，也不推荐来源不明的 APK | 指向安全说明 |

#### 页面结构

1. 快速选择平台；
2. PC/Mac 浏览器玩法和最低测试环境；
3. 当前 Android 版本的开发者、包名、更新日期和官方链接；
4. 当前版与历史 Android 版的区别；
5. 安装或启动时的常见问题；
6. 安全提醒：核对开发者、包名、权限和官方域名；
7. FAQ：是否免费、是否支持离线、进度是否跨平台、为什么看到不同图标或开发者。

#### 下载页边界

- 不托管 Windows EXE、DMG、Android APK 或修改版文件；
- 不把浏览器游戏包装成“PC 下载”；
- 不使用假下载按钮、短链或强制跳转；
- 不写 Android/iOS/PC 全平台支持，除非逐项验证；
- 外链必须带平台名称，必要时使用 `rel="nofollow sponsored noopener"`，但官方信息链接不需要一律 nofollow。

---

### 4.4 How to Play `/how-to-play/`

#### 建议元信息

**Title**

```text
How to Play Warfare 1942: Controls, Modes & Beginner Tips
```

**Meta description**

```text
Learn Warfare 1942 controls, match flow, modes, equipment, vehicles, and practical beginner tips based on first-hand browser gameplay testing.
```

**H1**

```text
How to Play Warfare 1942
```

#### 页面结构

1. 60 秒快速上手；
2. PC 控制表；
3. 移动端控制说明（仅实际测试后发布）；
4. 对局目标与胜负条件；
5. 已验证的游戏模式；
6. 武器、载具、军犬或特殊能力（只写游戏内真实存在的系统）；
7. 五到八条可操作的新手技巧；
8. 常见问题和故障排查。

#### 一手内容要求

发布前至少进行 30–45 分钟完整试玩，记录：

- 首次进入是否要求登录；
- Web 版是否有机器人、真人匹配、好友房或离线模式；
- 默认键鼠控制和是否可以改键；
- 模式名称、回合长度、出生机制和得分方式；
- 武器、载具、军犬等系统的真实名称；
- 桌面端和移动端的差异；
- 至少 4 张自有截图，覆盖菜单、对局、控制和结算。

无法复现的功能不得写进页面。先把 Tips、Weapons、Modes 放在本页，只有相应查询产生展示后再拆页。

---

### 4.5 Unblocked `/unblocked/`（条件页面）

#### 上线前置条件

以下条件必须全部满足：

1. 找到明确允许第三方网站使用的官方分发或嵌入来源，例如开发者、GameDistribution、GamePush、WGPlayground 等；
2. 已阅读并满足该来源的服务条款、域名审核、广告、SDK、隐私和 `ads.txt` 要求；
3. 使用正式嵌入 URL 在生产域名测试成功，不是 CrazyGames 页面 iframe，也不是临时占位地址；
4. 桌面和移动端都能正常加载、全屏、静音和退出；
5. 有加载失败和不兼容浏览器的回退入口。

任何一项不满足，就不发布该 URL，也不把它写进导航和 sitemap。

#### 建议元信息

**Title**

```text
Warfare 1942 Unblocked – Play Online Without Download
```

**Meta description**

```text
Play Warfare 1942 online in a browser through an authorized game embed, with controls, loading help, fullscreen tips, and a no-download fallback.
```

#### 页面结构

1. 游戏播放器或明确的授权外链；
2. 加载状态、全屏按钮和错误回退；
3. 简短操作说明；
4. 为什么学校或工作网络仍可能阻止游戏；
5. 浏览器兼容与性能排查；
6. 链接到完整 How to Play 和 Download 页面。

#### 文案边界

- 可以描述为“browser play”或“no-download play”；
- 不承诺能够绕过学校、公司、家长控制或当地网络限制；
- 不提供代理、VPN、过滤绕过或伪装页面的教程；
- 不在站名或结构化数据中把游戏官方名称改为 `Warfare 1942 Unblocked`。

---

## 5. 技术 SEO 与结构化数据

### 5.1 基础标签

每页必须有：

- 唯一的 `<title>`、meta description 和 H1；
- 自指 canonical；
- Open Graph 和 Twitter Card；
- `lang="en"`；
- 正确的 favicon、站点名和主题色；
- 面包屑（首页除外）；
- 最后核验日期应出现在可见正文中，而不只存在于 schema。

### 5.2 结构化数据

首页可使用 `VideoGame`，但字段必须保守：

```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Warfare 1942",
  "url": "https://YOUR-DOMAIN.example/",
  "gamePlatform": ["Web Browser", "Android"],
  "applicationCategory": "Game",
  "genre": ["Action", "Shooter"],
  "isAccessibleForFree": true
}
```

发布前替换域名。只有确认后才能补充 `playMode`、开发者、发布日期、评分或系统要求。

其他规则：

- 只有页面中可见的 FAQ 才能添加 `FAQPage`；
- `/how-to-play/` 只有在正文是真正的步骤教程时使用 `HowTo`；
- 不添加从第三方站抄来的 `aggregateRating`；
- 面包屑使用 `BreadcrumbList`；
- Promo Codes 页面不需要虚构专用 schema。

### 5.3 Sitemap 与 robots

`robots.txt`：

```text
User-agent: *
Allow: /

Sitemap: https://YOUR-DOMAIN.example/sitemap.xml
```

`sitemap.xml` 只列可索引、已发布的 canonical URL，并提供真实 `lastmod`。不依赖 `priority` 和 `changefreq` 制造抓取优先级。

### 5.4 内容质量规则

- 不设关键词密度指标；自然覆盖同义意图即可；
- 不以“正文比 CrazyGames 多”作为排名逻辑；
- 不批量生成无一手数据的地图、武器、角色页面；
- 引用平台事实时链接到直接来源；
- 将事实、测试观察和推测清楚区分；
- 页面日期只在内容实质更新或重新验证时修改。

---

## 6. 工程实现规格

### 6.1 推荐目录

如果没有现成框架，使用以下简单结构：

```text
/
├── index.html
├── promo-codes/index.html
├── download/index.html
├── how-to-play/index.html
├── unblocked/index.html       # 条件生成
├── privacy/index.html
├── contact/index.html
├── 404.html
├── assets/
│   ├── css/site.css
│   ├── js/site.js
│   └── images/
├── data/
│   ├── codes.json
│   ├── platforms.json
│   └── verification.json
├── robots.txt
├── sitemap.xml
└── README.md
```

如果已有项目框架，沿用原有组件、路由和构建方式，不为了这个专题重写技术栈。

### 6.2 数据与内容分离

- `codes.json`：代码状态、适用版本、来源和核验时间；
- `platforms.json`：平台、开发者、包名、官方 URL 和核验时间；
- `verification.json`：页面级最后检查时间、检查人/方式和备注；
- 构建时校验必填字段，不允许空官方 URL 生成下载按钮；
- `unblocked` 未通过验证时，不生成页面和导航项。

### 6.3 性能与可访问性

- 无必要 UI 框架、轮播和背景视频；
- 首屏图片预设宽高，防止 CLS；
- 非首屏图片懒加载；
- 图片优先 WebP/AVIF，提供准确 alt；
- JS 使用 `defer`，核心正文不依赖客户端渲染；
- 目标：移动端 Lighthouse Performance、SEO、Accessibility 均达到 90+；
- 目标：LCP < 2.5 秒、CLS < 0.1，但以真实网络测试为准；
- iframe 使用响应式容器，并有 title、加载提示和失败回退。

### 6.4 隐私与分析

- 首版只接入一种分析工具：Google Analytics 4 或隐私友好方案；
- 如果使用 Cookie、个性化广告或第三方播放器，按实际行为更新 Privacy 页面和同意机制；
- `ads.txt` 只写广告平台提供的真实记录，不能使用模板占位值上线。

### 6.5 MVP 不做的功能

- 账号、评论、论坛、排行榜；
- 站内搜索；
- 数据库和后台管理系统；
- 自动抓取其他站代码；
- 多语言批量翻译；
- PWA、桌面安装包或 APK 镜像；
- 自动生成数十个攻略页面。

---

## 7. 开发前验证清单

Codex 写正文前，先建立 `research-notes.md` 或等价记录，并完成：

- [ ] 打开 CrazyGames 页面，核验游戏名、开发者、发布日期/更新时间、控制方式和描述；
- [ ] 在浏览器试玩 30–45 分钟，记录模式、控制、登录、匹配、机器人、载具和进度机制；
- [ ] 检查游戏内是否存在兑换入口；若不存在，截取相关菜单作为内部证据；
- [ ] 核验当前 Google Play 开发者、包名、下载量级和最近更新时间；
- [ ] 记录历史 Android 包名，确认它与当前版本的关系不可被误读；
- [ ] 查证 iOS 是否确为同一游戏，而不是同名或相似产品；
- [ ] 向潜在分发商核验 iframe 授权、域名审核、SDK、广告和 `ads.txt` 要求；
- [ ] 自行截取至少 4 张 WebP 图片，并记录来源与拍摄日期；
- [ ] 把所有不确定项标为 `NEEDS_VERIFICATION`，但不得让该标记或占位文案出现在生产页面。

如果没有可用的授权播放器，继续完成首页、Promo Codes、Download 和 How to Play；把 Unblocked 从本次发布范围移除。

---

## 8. 18 小时实施排期

| 时间 | 任务 | 交付物 |
|---|---|---|
| 0–2 小时 | 核验来源、版本、代码入口和嵌入权利 | research notes、版本表、Go/No-Go 结论 |
| 2–5 小时 | 建站骨架、全局组件、响应式样式 | 首页框架、导航、页脚、通用组件 |
| 5–8 小时 | 完成 Promo Codes 和 Download | 两个 P0 页面及 JSON 数据 |
| 8–11 小时 | 实际试玩、截图、How to Play | 一手玩法页和压缩图片 |
| 11–13 小时 | 完成首页并接通内链 | 实体总页、版本表、FAQ |
| 13–15 小时 | 条件实现播放器或移除 Unblocked | 合规播放器页或明确延期 |
| 15–17 小时 | SEO、schema、sitemap、隐私和 404 | 可验证的技术 SEO |
| 17–18 小时 | 移动端、性能、链接和生产检查 | QA 记录、部署版本、回滚点 |

如果验证环节耗时超出预期，优先牺牲 Unblocked 页面和装饰性视觉，不牺牲事实核验与移动端可用性。

---

## 9. 上线验收标准

### 9.1 内容验收

- [ ] 所有代码都有来源、状态、平台和最后核验日期；
- [ ] 没有虚构有效代码、过期代码或兑换步骤；
- [ ] 下载按钮只通向官方/经核验平台，不托管安装文件；
- [ ] PC/Mac 被准确描述为浏览器玩法，不冒充原生下载；
- [ ] iOS 未确认时不出现下载按钮；
- [ ] 首页和 Download 页面都能解释当前与历史 Android 版本；
- [ ] 所有玩法描述都能在实测记录中找到依据；
- [ ] 有清晰的非官方声明。

### 9.2 技术验收

- [ ] 所有页面返回 200，404 页面正确返回 404；
- [ ] 无死链、占位域名、占位 iframe、空 CTA 或控制台错误；
- [ ] canonical、Open Graph、favicon、robots 和 sitemap 正确；
- [ ] sitemap 不包含未发布的 `/unblocked/`；
- [ ] schema 通过验证且与可见正文一致；
- [ ] 手机、平板和桌面断点正常；
- [ ] 键盘可以完成导航和主要操作；
- [ ] 图片已压缩且无明显版权来源风险；
- [ ] 正式域名 HTTPS 正常，部署可回滚。

### 9.3 玩家页专项验收

只有发布 `/unblocked/` 时检查：

- [ ] 嵌入来源明确允许第三方使用；
- [ ] 没有 iframe CrazyGames 页面；
- [ ] 生产域名加载成功，桌面和移动端均可操作；
- [ ] 全屏、音频、焦点和退出流程正常；
- [ ] 加载失败时提供可用的官方外链；
- [ ] 隐私和广告披露与播放器实际行为一致。

---

## 10. 上线与数据验证

### Day 0

- 部署生产域名；
- 提交 Google Search Console；
- 提交 sitemap；
- 使用 URL Inspection 请求首页和三个首发页面编入索引；
- 建立 GA4 或替代分析工具的四个事件：外部试玩、Google Play、代码展开、页面滚动深度。

### Day 1–3

- 检查抓取、canonical、移动端和结构化数据错误；
- 对首次发现的问题做真实修复，不为了刷新日期做无效更新；
- 如果有一手试玩素材，可以发布一个简短 YouTube 视频并在描述中链接 How to Play 或 Promo Codes；不批量注册无运营计划的社交账号。

### Day 7（已有域名）或 Day 14（新域名）

查看 Search Console：

- 查询词是否与页面意图匹配；
- 哪个页面获得展示；
- 是否出现意料外的模式、武器、载具或平台长尾；
- 标题点击率是否明显弱于同排名平均；
- 页面是否被正确选为 canonical。

### 扩页触发条件

满足以下任一条件再拆分新页面：

- 某一主题出现多个相关查询，并累计获得稳定展示；
- 主页面相关段落已足够完整，拆分后不会形成薄页；
- 有可验证的一手截图、数据和独立搜索意图；
- 现有页面排名已接近前 20–30 名，独立页面可能更准确满足意图。

可选扩展顺序：

1. `/game-modes/`
2. `/weapons/`
3. `/dogs-and-vehicles/`
4. `/android-version/`
5. `/troubleshooting/`

### 暂停条件

如果 14–21 天后仍几乎没有相关展示、搜索联想消失、YouTube/门户热度也没有继续增长，则暂停内容扩张，只保留低成本代码和版本核验。

### 商业化时机

- 首发阶段不接入 Adsterra 弹窗、跳转或高干扰广告；
- 有稳定自然访问后再申请 AdSense 或适合游戏内容的广告方案；
- 广告不得覆盖玩家、伪装成下载按钮或影响移动端核心内容；
- 商业化不能先于内容与嵌入授权核验。

---

## 11. 给 Codex 的实施指令

将下面内容与本规格书一起交给 Codex：

```text
请按照本规格书实现 Warfare 1942 MVP。

工作方式：
1. 先检查现有仓库结构、AGENTS.md、构建脚本和未提交改动；沿用项目现有技术栈和设计系统。
2. 先完成事实与嵌入权限核验，并将证据记录在 research-notes.md；不要先写带结论的营销文案。
3. 任何无法验证的事实都保留在内部 NEEDS_VERIFICATION 清单，不能渲染到生产页面。
4. 不得编造 promo codes、expired codes、兑换步骤、下载平台、评分、在线人数或更新时间。
5. 不得托管 APK/EXE/DMG，不得 iframe CrazyGames；只有授权来源验收通过才生成 /unblocked/。
6. 优先完成 /、/promo-codes/、/download/、/how-to-play/ 四个页面；不要擅自扩展薄内容页。
7. 所有外链、schema、canonical、sitemap 和状态日期必须由同一份数据生成或保持一致。
8. 使用第一手截图；不要抓取门户素材。
9. 实现后运行现有 lint/test/build，并进行移动端、链接、schema 和生产构建检查。
10. 在 README 中记录本地运行、部署、内容更新、代码核验和条件发布 /unblocked/ 的方法。

最终汇报：
- 已完成页面；
- 事实核验结果；
- /unblocked/ 的 Go/No-Go 结论及依据；
- 测试和构建结果；
- 仍待人工完成的外部事项。
```

### Codex 不应自行执行的外部动作

- 购买域名；
- 注册广告账号或社交账号；
- 接受分发商合同；
- 代表站长申请或声明游戏授权；
- 向生产环境发布未经确认的代码或下载链接。

---

## 12. 研究基线链接

开发和发布前需再次打开核验，不能把本清单视作永久不变的事实：

- CrazyGames 游戏页：<https://www.crazygames.com/game/warfare-1942-riz>
- 当前 Google Play：<https://play.google.com/store/apps/details?id=com.warfare.ww2.online>
- GamePix：<https://www.gamepix.com/play/warfare-1942-online-shooter>
- Y8：<https://www.y8.com/games/warfare_1942>
- Miniplay：<https://www.miniplay.com/game/warfare-1942>
- Playgama：<https://playgama.com/game/warfare-1942>

潜在嵌入渠道只能作为调查起点，必须以实际游戏条目和最新条款为准：

- GameDistribution：<https://gamedistribution.com/>
- GamePush：<https://gamepush.com/>
- WGPlayground：<https://www.wgplayground.com/>

---

## 13. 最终决策摘要

这版方案保留了原方案最有价值的部分：清晰目录、逐页规格、静态技术栈、内链、元数据、上线排期和可复用工程模板；但把项目核心从“做一个 Unblocked 镜像站”改为“做一个有版本辨别和证据链的 Warfare 1942 指南站”。

首发应完成四页：

1. 首页实体 Hub；
2. Promo Codes；
3. Download；
4. How to Play。

`Unblocked` 是经过授权验证后的加分项，不是阻塞整个项目的前提。真正需要抢的是搜索窗口，不是用虚假礼包码、错误下载承诺或未经授权的 iframe 换取短期页面数量。
