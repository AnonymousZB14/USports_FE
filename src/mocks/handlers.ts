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

export const handlers = [
  http.post('/api/login', ({ request }) => {
    console.log('로그인', request)
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    })
  }),
  http.post('/api/logout', () => {
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
  http.get(`/user-records`, async ({ request }) => {
    console.log('유저정보')
    return HttpResponse.json({
      records: [
        {
          recordId: '001',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '002',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '003',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '004',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '005',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '006',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '007',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '008',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '009',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '010',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '011',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
        {
          recordId: '012',
          imageAddress:
            'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f',
        },
      ],
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
          url: 'string',
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
          url: 'string',
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
          url: 'string',
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
          url: 'string',
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
          url: 'string',
        },
      ],
    })
  }),
  http.get('/api/postRecommends', ({ request }) => {
    const url = new URL(request.url)
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0
    return HttpResponse.json([
      {
        postId: cursor + 1,
        User: User[0],
        content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        User: User[1],
        content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        User: User[0],
        content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        User: User[1],
        content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        User: User[0],
        content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      },
    ])
  }),
]
