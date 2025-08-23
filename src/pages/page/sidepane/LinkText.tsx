import {LinkExternalIcon} from '@primer/octicons-react'
const LinkText = ({text}:{text:string}) => {
  return (
    <div className="flex flex-row gap-1"><LinkExternalIcon size={16}/>{text}</div>
  )
}

export default LinkText