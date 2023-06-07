interface Props {
  title: string
}

interface IUseBoard {
  title?: string
}
export default function useBoard ({ title }: Props): IUseBoard {
  return { }
}
