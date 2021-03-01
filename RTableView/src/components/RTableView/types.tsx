import { CellAccessoryType } from './cell'

export interface RTableViewProps {
  cellProps?: Omit<RTableCellProps, 'item'>
  data: CellContentDataType[]
  onLoadMore?: () => Promise<any>
  didSelectRowAt?: (index: number) => any
  onPullToRefresh?: () => void
  onLeftAction?: (index: CellContentDataType) => void
  onRightAction?: (index: CellContentDataType) => void
}

export type RLabel = {
  text?: string
  attributedText?: JSX.Element
}
export type RImage = {
  src: string
}
export type CellContentDataType = { textLabel?: RLabel; detailLabel?: RLabel }
export type RTableCellProps<
  T extends CellContentDataType = CellContentDataType
> = {
  item: T
  accessoryType?: CellAccessoryType
  textLabel?: (item: T) => RLabel
  detailLabel?: (item: T) => RLabel
  contentView?: (item: T) => JSX.Element | null | undefined
  imageView?: RImage

  cellRenderAnimation?: boolean
}
