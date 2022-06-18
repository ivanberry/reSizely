import type { NextPage } from 'next'
import { createContext, useContext, useEffect, useState } from 'react'
import { ICategory, INIT } from '../type.d.ts'
import { CategoryContext } from './_app'
import TemplateImage from '../components/TemplateImage'

const Home = () => {
  const categoryList = useContext(CategoryContext)

  return (
    // @ts-ignore
    <section className="pt-4">
      {categoryList.map((c, index) => (
        <div key={c.cat_id + index}>
          <h2>{c.name}</h2>
          <ul className="container grid grid-cols-3 justify-evenly justify-items-center">
            {c.items.map(({ item_id, name, img }, index) => (
              <li key={item_id + index}>
                <TemplateImage
                  item_id={item_id}
                  src={img}
                  type={name.split(' ').join('_')}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default Home
