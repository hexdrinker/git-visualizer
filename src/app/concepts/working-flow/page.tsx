'use client'

import { useState } from 'react'
import Link from 'next/link'

type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed' | 'stashed'

interface FileItem {
  name: string
  status: FileStatus
  content: string
}

interface StashItem {
  id: string
  message: string
  files: FileItem[]
  timestamp: string
}

export default function WorkingFlowPage() {
  const [files, setFiles] = useState<FileItem[]>([
    { name: 'README.md', status: 'committed', content: '# My Project' },
    { name: 'index.js', status: 'modified', content: 'console.log("hello")' },
    { name: 'style.css', status: 'untracked', content: 'body { margin: 0; }' },
  ])

  const [stashList, setStashList] = useState<StashItem[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [showInternals, setShowInternals] = useState(false)
  const [showStash, setShowStash] = useState(false)

  const steps = [
    '파일들의 현재 상태를 확인해보세요',
    'git add 명령으로 파일을 Staging Area로 이동',
    'git commit 명령으로 Repository에 저장',
    '완료! 모든 변경사항이 안전하게 저장되었습니다',
  ]

  const getStatusColor = (status: FileStatus) => {
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

  const getStatusBg = (status: FileStatus) => {
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

  const getStatusText = (status: FileStatus) => {
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

  const handleStash = () => {
    const modifiedFiles = files.filter(
      (f) => f.status === 'modified' || f.status === 'staged'
    )
    if (modifiedFiles.length === 0) return

    const newStash: StashItem = {
      id: `stash@{${stashList.length}}`,
      message: `WIP on main: 임시 저장된 변경사항 ${modifiedFiles.length}개`,
      files: [...modifiedFiles],
      timestamp: new Date().toLocaleTimeString('ko-KR'),
    }

    setStashList((prev) => [newStash, ...prev])
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'modified' || file.status === 'staged'
          ? { ...file, status: 'committed' }
          : file
      )
    )
  }

  const handleStashPop = (stashId: string) => {
    const stash = stashList.find((s) => s.id === stashId)
    if (!stash) return

    setFiles((prev) =>
      prev.map((file) => {
        const stashedFile = stash.files.find((sf) => sf.name === file.name)
        return stashedFile
          ? { ...file, status: 'modified', content: stashedFile.content }
          : file
      })
    )

    setStashList((prev) => prev.filter((s) => s.id !== stashId))
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
    setStashList([])
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
      <div className='mb-12'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-xl'>
            📁
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Working Directory ↔ Staging ↔ Repository
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Git의 3가지 핵심 영역과 파일들의 상태 변화를 체험해보세요
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className='mb-8 flex flex-wrap gap-3'>
        <button
          onClick={() => setShowInternals(!showInternals)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            showInternals
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          🔧 Git 내부 구조
        </button>
        <button
          onClick={() => setShowStash(!showStash)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            showStash
              ? 'bg-purple-500 text-white border-purple-500'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          📦 Stash 영역
        </button>
      </div>

      {/* Git Internals Visualization */}
      {showInternals && (
        <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
            <span className='mr-2'>🔧</span>
            Git 내부 구조: 데이터는 어디에 저장될까?
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                파일 시스템 구조
              </h3>
              <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm'>
                <div className='space-y-1'>
                  <div className='text-blue-600 dark:text-blue-400'>
                    📁 my-project/
                  </div>
                  <div className='ml-4 text-gray-600 dark:text-gray-400'>
                    📄 README.md
                  </div>
                  <div className='ml-4 text-gray-600 dark:text-gray-400'>
                    📄 index.js
                  </div>
                  <div className='ml-4 text-gray-600 dark:text-gray-400'>
                    📄 style.css
                  </div>
                  <div className='ml-4 text-purple-600 dark:text-purple-400'>
                    📁 .git/
                  </div>
                  <div className='ml-8 text-gray-500 dark:text-gray-500'>
                    📄 index <span className='text-xs'>(Staging Area)</span>
                  </div>
                  <div className='ml-8 text-gray-500 dark:text-gray-500'>
                    📄 HEAD
                  </div>
                  <div className='ml-8 text-gray-500 dark:text-gray-500'>
                    📁 objects/ <span className='text-xs'>(Repository)</span>
                  </div>
                  <div className='ml-8 text-gray-500 dark:text-gray-500'>
                    📁 refs/
                  </div>
                  <div className='ml-8 text-gray-500 dark:text-gray-500'>
                    📄 config
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                영역별 저장 위치
              </h3>
              <div className='space-y-4'>
                <div className='p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
                  <div className='flex items-center mb-2'>
                    <div className='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
                    <span className='font-medium'>Working Directory</span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    실제 파일 시스템의 프로젝트 폴더에 저장
                  </p>
                </div>

                <div className='p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'>
                  <div className='flex items-center mb-2'>
                    <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
                    <span className='font-medium'>Staging Area</span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    <code className='bg-gray-100 dark:bg-gray-700 px-1 rounded'>
                      .git/index
                    </code>{' '}
                    파일에 바이너리 형태로 저장
                  </p>
                </div>

                <div className='p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'>
                  <div className='flex items-center mb-2'>
                    <div className='w-3 h-3 bg-blue-500 rounded-full mr-2'></div>
                    <span className='font-medium'>Repository</span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    <code className='bg-gray-100 dark:bg-gray-700 px-1 rounded'>
                      .git/objects/
                    </code>{' '}
                    폴더에 압축된 객체로 저장
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'>
            <h4 className='font-semibold text-yellow-800 dark:text-yellow-200 mb-2'>
              💡 알아두면 좋은 점
            </h4>
            <ul className='text-sm text-yellow-700 dark:text-yellow-300 space-y-1'>
              <li>
                • Staging Area는 다음 커밋에 포함될 스냅샷을 미리 준비하는
                곳입니다
              </li>
              <li>• Git objects는 SHA-1 해시로 식별되며 중복 제거됩니다</li>
              <li>• HEAD 파일은 현재 브랜치의 최신 커밋을 가리킵니다</li>
            </ul>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className='mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            진행 상황
          </span>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {currentStep + 1}/4
          </span>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3'>
          <div
            className='bg-blue-500 h-2 rounded-full transition-all duration-500'
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          ></div>
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {steps[currentStep]}
        </p>
      </div>

      {/* Main Content */}
      <div
        className={`grid grid-cols-1 gap-6 mb-8 ${
          showStash ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        }`}
      >
        {/* Working Directory */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='w-3 h-3 bg-red-500 rounded-full mr-3'></div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Working Directory
              </h2>
            </div>
            {workingFiles.length > 0 && (
              <button
                onClick={handleStash}
                className='text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors'
              >
                stash
              </button>
            )}
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            현재 작업 중인 파일들
          </p>
          <div className='space-y-3'>
            {workingFiles.map((file) => (
              <div
                key={file.name}
                className={`p-3 rounded-lg border ${getStatusBg(
                  file.status
                )} cursor-pointer hover:shadow-sm transition-all`}
                onClick={() => setSelectedFile(file.name)}
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {file.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusColor(
                      file.status
                    )} bg-white dark:bg-gray-700`}
                  >
                    {getStatusText(file.status)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddFile(file.name)
                  }}
                  className='w-full bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors'
                >
                  git add
                </button>
              </div>
            ))}
            {workingFiles.length === 0 && (
              <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                <div className='text-2xl mb-2'>✅</div>
                <p className='text-sm'>변경된 파일이 없습니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Staging Area */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-3 h-3 bg-green-500 rounded-full mr-3'></div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Staging Area
            </h2>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            커밋할 준비가 된 파일들
          </p>
          <div className='space-y-3'>
            {stagingFiles.map((file) => (
              <div
                key={file.name}
                className={`p-3 rounded-lg border ${getStatusBg(
                  file.status
                )} cursor-pointer hover:shadow-sm transition-all`}
                onClick={() => setSelectedFile(file.name)}
              >
                <div className='flex items-center justify-between'>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {file.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusColor(
                      file.status
                    )} bg-white dark:bg-gray-700`}
                  >
                    {getStatusText(file.status)}
                  </span>
                </div>
              </div>
            ))}
            {stagingFiles.length === 0 && (
              <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                <div className='text-2xl mb-2'>📋</div>
                <p className='text-sm'>스테이징된 파일이 없습니다</p>
              </div>
            )}
          </div>
          {stagingFiles.length > 0 && (
            <button
              onClick={handleCommit}
              className='mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors'
            >
              git commit
            </button>
          )}
        </div>

        {/* Repository */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-3 h-3 bg-blue-500 rounded-full mr-3'></div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Repository
            </h2>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            커밋된 파일들
          </p>
          <div className='space-y-3'>
            {committedFiles.map((file) => (
              <div
                key={file.name}
                className={`p-3 rounded-lg border ${getStatusBg(
                  file.status
                )} cursor-pointer hover:shadow-sm transition-all`}
                onClick={() => setSelectedFile(file.name)}
              >
                <div className='flex items-center justify-between'>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {file.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusColor(
                      file.status
                    )} bg-white dark:bg-gray-700`}
                  >
                    {getStatusText(file.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stash Area */}
        {showStash && (
          <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
            <div className='flex items-center mb-4'>
              <div className='w-3 h-3 bg-purple-500 rounded-full mr-3'></div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Stash
              </h2>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              임시 저장된 변경사항들
            </p>
            <div className='space-y-3'>
              {stashList.map((stash) => (
                <div
                  key={stash.id}
                  className='p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-xs font-mono text-purple-700 dark:text-purple-300'>
                      {stash.id}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {stash.timestamp}
                    </span>
                  </div>
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {stash.message}
                  </p>
                  <button
                    onClick={() => handleStashPop(stash.id)}
                    className='w-full bg-purple-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors'
                  >
                    git stash pop
                  </button>
                </div>
              ))}
              {stashList.length === 0 && (
                <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                  <div className='text-2xl mb-2'>📦</div>
                  <p className='text-sm'>스태시된 변경사항이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stash Explanation */}
      {showStash && (
        <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center'>
            <span className='mr-2'>📦</span>
            Stash: 임시 변경사항 저장소
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                언제 사용하나요?
              </h3>
              <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-2'>
                <li>
                  • 작업 중인 코드를 임시로 저장하고 다른 브랜치로 전환할 때
                </li>
                <li>• 긴급한 버그 수정을 위해 현재 작업을 잠시 중단할 때</li>
                <li>• 실험적인 코드를 커밋하지 않고 보관할 때</li>
                <li>• Working Directory를 깨끗하게 만들어야 할 때</li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                주요 명령어
              </h3>
              <div className='space-y-2 text-sm'>
                <div className='p-2 bg-gray-50 dark:bg-gray-900 rounded font-mono'>
                  <span className='text-purple-600 dark:text-purple-400'>
                    git stash
                  </span>
                  <span className='text-gray-500 ml-2'>
                    # 현재 변경사항을 스태시에 저장
                  </span>
                </div>
                <div className='p-2 bg-gray-50 dark:bg-gray-900 rounded font-mono'>
                  <span className='text-purple-600 dark:text-purple-400'>
                    git stash pop
                  </span>
                  <span className='text-gray-500 ml-2'>
                    # 최근 스태시를 복원하고 삭제
                  </span>
                </div>
                <div className='p-2 bg-gray-50 dark:bg-gray-900 rounded font-mono'>
                  <span className='text-purple-600 dark:text-purple-400'>
                    git stash list
                  </span>
                  <span className='text-gray-500 ml-2'># 스태시 목록 확인</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Content Viewer */}
      {selectedFile && (
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-8'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            📄 파일 내용: {selectedFile}
          </h3>
          <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm border'>
            <code className='text-gray-800 dark:text-gray-200'>
              {files.find((f) => f.name === selectedFile)?.content}
            </code>
          </div>
        </div>
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
