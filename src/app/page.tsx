import Link from 'next/link'

export default function Home() {
  const concepts = [
    {
      id: 1,
      title: 'Working Directory ↔ Staging ↔ Repository',
      description: 'Git의 3가지 영역과 파일 상태 변화를 시각적으로 학습',
      path: '/concepts/working-flow',
      icon: '📁',
      status: 'ready',
    },
    {
      id: 2,
      title: '브랜치 생성과 머징',
      description: '브랜치 생성, 전환, 병합 과정의 시각화',
      path: '/concepts/branching-merging',
      icon: '🌿',
      status: 'coming-soon',
    },
    {
      id: 3,
      title: 'Rebase vs Merge',
      description: '두 가지 브랜치 통합 방식의 차이점 비교',
      path: '/concepts/rebase-vs-merge',
      icon: '🔄',
      status: 'coming-soon',
    },
    {
      id: 4,
      title: 'Conflict 해결',
      description: '병합 충돌 발생과 해결 과정 학습',
      path: '/concepts/conflict-resolution',
      icon: '⚡',
      status: 'coming-soon',
    },
    {
      id: 5,
      title: 'Remote와 Local 동기화',
      description: '원격 저장소와 로컬 저장소 간의 동기화 과정',
      path: '/concepts/remote-sync',
      icon: '☁️',
      status: 'coming-soon',
    },
  ]

  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <div className='mb-6'>
          <h1 className='text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4'>
            Git을 시각적으로 배우세요
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            복잡한 Git 개념들을 직관적이고 인터랙티브한 시각화로 쉽게 이해할 수
            있습니다. 단계별로 구성된 학습 과정으로 Git 마스터가 되어보세요.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
          <span className='inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800'>
            💡 인터랙티브 학습
          </span>
          <span className='inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800'>
            🎯 단계별 진행
          </span>
          <span className='inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800'>
            🎨 시각적 설명
          </span>
        </div>
      </div>

      {/* Learning Path */}
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-2'>
          📚 학습 로드맵
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Git의 핵심 개념들을 마스터해보세요
        </p>
      </div>

      {/* Concepts Grid */}
      <div className='space-y-3'>
        {concepts.map((concept, index) => (
          <Link
            key={concept.id}
            href={concept.path}
            className='block group'
          >
            <div className='flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200'>
              <div className='flex items-center space-x-4 flex-1'>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg border border-gray-200 dark:border-gray-700'>
                    {concept.icon}
                  </div>
                  <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {index + 1}
                  </div>
                </div>

                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                    {concept.title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                    {concept.description}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                {concept.status === 'ready' ? (
                  <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'>
                    학습 가능
                  </span>
                ) : (
                  <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
                    준비 중
                  </span>
                )}

                <svg
                  className='w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className='mt-16 text-center'>
        <div className='inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
          <span>🚀</span>
          <span>쉬운 개념부터 익혀나갈 수 있도록 구성되었습니다</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='p-6 rounded-lg border border-gray-200 dark:border-gray-800'>
          <div className='text-2xl mb-3'>🎯</div>
          <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
            실습 중심
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            이론만이 아닌 직접 체험할 수 있는 인터랙티브 시뮬레이션으로
            학습합니다.
          </p>
        </div>

        <div className='p-6 rounded-lg border border-gray-200 dark:border-gray-800'>
          <div className='text-2xl mb-3'>📈</div>
          <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
            단계적 진행
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            기초부터 고급까지, 체계적으로 구성된 커리큘럼으로 실력을 쌓아갑니다.
          </p>
        </div>

        <div className='p-6 rounded-lg border border-gray-200 dark:border-gray-800'>
          <div className='text-2xl mb-3'>💡</div>
          <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
            직관적 이해
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            복잡한 Git 개념들을 시각적 다이어그램과 애니메이션으로 쉽게
            이해합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
