'use client'
import React, { useEffect, useState } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { recruitItemProps } from '@/types/types'

interface KaKaoMapProps {
  recruitData?: recruitItemProps
}

const KaKaoMap: React.FC<KaKaoMapProps> = ({ recruitData }) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!, // 발급 받은 APPKEY
  })
  const [centerMove, setCenterMove] = useState({
    lat: recruitData?.lat || 37.56667437551163,
    lng: recruitData?.lnt || 126.95764417493172,
  })

  useEffect(() => {
    if (recruitData) {
      setCenterMove({
        lat: recruitData.lat,
        lng: recruitData.lnt,
      })
    }
  }, [recruitData])
  return (
    <>
{/*       <p>Latitude: {centerMove.lat}</p>
      <p>Longitude: {centerMove.lng}</p> */}
      <div id="map">
        <Map
          center={{
            lat: centerMove.lat,
            lng: centerMove.lng,
          }}
          style={{
            width: '100%',
            height: '300px',
          }}
          level={4}
        >
          <MapMarker
            position={{
              lat: centerMove.lat,
              lng: centerMove.lng,
            }}
            // lat: 37.504449,
            // lng: 127.04886,
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
              size: {
                width: 35,
                height: 40,
              },
              options: {
                offset: {
                  x: 27,
                  y: 69,
                },
              },
            }}
          />
        </Map>
      </div>
    </>
  )
}

export default KaKaoMap
