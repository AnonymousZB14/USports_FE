import React from 'react'
import Image from 'next/image'
const LoadingScreen = ({fixed}:{fixed?:boolean}) => {
  return (
    <div className={fixed?'spinnerWrap fixedSpinner':'spinnerWrap'}>
      {/* <Image src={'/Spinner.svg'} alt={'loading'} width={300} height={300}/> */}
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}
export default LoadingScreen
