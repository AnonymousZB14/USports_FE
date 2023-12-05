import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
const KaKaoMap = ({ Lat, Lng }: { Lat: number; Lng: number }) => {

  return (
    <div id="map">
      {/* <MarkerWithCustomOverlayStyle /> */}
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
        <CustomOverlayMap
          position={{ lat: 37.54699, lng: 127.09598 }}
          yAnchor={1}
        >
          <div className="customoverlay">
            <a
              href="https://map.kakao.com/link/map/11394059"
              target="_blank"
              rel="noreferrer"
            >
              <span className="title">구의야구공원</span>
            </a>
          </div>
        </CustomOverlayMap>
      </Map>
      
    </div>
  )
}

export default KaKaoMap
