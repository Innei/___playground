import * as React from 'react'
import { FC } from 'react'

export const Message: FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    content: string
    attachment: string | null
    attachmentHeight: number
    attachmentWidth: number
  }
> = ({
  children,
  content,
  attachment,
  attachmentHeight,
  attachmentWidth,
  ...rest
}) => {
  return (
    <div className="message-wrap" {...rest}>
      <div className="avatar"></div>
      <div className="message-content-wrap">
        <div className="message-meta">
          Innei
          <small>Time placeholder</small>
        </div>
        <div className="message-content">
          <div className="content">{content}</div>
          {attachment && (
            <img
              src={attachment}
              height={attachmentHeight}
              width={attachmentWidth}
            />
          )}
        </div>
      </div>
    </div>
  )
}
