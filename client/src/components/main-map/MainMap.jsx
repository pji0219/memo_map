import React, { useEffect, useState } from 'react';
import './MainMap.css';

const { naver } = window;

function MainMap() {
  // 데이터
  const [data, setData] = useState([
    {
      title: '서울역',
      address: '서울 종로',
      lat: 37.556124592490924,
      lng: 126.97230626928535,
    },
    {
      title: '용산역',
      address: '용산',
      lat: 37.52976147451202,
      lng: 126.96452357491705,
    },
  ]);
  // 마커 리스트
  const markerList = [];
  // 인포윈도우 리스트
  const infowindowList = [];

  useEffect(() => {
    // 맵 설정
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };

    const map = new naver.maps.Map('map', mapOptions);

    // 데이터를 이용해 마커와 인포윈도우 설정
    data.map((target) => {
      // 위도, 경도
      let latlng = new naver.maps.LatLng(target.lat, target.lng);

      // 마커 설정
      let marker = new naver.maps.Marker({
        map,
        position: latlng,
        icon: {
          content: '<div class="marker"></div>',
          anchor: new naver.maps.Point(7.5, 7.5),
        },
      });

      // 인포윈도우 컨텐츠
      const content = `
        <div class="infowindow_wrap">
          <div class="infowindow_title">${target.title}</div>
          <div class="infowindow_address">${target.address}</div>
        </div>
      `;

      // 인포윈도우 설정
      const infowindow = new naver.maps.InfoWindow({
        content,
        backgroundColor: '#00ff0000',
        borderColor: '#00ff0000',
        anchorSize: new naver.maps.Size(0, 0), // 꼬리표 없앰
      });

      markerList.push(marker);
      infowindowList.push(infowindow);
    });

    // 마커를 클릭 했을 때 인포 윈도우를 띄어주거나 닫아줌
    // 리턴 값을 함수로 하기 위해 화살표 함수를 두번 씀
    // ( 이유는 아래 코드에서 for문이 돌면서 클릭하지 않아도 바로 함수가 호출 되는 것을 방지 하기 위해 )
    const onClick = (idx) => () => {
      const marker = markerList[idx];
      const infowindow = infowindowList[idx];

      /* 
        getMap()이라는 메서드를 통해 인포 윈도우가 지도 위에 띄워져 있는지 확인 후 띄워져 있으면 인포 윈도우를 닫고
        그 반대면 마커 위치에 인포 윈도우를 연다.
      */
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    };

    // 지도를 클릭 했을 때 열려 있는 인포윈도우를 닫아 준다.
    const onClickMap = (idx) => () => {
      const infowindow = infowindowList[idx];

      infowindow.close();
    };

    /* 
      마커들에게 클릭했을 때 인포 윈도우를 띄워주는 이벤트를 달아줌
      지도를 클릭했을 때 인포 윈도우를 닫는 이벤트를 달아줌
    */
    for (let i = 0; i < markerList.length; i++) {
      naver.maps.Event.addListener(markerList[i], 'click', onClick(i));
      naver.maps.Event.addListener(map, 'click', onClickMap(i));
    }
  }, []);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </>
  );
}

export default MainMap;
