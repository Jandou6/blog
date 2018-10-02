interface Article {
  title:string;
  date:Date;
  link:string;
  tag?:string[];
}

export const article_list:Article[] = [
  {
    title: 'JavaScript模块化的历史',
    date: new Date(1538366347406),
    link: '/article_2018_10_01',
  },
  {
    title: 'React的服务器渲染(SSR)和预渲染（Pre-render）',
    date: new Date(1538497855257),
    link: '/article_2018_10_03',
  },
];