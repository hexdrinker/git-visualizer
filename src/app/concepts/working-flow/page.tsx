'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileCard } from '@/components/git/file-card'
import { GitArea } from '@/components/git/git-area'
import { ProgressBar } from '@/components/git/progress-bar'
import { FileViewer } from '@/components/git/file-viewer'

type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed'

interface FileItem {
  name: string
  status: FileStatus
  content: string
}

export default function WorkingFlowPage() {
  const [files, setFiles] = useState<FileItem[]>([
    { name: 'README.md', status: 'committed', content: '# My Project' },
    { name: 'index.js', status: 'modified', content: 'console.log("hello")' },
    { name: 'style.css', status: 'untracked', content: 'body { margin: 0; }' },
  ])

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    '파일들의 현재 상태를 확인해보세요',
    'git add 명령으로 파일을 Staging Area로 이동',
    'git commit 명령으로 Repository에 저장',
    '완료! 모든 변경사항이 안전하게 저장되었습니다',
  ]

  const handleAddFile = (fileName: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.name === fileName &&
        (file.status === 'untracked' || file.status === 'modified')
          ? { ...file, status: 'staged' }
          : file
      )
    )
    setCurrentStep(Math.max(currentStep, 1))
  }

  const handleCommit = () => {
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'staged' ? { ...file, status: 'committed' } : file
      )
    )
    setCurrentStep(Math.max(currentStep, 2))
  }

  const resetDemo = () => {
    setFiles([
      { name: 'README.md', status: 'committed', content: '# My Project' },
      { name: 'index.js', status: 'modified', content: 'console.log("hello")' },
      {
        name: 'style.css',
        status: 'untracked',
        content: 'body { margin: 0; }',
      },
    ])
    setCurrentStep(0)
    setSelectedFile(null)
  }

  const workingFiles = files.filter(
    (f) => f.status === 'untracked' || f.status === 'modified'
  )
  const stagingFiles = files.filter((f) => f.status === 'staged')
  const committedFiles = files.filter((f) => f.status === 'committed')

  return (
    <div className='max-w-6xl mx-auto px-6 py-8'>
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
      <div className='mb-8'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-xl'>
            📁
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Working Directory ↔ Staging ↔ Repository
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-6'>
          Git의 3가지 핵심 영역과 파일들의 상태 변화를 체험해보세요
        </p>

        {/* Sub-navigation */}
        <div className='flex flex-wrap gap-3'>
          <Link
            href='/concepts/working-flow/internals'
            className='inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors'
          >
            🔧 Git 내부 구조
          </Link>
          <Link
            href='/concepts/working-flow/stash'
            className='inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors'
          >
            📦 Stash 기능
          </Link>
          <Link
            href='/concepts/working-flow/commit-push'
            className='inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors'
          >
            🚀 Commit vs Push
          </Link>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar
        currentStep={currentStep}
        totalSteps={steps.length}
        steps={steps}
      />

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        {/* Working Directory */}
        <GitArea
          title='Working Directory'
          description='현재 작업 중인 파일들'
          color='red'
        >
          {workingFiles.map((file) => (
            <FileCard
              key={file.name}
              name={file.name}
              status={file.status}
              onSelect={() => setSelectedFile(file.name)}
              onAction={() => handleAddFile(file.name)}
              actionLabel='git add'
              actionVariant='blue'
            />
          ))}
          {workingFiles.length === 0 && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
              <div className='text-2xl mb-2'>✅</div>
              <p className='text-sm'>변경된 파일이 없습니다</p>
            </div>
          )}
        </GitArea>

        {/* Staging Area */}
        <GitArea
          title='Staging Area'
          description='커밋할 준비가 된 파일들'
          color='green'
          action={
            stagingFiles.length > 0
              ? {
                  label: 'git commit',
                  onClick: handleCommit,
                }
              : undefined
          }
        >
          {stagingFiles.map((file) => (
            <FileCard
              key={file.name}
              name={file.name}
              status={file.status}
              onSelect={() => setSelectedFile(file.name)}
            />
          ))}
          {stagingFiles.length === 0 && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
              <div className='text-2xl mb-2'>📋</div>
              <p className='text-sm'>스테이징된 파일이 없습니다</p>
            </div>
          )}
        </GitArea>

        {/* Repository */}
        <GitArea
          title='Repository'
          description='커밋된 파일들'
          color='blue'
        >
          {committedFiles.map((file) => (
            <FileCard
              key={file.name}
              name={file.name}
              status={file.status}
              onSelect={() => setSelectedFile(file.name)}
            />
          ))}
        </GitArea>
      </div>

      {/* File Content Viewer */}
      {selectedFile && (
        <FileViewer
          fileName={selectedFile}
          content={files.find((f) => f.name === selectedFile)?.content || ''}
          onClose={() => setSelectedFile(null)}
        />
      )}

      {/* Controls */}
      <div className='flex justify-center mb-12'>
        <button
          onClick={resetDemo}
          className='inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
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
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          데모 재시작
        </button>
      </div>

      {/* Explanation */}
      <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          💡 개념 설명
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center mb-3'>
              <div className='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Working Directory
              </h3>
            </div>
            <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
              현재 작업 중인 디렉토리입니다. 파일을 수정하거나 새로 만들면 이
              영역에 나타납니다. Git이 아직 추적하지 않는 파일들(Untracked)과
              수정된 파일들(Modified)이 있습니다.
            </p>
          </div>
          <div>
            <div className='flex items-center mb-3'>
              <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Staging Area
              </h3>
            </div>
            <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
              다음 커밋에 포함될 변경사항들을 준비하는 영역입니다. `git add`
              명령으로 파일을 이 영역으로 이동시킵니다. 커밋하기 전에 변경사항을
              검토하고 선별할 수 있습니다.
            </p>
          </div>
          <div>
            <div className='flex items-center mb-3'>
              <div className='w-3 h-3 bg-blue-500 rounded-full mr-2'></div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Repository
              </h3>
            </div>
            <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
              Git 데이터베이스입니다. `git commit` 명령으로 Staging Area의
              변경사항들을 영구적으로 저장합니다. 각 커밋은 고유한 해시값을
              가지며 프로젝트의 히스토리를 형성합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
