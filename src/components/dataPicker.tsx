'use client'
import React, { useEffect, useRef } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

interface DatePickerProps {
  onChange: (
    selectedDates: Date[],
    dateStr: string,
    instance: flatpickr.Instance,
  ) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) {
      return
    }

    const fp = flatpickr(inputRef.current, {
      dateFormat: 'Y-m-d H:i',
      enableTime: true,
      onChange: onChange,
      time_24hr: true,
      // locale: 'ko',
    })

    return () => {
      fp.destroy()
    }
  }, [onChange])

  return (
    <input ref={inputRef} type="text" placeholder="날짜와 시간을 입력하세요." />
  )
}

export default DatePicker
