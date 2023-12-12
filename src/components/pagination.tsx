import React from 'react'
import { MdOutlineNavigateBefore } from 'react-icons/md'
import { MdOutlineNavigateNext } from 'react-icons/md'

interface Props {
  postsPerPage: number
  totalPosts: number
  currentPage: number
  paginate: (number: number) => void
}

const Pagination: React.FC<Props> = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: Props) => {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalPosts / postsPerPage) },
    (_, i) => i + 1,
  )

  return (
    <ul className="pagination">
      <li className="page-item">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-link"
        >
          <MdOutlineNavigateBefore size="24" />
        </button>
      </li>

      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${currentPage === number ? 'active' : ''}`}
        >
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}

      <li className="page-item">
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="page-link"
        >
          <MdOutlineNavigateNext size="24" />
        </button>
      </li>
    </ul>
  )
}

export default Pagination
