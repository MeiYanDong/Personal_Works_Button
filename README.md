# 作品集按钮 (Portfolio Button)

一个极简的**紫色作品集按钮**，可以轻松集成到任何网页中，无需重新部署原有页面即可更新作品列表。

## 功能特点

- **半隐藏式设计**：按钮默认贴边半隐藏，鼠标悬停时完全显示
- **紫色烟花动画**：点击按钮时播放紫色烟花特效
- **紫黑色弹窗**：极简风格的紫黑色弹窗，展示所有作品
- **远程数据源**：作品数据从远程 JSON 加载，更新无需重新部署
- **零侵入性**：使用 Web Components，不会影响现有页面样式和功能
- **响应式设计**：适应各种屏幕尺寸

## 如何使用

### 1. 准备文件

你需要准备以下文件：

- `portfolio-button.js` - 按钮组件代码
- `portfolio.json` - 作品清单数据

### 2. 在 GitHub 托管 JSON 数据

1. 在 GitHub 创建一个公开仓库（如 `portfolio`）
2. 上传 `portfolio.json` 和作品图片（建议放在 `Pictures` 文件夹）
3. 使用 jsDelivr 生成 CDN 链接，例如：
   ```
   https://cdn.jsdelivr.net/gh/你的用户名/portfolio/portfolio.json
   ```

### 3. 在网页中嵌入按钮

只需在任何网页的 `</body>` 标签前添加以下代码：

```html
<!-- 作品集按钮 -->
<script defer src="https://你的托管地址/portfolio-button.js"></script>
<portfolio-button data-src="https://cdn.jsdelivr.net/gh/你的用户名/portfolio/portfolio.json"></portfolio-button>
```

其中 `data-src` 属性指向你托管的作品清单 JSON 文件。

### 4. JSON 文件格式

```json
[
  {
    "title": "作品标题",
    "url": "作品链接",
    "img": "封面图片链接", 
    "desc": "作品描述",
    "tags": ["标签1", "标签2"]
  },
  {
    "title": "第二个作品",
    "url": "https://example.com",
    "img": "https://cdn.jsdelivr.net/gh/你的用户名/portfolio/Pictures/example.png", 
    "desc": "这是第二个作品的描述",
    "tags": ["标签1", "标签3"]
  }
]
```

## 更新作品

只需编辑 `portfolio.json` 并推送到 GitHub 仓库，所有使用该按钮的网页会自动获取最新数据。无需重新部署任何网页！

## 自定义调整

如需自定义按钮外观，请修改 `portfolio-button.js` 文件中的样式部分。

## 注意事项

- 确保 JSON 文件托管服务支持 CORS（jsDelivr 已默认支持）
- 推荐使用 jsDelivr CDN 以获得更快的全球访问速度
- 图片建议压缩到合适大小（约 100px 宽），提高加载速度
- 图片和 JSON 文件命名建议使用英文/拼音，避免中文路径问题

## 示例

查看 [example.html](./example.html) 获取完整示例。

## 许可

MIT 许可证 