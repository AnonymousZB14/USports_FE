/* 

Profile 변경 요청 사항
1. 프로필 (GET/profile/{accountName}) -> 해당 프로필 유저 정보만 요청
2. 프로필-해당 유저 기록글 (GET/profile/{accountName}/records) -> 그 유저의 기록글 요청
3. 프로필-해당 유저 모집글 (GET/profile/{accountName}/recruits) -> 그 유저의 모집글 요청
으로 나눠주셨으면 좋겠습니다

현재 응답값에서 memberProfile,sportsSkills 은 1번 응답값으로
2,3 번은 각각 recordList, recruitList 으로 전달주시되 
  @@ 기록글
  "data": {
    "currentPage": number,
    "list": [
      {
        "imageAddress": "string"
        "recordId": number,  //기록글의 경우 썸네일 형식으로만 보여지기 때문
      }
    ],
    "pageSize": number,
    "totalElements": number,
    "totalPages": number
  },

  @@모집글
    "data": {
    "currentPage": number,
    "list": [
      {
          ...
          기존 그대로 
          ...
      }
    ],
    "pageSize": number,
    "totalElements": number,
    "totalPages": number
  },

  형태로 전달주시면 감사하겠습니다
  
*/