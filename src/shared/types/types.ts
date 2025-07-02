export interface Transaction {
  id: string
  merchant: string
  date: string
  amount: number
  currency: string
  type: 'refund' | 'charge'
  icon: string
  description: string
}

export interface Card {
  id: number
  name: string
  number: string
  expiry: string
  cvv: number
  balance: number
  bgColor: string
  status: 'active' | 'inactive'
  transactions: Transaction[]
}
