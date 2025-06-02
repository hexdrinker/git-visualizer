import Link from 'next/link'

export default function ConflictResolutionPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-red-900'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center text-red-600 hover:text-red-800 mb-4'
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
            돌아가기
          </Link>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-white mb-2'>
            Conflict 해결
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            병합 충돌 발생과 해결 과정을 학습해보세요
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
            🚧 개발 중입니다
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            이 페이지는 현재 구현 중에 있습니다. 곧 만나보실 수 있습니다!
          </p>
          <Link
            href='/concepts/working-flow'
            className='inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors'
          >
            첫 번째 개념 학습하기
          </Link>
        </div>
      </div>
    </div>
  )
}
