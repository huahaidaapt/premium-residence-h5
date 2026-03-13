# 高端公寓看房H5平台

一个专为海外留学生打造的高端公寓看房平台，采用五星级酒店预订系统的视觉风格，支持中英泰三语切换。

## 核心特性

- **高端视觉设计**：参考五星级酒店官网，深色系配色，大图展示，精致排版
- **多语言支持**：中/英/泰三语一键切换
- **移动优先**：完美适配手机端，流畅的触摸交互
- **配置化数据**：通过简单的JSON文件管理房源，无需修改代码
- **一键联系**：底部悬浮WhatsApp/电话按钮，快速预约

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 本地运行
```bash
npm run dev
```

### 3. 构建部署
```bash
npm run build
```

部署到 Vercel、Netlify 或任何静态托管服务即可。

## 房源数据配置

编辑 `data/apartments.json` 文件来管理房源信息。每套房源包含：

```json
{
  "id": "A001",
  "area": "45㎡",
  "floor": "12F",
  "price": {
    "zh": "¥6,800/月",
    "en": "¥6,800/month",
    "th": "฿34,000/เดือน"
  },
  "deposit": {
    "zh": "押一付三",
    "en": "1 month deposit + 3 months rent",
    "th": "มัดจำ 1 เดือน + เช่าล่วงหน้า 3 เดือน"
  },
  "features": {
    "zh": ["全南向", "精装修", "家电齐全", "采光充足"],
    "en": ["South-facing", "Fully furnished", "Home appliances included", "Excellent natural light"],
    "th": ["หันทางทิศใต้", "ตกแต่งพร้อมอยู่", "เครื่องใช้ไฟฟ้าครบ", "แสงธรรมชาติดี"]
  },
  "images": [
    "https://example.com/room1.jpg",
    "https://example.com/room2.jpg"
  ]
}
```

## 多语言配置

编辑 `data/translations.json` 文件来修改界面文本。

## 自定义联系信息

在 `js/config.js` 中修改联系方式：

```javascript
const CONTACT_INFO = {
  whatsapp: "your_whatsapp_number",
  phone: "your_phone_number",
  wechat: "your_wechat_id"
};
```

## 部署到 Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 点击 Deploy，30秒后即可上线

## 技术栈

- 原生 HTML5 + CSS3 + JavaScript
- 无需框架，轻量高效
- 响应式设计
- 图片懒加载优化

## 浏览器支持

- Chrome 90+
- Safari 14+
- Firefox 88+
- 移动端完美适配

---

**注意**：此平台为纯展示+预约版本，用户看好房源后通过底部按钮直接联系房东，无需在线支付或实时订房功能。
