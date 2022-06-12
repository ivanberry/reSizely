/**
 * https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * @author Dean Taylor
 * @param text
 */
import { toast } from 'react-toastify'
import useSWR from 'swr'

// TODO: fail to notice
function fallbackCopyTextToClipboard(text: any) {
  let textArea = document.createElement('textarea')
  textArea.value = text

  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    let successful = document.execCommand('copy')
    let msg = successful ? 'successful' : 'unsuccessful'
    toast.success('Fallback: Copying text command was ' + msg)
  } catch (err) {
    toast.error('Fallback: Oops, unable to copy ' + err)
  }

  document.body.removeChild(textArea)
}

function copyTextToClipboard(text: any) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('xxxx')
      toast.success('Async: Copying to clipboard was successful!')
    },
    function (err) {
      toast.error('Async: Could not copy text: ', err)
    }
  )
}

/**
 * 利用图片地址下载图片
 * @param imageSrc
 */
async function downloadImage(imageSrc: string) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'image file name here'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export { copyTextToClipboard, downloadImage }
