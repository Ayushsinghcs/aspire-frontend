import { Button, Form, Input, message, Modal } from 'antd'
import type { FC } from 'react'
import AspireLogo from '../../assets/icons/aspire-logo.svg?react'
import VisaLogo from '../../assets/icons/VisaLogo.svg?react'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch } from '../../core/store/hooks'
import { addCard } from '../../core/store/cardSlice'

type NewCardModalProps = {
  open: boolean
  onCancel: VoidFunction
}

type FormValues = {
  name: string
}

const NewCardModal: FC<NewCardModalProps> = ({ open, onCancel }) => {
  const dispatch = useAppDispatch()
  const [form] = useForm()

  const handleAddCard = async (values: FormValues) => {
    try {
      await dispatch(addCard(values.name)).unwrap()
      message.success('Card added successfully!')
      form.resetFields()
      onCancel()
    } catch (error) {
      message.error('Failed to add card. Please try again.')
    }
  }

  const nameValidationRules = [
    { required: true, message: 'Please enter your name!' },
    { min: 2, message: 'Name must be at least 2 characters long!' },
    { max: 50, message: 'Name cannot exceed 50 characters!' },
    { 
      pattern: /^[a-zA-Z\s]+$/, 
      message: 'Name can only contain letters and spaces!' 
    },
    {
      validator: (_: any, value: string) => {
        if (value && value.trim().length < 2) {
          return Promise.reject(new Error('Name cannot be just spaces!'))
        }
        return Promise.resolve()
      }
    }
  ]

  return (
    <Modal 
      open={open} 
      onCancel={onCancel} 
      title="Add New Card" 
      footer={null}
      width={400}
      centered
    >
      <Form form={form} preserve={false} onFinish={handleAddCard} layout="vertical">
        <div className="bg-white text-secondary rounded-xl p-6 relative z-10 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            {/* <div className="text-sm opacity-80">Credit Card</div> */}
            <AspireLogo className="text-secondary w-16 h-5" />
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <div className="text-sm opacity-80 mb-2">Card Number</div>
            <div className="text-lg font-mono tracking-wider">**** **** **** ****</div>
          </div>

          {/* Name Input */}
          <Form.Item 
            name="name" 
            rules={nameValidationRules}
            className="mb-4"
          >
            <Input 
              size="large" 
              className="bg-white border-gray-300 text-secondary placeholder:text-gray-400 font-medium"
              placeholder="Enter cardholder name"
              style={{ color: 'var(--secondary-color)' }}
            />
          </Form.Item>

          {/* Card Details */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs opacity-80 mb-1">Valid Thru</div>
              <div className="text-sm font-mono">**/**</div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-xs opacity-80 mb-1">CVV</div>
                <div className="text-sm font-mono tracking-wider">***</div>
              </div>
              <VisaLogo className="w-12 h-8" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 justify-end">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" size="large">
            Add Card
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default NewCardModal
