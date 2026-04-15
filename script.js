// 深色模式切换
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 检查本地存储中的主题设置
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    themeToggle.textContent = '切换浅色模式';
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '切换深色模式';
  } else {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '切换浅色模式';
  }
});

// 卡片动画（使用Intersection Observer）
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0s';
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// 观察项目卡片
document.querySelectorAll('.project-card').forEach(card => {
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});
