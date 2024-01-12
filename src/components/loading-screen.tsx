import React from 'react'
const LoadingScreen = ({fixed}:{fixed?:boolean}) => {
  return (
    <div className={fixed?'spinnerWrap fixedSpinner':'spinnerWrap'}>
      
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}
export default LoadingScreen
