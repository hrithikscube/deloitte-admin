import { useState } from 'react'
import { dateRange, defaultFiltersDropDown } from '../../../utils/helpers'
import moment from 'moment'
import { SelectInput } from './Select'
import { DateRangePicker } from './DateRangePicker'

interface Props {
  onDateRangeSelect: any
  id?: any
  defaultValue?:any,
  hideAll?:Boolean
}

export const DateFiter: React.FC<Props> = ({ onDateRangeSelect, id,defaultValue, hideAll=false }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : 'ALL')
  const [date, setDate] = useState({
    start_date: null,
    end_date: null,
  })
  const handleFilter = (e: any) => {
    const [start_date, end_date] = dateRange(e.target.value)
    setValue(e.target.value)
    if (start_date && end_date) {
      onDateRangeSelect({ start_date, end_date })
    } else {
      onDateRangeSelect({ start_date: '', end_date: '' })
    }
    setDate({
      start_date: null,
      end_date: null,
    })
  }
  const onCustomDateChange = (e: any) => {
    const [start, end] = e
    setDate({ start_date: start, end_date: end })
    if (start && end) {
      onDateRangeSelect({
        start_date: moment(start).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end_date: moment(end).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      })
    } else {
      onDateRangeSelect({ start_date: '', end_date: '' })
    }
  }
  return (
    <div className='flex w-full flex-col sm:flex-row justify-end date_range_filter gap-3'>
      <div className='sm:custom-select-input sm:w-44'>
        <SelectInput
          bgcolor='white'
          width='100%'
          options={hideAll ? defaultFiltersDropDown.filter(x=>x.id !='ALL') : defaultFiltersDropDown}
          handleChange={handleFilter}
          value={value}
          label='Select Date'
          name='Select Date Range'
          id={id}

        />
      </div>

      {value === 'custom' && (
        <div className='w-full sm:w-fit'>
          <DateRangePicker
            label='Select Range'
            startDate={date.start_date}
            endDate={date.end_date}
            onChange={onCustomDateChange}
            istodaymax={true}

          />
        </div>
      )}
    </div>
  )
}
