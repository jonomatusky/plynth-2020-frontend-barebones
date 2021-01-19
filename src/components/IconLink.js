import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faLink } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faTwitter,
  faTiktok,
  faSpotify,
  faYoutube,
  faSoundcloud,
  faBandcamp,
} from '@fortawesome/free-brands-svg-icons'
import { IconButton } from '@material-ui/core'

export const IconLink = ({ link }) => {
  const types = [
    {
      name: 'instagram.com',
      fontAwesome: 'fa-instagram',
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
    <IconButton target="_blank" href={link}>
      <FontAwesomeIcon icon={type.fontAwesome} />
    </IconButton>
  )
}
