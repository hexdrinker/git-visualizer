interface FileViewerProps {
  fileName: string
  content: string
  onClose?: () => void
}

export function FileViewer({ fileName, content, onClose }: FileViewerProps) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
          📄 파일 내용: {fileName}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>
      <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm border'>
        <code className='text-gray-800 dark:text-gray-200'>{content}</code>
      </div>
    </div>
  )
}
