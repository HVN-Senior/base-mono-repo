import { FC, PropsWithChildren } from 'react';

export interface IPaging {
  page?: number;
  limit?: number;
}

export interface IListPaging<T extends unknown = any[]> {
  pagination: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  result: T[];
}

export interface IAxiosResponse<T extends unknown> {
  data: T;
  meta: {
    pagination: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface ObjectLiteral<T extends unknown = string> {
  [s: string]: T;
}

export interface IOption<T> {
  name: string;
  value: T;
}

export interface ISelectOption<T> {
  label: string;
  value: T;
}

export interface IdType {
  id: any;
}

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
  React.ComponentPropsWithoutRef<ElementType>,
  PropsToOmit
>;
