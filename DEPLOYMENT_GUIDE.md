# 快速部署指南 / Quick Deployment Guide / คู่มือการปรับใช้งาน

## 本地预览 / Local Preview / การดูตัวอย่างในเครื่อง

### 方法一：使用 Python（推荐）

```bash
# 进入项目目录
cd apartment-booking-h5

# 启动本地服务器
python3 -m http.server 8080

# 或者 Python 2
python -m SimpleHTTPServer 8080
```

然后在浏览器打开：`http://localhost:8080`

### 方法二：使用 VS Code Live Server 插件

1. 安装 "Live Server" 插件
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

---

## 在线部署 / Online Deployment / การปรับใช้ออนไลน์

### 方案一：Vercel（最简单，推荐）

1. **将代码推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 点击 "Deploy"（无需任何配置）
   - 30秒后获得免费 HTTPS 链接

### 方案二：Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `apartment-booking-h5` 文件夹到页面中
3. 几秒钟后获得访问链接

### 方案三：GitHub Pages（免费）

1. 推送代码到 GitHub
2. 进入仓库设置 → Pages
3. 选择 `main` 分支，点击 Save
4. 获得链接：`https://yourname.github.io/repo-name`

---

## 自定义配置 / Customization / การปรับแต่ง

### 修改联系方式

编辑 `js/config.js` 文件：

```javascript
const CONTACT_INFO = {
    whatsapp: "8613800138000",  // 改成你的 WhatsApp 号码
    phone: "13800138000",        // 改成你的电话号码
    wechat: "your_wechat_id"     // 改成你的微信号
};
```

### 添加/修改房源

编辑 `data/apartments.json` 文件，复制现有房源模板并修改：

```json
{
  "id": "A007",
  "type": "studio",
  "area": "42㎡",
  "floor": "10F",
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
    "zh": ["你的特色1", "你的特色2"],
    "en": ["Your feature 1", "Your feature 2"],
    "th": ["คุณสมบัติของคุณ 1", "คุณสมบัติของคุณ 2"]
  },
  "images": [
    "图片URL1",
    "图片URL2"
  ]
}
```

### 修改界面文案

编辑 `data/translations.json`，修改所有显示的文本内容。

---

## 图片上传建议 / Image Upload Tips / เคล็ดลับการอัปโหลดรูปภาพ

### 免费图床推荐（适合测试）

- [Unsplash](https://unsplash.com) - 高质量免费图片
- [Pexels](https://pexels.com) - 免费商用图片
- [ImgBB](https://imgbb.com) - 免费图片托管

### 生产环境推荐

- 阿里云 OSS
- 腾讯云 COS
- AWS S3

**建议图片规格：**
- 封面图：800×600 像素（3:2 比例）
- 详情图：800×600 像素
- 缩略图：160×120 像素
- 格式：JPG 或 WebP
- 大小：每张不超过 500KB

---

## 分享链接生成 / Share Link Generation / การสร้างลิงก์แบ่งปัน

部署成功后，直接复制生成的 HTTPS 链接，通过微信群或其他方式分享给留学生即可。

**示例：**
```
https://premium-residence.vercel.app
```

---

## 常见问题 / FAQ / คำถามที่พบบ่อย

### Q: 如何更换 Hero 区的背景图？
A: 编辑 `css/style.css`，找到 `.hero-image::before`，修改 `background` 的 URL。

### Q: 如何调整颜色主题？
A: 在 `css/style.css` 顶部修改 CSS 变量：
```css
:root {
    --color-gold: #c9a962;  /* 修改金色主题色 */
    --color-primary: #1a1a1a; /* 修改主色调 */
}
```

### Q: 手机上显示不正常怎么办？
A: 确保使用 HTTPS 链接访问，部分浏览器对 HTTP 链接有限制。

### Q: 如何添加更多语言？
A:
1. 在 `js/config.js` 添加语言代码
2. 在 `data/translations.json` 添加对应的翻译
3. 在 `index.html` 添加语言切换按钮

---

**技术支持 / Technical Support / การสนับสนุนทางเทคนิค**

如有问题，请检查浏览器控制台（F12）查看错误信息。

---

**Enjoy your premium apartment booking platform! 🏢**
