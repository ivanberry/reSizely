import { createContext } from 'react'

export interface ICategoryName {
  item_id: number
  name: string
  img: string
}

export interface ICategory {
  cat_id: number
  name: string
  items: ICategoryName[]
}

export const INIT_NAME: ICategoryName = {
  item_id: 0,
  name: '',
  img: '',
}

export const INIT: ICategory = {
  cat_id: 0,
  name: '',
  items: [INIT_NAME],
}

// template data structure
export interface ITemplate {
  img: string
  measures: IMeasure[]
  svg: ''
}

export interface IMeasure {
  measure_id: number
  name: string
  left: number
  top: number
}
