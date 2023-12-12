'use client'
import React, { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import FilterDialog from '@/components/filterDialog'

interface FilterSectionProps {
  openFilterDialog: () => void
  closeFilterDialog: () => void
  applyFilter: (filter: string) => void
  isFilterDialogOpen: boolean
  selectedFilter: string
  filterOptions: string[]
  title: string
}

const FilterSection: React.FC<FilterSectionProps> = ({
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
          onClick={openFilterDialog}
          className={selectedFilter === title ? '' : 'active'}
        >
          {selectedFilter}
          <SlArrowDown className="category-arrow" />
        </button>
      </div>

      {isFilterDialogOpen && (
        <FilterDialog
          options={filterOptions}
          onApplyFilter={applyFilter}
          onClose={closeFilterDialog}
          selectedFilterName={selectedFilter}
        />
      )}
    </>
  )
}

export default FilterSection
