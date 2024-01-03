'use client'
import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'

interface SearchResult {
  id: number
  title: string
}
interface Prop {
  onSearchHandler: (value: string) => void
  value: string
  isLoading: boolean
  handleSearch:()=>void
}
const SearchBar = ({ onSearchHandler,value,isLoading,handleSearch }: Prop) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])



  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search-wrap">
      <input
        type="search"
        id="search"
        placeholder="검색어를 입력하세요"
        value={value}
        onChange={(e) => onSearchHandler(e.target.value)}
        onKeyPress={handleKeyPress}
        contentEditable
        autoComplete="off"
      />
      <button onClick={handleSearch} value={searchQuery}>
        <IoIosSearch />
      </button>
    </div>
  )
}

export default SearchBar
