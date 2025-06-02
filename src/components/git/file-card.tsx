interface FileCardProps {
  name: string
  status: 'untracked' | 'modified' | 'staged' | 'committed' | 'stashed'
  onSelect?: () => void
  onAction?: () => void
  actionLabel?: string
  actionVariant?: 'blue' | 'green' | 'purple' | 'red'
}

export function FileCard({
  name,
  status,
  onSelect,
  onAction,
  actionLabel,
  actionVariant = 'blue',
}: FileCardProps) {
  const getStatusColor = (status: FileCardProps['status']) => {
    switch (status) {
      case 'untracked':
        return 'text-red-600 dark:text-red-400'
      case 'modified':
        return 'text-orange-600 dark:text-orange-400'
      case 'staged':
        return 'text-green-600 dark:text-green-400'
      case 'committed':
        return 'text-blue-600 dark:text-blue-400'
      case 'stashed':
        return 'text-purple-600 dark:text-purple-400'
    }
  }

  const getStatusBg = (status: FileCardProps['status']) => {
    switch (status) {
      case 'untracked':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      case 'modified':
        return 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800'
      case 'staged':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'committed':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      case 'stashed':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
    }
  }

  const getStatusText = (status: FileCardProps['status']) => {
    switch (status) {
      case 'untracked':
        return 'Untracked'
      case 'modified':
        return 'Modified'
      case 'staged':
        return 'Staged'
      case 'committed':
        return 'Committed'
      case 'stashed':
        return 'Stashed'
    }
  }

  const getActionColor = (variant: FileCardProps['actionVariant']) => {
    switch (variant) {
      case 'blue':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'green':
        return 'bg-green-500 hover:bg-green-600'
      case 'purple':
        return 'bg-purple-500 hover:bg-purple-600'
      case 'red':
        return 'bg-red-500 hover:bg-red-600'
    }
  }

  return (
    <div
      className={`p-3 rounded-lg border ${getStatusBg(
        status
      )} cursor-pointer hover:shadow-sm transition-all`}
      onClick={onSelect}
    >
      <div className='flex items-center justify-between mb-2'>
        <span className='font-medium text-gray-900 dark:text-white'>
          {name}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusColor(
            status
          )} bg-white dark:bg-gray-700`}
        >
          {getStatusText(status)}
        </span>
      </div>
      {onAction && actionLabel && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAction()
          }}
          className={`w-full ${getActionColor(
            actionVariant
          )} text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
