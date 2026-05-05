export const SITE = {
  website: "https://9h30-zzz.blog/", // replace this with your deployed domain
  author: "Tung Anh Duong",
  profile: "https://tunnaduong.com/",
  desc: "Gác lại dòng code, trở lại thực tại và ngủ trước 9:30.",
  title: "Tùng.",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/tunnaduong/9h30-zzz-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "vi", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
