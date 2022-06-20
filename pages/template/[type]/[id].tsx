import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Controller from '../../../components/Controller'
import EditableTable from '../../../components/EditableTable'
import { IMAGE_MAP_WITH_TYPE } from '../../../utils/data'
import request from '../../../lib/request'
import { IMeasure, ITemplate } from '../../../type.d.ts'
import { IMAGE_PATH } from '../../../lib/contant'

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

  console.log('id type: ', id, type)

  // todo: 图片需要将measure绘制到图上
  const [imgSrc, setImgSrc] = useState<string>('')

  const [unit, setUnit] = useState<string>('')
  const [tableBody, setTableBody] = useState<any>([])
  const [tableHeader, setTableHeader] = useState<any>([])

  // use the id to request particular data
  const getData = useCallback(() => {
    request(`/template/${id}`).then((res) => {
      const { img, svg, measures } = res.data
      setImgSrc(img)
      generateTable(measures)
    })
  }, [id, type])

  const generateTable = (data: IMeasure[]) => {
    const header = data.map((item) => ({
      name: item.name,
      key: item.measure_id,
      type: 'feature',
    }))

    header.unshift({ key: count++, name: 'custom', type: 'feature' })

    const body = Array(header.length + 1)
      .fill(0)
      .map((_, index) => {
        return { key: count++ }
      })

    setTableBody([body])
    setTableHeader(header)
  }

  useEffect(() => {
    getData()
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

    request({
      method: 'POST',
      url: '/template/ack',
    }).then((res) => {
      // TODO: post获取一个图片地址？
      // 此处的id可以随机一个
      console.log('res: ', res.data.img)
      const resultId = res.data.img.match(/\d+/g)[0]
      router.push(`/output/${resultId}`)
    })
  }, [tableBody, tableHeader, unit])

  const switchFn = (value: string) => {
    setUnit(value)
  }

  return (
    <section className="container gap-8 columns-1">
      <Controller onSwitch={switchFn} />
      <Image
        src={`${IMAGE_PATH}/${imgSrc}`}
        width={400}
        height={400}
        alt="类型图片"
      />
      <section className="my-8">
        <EditableTable header={tableHeader} body={tableBody} update={update} />
      </section>
      <section className="my-4">
        <button className="btn-primary mx-1" onClick={add}>
          Add Table Row
        </button>
        <button onClick={generate} className="btn-primary mx-1">
          Generate
        </button>
      </section>
    </section>
  )
}

// what did this used for
export async function getServerSideProps() {
  return {
    props: {},
  }
}
