import React from 'react'
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { useLogClient } from 'hooks/log-hook'
import { useScanStore } from 'hooks/store/use-scan-store'
import { BarRow } from './CardSections'
import ActionButton from './ActionButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {
  PieceBox,
  TopRow,
  ImageBox,
  PieceImage,
  TitleBox,
  TitleText,
  PieceTitle,
  CardRow,
  AvatarBox,
  AvatarTypography,
  UnstyledLink,
  DescriptionBox,
  DescriptionText,
  LinkRow,
} from './CardSections'
import BottomBar from './PieceCardBottomBar'
import theme from 'theme'

const PieceCard = ({ piece, onClose, ...props }) => {
  const { sendLog } = useLogClient()
  let { scanToken } = useScanStore()

  const handleLinkClick = async link => {
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

  const LinkButton = ({ link }) => {
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

  const OwnerSection = ({ owner }) => {
    const handleClick = async () => {
      try {
        if (scanToken) {
          await sendLog({
            url: '/scans',
            data: {
              click: { type: 'profile', destination: `/${owner.username}` },
              scanToken,
            },
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <UnstyledLink to={`/${piece.owner.username}`} onClick={handleClick}>
        <CardRow container direction="row" wrap="nowrap" alignItems="center">
          <Box padding="0.5rem 0.75rem">
            {piece.owner.avatar ? (
              <Avatar
                alt={piece.owner.displayName}
                src={piece.owner.avatarLink}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </Box>
          <AvatarBox flexGrow={1} paddingRight="0.5rem">
            <AvatarTypography variant="subtitle2">
              <strong>{piece.owner.displayName}</strong>
            </AvatarTypography>
          </AvatarBox>
        </CardRow>
      </UnstyledLink>
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Box height="1rem"></Box>
        <PieceBox container direction="column">
          <BarRow buttonLabel="Close X" />
          <TopRow container>
            <ImageBox item xs={6}>
              <PieceImage src={piece.imageUrl} alt="Preview" />
            </ImageBox>
            <TitleBox item xs={6}>
              <TitleText container direction="column" justify="center">
                <Box
                  flexGrow={1}
                  display="flex"
                  alignItems="center"
                  padding="1rem"
                >
                  <PieceTitle variant="h5">{piece.title}</PieceTitle>
                </Box>
                <OwnerSection owner={piece.owner} />
              </TitleText>
            </TitleBox>
          </TopRow>
          {props.showAnalytics && (
            <CardRow container justify="center">
              <Grid item xs={11}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">
                      Pickups: {props.scanCount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Link clicks: {props.clickCount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Click Rate:{' '}
                      {Math.round((props.clickCount / props.scanCount) * 100) ||
                        0}
                      %
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardRow>
          )}

          {piece.isDirect ? (
            <CardRow container justify="center">
              <DescriptionBox item xs={11}>
                <DescriptionText>
                  Taking users directly to {piece.directLink || `your profile`}
                </DescriptionText>
              </DescriptionBox>
            </CardRow>
          ) : (
            <>
              <CardRow container justify="center">
                <DescriptionBox item xs={11}>
                  <DescriptionText>{piece.description}</DescriptionText>
                </DescriptionBox>
              </CardRow>
              {piece.links.map(link => {
                return (
                  <LinkRow container key={link._id} justify="center">
                    <Grid item xs={11}>
                      <LinkButton link={link} />
                    </Grid>
                  </LinkRow>
                )
              })}
              {piece.sections.map((section, index) => {
                return (
                  <Grid item key={index}>
                    {section.title && (
                      <LinkRow container justify="center" key={index}>
                        <Grid item xs={11}>
                          <Box padding={`0.5rem 0rem 0rem 0rem`}>
                            <PieceTitle variant="h5">
                              {section.title}
                            </PieceTitle>
                          </Box>
                        </Grid>
                      </LinkRow>
                    )}
                    {section.text && (
                      <CardRow container justify="center" key={index}>
                        <Grid item xs={11}>
                          <DescriptionBox>
                            <DescriptionText>{section.text}</DescriptionText>
                          </DescriptionBox>
                        </Grid>
                      </CardRow>
                    )}
                    {section.linkListIsSecondary
                      ? (section.links || []).length > 0 && (
                          <Grid container justify="center" key={index}>
                            <Grid item xs={11}>
                              <Grid
                                container
                                justify="space-between"
                                spacing={3}
                              >
                                {(section.links || []).map(link => {
                                  return (
                                    <Grid item key={link.url} xs={6}>
                                      <Button
                                        onClick={handleLinkClick}
                                        fullWidth
                                        style={{
                                          paddingRight: 0,
                                          paddingLeft: 0,
                                          paddingTop: 0,
                                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                                          borderRadius: '0',
                                        }}
                                        href={link.url}
                                        target="_blank"
                                      >
                                        <Grid container justify="space-between">
                                          <Grid item>
                                            <Typography
                                              style={{
                                                textTransform: 'none',
                                              }}
                                            >
                                              {link.name}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <ArrowForwardIosIcon
                                              fontSize="small"
                                              color="error"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Button>
                                    </Grid>
                                  )
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                        )
                      : (section.links || []).map(link => {
                          return (
                            <LinkRow container key={link.url} justify="center">
                              <Grid item xs={11}>
                                <LinkButton link={link} />
                              </Grid>
                            </LinkRow>
                          )
                        })}
                    {(section.users || []).length > 0 && (
                      <LinkRow container justify="center" key={index}>
                        <Grid item xs={11}>
                          <DescriptionBox>
                            <Grid container justify="space-between" spacing={2}>
                              {section.users.map(user => {
                                return (
                                  <Grid item key={user._id} xs={6}>
                                    <UnstyledLink to={`/${user.username}`}>
                                      <Grid
                                        container
                                        direction="row"
                                        wrap="nowrap"
                                        alignItems="center"
                                        alignContent="center"
                                        style={{ height: '100%' }}
                                      >
                                        <Grid item>
                                          <Box paddingRight="0.5rem">
                                            {user.avatar ? (
                                              <Avatar
                                                alt={user.displayName}
                                                src={user.avatarLink}
                                                style={{
                                                  width: theme.spacing(4),
                                                  height: theme.spacing(4),
                                                }}
                                              />
                                            ) : (
                                              <AccountCircleIcon />
                                            )}
                                          </Box>
                                        </Grid>
                                        <AvatarBox
                                          flexGrow={1}
                                          paddingRight="0.5rem"
                                        >
                                          <AvatarTypography>
                                            <strong>{user.displayName}</strong>
                                          </AvatarTypography>
                                        </AvatarBox>
                                      </Grid>
                                    </UnstyledLink>
                                  </Grid>
                                )
                              })}
                            </Grid>
                          </DescriptionBox>
                        </Grid>
                      </LinkRow>
                    )}
                  </Grid>
                )
              })}
            </>
          )}
          <BottomBar piece={piece} />
        </PieceBox>
        <Box height="1rem"></Box>
      </Grid>
    </Grid>
  )
}

export default PieceCard
export { TitleBox, CardRow }

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core'

// import { useLogClient } from 'hooks/log-hook'
// import { BarRow } from 'components/CardSections'
// import ActionButton from 'components/ActionButton'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// import {
//   PieceBox,
//   TopRow,
//   ImageBox,
//   PieceImage,
//   TitleBox,
//   TitleText,
//   PieceTitle,
//   CardRow,
//   AvatarBox,
//   AvatarTypography,
//   UnstyledLink,
//   DescriptionBox,
//   DescriptionText,
//   LinkRow,
// } from 'components/CardSections'
// import BottomBar from './PieceCardBottomBar'
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
// import theme from 'theme'

// const PieceCard = ({ piece, onClose, ...props }) => {
//   const { sendLog } = useLogClient()
//   let { scanToken } = useSelector(state => state.scan)

//   const handleLinkClick = async link => {
//     try {
//       if (scanToken) {
//         await sendLog({
//           url: '/scans',
//           data: {
//             click: { type: 'link', destination: link.url },
//             scanToken,
//           },
//         })
//       }
//     } catch (err) {}
//   }

//   const LinkButton = ({ link, ...props }) => {
//     const handleClick = async () => {
//       try {
//         if (scanToken) {
//           await sendLog({
//             url: '/scans',
//             data: {
//               click: { type: 'link', destination: link.url },
//               scanToken,
//             },
//           })
//         }
//       } catch (err) {}
//     }

//     return (
//       <ActionButton
//         onClick={handleClick}
//         target="_blank"
//         href={link.url}
//         label={link.name}
//         {...props}
//       />
//     )
//   }

//   const OwnerSection = ({ owner }) => {
//     const handleClick = async () => {
//       try {
//         if (scanToken) {
//           await sendLog({
//             url: '/scans',
//             data: {
//               click: { type: 'profile', destination: `/${owner.username}` },
//               scanToken,
//             },
//           })
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     return (
//       <UnstyledLink to={`/${piece.owner.username}`} onClick={handleClick}>
//         <CardRow container direction="row" wrap="nowrap" alignItems="center">
//           <Box padding="0.5rem 0.75rem">
//             {piece.owner.avatar ? (
//               <Avatar
//                 alt={piece.owner.displayName}
//                 src={piece.owner.avatarLink}
//               />
//             ) : (
//               <AccountCircleIcon />
//             )}
//           </Box>
//           <AvatarBox flexGrow={1} paddingRight="0.5rem">
//             <AvatarTypography variant="subtitle2">
//               <strong>{piece.owner.displayName}</strong>
//             </AvatarTypography>
//           </AvatarBox>
//         </CardRow>
//       </UnstyledLink>
//     )
//   }

//   return (
//     <Grid container justify="center">
//       <Grid item xs={11}>
//         <Box height="1rem"></Box>
//         <PieceBox container direction="column">
//           <BarRow buttonLabel="Close X" />
//           <TopRow container>
//             <ImageBox item xs={6}>
//               <PieceImage src={piece.imageUrl} alt="Preview" />
//             </ImageBox>
//             <TitleBox item xs={6}>
//               <TitleText container direction="column" justify="center">
//                 <Box
//                   flexGrow={1}
//                   display="flex"
//                   alignItems="center"
//                   padding="1rem"
//                 >
//                   <PieceTitle variant="h5">{piece.title}</PieceTitle>
//                 </Box>
//                 <OwnerSection owner={piece.owner} />
//               </TitleText>
//             </TitleBox>
//           </TopRow>
//           <CardRow container justify="center">
//             <Grid item xs={11}>
//               <Grid container justify="space-between">
//                 <Grid item>
//                   <Typography variant="subtitle1">
//                     Pickups: {props.scanCount}
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="subtitle1">
//                     Clickups: {props.clickCount}
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="subtitle1">
//                     Click Rate:{' '}
//                     {Math.round((props.clickCount / props.scanCount) * 100) ||
//                       0}
//                     %
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </CardRow>
//           <CardRow container justify="center">
//             <DescriptionBox item xs={11}>
//               <DescriptionText>{piece.description}</DescriptionText>
//             </DescriptionBox>
//           </CardRow>
//           {piece.links.map(link => {
//             return (
//               <LinkRow container key={link._id} justify="center">
//                 <Grid item xs={11}>
//                   <LinkButton link={link} />
//                 </Grid>
//               </LinkRow>
//             )
//           })}
//           {piece.sections.map((section, index) => {
//             return (
//               <div key={index}>
//                 {section.title && (
//                   <LinkRow container justify="center">
//                     <Grid item xs={11}>
//                       <PieceTitle variant="h5">{section.title}</PieceTitle>
//                     </Grid>
//                   </LinkRow>
//                 )}
//                 {section.text && (
//                   <LinkRow container justify="center">
//                     <Grid item xs={11}>
//                       <DescriptionText>{section.text}</DescriptionText>
//                     </Grid>
//                   </LinkRow>
//                 )}
//                 {section.linkListIsSecondary
//                   ? (section.links || []).length > 0 && (
//                       <LinkRow container justify="center">
//                         <Grid item xs={11}>
//                           <Grid container justify="space-between" spacing={3}>
//                             {(section.links || []).map(link => {
//                               return (
//                                 <Grid item key={link.url} xs={6}>
//                                   <Box
//                                     borderBottom={`1px solid ${theme.palette.secondary.main}`}
//                                   >
//                                     <Button
//                                       onClick={handleLinkClick}
//                                       fullWidth
//                                       style={{
//                                         paddingRight: 0,
//                                         paddingLeft: 0,
//                                         paddingTop: 0,
//                                       }}
//                                       href={link.url}
//                                       target="_blank"
//                                     >
//                                       <Grid container justify="space-between">
//                                         <Grid item>
//                                           <Typography
//                                             style={{ textTransform: 'none' }}
//                                           >
//                                             {link.name}
//                                           </Typography>
//                                         </Grid>
//                                         <Grid item>
//                                           <ArrowForwardIosIcon
//                                             fontSize="small"
//                                             color="error"
//                                           />
//                                         </Grid>
//                                       </Grid>
//                                     </Button>
//                                   </Box>
//                                 </Grid>
//                               )
//                             })}
//                           </Grid>
//                         </Grid>
//                       </LinkRow>
//                     )
//                   : (section.links || []).map(link => {
//                       return (
//                         <LinkRow container key={link.url} justify="center">
//                           <Grid item xs={11}>
//                             <LinkButton link={link} />
//                           </Grid>
//                         </LinkRow>
//                       )
//                     })}
//                 {(section.users || []).length > 0 && (
//                   <LinkRow container justify="center">
//                     <Grid item xs={11}>
//                       <Grid container justify="space-between" spacing={2}>
//                         {section.users.map(user => {
//                           return (
//                             <Grid item key={user._id} xs={6}>
//                               <UnstyledLink to={`/${user.username}`}>
//                                 <Grid
//                                   container
//                                   direction="row"
//                                   wrap="nowrap"
//                                   alignItems="center"
//                                   alignContent="center"
//                                   style={{ height: '100%' }}
//                                 >
//                                   <Grid item>
//                                     <Box paddingRight="0.5rem">
//                                       {user.avatar ? (
//                                         <Avatar
//                                           alt={user.displayName}
//                                           src={user.avatarLink}
//                                           style={{
//                                             width: theme.spacing(4),
//                                             height: theme.spacing(4),
//                                           }}
//                                         />
//                                       ) : (
//                                         <AccountCircleIcon />
//                                       )}
//                                     </Box>
//                                   </Grid>
//                                   <AvatarBox flexGrow={1} paddingRight="0.5rem">
//                                     <AvatarTypography>
//                                       <strong>{user.displayName}</strong>
//                                     </AvatarTypography>
//                                   </AvatarBox>
//                                 </Grid>
//                               </UnstyledLink>
//                             </Grid>
//                           )
//                         })}
//                       </Grid>
//                     </Grid>
//                   </LinkRow>
//                 )}
//               </div>
//             )
//           })}
//           <Box height="1rem"></Box>
//           <BottomBar piece={piece} />
//         </PieceBox>
//         <Box height="1rem"></Box>
//       </Grid>
//     </Grid>
//   )
// }

// export default PieceCard
// export { TitleBox, CardRow }
