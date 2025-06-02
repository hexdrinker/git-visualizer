interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {
  return (
    <div className='mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800'>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          진행 상황
        </span>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
      <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3'>
        <div
          className='bg-blue-500 h-2 rounded-full transition-all duration-500'
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        {steps[currentStep]}
      </p>
    </div>
  )
}
