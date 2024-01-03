'use client'
import React, { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import FilterDialog from '@/components/filterDialog'
import LevelFilterDialog from './levelFilterDialog'

interface FilterSectionProps {
  openFilterDialog: () => void
  closeFilterDialog: () => void
  applyFilter: (sportsGrade: string, description: string) => void
  isFilterDialogOpen: boolean
  selectedFilter: string
  filterOptions: { sportsGrade: string; description: string }[]
  title: string
}

const LevelFilterSection = ({
  openFilterDialog,
  closeFilterDialog,
  applyFilter,
  isFilterDialogOpen,
  selectedFilter,
  filterOptions,
  title,
}: FilterSectionProps) => {
  return (
    <>
      <div className="category-con">
        <button
          onClick={(e) => {
            e.preventDefault()
            openFilterDialog()
          }}
          className={selectedFilter === title ? '' : 'active'}
        >
          {selectedFilter}
          <SlArrowDown className="category-arrow" />
        </button>
      </div>

      {isFilterDialogOpen && (
        <LevelFilterDialog
          optionsList={filterOptions}
          onApplyFilter={applyFilter}
          onClose={closeFilterDialog}
          selectedFilterName={selectedFilter}
        />
      )}
    </>
  )
}

export default LevelFilterSection
