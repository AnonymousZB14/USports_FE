'use client'
import { AlertOpenState } from '@/store/user'
import { useRecoilState } from 'recoil'
import Button from './commonButton'
import { LuAlertCircle } from 'react-icons/lu'
const Alert = () => {
  const [alert, setAlert] = useRecoilState(AlertOpenState)
  {
    return alert !== '' ? (
      <div id="alertModal">
        <div className="alertCont">
          <div className="alertInner">
            <LuAlertCircle />
            <p>{alert}</p>
            <Button theme="blue" onClick={() => setAlert('')}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    ) : null
  }
}

export default Alert
