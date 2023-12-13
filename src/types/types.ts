export interface AddressType {
  address: string
  postCode: string
  additional: string
  type?: 'button' | 'submit' | 'reset'
}
export interface UserProfile {
  id: number
  name: string
  profileImage: string
}
export interface User {
  id: string
  nickname: string
  profileImage: string
}
export type Record = {
  accountName: string
  countComment: number
  imageAddressList: string[]
  memberId: number
  recordContent: string
  recordId: number
  registeredAt: Date
  sportsId: number
  updatedAt: Date
}
export type Records = Record[]

export interface FilterDialogProps {
  onApplyFilter: (filter: string) => void
  onClose: () => void
  options: string[]
  selectedFilterName: string
}

export interface Notification {
  createdAt: string
  entityType: string
  memberId: number
  message: string
  notificationId: number
  readAt: string
  targetEntityId: number
  type: string
  url: string
}

export interface Post {
  postId: number
  User: User
  content: string
  createdAt: Date
  Images: []
}
