interface Article {
  title:string;
  date:Date;
  link:string;
  tag?:string[];
}

export const article_list:Article[] = [
  {
    title: '博客的重构',
    date: new Date(),
    link: '/article_2018_10_01', // for test,
  },
];