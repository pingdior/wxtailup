wxtailup 是一个动物版类似抖音（TikTok）的视频分享软件。每个动物都有自己的主页、所属小窝和日常活动视频分享功能。该项目旨在为流浪动物提供更多曝光机会，促进领养与关爱。

## 主要功能
1. 视频分享：流浪动物日常生活视频分享。
2. 动物主页管理：支持动物主页的编辑，以及视频的增删查浏览。
3. 所有权转移：支持将动物所有权转移给指定基地或小窝管理者。
4. 角色管理：
- 基地和小窝管理员：可进行动物信息、领养等管理。
- 普通用户：支持关注、打赏、领养等功能。
5. 社区互动：用户可以点赞、评论、分享视频，增加动物的曝光度。

## 界面介绍
三个页面展示：尾巴翘首页、二虎的主页和给毛孩子礼物的窝
<figure class="third">
    <img src="https://github.com/pingdior/wxtailup/blob/main/%E5%B0%BE%E5%B7%B4%E7%BF%98%E9%A6%96%E9%A1%B5.jpg" width=20% alt="尾巴翘首页">
    <img src="https://github.com/pingdior/wxtailup/blob/main/%E4%BA%8C%E8%99%8E%E7%9A%84%E4%B8%BB%E9%A1%B5.jpg" width=20% alt="二虎的主页">
    <img src="https://github.com/pingdior/wxtailup/blob/main/%E7%BB%99%E6%AF%9B%E5%AD%A9%E5%AD%90%E7%A4%BC%E7%89%A9%E7%9A%84%E7%AA%9D.jpg" width=20% alt="给毛孩子礼物的窝">
</figure>

## 技术框架
![尾巴翘流浪动物之家](https://github.com/pingdior/wxtailup/blob/main/%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%841.0.png)

## 技术栈
前端：Vue.js
后端：Node.js, Java
数据库：MySQL

## 安装与运行
按以下步骤安装和运行项目：

- 前置条件
确保已安装以下环境：
Node.js (建议版本 >= 14.x)
MySQL 数据库
Java 环境 (建议版本 >= 11)
- 克隆项目
git clone https://github.com/pingdior/wxtailup.git
cd wxtailup
- 安装依赖
npm install
- 配置数据库
创建 MySQL 数据库：

CREATE DATABASE wxtailup;
导入项目提供的数据库初始化脚本（位于 /database 文件夹中）。

在项目的配置文件中设置数据库连接信息（如 config.js 或 .env 文件）：

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=wxtailup
启动项目
启动后端服务
npm run server
启动前端服务
npm run dev
访问应用
在浏览器中打开 http://localhost:3000 查看项目运行效果。

## 项目结构

```markdown
wxtailup/
├── frontend/          # 前端代码（Vue.js）
├── backend/           # 后端代码（Node.js 和 Java）
├── database/          # 数据库初始化脚本
├── config/            # 配置文件
├── README.md          # 项目说明文档
└── LICENSE            # 许可证文件
```
## 贡献指南
欢迎对本项目的贡献！请按照以下步骤参与贡献：

Fork 本仓库。
创建一个新分支：
git checkout -b feature/YourFeatureName
提交您的更改：
git commit -m "Add some feature"
推送到您的分支：
git push origin feature/YourFeatureName
发起 Pull Request。
许可证
本项目基于 MIT License 开源，欢迎自由使用和修改。

联系方式
如果您有任何问题或建议，请通过以下方式联系我们：

项目主页：https://github.com/pingdior/wxtailup
提交问题：GitHub Issues
邮箱：example@example.com


