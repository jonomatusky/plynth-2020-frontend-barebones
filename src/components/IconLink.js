import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faLink } from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faTiktok,
  faSpotify,
  faYoutube,
  faSoundcloud,
  faBandcamp,
} from '@fortawesome/free-brands-svg-icons'
import { IconButton } from '@material-ui/core'

import { useScanStore } from 'hooks/store/use-scan-store'
import { useLog } from 'hooks/use-log'

export const IconLink = ({ link }) => {
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

  const types = [
    {
      name: 'instagram.com',
      fontAwesome: faInstagram,
      display: 'Instagram',
    },
    { name: 'facebook.com', fontAwesome: faFacebook, display: 'Facebook' },
    { name: 'twitter.com', fontAwesome: faTwitter, display: 'Twitter' },
    { name: 'tiktok.com', fontAwesome: faTiktok, display: 'TikTok' },
    { name: 'spotify.com', fontAwesome: faSpotify, display: 'Spotify' },
    {
      name: 'apple.music.com',
      fontAwesome: faMusic,
      display: 'Apple Music',
    },
    { name: 'youtube.com', fontAwesome: faYoutube, display: 'Youtube' },
    { name: 'youtu.be', fontAwesome: faYoutube, display: 'Youtube' },
    {
      name: 'soundcloud.com',
      fontAwesome: faSoundcloud,
      display: 'Soundcloud',
    },
    { name: 'bandcamp.com', fontAwesome: faBandcamp, display: 'Bandcamp' },
  ]

  let type = types.find(type => {
    return (link || '').indexOf(type.name) > -1
  })

  if (!type) {
    type = { name: 'website', fontAwesome: faLink, display: 'Website' }
  }

  return (
    <IconButton target="_blank" href={link} onClick={handleClick}>
      <FontAwesomeIcon icon={type.fontAwesome} />
    </IconButton>
  )
}
