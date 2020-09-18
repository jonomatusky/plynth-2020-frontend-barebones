import React, { useState, useContext } from 'react'

import NotificationModal from '../../shared/components/notifications'

const Notifications = ({ handleClose }) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const [notificationInfo, setNotificationInfo] = {
    primaryMessage: '',
    handleClose,
  }

  return <NotificationModal open={open} handleClose={handleClose} />
}

const primarymodalAction = () => {
  setNotificationState
}

if (user.completedSignup === false) {
  setNotificationState({
    open: true,
    handleClose: handleModalClose,
    primaryMessage: 'Your Account Has Been Created!',
    secondaryMesage:
      'Take a tour to get started, or skip straight to creating your first piece',
  })
}

export default Notifications
