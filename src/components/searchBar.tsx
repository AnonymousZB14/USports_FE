'use client'
import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'

interface SearchResult {
  id: number
  title: string
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleSearch = () => {
    // API 패칭
    const fakeSearchResults: SearchResult[] = [
      { id: 1, title: '운동' },
      { id: 2, title: '스피닝' },
      { id: 3, title: '스쿼시' },
      { id: 4, title: '배드민턴' },
      { id: 5, title: '테니스' },
      { id: 6, title: '축구' },
    ]

    const filteredResults = fakeSearchResults.filter((result) =>
      result.title.includes(searchQuery),
    )

    setSearchResults(filteredResults)
    console.log(filteredResults)
  }

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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
