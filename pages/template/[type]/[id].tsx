import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Controller from '../../../components/Controller'
import EditableTable from '../../../components/EditableTable'
import { IMAGE_MAP_WITH_TYPE } from '../../../utils/data'
import request from '../../../lib/request'

interface IProps {
  type: string
}

interface ITemplateApi {
  id: string
  url?: string
}

let count = 0

/**
 * 模版编辑页面，包含了模板大类，小类 type.id
 */
export default function Template(props: IProps) {
  const router = useRouter()
  const { id, type } = router.query

  const [unit, setUnit] = useState<string>('')
  const [tableBody, setTableBody] = useState<any>([])
  const [tableHeader, setTableHeader] = useState<any>([])

  useEffect(() => {
    // @ts-ignore
    const header = IMAGE_MAP_WITH_TYPE.get(type as string)
      .find((item: any) => item.imageType === id)
      .feature.map((f: any, index: number) => ({
        name: f,
        key: index,
        type: 'feature',
      }))

    const body = Array(header.length + 2)
      .fill(0)
      .map((_, index) => {
        return { key: count++ }
      })

    // add custom header to the header
    header.unshift({ key: count++, name: 'custom', type: 'feature' })
    setTableHeader(header)
    setTableBody([body])
  }, [type])

  // 新增行, key值可以有更好的方案，比如自增数字，或者uuid
  const add = () => {
    const newTableBody = cloneDeep(tableBody)
    newTableBody.push(
      Array(tableHeader.length + 1)
        .fill(0)
        .map((_, index) => {
          return { key: count++ }
        })
    )
    setTableBody(newTableBody)
  }

  const update = (value: any) => {
    const [bodyValues, headerValues] = value
    setTableBody(bodyValues)
    setTableHeader(headerValues)
  }

  const generate = useCallback(() => {
    // TODO: call api to get some date to render the next page
    console.log('generate: ', tableBody, tableHeader, unit)

    // TODO: 把数据给后台，返回一个id，到下一个页面，通过id获取对应的数据
    // @ts-ignore 这种类型要怎么写呢？
    request('/templates/1').then((res: ITemplateApi) => {
      const { id, url } = res
      console.log('res: ', res, id, url)
      router.push(`/output/${id}`)
    })
  }, [tableBody, tableHeader, unit])

  const switchFn = (value: string) => {
    setUnit(value)
  }

  return (
    <section className="container gap-8 columns-1">
      <Controller onSwitch={switchFn} />
      <Image
        src={`/images/${id}.jpg`}
        width={400}
        height={400}
        alt="类型图片"
      />
      <section>
        <button onClick={add}>Add</button>
        <EditableTable header={tableHeader} body={tableBody} update={update} />
      </section>
      <button onClick={generate} className="btn-primary">
        Generate
      </button>
    </section>
  )
}

// what did this used for
export async function getServerSideProps() {
  return {
    props: {},
  }
}
