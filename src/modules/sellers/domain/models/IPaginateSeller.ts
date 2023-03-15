import { ISeller } from './ISeller';

export interface IPaginateSeller {
  per_page: number;
  total: number;
  current_page: number;
  data: ISeller[];
}