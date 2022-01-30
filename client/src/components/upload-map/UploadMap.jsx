import React, { useEffect, useState } from 'react';
import './UploadMap.css';

const { kakao } = window;

function UploadMap() {
  // 검색 키워드 state
  const [keyword, setKeyword] = useState('강남역'); // 배열로 바꿔야 될듯
  // 검색 결과 리스트
  const [list, setList] = useState([
    {
      place_name: '',
      address_name: '',
    },
  ]);

  // useEffect(() => {
  //   const mapContainer = document.getElementById('map');

  //   const options = {
  //     center: new kakao.maps.LatLng(37.554477, 126.970419),
  //     level: 3,
  //   };

  //   let map = new kakao.maps.Map(mapContainer, options);

  //   인포 윈도우
  //   let infoWindow = new kakao.maps.InfoWindow({
  //     zIndex: 1,
  //   });

  //   let makerList = [];

  //   키워드로 장소 검색을 위한 코드들
  //   let ps = new kakao.maps.services.Places();

  //   검색된 장소 리스트를 보여주기 위한 함수
  //   const displayPlaces = (data) => {
  //     let bounds = new kakao.maps.LatLangBounds();

  //     for (let i = 0; i < data; i++) {
  //       let lat = data[i].y;
  //       let lng = data[i].x;
  //       let address_name = data[i]['address_name'];
  //       let place_name = data[i]['place_name'];

  //       const placePosition = new kakao.maps.LatLng(lat, lng);
  //     }
  //   };

  //   결과값이 data, status는 결과값을 반환하기 위한 서버 상태
  //   const placesSearchCB = (data, status) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       displayPlaces(data);
  //     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
  //       alert('검색 결과가 존재하지 않습니다.');
  //       return;
  //     } else if (status === kakao.maps.services.Status.ERROR) {
  //       alert('오류가 발생 하였습니다.');
  //       return;
  //     }
  //   };

  //   const searchPlaces = () => {
  //     ps.keywordSearch(keyword, placesSearchCB);
  //   };

  //   searchPlaces();
  // }, []);

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

  let markerList = [];

  const keywordHandler = (event) => {
    setKeyword(event.target.value);
  };

  // onSubmit 이벤트도 활용하기 위해 useEffect 밖에도 구현 해줌
  // 키워드로 장소 검색을 위한 코드들
  let ps = new kakao.maps.services.Places();

  // 검색된 장소 리스트를 보여주기 위한 함수
  const displayPlaces = (data) => {
    // 마커 주변을 보여줌
    let bounds = new kakao.maps.LatLangBounds();

    for (let i = 0; i < data; i++) {
      let lat = data[i].y;
      let lng = data[i].x;
      let address_name = data[i]['address_name'];
      let place_name = data[i]['place_name'];

      const placePosition = new kakao.maps.LatLng(lat, lng);
      // 영역 계산을 위해 위 위치를 넣어줌
      bounds.extend(placePosition);

      let marker = new kakao.maps.Maker({
        position: placePosition,
      });

      // 지도에 띄어줌
      marker.setMap(map);
      // 마커리스트에 넣어줌
      markerList.push(marker);

      // 검색 결과 리스트 아이템
      const itemStr = {
        place_name,
        address_name,
      };

      setList(itemStr);

      // 마커 클릭시 인포 윈도우 보여줌
      kakao.maps.event.addListener(marker, 'click', function () {
        displayInfowindow(marker, place_name, address_name, lat, lng);
      });

      // 맵 클릭시 인포 윈도우 닫아줌
      kakao.maps.event.addListener(map, 'click', function () {
        infoWindow.close();
      });
    }

    // 마커 주변을 보여줌
    map.setBound(bounds);
  };

  // 인포 윈도우를 보여주기 위한 함수
  function displayInfowindow(marker, place_name, address_name, lat, lng) {
    let content = `
      <div>
        ${place_name}<br>
        ${address_name}<br>
        <button>등록</button>
      </div>
    `;

    // 마커 위치로 이동
    map.goTo(marker.getPosition());

    // 인포윈도우에 컨텐츠 넣어줌
    infoWindow.setContent(content);

    // 마커에 인포윈도우 표시
    infoWindow.open(map, marker);
  }

  // 결과값이 data, status는 결과값을 반환하기 위한 서버 상태
  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('오류가 발생 하였습니다.');
      return;
    }
  };

  // 검색 이벤트 핸들러
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
          <div id="placesList">
            {list &&
              list.map((item, index) => (
                <div key={index} className="item">
                  <div className="info">
                    <div className="info_title">{item.place_name}</div>
                    <span>{item.address_name}</span>
                  </div>
                </div>
              ))}
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadMap;
