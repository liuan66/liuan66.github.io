const links = [
  {
    title: '雨云',
    desc: '超低价vps 各种服务器',
    category: '工具',
    url: 'https://www.rainyun.com/MTA2MjEyMg==_'
  },
  {
    title: '硅基流动',
    desc: '超低价格api接口，适合开发者和学生练习使用',
    category: '工具',
    url: 'https://cloud.siliconflow.cn/i/Zx0kuVtq'
  },
  {
    title: 'mcbbs',
    desc: '超低价vps 各种服务器',
    category: '学习',
    url: 'https://mc.gfyidc.com/aff/JNDYVBKY'
  },
  {
    title: '云服务器新用户包',
    desc: '适合建站和练习部署，活动页会随时间变动。',
    category: '工具',
    url: 'https://example.com/your-aff-link-4'
  },
  {
    title: '日用好物特惠专区',
    desc: '汇总高频消费品，方便每天顺手领券下单。',
    category: '电商',
    url: 'https://example.com/your-aff-link-5'
  },
  {
    title: '外语学习会员活动',
    desc: '新账号注册福利较多，适合入门用户。',
    category: '学习',
    url: 'https://example.com/your-aff-link-6'
  }
];

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const linksContainer = document.getElementById('links');
const filtersContainer = document.getElementById('filters');
const template = document.getElementById('linkCardTemplate');
const totalLinks = document.getElementById('totalLinks');
const totalClicks = document.getElementById('totalClicks');

let activeCategory = '全部';
let clickCount = parseInt(localStorage.getItem('clickCount') ?? '0', 10);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
}
themeToggle.textContent = body.getAttribute('data-theme') === 'dark' ? '切换浅色' : '切换深色';

themeToggle.addEventListener('click', () => {
  const nextDark = body.getAttribute('data-theme') !== 'dark';
  if (nextDark) {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '切换浅色';
    return;
  }

  body.removeAttribute('data-theme');
  localStorage.setItem('theme', 'light');
  themeToggle.textContent = '切换深色';
});

function updateStats() {
  totalLinks.textContent = links.length;
  totalClicks.textContent = clickCount;
}

function renderFilters() {
  const categories = ['全部', ...new Set(links.map((item) => item.category))];
  filtersContainer.innerHTML = '';

  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = category === activeCategory ? 'filter-btn active' : 'filter-btn';
    btn.textContent = category;

    btn.addEventListener('click', () => {
      activeCategory = category;
      renderFilters();
      renderLinks();
    });

    filtersContainer.appendChild(btn);
  });
}

function renderLinks() {
  linksContainer.innerHTML = '';

  const visible = activeCategory === '全部'
    ? links
    : links.filter((item) => item.category === activeCategory);

  visible.forEach((item) => {
    const node = template.content.cloneNode(true);

    node.querySelector('.link-category').textContent = item.category;
    node.querySelector('.link-title').textContent = item.title;
    node.querySelector('.link-desc').textContent = item.desc;

    const btn = node.querySelector('.link-btn');
    btn.href = item.url;
    btn.addEventListener('click', () => {
      clickCount += 1;
      localStorage.setItem('clickCount', clickCount);
      updateStats();
    });

    linksContainer.appendChild(node);
  });
}

updateStats();
renderFilters();
renderLinks();
