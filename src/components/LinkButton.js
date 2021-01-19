import React from 'react'

import { useScanStore } from 'hooks/store/use-scan-store'
import { useLog } from 'hooks/use-log'
import ActionButton from 'components/ActionButton'

export const LinkButton = ({ link }) => {
  const { scanToken } = useScanStore
  const { sendLog } = useLog()

  const handleClick = async () => {
    try {
      if (scanToken) {
        await sendLog({
          url: '/scans',
          data: {
            click: { type: 'link', destination: link.url },
            scanToken,
          },
        })
      }
    } catch (err) {}
  }

  return (
    <ActionButton
      onClick={handleClick}
      target="_blank"
      href={link.url}
      label={link.name}
    />
  )
}
