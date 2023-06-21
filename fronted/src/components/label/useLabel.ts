interface Props {
  onClose?: () => void
}
interface IUseLabel {
  handleClose: () => void
}

export default function useLabel ({ onClose }: Props): IUseLabel {
  const handleClose = (): void => {
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return {
    handleClose
  }
}
