'use client'
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { FilterDialogProps, SportsList } from '../types/types'
import { IoCloseOutline } from 'react-icons/io5'
type Prop = {
  onApplyFilter: (sportsId: number, sportsName: string) => void
  onClose: () => void
  optionsList: SportsList
  selectedFilterName: any
}
const SportsFilterDialog = ({
  onApplyFilter,
  onClose,
  optionsList,
  selectedFilterName,
}: Prop) => {
  const [selectedOption, setSelectedOption] = useState<string>()
  const modalWrapperRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (sportsId: number, sportsName: string) => {
    setSelectedOption(sportsName)
    onApplyFilter(sportsId, sportsName)
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
          <h3>운동종목</h3>
          <div onClick={onClose}>
            <IoCloseOutline size="25" />
          </div>
        </div>
        <div className="modal-body">
          <ul>
            {optionsList.map(
              (
                option: { sportsId: number; sportsName: string },
                index: number,
              ) => (
                <li
                  key={index}
                  onClick={() =>
                    handleOptionClick(option.sportsId, option.sportsName)
                  }
                  className={
                    selectedOption === option.sportsName ? 'selected' : ''
                  }
                >
                  {option.sportsName}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SportsFilterDialog
