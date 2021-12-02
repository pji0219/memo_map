import React, { useEffect, useState } from 'react';

const { kakao } = window;

function UploadMap() {
  const [Value, setValue] = useState('강남역');

  useEffect(() => {
    const mapContainer = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(37.554477, 126.970419),
      level: 3
    };

    let map = new kakao.maps.Map(mapContainer, options);

    // 인포 윈도우
    let infoWindow = new kakao.maps.InfoWindow({
      zIndex: 1
    });

    let makerList = [];

    // 키워드로 장소 검색
    let ps = new kakao.maps.services.Places();

  }, []);

  const onSearch = event => {
    setValue(event.target.Value);
  }

  return (
    <>
      {/* 지도 */}
      <div id="map" style={{width: '100%', height: '100vh'}}></div>

      {/* 검색 */}
      <div id="menu_wrap">
        <form onSubmit={}>
          키워드: <input type="text" id="keyword" value={Value} size="15" />
          
        </form>
      </div>
    </>
  );
}

export default UploadMap;
