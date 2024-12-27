export interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
  description?: string;
  audience?: string;
  pages?: number;
  year?: number;
  publisher?: string;
  plot?: string;
}