import Link from 'next/link'

export default function BranchingMergingPage() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-8'>
      {/* Breadcrumb */}
      <div className='mb-8'>
        <Link
          href='/'
          className='inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        >
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Git Visualizer
        </Link>
      </div>

      {/* Header */}
      <div className='mb-12'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-xl'>
            🌿
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            브랜치 생성과 머징
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          브랜치 생성, 전환, 병합 과정을 시각화로 학습해보세요
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center'>
        <div className='mb-6'>
          <div className='w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-green-600 dark:text-green-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
            곧 만나보실 수 있습니다!
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
            브랜치 생성과 머징에 대한 인터랙티브 시각화를 준비 중입니다. 현재는
            첫 번째 개념부터 차근차근 학습해보세요.
          </p>
        </div>

        <div className='space-y-3'>
          <Link
            href='/concepts/working-flow'
            className='inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors mr-3'
          >
            <svg
              className='w-4 h-4 mr-2'
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
            첫 번째 개념 학습하기
          </Link>
          <Link
            href='/'
            className='inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            학습 로드맵 보기
          </Link>
        </div>
      </div>

      {/* What's Coming */}
      <div className='mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          🚀 이런 내용들을 준비하고 있어요
        </h3>
        <div className='space-y-3 text-sm text-gray-600 dark:text-gray-400'>
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
            <span>브랜치 생성과 전환 (git branch, git checkout)</span>
          </div>
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
            <span>브랜치 간 이동 시각화</span>
          </div>
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
            <span>Fast-forward merge vs 3-way merge</span>
          </div>
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
            <span>브랜치 히스토리 그래프 시각화</span>
          </div>
        </div>
      </div>
    </div>
  )
}
