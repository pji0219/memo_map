import React, { useEffect, useState } from 'react';
import './UploadMap.css';

const { kakao } = window;

function UploadMap() {
  // 검색 키워드 state
  const [keyword, setKeyword] = useState('강남역'); // 배열로 바꿔야 될듯

  useEffect(() => {
    const mapContainer = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(37.554477, 126.970419),
      level: 3,
    };

    let map = new kakao.maps.Map(mapContainer, options);

    // 인포 윈도우
    let infoWindow = new kakao.maps.InfoWindow({
      zIndex: 1,
    });

    let makerList = [];

    // 키워드로 장소 검색
    let ps = new kakao.maps.services.Places();

    // 결과값이 data, status는 결과값을 반환하기 위한 서버 상태
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('오류가 발생 하였습니다.');
        return;
      }
    };

    const searchPlaces = () => {
      ps.keywordSearch(keyword, placesSearchCB);
    };

    searchPlaces();

    // searchPlaces();

    // function searchPlaces() {
    //   ps.keywordSearch(keyword, placesSearchCB);
    // }
  }, []);

  const keywordHandler = (event) => {
    setKeyword(event.target.value);
  };

  // onSubmit 이벤트도 활용하기 위해 useEffect 밖에도 구현 해줌
  // 키워드로 장소 검색
  let ps = new kakao.maps.services.Places();

  // 결과값이 data, status는 결과값을 반환하기 위한 서버 상태
  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('오류가 발생 하였습니다.');
      return;
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    const searchPlaces = () => {
      ps.keywordSearch(keyword, placesSearchCB);
    };

    searchPlaces();
  };

  return (
    <>
      {/* 지도 */}
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>

      {/* 검색 */}
      <div id="menu_wrap">
        <form onSubmit={onSearch}>
          키워드:{' '}
          <input
            type="text"
            id="keyword"
            value={keyword}
            size="15"
            onChange={keywordHandler}
          />
          <button type="submit">검색하기</button>
          <hr />
          <div id="placesList"></div>
        </form>
      </div>
    </>
  );
}

export default UploadMap;
