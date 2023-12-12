import { Map, MapMarker } from 'react-kakao-maps-sdk'
const KaKaoMap = ({ Lat, Lng }: { Lat: number; Lng: number }) => {
  return (
    <div id="map">
      <Map
        center={{
          lat: Lat,
          lng: Lng,
        }}
        style={{
          width: '100%',
          height: '300px',
        }}
        level={4}
      >
        <MapMarker
          position={{
            lat: Lat,
            lng: Lng,
          }}
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
  )
}

export default KaKaoMap
