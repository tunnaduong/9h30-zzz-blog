# 9h30-zzz.blog

Blog cá nhân của **Dương Tùng Anh (Tunna Duong)**, xây dựng bằng Astro, tập trung vào trải nghiệm đọc nhanh, giao diện tối giản và nội dung tiếng Việt.

- Domain: [https://9h30-zzz.blog/](https://9h30-zzz.blog/)
- Tác giả: **Tung Anh Duong**
- Ngôn ngữ chính: **Tiếng Việt**

## 1) Tổng quan dự án

`9h30-zzz.blog` là một static blog dựa trên nền AstroPaper, được tùy biến để xuất bản các bài viết cá nhân theo nhiều chủ đề như công nghệ, đời sống, review và ghi chép cá nhân.

### Tính năng chính

- Viết bài bằng Markdown có schema rõ ràng.
- Tìm kiếm nội dung ngay trên trang.
- Phân trang bài viết, trang tag, trang archive.
- SEO tốt (sitemap, RSS, Open Graph).
- Hỗ trợ dark mode/light mode.
- Tạo ảnh OG động cho bài viết.
- Chia sẻ bài viết qua nhiều mạng xã hội.

## 2) Công nghệ sử dụng

- **Framework**: Astro 5
- **Ngôn ngữ**: TypeScript
- **Style**: Tailwind CSS 4
- **Markdown plugins**: `remark-toc`, `remark-collapse`
- **Search indexing**: Pagefind
- **Lint**: ESLint
- **Format**: Prettier
- **Container**: Docker + Docker Compose

## 3) Cấu trúc thư mục

```text
/tmp/workspace/tunnaduong/9h30-zzz-blog
├── public/                # static assets (favicon, og image, ...)
├── src/
│   ├── assets/            # icons, images
│   ├── components/        # UI components
│   ├── data/blog/         # toàn bộ bài viết Markdown
│   ├── layouts/           # layout cho page/post/about
│   ├── pages/             # route Astro/Markdown
│   ├── scripts/           # script phía client
│   ├── styles/            # CSS global + typography
│   ├── utils/             # helper functions
│   ├── config.ts          # cấu hình chính của site
│   ├── constants.ts       # social/share links
│   └── content.config.ts  # schema content collection
├── astro.config.ts        # cấu hình Astro
├── package.json           # scripts + dependencies
├── docker-compose.yml     # chạy local bằng Docker
└── Dockerfile             # build static + serve bằng nginx
```

## 4) Yêu cầu môi trường

- Node.js LTS (khuyến nghị 20+)
- npm hoặc pnpm

## 5) Cài đặt và chạy local

### Cách 1: Chạy trực tiếp bằng npm

```bash
cd /tmp/workspace/tunnaduong/9h30-zzz-blog
npm install
npm run dev
```

Mặc định app chạy tại: `http://localhost:4321`

### Cách 2: Chạy bằng Docker Compose

```bash
cd /tmp/workspace/tunnaduong/9h30-zzz-blog
docker compose up -d
```

## 6) Cấu hình site

Chỉnh file:

- `/tmp/workspace/tunnaduong/9h30-zzz-blog/src/config.ts`

Các trường quan trọng:

- `SITE.website`: URL production của blog.
- `SITE.author`, `SITE.title`, `SITE.desc`: thông tin thương hiệu.
- `SITE.lang`, `SITE.timezone`: ngôn ngữ và múi giờ hiển thị.
- `SITE.postPerIndex`, `SITE.postPerPage`: số bài trên mỗi trang.
- `SITE.dynamicOgImage`: bật/tắt OG image động.

## 7) Cách tạo bài viết mới

1. Tạo file `.md` trong:
   - `/tmp/workspace/tunnaduong/9h30-zzz-blog/src/data/blog`

2. Khai báo frontmatter đúng schema (xem trong `src/content.config.ts`), tối thiểu gồm:

- `title`
- `description`
- `pubDatetime`
- `tags`

3. Viết nội dung Markdown và lưu file.

> Lưu ý: bài có `draft: true` sẽ không hiển thị như bài publish.

## 8) Scripts quan trọng

Chạy tại thư mục gốc dự án:

```bash
npm run dev           # chạy môi trường phát triển
npm run build         # check + build + tạo search index pagefind
npm run preview       # chạy bản build để kiểm tra local
npm run lint          # lint code với ESLint
npm run format:check  # kiểm tra format với Prettier
npm run format        # tự động format code
npm run sync          # đồng bộ type cho Astro
```

## 9) Biến môi trường

Dự án hiện hỗ trợ biến public:

```bash
PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

Dùng để thêm thẻ xác minh Google Search Console vào `<head>`.

## 10) Build & deploy

Luồng build hiện tại:

1. `astro check`
2. `astro build`
3. `pagefind --site dist`
4. copy `dist/pagefind` sang `public/`

Sau build thành công, output nằm trong thư mục `dist/`.

## 11) Giấy phép

Dự án theo giấy phép **MIT**.
