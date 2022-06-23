import { debounce, findIndex } from 'lodash'
import React, { ChangeEvent } from 'react'

/**
 * cell元素具体内容，此处为动态的列名
 */
interface Item {
  key: string
}

/**
 * 可编辑表格cell props
 */
interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

interface IHeaderCellProps {
  key: string | number
  name: string
  type?: string
}

interface IBodyCellProps {
  key: string | number
  value?: string | number
  type?: string
}

interface IEditableProps {
  header: IHeaderCellProps[]
  body: IBodyCellProps[][]
  update: (v: any) => void
}

/**
 * 可编辑table
 * 可以编辑的cell
 * @param props
 * @constructor
 */
const EditableTable = (props: IEditableProps) => {
  const { header, body, update } = props

  const save = debounce(
    (
      e: ChangeEvent<HTMLInputElement>,
      key: string | number,
      type: 'CUSTOM' | 'BODY'
    ) => {
      for (let i = 0; i < body.length; i++) {
        const _index = findIndex(body[i], ({ key: _k }) => _k === key)
        if (_index !== -1) {
          body[i][_index] = { key: body[i][_index].key, value: e.target.value }
        }
      }

      update([body, header])
    },
    350
  )

  return (
    <section className="my-10">
      <ul className="flex space-between text-center">
        <li className="basis-1/4"></li>
        {header.map(({ key, name }) =>
          name === 'custom' ? (
            <li key={key} className="basis-1/4 border border-black">
              <input
              className='w-full'
                type="text"
                placeholder="Custom"
                onChange={(e) => save(e, 'custom', 'CUSTOM')}
              />
            </li>
          ) : (
            <li key={key} className="basis-1/4 border border-black">
              {name}
            </li>
          )
        )}
      </ul>
      {body.map((item, index) => (
        <ul key={index} className="flex space-between text-center">
          {item.map(({ key }) => (
            <li key={key} className="basis-1/4 border border-black">
              <input className='w-full' type="text" onChange={(e) => save(e, key, 'BODY')} />
            </li>
          ))}
        </ul>
      ))}
    </section>
  )
}

export default EditableTable
