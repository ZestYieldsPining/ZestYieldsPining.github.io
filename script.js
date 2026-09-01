/* =============================================================
   我的大学数字名片 · 交互脚本
   包含：打字机入场、滚动淡入、回到顶部按钮、页脚年份
   ============================================================= */

/* ---------- 1. "和我交流"按钮：点击打开邮箱（按钮本身是 mailto 链接） ----------
   这里不打印调试日志，保持控制台干净。 */

/* ---------- 2. 名字打字机效果 ---------- */
(function typewriter() {
  const el = document.getElementById("typedName");
  if (!el) return;
  const text = el.dataset.text;   // 文案来自 HTML 的 data-text，不改内容
  let i = 0;
  const speed = 130;              // 每个字间隔（毫秒），想快改小，想慢改大
  (function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  })();
})();

/* ---------- 3. 向下滚动：内容一块块淡入浮现 ---------- */
(function revealOnScroll() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const revealAll = () => items.forEach((el) => el.classList.add("visible"));

  // 平滑降级：不支持 IntersectionObserver（旧浏览器）时直接全部显示
  if (!("IntersectionObserver" in window)) { revealAll(); return; }

  try {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);   // 出现一次后不再重复监听
          }
        });
      },
      { threshold: 0.12 }               // 元素露出 12% 时触发
    );
    items.forEach((el) => io.observe(el));

    // 兜底：仅在"真正的 JS 运行时错误"时全部显示（fail-open）。
    // 关键：用 e.error 判断——资源（如图片）加载失败的 error 事件是
    // 普通 Event，不含 .error；只有 JS 异常才是 ErrorEvent（含 .error）。
    // 若不加过滤，坏图片会把所有区块一次性点亮，导致滚动动画失效。
    window.addEventListener("error", (e) => { if (e.error) revealAll(); });
  } catch (err) {
    revealAll();
  }
})();

/* ---------- 4. 回到顶部按钮 ---------- */
(function backToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  // 滚动超过一屏高度时显示按钮
  window.addEventListener("scroll", () => {
    const show = window.scrollY > 300;
    btn.classList.toggle("show", show);
  }, { passive: true });

  // 点击平滑滚回顶部（CSS 里也开了 html{scroll-behavior:smooth}，双保险）
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ---------- 5. 自动更新页脚年份 ---------- */
const footerText = document.querySelector("footer p");
if (footerText) {
  footerText.textContent =
    "© " + new Date().getFullYear() + " Made with AI × 昕征途技术社区";
}

/* ---------- 6. 开场页（Splash） ----------
   分界线：这一段负责"开场页"的入场与退场逻辑 */
(function splash() {
  const splash = document.getElementById("splash");
  const title = document.getElementById("splashTitle");
  const hint = document.getElementById("splashHint");
  if (!splash || !title || !hint) return;

  // 系统开了"减弱动效"时，跳过打字动画，直接显示全部文字
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 打字机：逐字打出主标题，打完显示呼吸提示 */
  const fullText = "点击来了解我";         // ← 改这里即可换主标题文字
  const speed = reduceMotion ? 0 : 120;   // 每字间隔毫秒，想快改小、想慢改大
  let i = 0;
  function step() {
    title.textContent = fullText.slice(0, i);
    i++;
    if (i <= fullText.length) setTimeout(step, speed);
    else hint.classList.add("show");      // 打完后淡入"点击任意处进入"
  }
  step();

  let leaving = false;                    // 防重复触发：正在过渡则忽略再次点击

  function enter(cx, cy) {
    if (leaving) return;                  // 已在过渡中，直接忽略
    leaving = true;
    // 记录圆心坐标（px）；未传参则用屏幕中心（键盘进入时）
    splash.style.setProperty("--cx", typeof cx === "number" ? cx + "px" : "50%");
    splash.style.setProperty("--cy", typeof cy === "number" ? cy + "px" : "50%");
    title.classList.add("clicked");       // 加分项：标题先放大一下再消失
    splash.classList.add("leaving");      // 触发 CSS 圆形扩散过渡(约0.7s)
    // 过渡结束再彻底移出 DOM；再用 setTimeout 双保险，避免个别浏览器
    // 不支持 clip-path 过渡而卡住封面
    const remove = () => splash.remove();
    splash.addEventListener("transitionend", remove, { once: true });
    setTimeout(remove, 1100);
  }

  splash.addEventListener("click", (e) => enter(e.clientX, e.clientY));
  // 无障碍：键盘 Enter / 空格 也能从中心进入
  splash.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enter(); }
  });
})();