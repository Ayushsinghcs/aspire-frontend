import { Collapse, type CollapseProps } from 'antd'
import type { FC } from 'react'
import UpIcon from '../../assets/icons/arrow-up.svg?react'
import DownIcon from '../../assets/icons/arrow-down.svg?react'

type CollapsibleSectionProps = {
  items: CollapseProps['items']
}

const CollapsibleSection: FC<CollapsibleSectionProps> = ({ items }) => {
  return (
    <Collapse
      items={items}
      defaultActiveKey={['1']}
      className="w-full relative z-10"
      expandIconPosition="end"
      expandIcon={({ isActive }) => (isActive ? <UpIcon /> : <DownIcon />)}
    />
  )
}

export default CollapsibleSection
