import { View, Text, Modal, TouchableHighlight } from 'react-native'
import React from 'react'

interface TaskCreationModalProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCreationModal = () => {
  return (
    <Modal>
      <Text>TaskCreationModal</Text>
    </Modal>
  )
}

export default TaskCreationModal