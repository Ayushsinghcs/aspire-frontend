import type { FC, SVGProps } from 'react'
import { useAppSelector, useAppDispatch } from '../../core/store/hooks'
import { updateCard } from '../../core/store/cardSlice'
import FreezeIcon from '../../assets/icons/Freeze.svg?react'
import SpendLimitIcon from '../../assets/icons/SpendLimit.svg?react'
import GPayIcon from '../../assets/icons/GPay.svg?react'
import ReplaceIcon from '../../assets/icons/Replace.svg?react'
import DeactivateIcon from '../../assets/icons/Deactivate.svg?react'

type CardActionsProps = {
  className?: string
}

type ActionItem = {
  icon: FC<SVGProps<SVGSVGElement>>
  label: string
  onClick?: () => void
}

const CardActions: FC<CardActionsProps> = ({ className = '' }) => {
  const { selectedCard } = useAppSelector((state) => state.card)
  const dispatch = useAppDispatch()

  const toggleFreeze = async () => {
    if (!selectedCard) return
    try {
      await dispatch(updateCard({
        id: selectedCard.id,
        data: {
          status: selectedCard.status === 'active' ? 'inactive' : 'active',
        }
      })).unwrap()
    } catch (error) {
      console.error('Failed to toggle freeze:', error)
    }
  }

  const actions: ActionItem[] = [
    {
      icon: FreezeIcon,
      label: selectedCard?.status === 'inactive' ? 'Unfreeze Card' : 'Freeze Card',
      onClick: toggleFreeze,
    },
    { icon: SpendLimitIcon, label: 'Set spend limit' },
    { icon: GPayIcon, label: 'Add to GPay' },
    { icon: ReplaceIcon, label: 'Replace card' },
    { icon: DeactivateIcon, label: 'Cancel card' },
  ]

  return (
    <div
      className={`grid grid-cols-5 gap-[10px] bg-light-blue rounded-2xl px-[27px] py-[20px] w-screen md:w-[414px] mt-8 ${className}`}
    >
      {actions.map(({ icon: Icon, label, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex flex-col items-center gap-[7px] text-center focus:outline-none cursor-pointer text-background hover:text-primary"
        >
          <Icon />
          <p className="text-[13px]">{label}</p>
        </button>
      ))}
    </div>
  )
}

export default CardActions
