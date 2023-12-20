'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FilterDialogProps, LevelList } from '../types/types'
import { IoCloseOutline } from 'react-icons/io5'
type Prop = {
  onApplyFilter: (sportsGrade: string, description: string) => void
  onClose: () => void
  optionsList: LevelList
  selectedFilterName: any
}
const LevelFilterDialog = ({
  onApplyFilter,
  onClose,
  optionsList,
  selectedFilterName,
}: Prop) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const modalWrapperRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (sportsGrade: string, description: string) => {
    setSelectedOption(description)
    onApplyFilter(sportsGrade, description)
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
          <h3>운동 레벨</h3>
          <div onClick={onClose}>
            <IoCloseOutline size="25" />
          </div>
        </div>
        <div className="modal-body">
          <ul>
            {optionsList.map(
              (
                option: { sportsGrade: string; description: string },
                index: number,
              ) => (
                <li
                  key={index}
                  onClick={() =>
                    handleOptionClick(option.sportsGrade, option.description)
                  }
                  className={
                    selectedOption === option.description ? 'selected' : ''
                  }
                >
                  {option.description}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LevelFilterDialog
