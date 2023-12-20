'use client'
import React, { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import FilterDialog from '@/components/filterDialog'
import SportsFilterDialog from './sportsFilterDialog'

interface FilterSectionProps {
  openFilterDialog: () => void
  closeFilterDialog: () => void
  applyFilter: (sportsId: number, sportsName: string) => void
  isFilterDialogOpen: boolean
  selectedFilter: { sportsId: number; sportsName: string }
  filterOptions: { sportsId: number; sportsName: string }[]
  title: string
}

const SportsFilterSection: React.FC<FilterSectionProps> = ({
  openFilterDialog,
  closeFilterDialog,
  applyFilter,
  isFilterDialogOpen,
  selectedFilter,
  filterOptions,
  title,
}) => {
  return (
    <>
      <div className="category-con">
        <button
          onClick={(e) => {
            e.preventDefault()
            openFilterDialog()
          }}
          className={selectedFilter.sportsName === '운동종목' ? '' : 'active'}
        >
          {selectedFilter.sportsName}
          <SlArrowDown className="category-arrow" />
        </button>
      </div>

      {isFilterDialogOpen && (
        <SportsFilterDialog
          optionsList={filterOptions}
          onApplyFilter={applyFilter}
          onClose={closeFilterDialog}
          selectedFilterName={selectedFilter}
        />
      )}
    </>
  )
}

export default SportsFilterSection
