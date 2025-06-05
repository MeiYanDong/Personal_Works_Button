// portfolio-button.js
class PortfolioButton extends HTMLElement {
  constructor() {
    super();
    // 创建隔离的Shadow DOM，避免样式污染
    this.attachShadow({ mode: 'open' });
    
    // 渲染初始按钮
    this.render();
    
    // 加载作品数据
    this.loadPortfolioData();
  }
  
  render() {
    // CSS 样式 - 所有样式都在Shadow DOM内部，不影响外部页面
    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: fixed;
        bottom: 20px;
        right: -24px; /* 默认按钮一半隐藏到屏幕外 */
        z-index: 9999;
        transition: right 0.3s ease, opacity 0.3s ease;
        opacity: 0.5; /* 默认半透明 */
      }
      
      :host(:hover) {
        right: 20px; /* 鼠标悬停时完全滑出 */
        opacity: 1; /* 鼠标悬停时完全显示 */
      }
      
      .portfolio-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%; /* 圆形按钮 */
        background: #B39DDB; /* 统一为新颜色 */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        border: none;
        outline: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        transform: rotate(270deg); /* 让 ^ 符号朝向左侧 */
        user-select: none;
      }
      
      .portfolio-btn:hover {
        background: #B39DDB; /* 悬停时同样为新颜色 */
      }
      
      .firework {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        pointer-events: none;
      }
      
      .particle {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        opacity: 1;
        transform: translate(-50%, -50%);
        animation: explode var(--duration, 0.8s) ease-out forwards;
      }
      
      @keyframes explode {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(
            calc(cos(var(--angle)) * var(--distance)), 
            calc(sin(var(--angle)) * var(--distance))
          ) scale(0.1);
        }
      }
      
      .portfolio-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      
      .modal-content {
        background: #1a1a2e; /* 深紫黑色背景 */
        color: #fff;
        width: 80%;
        max-width: 600px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        position: relative;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
      }
      
      .modal-title {
        margin: 0;
        padding: 20px;
        border-bottom: 1px solid #393e5b;
        color: #fff;
        font-size: 20px;
        text-align: center;
      }
      
      .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: transparent;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      
      .close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .list-container {
        overflow-y: auto;
        padding: 20px;
        max-height: 60vh;
      }
      
      .portfolio-item {
        display: flex;
        margin-bottom: 20px;
        padding: 15px;
        border-radius: 8px;
        background: #272741;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, background 0.2s;
      }
      
      .portfolio-item:hover {
        background: #32324e;
        transform: translateY(-3px);
      }
      
      .item-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 15px;
      }
      
      .item-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .item-title {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #fff;
      }
      
      .item-desc {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #b3b3cc;
        line-height: 1.4;
      }
      
      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .item-tag {
        background: #3f3f5f;
        color: #b3b3cc;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 12px;
        display: inline-block;
      }
    `;
    
    // 按钮元素
    const button = document.createElement('button');
    button.className = 'portfolio-btn';
    button.innerHTML = '^'; // 紫色"^"符号
    button.addEventListener('click', this.handleClick.bind(this));
    
    // 添加到Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(button);
  }
  
  // 点击按钮处理
  handleClick() {
    // 显示烟花动画
    this.createFirework();
    
    // 显示作品集弹窗
    this.showPortfolioModal();
  }
  
  // 创建烟花动画
  createFirework() {
    // 烟花容器
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // 创建多个散射粒子
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // 随机紫色系颜色
      const hue = Math.floor(270 + Math.random() * 30); // 紫色系色相：270-300
      const saturation = Math.floor(70 + Math.random() * 30); // 饱和度：70-100%
      const lightness = Math.floor(50 + Math.random() * 30); // 亮度：50-80%
      
      particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // 随机角度和距离
      const angle = Math.random() * Math.PI * 2; // 0-360度随机角度
      const distance = Math.random() * 100 + 50; // 50-150px随机距离
      
      // 设置动画持续时间（0.5-1秒）
      const duration = 0.5 + Math.random() * 0.5;
      particle.style.animationDuration = `${duration}s`;
      
      // 设置初始位置和目标位置
      particle.style.setProperty('--angle', angle);
      particle.style.setProperty('--distance', `${distance}px`);
      
      firework.appendChild(particle);
    }
    
    // 添加到Shadow DOM
    this.shadowRoot.appendChild(firework);
    
    // 动画结束后自动移除烟花元素
    setTimeout(() => {
      if (this.shadowRoot.contains(firework)) {
        this.shadowRoot.removeChild(firework);
      }
    }, 1000); // 1秒后移除（足够让所有粒子完成动画）
  }
  
  // 加载作品数据
  async loadPortfolioData() {
    try {
      // 从 data-src 属性获取 JSON 路径，默认为 './portfolio.json'
      const jsonUrl = this.getAttribute('data-src') || './portfolio.json';
      
      // 获取 JSON 数据
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        throw new Error(`无法加载数据: ${response.status}`);
      }
      
      // 解析 JSON
      const data = await response.json();
      
      // 保存到实例
      this.portfolioData = data;
      console.log('作品数据加载完成:', this.portfolioData);
    } catch (error) {
      console.error('加载作品数据出错:', error);
      this.portfolioData = []; // 出错时使用空数组
    }
  }
  
  // 显示作品集弹窗
  showPortfolioModal() {
    // 如果数据尚未加载，重新尝试加载
    if (!this.portfolioData) {
      this.loadPortfolioData().then(() => this.showPortfolioModal());
      return;
    }
    
    // 创建模态弹窗容器
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    
    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // 创建标题
    const title = document.createElement('h2');
    title.textContent = '我的作品集';
    title.className = 'modal-title';
    
    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', () => this.shadowRoot.removeChild(modal));
    
    // 创建作品列表容器（支持滚动）
    const listContainer = document.createElement('div');
    listContainer.className = 'list-container';
    
    // 生成作品列表
    const portfolioItems = this.portfolioData.map(item => {
      const itemElement = document.createElement('a');
      itemElement.className = 'portfolio-item';
      itemElement.href = item.url;
      itemElement.target = '_blank'; // 新窗口打开
      
      // 封面图
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.title;
      img.className = 'item-image';
      
      // 内容区（标题、描述、标签）
      const content = document.createElement('div');
      content.className = 'item-content';
      
      // 标题
      const itemTitle = document.createElement('h3');
      itemTitle.textContent = item.title;
      itemTitle.className = 'item-title';
      
      // 描述
      const desc = document.createElement('p');
      desc.textContent = item.desc;
      desc.className = 'item-desc';
      
      // 标签区
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'tags-container';
      
      // 添加每个标签
      if (item.tags && item.tags.length) {
        item.tags.forEach(tag => {
          const tagEl = document.createElement('span');
          tagEl.className = 'item-tag';
          tagEl.textContent = tag;
          tagsContainer.appendChild(tagEl);
        });
      }
      
      // 组装内容区
      content.appendChild(itemTitle);
      content.appendChild(desc);
      content.appendChild(tagsContainer);
      
      // 组装整个项目
      itemElement.appendChild(img);
      itemElement.appendChild(content);
      
      return itemElement;
    });
    
    // 将所有作品添加到列表容器
    portfolioItems.forEach(item => listContainer.appendChild(item));
    
    // 组装弹窗
    modalContent.appendChild(title);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(listContainer);
    modal.appendChild(modalContent);
    
    // 点击弹窗背景关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.shadowRoot.removeChild(modal);
      }
    });
    
    // 添加到Shadow DOM
    this.shadowRoot.appendChild(modal);
  }
}

// 注册自定义元素
customElements.define('portfolio-button', PortfolioButton); 