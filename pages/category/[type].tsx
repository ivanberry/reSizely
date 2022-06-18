import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { IMAGE_MAP_WITH_TYPE } from '../../utils/data'
import Template from '../../components/TemplateImage'
import request from '../../lib/request'
import { ICategory, ICategoryName, INIT, INIT_NAME } from '../../type.d.ts'
import { CategoryContext } from '../_app'
import { renderIntoDocument } from 'react-dom/test-utils'
import { IMAGE_PATH } from '../../lib/contant'

/**
 * 某一大类的
 * @param props
 * @constructor
 */
const Category = (props: ICategory[]) => {
  const router = useRouter()
  const value = useContext(CategoryContext)
  const { type } = router.query

  console.log('value: ', value)

  const [categoryImages, setCategoryImages] = useState<ICategoryName[]>([
    INIT_NAME,
  ])

  useEffect(() => {
    // TODO: 需要大类只有一类
    const _images = value.filter((item) => item.name === type)
    setCategoryImages(_images[0]?.items)
  }, [type])

  return (
    <section className="pt-4">
      <h1>{type}</h1>
      <ul className="container grid grid-cols-3 justify-evenly justify-items-center">
        {categoryImages?.map(({ item_id, img, name }) => (
          <li key={item_id}>
            <Template item_id={item_id} src={img} type={type as string} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Category
