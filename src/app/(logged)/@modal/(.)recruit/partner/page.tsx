'use client'
import Button from '@/components/Button'
import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface PartnerEvaluation {
  mannersScore: number
  passionScore: number
  teamworkScore: number
  skillLevel: string | null
}

const Page = () => {
  const [evaluation, setEvaluation] = useState<PartnerEvaluation>({
    mannersScore: 1,
    passionScore: 1,
    teamworkScore: 1,
    skillLevel: null,
  })

  const handleMannersScoreClick = (score: number) => {
    setEvaluation({
      ...evaluation,
      mannersScore: score,
    })
  }

  const handlePassionScoreClick = (score: number) => {
    setEvaluation({
      ...evaluation,
      passionScore: score,
    })
  }

  const handleTeamworkScoreClick = (score: number) => {
    setEvaluation({
      ...evaluation,
      teamworkScore: score,
    })
  }

  const handleSkillLevelClick = (level: string) => {
    setEvaluation({
      ...evaluation,
      skillLevel: level,
    })
  }

  const isButtonActive = (value: number | string, category: string) => {
    if (category === 'manners') {
      console.log(evaluation.mannersScore)
      return value === evaluation.mannersScore
    } else if (category === 'passion') {
      console.log(evaluation.passionScore)
      return value === evaluation.passionScore
    } else if (category === 'teamwork') {
      console.log(evaluation.teamworkScore)
      return value === evaluation.teamworkScore
    } else if (category === 'skill') {
      console.log(evaluation.skillLevel)
      return value === evaluation.skillLevel
    }
    return false
  }

  const skillLevels = [
    {
      label: '비기너',
      description: '처음해봐요',
      subLevels: ['상', '중', '하'],
    },
    {
      label: '아마추어',
      description: '기본기가 좋아요',
      subLevels: ['상', '중', '하'],
    },
    {
      label: '세미프로',
      description: '잘하는 편입니다',
      subLevels: ['상', '하'],
    },
    { label: '프로', description: '잘해요', subLevels: ['상'] },
  ]

  const handleSubmit = () => {
    console.log('폼 제출:', evaluation)
  }
  return (
    <Modal>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3>파트너 평가</h3>
        </div>
        <div className="modal-body">
          <div className="manners-wrap">
            <label>✐ 매너점수</label>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handleMannersScoreClick(score)}
                className={isButtonActive(score, 'manners') ? 'active' : ''}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="passion-wrap">
            <label>✐ 열정 점수</label>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handlePassionScoreClick(score)}
                className={isButtonActive(score, 'passion') ? 'active' : ''}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="teamwork-wrap">
            <label>✐ 팀워크 점수</label>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handleTeamworkScoreClick(score)}
                className={isButtonActive(score, 'teamwork') ? 'active' : ''}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="skill-wrap">
            <label>✐ 운동실력</label>
            {skillLevels.map((levelInfo) => (
              <div key={levelInfo.label} className="skill-item">
                <div className="level-info">
                  <strong>{levelInfo.label}</strong>
                  <span>{levelInfo.description}</span>
                </div>
                {levelInfo.subLevels.map((subLevel) => (
                  <button
                    key={subLevel}
                    onClick={() =>
                      handleSkillLevelClick(`${levelInfo.label} ${subLevel}`)
                    }
                    disabled={
                      evaluation.skillLevel === `${levelInfo.label} ${subLevel}`
                    }
                  >
                    {subLevel}
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
