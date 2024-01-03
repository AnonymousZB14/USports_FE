import { http, HttpResponse, StrictResponse } from 'msw'
import { faker } from '@faker-js/faker'
function generateDate() {
  const lastWeek = new Date(Date.now())
  lastWeek.setDate(lastWeek.getDate() - 7)
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  })
}
const User = [
  {
    userId: 1,
    id: 'elonmusk',
    nickname: 'Elon Musk',
    email: 'olu-zr@naver.com',
    image: '/tomatoA.svg',
  },
  {
    userId: 2,
    id: 'nara',
    nickname: '나라',
    email: 'olu-zr@naver.com',
    image: '/tomatoA.svg',
  },
  {
    userId: 3,
    id: 'nara',
    nickname: '나라',
    email: 'olu-zr@naver.com',
    image: '/tomatoA.svg',
  },
]
const ACCESSTOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXBweWhzcnl1QGdtYWlsLmNvbSIsImlhdCI6MTcwMjM3Mjk5NywiZXhwIjoxNzAyNTg4OTk3fQ.WcUEwKNxFepfB9_fK3XAGQi71mfDefnNi_JIGxJZigD3Er8CeC5s0vBigzZVMGlYVD0th_Sv2tdzPtZo0wlhLw'
export const handlers = [
  http.post('/member/login', ({ request }) => {
    // console.log('로그인', request)
    return HttpResponse.json(
      {
        user: {
          memberId: '001',
          accountName: 'testAcName',
          name: 'testname',
          email: 'happyhsryu@gmail.com',
          image: '/tomatoA.svg',
          profileOpen: 'open',
          tokenDto: {
            accessToken: 'secretToken',
            refreshToken: 'refreshToken',
            tokenType: 'tokenType',
          },
        },
      },
      {
        headers: {
          'Set-Cookie': `connect.sid=${ACCESSTOKEN};HttpOnly;Path=/`,
        },
      },
    )
  }),
  http.post('/member/logout', () => {
    console.log('로그아웃')
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    })
  }),
  http.post('/member/register', async ({ request }) => {
    console.log(request.body)
    console.log('회원가입')
    /*     return HttpResponse.text(JSON.stringify('user_exists'), {
      status: 403,
    }) */
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0',
      },
    })
  }),
  http.get('/user', async ({ request }) => {
    return HttpResponse.json({
      id: 1,
      name: 'naraLee',
      profileImage:
        'https://lh3.googleusercontent.com/a/ACg8ocKE_zmbDmAr6qBdQzGwgyrzfbOXWWnD4MVfa0fwb6yPeg=s288-c-no',
    })
  }),

  http.get(`/notifications`, async ({ request }) => {
    console.log('알림내역')
    return HttpResponse.json({
      list: [
        {
          createdAt: '2023-12-12T06:40:27.057Z',
          entityType: 'MEMBER',
          memberId: 0,
          message: 'alert message string',
          notificationId: 0,
          readAt: '2023-12-12T06:40:27.057Z',
          targetEntityId: 0,
          type: 'ALERT',
          url: '',
        },
        {
          createdAt: '2023-12-12T06:40:27.057Z',
          entityType: 'MEMBER',
          memberId: 0,
          message: 'alert message string',
          notificationId: 0,
          readAt: '2023-12-12T06:40:27.057Z',
          targetEntityId: 0,
          type: 'ALERT',
          url: '',
        },
        {
          createdAt: '2023-12-12T06:40:27.057Z',
          entityType: 'MEMBER',
          memberId: 0,
          message: 'alert message string',
          notificationId: 0,
          readAt: '2023-12-12T06:40:27.057Z',
          targetEntityId: 0,
          type: 'ALERT',
          url: '',
        },
        {
          createdAt: '2023-12-12T06:40:27.057Z',
          entityType: 'MEMBER',
          memberId: 0,
          message: 'alert message string',
          notificationId: 0,
          readAt: '2023-12-12T06:40:27.057Z',
          targetEntityId: 0,
          type: 'ALERT',
          url: '',
        },
        {
          createdAt: '2023-12-12T06:40:27.057Z',
          entityType: 'MEMBER',
          memberId: 0,
          message: 'alert message string',
          notificationId: 0,
          readAt: '2023-12-12T06:40:27.057Z',
          targetEntityId: 0,
          type: 'ALERT',
          url: '',
        },
      ],
    })
  }),
  http.get('/api/postRecommends', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') as string) || 0
    return HttpResponse.json([
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
        ],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 1,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [faker.image.urlPicsumPhotos()],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 2,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
        ],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 3,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [faker.image.urlPicsumPhotos()],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 4,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [faker.image.urlPicsumPhotos()],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 5,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
    ])
  }),
  http.get('/api/postFollowings', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') as string) || 0
    return HttpResponse.json([
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
        ],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 1,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [faker.image.urlPicsumPhotos()],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 2,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
        ],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 3,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
        ],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 4,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
      {
        accountName: `${faker.person.firstName()}`,
        countComment: 9,
        imageAddressList: [faker.image.urlPicsumPhotos()],
        memberId: 1,
        recordContent: `${faker.lorem.sentence()}`,
        recordId: page + 5,
        registeredAt: new Date(),
        sportsId: 98,
        updatedAt: new Date(),
      },
    ])
  }),
  http.get('/home/recommend', ({ request, params }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') as string) || 0
    return HttpResponse.json({
      // currentElements: 0,
      currentPage: page,
      list: [

        {
          accountName: faker.person.firstName(),
          commentList: [
            {
              accountName: faker.person.firstName(),
              commentId: 0,
              content: faker.lorem.sentence(),
              memberId: 0,
              name: faker.person.firstName(),
              parentId: 0,
              profileImage: faker.image.avatar(),
              recordId: 0,
              registerAt: '2023-12-19T10:13:43.449Z',
              updatedAt: '2023-12-19T10:13:43.449Z',
            },
          ],
          countComment: 0,
          imageAddressList: [faker.image.urlPicsumPhotos(),faker.image.urlPicsumPhotos(),faker.image.urlPicsumPhotos()],
          memberId: 0,
          name: faker.person.firstName(),
          profileImage: faker.image.avatar(),
          recordContent: faker.lorem.sentence(),
          recordId: 0,
          registeredAt: '2023-12-19T10:13:43.449Z',
          sportsId: 0,
          updatedAt: '2023-12-19T10:13:43.449Z',
        },
        {
          accountName: faker.person.firstName(),
          commentList: [
            {
              accountName: faker.person.firstName(),
              commentId: 0,
              content: faker.lorem.sentence(),
              memberId: 0,
              name: faker.person.firstName(),
              parentId: 0,
              profileImage: faker.image.avatar(),
              recordId: 0,
              registerAt: '2023-12-19T10:13:43.449Z',
              updatedAt: '2023-12-19T10:13:43.449Z',
            },
          ],
          countComment: 0,
          imageAddressList: [faker.image.urlPicsumPhotos(),faker.image.urlPicsumPhotos(),faker.image.urlPicsumPhotos(),faker.image.urlPicsumPhotos()],
          memberId: 0,
          name: faker.person.firstName(),
          profileImage: faker.image.avatar(),
          recordContent: faker.lorem.sentence(),
          recordId: 0,
          registeredAt: '2023-12-19T10:13:43.449Z',
          sportsId: 0,
          updatedAt: '2023-12-19T10:13:43.449Z',
        },
      ],
      // pageSize: 0,
      // totalElements: 0,
      // totalPages: 0,
    })
  }),
  http.get('/profile/:accoutName/records', ({ request, params }) => {
    const { accoutName } = params
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') as string) || 0
    return HttpResponse.json({
      currentPage: page,
      list: [
        {
          recordId: page + 1,
          imageAddress: faker.image.urlPicsumPhotos(),
        },
        {
          recordId: page + 2,
          imageAddress: faker.image.urlPicsumPhotos(),
        },
        {
          recordId: page + 3,
          imageAddress: faker.image.urlPicsumPhotos(),
        },
        {
          recordId: page + 4,
          imageAddress: faker.image.urlPicsumPhotos(),
        },
        {
          recordId: page + 5,
          imageAddress: faker.image.urlPicsumPhotos(),
        },
        {
          recordId: page + 6,
          imageAddress: faker.image.urlPicsumPhotos(),
        },
      ],
    })
  }),
  http.get('/profile/:accoutName', ({ request, params }) => {
    const { accountName } = params
    return HttpResponse.json({
      memberProfile: {
        accountName: 'accountName',
        email: `test@gmail.com`,
        interestSportsList: [''],
        mannerScore: 7,
        memberId: 0,
        name: 'name',
        plusAlpha: 0,
        profileImage: '/nara1.PNG',
      },
      sportsSkills: [
        {
          sportsGrade: 'AMATEUR_1',
          sportsName: '',
          sportsSkillId: 0,
        },
      ],
    })
  }),
  http.get('/profile/:accoutName/recruits', ({ request, params }) => {
    const { accoutName } = params
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') as string) || 0
    return HttpResponse.json({
      currentPage: 1,
      list: [
        {
          content: faker.lorem.sentence(),
          memberId: 0,
          recruitId: page + 1,
          recruitStatus: 'ALMOST_END',
          sportsId: 0,
          title: faker.lorem.sentence(3),
        },
        {
          content: faker.lorem.sentence(),
          memberId: 0,
          recruitId: page + 2,
          recruitStatus: 'ALMOST_END',
          sportsId: 0,
          title: faker.lorem.sentence(3),
        },
        {
          content: faker.lorem.sentence(),
          memberId: 0,
          recruitId: page + 3,
          recruitStatus: 'ALMOST_END',
          sportsId: 0,
          title: faker.lorem.sentence(3),
        },
      ],
    })
  }),
  http.get('/record/:recordId', ({ request, params }) => {
    const { recordId } = params
    const url = new URL(request.url)
    // const page = parseInt(url.searchParams.get('page') as string) || 0
    return HttpResponse.json({
      accountName: 'nara',
      commentList: [
        {
          accountName: faker.person.firstName(),
          commentId: 0,
          content: faker.lorem.sentence(),
          memberId: 0,
          name: faker.person.firstName(),
          parentId: 0,
          profileImage: faker.image.avatar(),
          recordId: 0,
          registerAt: '2023-12-18T04:20:57.627Z',
          updatedAt: '2023-12-18T04:20:57.627Z',
        },
        {
          accountName: faker.person.firstName(),
          commentId: 0,
          content: faker.lorem.sentence(),
          memberId: 0,
          name: faker.person.firstName(),
          parentId: 0,
          profileImage: faker.image.avatar(),
          recordId: 0,
          registerAt: '2023-12-18T04:20:57.627Z',
          updatedAt: '2023-12-18T04:20:57.627Z',
        },
        {
          accountName: faker.person.firstName(),
          commentId: 0,
          content: faker.lorem.sentence(),
          memberId: 0,
          name: faker.person.firstName(),
          parentId: 0,
          profileImage: faker.image.avatar(),
          recordId: 0,
          registerAt: '2023-12-18T04:20:57.627Z',
          updatedAt: '2023-12-18T04:20:57.627Z',
        },
      ],
      countComment: 0,
      imageAddressList: [
        faker.image.urlPicsumPhotos(),
        faker.image.urlPicsumPhotos(),
      ],
      memberId: 0,
      name: faker.person.firstName(),
      profileImage: faker.image.avatar(),
      recordContent: '러닝 오운완',
      recordId: recordId,
      registeredAt: '2023-12-18T04:20:57.627Z',
      sportsId: 0,
      updatedAt: '2023-12-18T04:20:57.627Z',
    })
  }),
]
