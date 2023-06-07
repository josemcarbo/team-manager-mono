import React from 'react'
import useSelector from './useSelector'
import Select from '@/components/select/select'

export default function BoardSelectorComponent (): React.ReactElement {
  const {
    board,
    boardList,
    boardSettingOpen,
    handleSelected,
    handleSettingOpen,
    handleCreated
  } = useSelector()

  return (
    <Select
      entity="board"
      item={board}
      list={boardList}
      open={boardSettingOpen}
      handleSelected={handleSelected}
      handleOpen={handleSettingOpen}
      handleCreate={handleCreated}
    />
  )
}
