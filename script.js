// 后续新增推广链接时，只需要在这个数组继续追加对象。
// 字段说明: title 卡片标题, desc 展示描述, category 分类名称, url 推广链接。
const links = [
  {
    title: '狗云',
    desc: '香港 BGP，1C1G 100M，25 元/月。',
    category: '服务器',
    url: 'https://example.com/your-aff-link-gouyun'
  },
  {
    title: '雨云',
    desc: '湖北 100G 高防，8C8G 20M，96 元/月；香港四区，2C2G 50M，33 元/月；9950X 高防，4C8G 15M，200 元/月；14900K 高防，4C8G 15M，176 元/月；宁波 8272CL，4C8G 300M，98 元/月。',
    category: '服务器',
    url: 'https://www.rainyun.com/MTA2MjEyMg==_'
  },
  {
    title: '北少云',
    desc: '湖北 7950X 500G 高防，4C10G 15M，145 元/月；河南 8272CL，8C30G 20M，98 元/月。',
    category: '服务器',
    url: 'https://www.beishaoidc.cn/aff/WTOKELHJ'
  },
  {
    title: '莱卡云',
    desc: '宁波电信 IPv6/v4 双栈网络，2C4G 10M，30.4 元/月；香港 CN2-GIA，1C2G 15M，66 元/月。',
    category: '服务器',
    url: 'https://www.lcayun.com/aff/OZKNRZPP'
  },
  {
    title: '硅基流动',
    desc: '超低价格 API 接口，适合开发者和学生练习使用。',
    category: 'API 接口',
    url: 'https://cloud.siliconflow.cn/i/Zx0kuVtq'
  },
  {
    title: 'MCBBS 相关主机',
    desc: '服务器资源入口，适合有游戏服和建站需求的用户。',
    category: '服务器',
    url: 'https://mc.gfyidc.com/aff/JNDYVBKY'
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
  totalLinks.textContent = String(links.length);
  totalClicks.textContent = String(clickCount);
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
      localStorage.setItem('clickCount', String(clickCount));
      updateStats();
    });

    linksContainer.appendChild(node);
  });
}

updateStats();
renderFilters();
renderLinks();
