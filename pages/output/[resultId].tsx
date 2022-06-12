import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '../../components/Loading'
import { MouseEventHandler, useCallback } from 'react'
import { copyTextToClipboard, downloadImage } from '../../lib/utils'
import { debounce } from 'lodash'
import { toast } from 'react-toastify'
import Image from 'next/image'

const Result = (props: any) => {
  const router = useRouter()
  const { resultId } = router.query

  const { data, error } = useSWR(`/output/${resultId}`)

  /**
   * 复制
   */
  const copy: (type: string) => void = useCallback(
    (type: string) => {
      let result = ''
      switch (type) {
        case 'url':
          result = data.url
          break
        case 'html':
          result = `<img src={data.url} width={100%} height={100%} alt="模版结果图片" />`
          break
        default:
          result = `<iframe src='${data.url}' style="display: block; border: 0; width:100%; height:100%"></iframe>`
          break
      }
      copyTextToClipboard(result)
    },
    [resultId, data]
  )

  const save = useCallback(() => {
    downloadImage(data.url).catch(() => {
      toast.error('download image fail')
    })
  }, [resultId, data])

  // TODO: 做一个loading页面，暂时只有这里需要Loading
  return !data && !error ? (
    <Loading />
  ) : (
    <div className="m-6 text-center">
      <section className="py-10">
        <p className="py-2">size chart url</p>
        <p className="py-4">{data.url}</p>
        <div className="flex justify-between max-w-md m-auto">
          {/*// @ts-ignore*/}
          <button onClick={copy.bind(null, 'url')} className="btn-primary">
            Copy URL
          </button>
          {/*// @ts-ignore*/}
          <button onClick={copy.bind(null, 'html')} className="btn-primary">
            Copy HTML
          </button>
          <button onClick={save} className="btn-primary">
            Save Image
          </button>
        </div>
      </section>
      <section className="my-3">
        <p>Dynamic size Chart</p>
        <p className="py-4">{`<iframe src='${data.url}' style="display: block; border: 0; width:100%; height:100%"></iframe>`}</p>
        {/*// @ts-ignore*/}
        <button onClick={copy} className="btn-primary">
          Copy Code
        </button>
      </section>
      <section>
        <p className="my-3">Preview</p>
        <Image src={data.url} alt="结果图片" />
      </section>
    </div>
  )
}

// what did this used for
// why add this on dynamic page will resolve the problem
export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default Result
