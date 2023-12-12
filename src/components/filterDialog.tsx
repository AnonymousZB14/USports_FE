'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FilterDialogProps } from '../types/types'
import { IoCloseOutline } from 'react-icons/io5'

const FilterDialog: React.FC<FilterDialogProps> = ({
  onApplyFilter,
  onClose,
  options,
  selectedFilterName,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const modalWrapperRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    onApplyFilter(option)
    onClose()
  }

  const handleWrapperClick = (event: MouseEvent) => {
    if (
      modalWrapperRef.current &&
      !modalWrapperRef.current.contains(event.target as Node)
    ) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleWrapperClick)

    return () => {
      document.removeEventListener('click', handleWrapperClick)
    }
  }, [])

  return (
    <div className="filter-dialog">
      <div className="modal-wrapper" ref={modalWrapperRef}>
        <div className="modal-header">
          <h3>{selectedFilterName}</h3>
          <div onClick={onClose}>
            <IoCloseOutline size="25" />
          </div>
        </div>
        <div className="modal-body">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option ? 'selected' : ''}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FilterDialog
