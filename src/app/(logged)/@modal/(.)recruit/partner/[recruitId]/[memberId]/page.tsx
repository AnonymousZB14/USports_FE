'use client'
import Button from '@/components/commonButton'
import Modal from '@/components/modal'
import { Postfetch } from '@/func/fetchCall'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface PartnerEvaluation {
  kindness: number
  passion: number
  teamwork: number
  sportsScore: number
}

const Page = () => {
  const param = useParams()
  const route = useRouter()
  const { recruitId, memberId } = param
  const [evaluation, setEvaluation] = useState<PartnerEvaluation>({
    kindness: 1,
    passion: 1,
    teamwork: 1,
    sportsScore: 3,
  })

  const handlekindnessClick = (score: number) => {
    setEvaluation({
      ...evaluation,
      kindness: score,
    })
  }

  const handlepassionClick = (score: number) => {
    setEvaluation({
      ...evaluation,
      passion: score,
    })
  }

  const handleteamworkClick = (score: number) => {
    setEvaluation({
      ...evaluation,
      teamwork: score,
    })
  }

  const handlesportsScoreClick = (level: number) => {
    setEvaluation({
      ...evaluation,
      sportsScore: level,
    })
  }

  const isButtonActive = (value: number | string, category: string) => {
    if (category === 'manners') {
      // console.log(evaluation.kindness)
      return value === evaluation.kindness
    } else if (category === 'passion') {
      // console.log(evaluation.passion)
      return value === evaluation.passion
    } else if (category === 'teamwork') {
      // console.log(evaluation.teamwork)
      return value === evaluation.teamwork
    } else if (category === 'skill') {
      // console.log(evaluation.sportsScore)
      return value === evaluation.sportsScore
    }
    return false
  }

  const sportsScores = [
    {
      label: '비기너',
      description: '처음해봐요',
      subLevels: [
        { name: '상', value: 3 },
        { name: '중', value: 2 },
        { name: '하', value: 1 },
      ],
    },
    {
      label: '아마추어',
      description: '기본기가 좋아요',
      subLevels: [
        { name: '상', value: 6 },
        { name: '중', value: 5 },
        { name: '하', value: 4 },
      ],
    },
    {
      label: '세미프로',
      description: '잘하는 편입니다',
      subLevels: [
        { name: '상', value: 8 },
        { name: '하', value: 7 },
      ],
    },
    {
      label: '프로',
      description: '잘해요',
      subLevels: [{ name: '상', value: 9 }],
    },
  ]

  const handleSubmit = async () => {
    // console.log('폼 제출:', evaluation)
    try {
      const res = await Postfetch('evaluation', {
        kindness: evaluation.kindness,
        passion: evaluation.passion,
        recruitId: recruitId,
        sportsScore: evaluation.sportsScore,
        teamwork: evaluation.teamwork,
        toMemberId: memberId,
      })
      if (res.status === 200) {
        alert('평가가 완료되었습니다!')
        route.back()
      }
    } catch (error) {}
  }
  return (
    <Modal>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3>파트너 평가</h3>
        </div>
        <div className="modal-body">
          <div className="manners-wrap">
            <label>😄 친절 점수</label>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handlekindnessClick(score)}
                className={isButtonActive(score, 'manners') ? 'active' : ''}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="passion-wrap">
            <label>😄 열정 점수</label>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handlepassionClick(score)}
                className={isButtonActive(score, 'passion') ? 'active' : ''}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="teamwork-wrap">
            <label>😄 팀워크 점수</label>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handleteamworkClick(score)}
                className={isButtonActive(score, 'teamwork') ? 'active' : ''}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="skill-wrap">
            <label>😄 운동실력</label>
            {sportsScores.map((levelInfo) => (
              <div key={levelInfo.label} className="skill-item">
                <div className="level-info">
                  <strong>{levelInfo.label}</strong>
                  <span>{levelInfo.description}</span>
                </div>
                {levelInfo.subLevels.map((subLevel) => (
                  <button
                    key={subLevel.value}
                    onClick={() => handlesportsScoreClick(subLevel.value)}
                    disabled={evaluation.sportsScore === subLevel.value}
                  >
                    {subLevel.name}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <Button
            type="button"
            theme="blue"
            tailwindStyles="py-0 px-2 float-right"
            onClick={handleSubmit}
          >
            평가하기
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Page
