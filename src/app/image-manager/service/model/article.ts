import { Image } from './image';

export interface Article {
  about: string;
  images: Image[];
  title: string;
  nextArticleTitle1: string;
  nextArticleTitle2: string;
  titleBeforeEdit: string | null;
  order: null | number;
}
