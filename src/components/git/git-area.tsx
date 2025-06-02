import { ReactNode } from 'react'

interface GitAreaProps {
  title: string
  description: string
  color: 'red' | 'green' | 'blue' | 'purple'
  children: ReactNode
  action?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  extraAction?: ReactNode
}

export function GitArea({
  title,
  description,
  color,
  children,
  action,
  extraAction,
}: GitAreaProps) {
  const getColorClasses = (color: GitAreaProps['color']) => {
    switch (color) {
      case 'red':
        return 'bg-red-500'
      case 'green':
        return 'bg-green-500'
      case 'blue':
        return 'bg-blue-500'
      case 'purple':
        return 'bg-purple-500'
    }
  }

  const getActionClasses = (color: GitAreaProps['color']) => {
    switch (color) {
      case 'red':
        return 'bg-red-500 hover:bg-red-600'
      case 'green':
        return 'bg-green-500 hover:bg-green-600'
      case 'blue':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'purple':
        return 'bg-purple-500 hover:bg-purple-600'
    }
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <div
            className={`w-3 h-3 ${getColorClasses(color)} rounded-full mr-3`}
          ></div>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            {title}
          </h2>
        </div>
        {extraAction}
      </div>

      <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
        {description}
      </p>

      <div className='space-y-3'>{children}</div>

      {action && (
        <button
          onClick={action.onClick}
          disabled={action.disabled}
          className={`mt-4 w-full ${getActionClasses(
            color
          )} text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
