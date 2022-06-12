import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IMAGE_MAP_WITH_TYPE } from '../../utils/data'
import Template from '../../components/TemplateImage'

interface ICategory {
  imageType: string
  feature: any[]
}

const Category = () => {
  const router = useRouter()
  const { type } = router.query

  const [categoryImages, setCategoryImages] = useState<ICategory[]>([
    { imageType: '', feature: [] },
  ])

  useEffect(() => {
    // [
    //   { imageType: "8", feature: ["袖长", "胸围", "臂展"] },
    //   { imageType: "10", feature: ["修长"] },
    //   { imageType: "12", feature: ["胸围"] },
    //   { imageType: "22", feature: ["臂展"] },
    // ]
    const images = IMAGE_MAP_WITH_TYPE.get(type as string)
    if (images) {
      setCategoryImages(images)
    }
  }, [type])

  return (
    <section className="pt-4">
      <h1>{type}</h1>
      <ul className="container grid grid-cols-3 justify-evenly justify-items-center">
        {categoryImages.map(({ imageType }) => (
          <li key={imageType}>
            <Template src={imageType} type={type as string} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Category
