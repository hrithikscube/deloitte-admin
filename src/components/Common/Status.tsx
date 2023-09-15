import React from 'react'

export enum ORDER_STATUS {
  ORDER_PLACED = 'PLACED ',
  ORDER_CONFIRMED = 'CONFIRMED',
  ORDER_ASSIGNED = 'ASSIGNED',
  SAMPLE_COLLECTING = 'SAMPLE_COLLECTING',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  KIT_RECEIVED = 'KIT_RECEIVED',
  KIT_SUBMITTED = 'KIT_SUBMITTED',
  ORDER_COMPLETED = 'COMPLETED',
  ORDER_HOLD = 'HOLD',
  ORDER_STARTED = 'STARTED',
  ORDER_CANCELLED = 'CANCELLED',
}

const statusList = [
  {
    list: [
      'Active',
      'Closed',
      "Online",
      'CLOSED',
      'Interested',
      'ASSIGNED',
      'Paid',
      'PLACED',
      'Order Placed',
      'ORDER_PLACED',
      'CONFIRMED',
      'SAMPLE_COLLECTED',
      'COMPLETED',
    ],
    class: 'bg-LimeGreen',
  },
  {
    list: ['In Progress', 'REFUNDED', 'CALL_BACK', 'IN_ACTIVE', 'HOLD', 'PENDING'],
    class: 'bg-YellowOrange',
  },

  {
    list: [
      'Open',
      'OPEN',
      'Interested',
      'CONVERTED',
      'Inactive',
      'ASSIGNED',
      'KIT_SUBMITTED',
      'ASSIGNED_H',
      'ASSIGNED_H_P',
    ],
    class: 'bg-Azure',
  },

  {
    list: ['DELIVERED'],
    class: 'bg-LimeGreen',
  },
  {
    list: ['SAMPLE_COLLECTING', 'KIT_RECEIVED', 'STARTED'],
    class: 'bg-VividYellow',
  },
]

const getBgClass = (status: string) => {
  let className = 'bg-GlowingBrakeDisc'
  for (const item of statusList) {
    if (item?.list.some((x) => status && x?.toLowerCase() === status?.toLowerCase())) {
      className = item?.class
      break
    }
  }

  return className
}

interface Props {
  children: any
}
const Status: React.FC<Props> = ({ children }) => (
  <div
    className={`font-nunitoRegular ${getBgClass(
      children,
    )} bg-opacity-20 w-fit py-1.5 flex space-x-2 items-center pr-4 pl-2 rounded-[44px]`}
  >
    <div className={`w-3 h-3 ${getBgClass(children)} rounded-md border-2 border-white`} />
    <p
      className={`font-nunitoRegular font-bold ${getBgClass(children).replace(
        'bg-',
        'text-',
      )}  text-xs`}
    >
      {children}
    </p>
  </div>
)

export default Status
