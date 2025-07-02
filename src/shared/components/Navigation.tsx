import { Menu } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
import Home from '../../assets/icons/Home.svg?react'
import Card from '../../assets/icons/Card.svg?react'
import Payments from '../../assets/icons/Payments.svg?react'
import Credit from '../../assets/icons/Credit.svg?react'
import Account from '../../assets/icons/Account.svg?react'

type NavigationProps = {
  mode: 'horizontal' | 'inline'
  menuClassName: string
  itemClassName: string
}

const menuItems = [
  { key: 'home', label: 'Home', icon: <Home className="w-6 h-6" /> },
  { key: 'cards', label: 'Cards', icon: <Card className="w-6 h-6" /> },
  { key: 'payments', label: 'Payments', icon: <Payments className="w-6 h-6" /> },
  { key: 'credit', label: 'Credit', icon: <Credit className="w-6 h-6" /> },
  { key: 'settings', label: 'Settings', icon: <Account className="w-6 h-6" /> },
]

const Navigation: FC<NavigationProps> = ({ mode, menuClassName, itemClassName }) => {
  const [selectedKeys, setSelectedKeys] = useState(['cards'])

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key])
  }

  return (
    <Menu 
      mode={mode} 
      selectedKeys={selectedKeys}
      onClick={handleMenuClick}
      className={menuClassName}
    >
      {menuItems.map(({ key, label, icon }) => (
        <Menu.Item 
          key={key} 
          className={`${itemClassName} ${selectedKeys.includes(key) ? 'font-bold' : ''}`} 
          icon={icon}
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default Navigation
