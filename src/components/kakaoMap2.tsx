'use client'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
const KaKaoMap2 = ({ Lat, Lng }: { Lat: number; Lng: number }) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!, // 발급 받은 APPKEY
  })
  return (
    <div id="map">
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: Lat,
          lng: Lng,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: Lat,
            lng: Lng,
          }}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
            size: {
              width: 64,
              height: 69,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      </Map>
    </div>
  )
}

export default KaKaoMap2
