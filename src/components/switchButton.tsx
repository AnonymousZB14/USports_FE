'use client'
import React from 'react'

interface Props {
  isOn?: boolean
  toggleHandler?: () => void
}

const SwitchButton = ({ isOn, toggleHandler }: Props) => {
  return (
    <div onClick={toggleHandler}>
      <div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`}>
        <div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`} />
      </div>
    </div>
  )
}

export default SwitchButton
