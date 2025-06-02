'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileCard } from '@/components/git/file-card'
import { GitArea } from '@/components/git/git-area'
import { FileViewer } from '@/components/git/file-viewer'

type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed'

interface FileItem {
  name: string
  status: FileStatus
  content: string
}

interface CommitItem {
  id: string
  message: string
  author: string
  timestamp: string
  files: string[]
}

export default function CommitPushPage() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      name: 'README.md',
      status: 'committed',
      content: '# My Project\n\nA simple project.',
    },
    {
      name: 'index.js',
      status: 'modified',
      content: 'console.log("Hello World")\n// 새로운 기능 추가',
    },
    {
      name: 'style.css',
      status: 'staged',
      content: 'body {\n  font-family: Arial;\n  margin: 0;\n}',
    },
  ])

  const [localCommits, setLocalCommits] = useState<CommitItem[]>([
    {
      id: 'a1b2c3d',
      message: 'Initial commit',
      author: 'Developer',
      timestamp: '2시간 전',
      files: ['README.md'],
    },
  ])

  const [remoteCommits, setRemoteCommits] = useState<CommitItem[]>([
    {
      id: 'a1b2c3d',
      message: 'Initial commit',
      author: 'Developer',
      timestamp: '2시간 전',
      files: ['README.md'],
    },
  ])

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    '파일을 수정하고 스테이징하세요',
    'git commit으로 로컬 저장소에 저장',
    'git push로 원격 저장소에 업로드',
    '완료! 변경사항이 팀과 공유되었습니다',
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
    setCurrentStep(Math.max(currentStep, 0))
  }

  const handleCommit = () => {
    const stagedFiles = files.filter((f) => f.status === 'staged')
    if (stagedFiles.length === 0) return

    const newCommit: CommitItem = {
      id: Math.random().toString(36).substr(2, 7),
      message: `feat: Update ${stagedFiles.map((f) => f.name).join(', ')}`,
      author: 'Developer',
      timestamp: '방금 전',
      files: stagedFiles.map((f) => f.name),
    }

    setLocalCommits((prev) => [newCommit, ...prev])
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'staged' ? { ...file, status: 'committed' } : file
      )
    )
    setCurrentStep(Math.max(currentStep, 1))
  }

  const handlePush = () => {
    const unpushedCommits = localCommits.filter(
      (localCommit) =>
        !remoteCommits.some(
          (remoteCommit) => remoteCommit.id === localCommit.id
        )
    )

    if (unpushedCommits.length === 0) return

    setRemoteCommits((prev) => [...unpushedCommits.reverse(), ...prev])
    setCurrentStep(Math.max(currentStep, 2))
  }

  const resetDemo = () => {
    setFiles([
      {
        name: 'README.md',
        status: 'committed',
        content: '# My Project\n\nA simple project.',
      },
      {
        name: 'index.js',
        status: 'modified',
        content: 'console.log("Hello World")\n// 새로운 기능 추가',
      },
      {
        name: 'style.css',
        status: 'staged',
        content: 'body {\n  font-family: Arial;\n  margin: 0;\n}',
      },
    ])
    setLocalCommits([
      {
        id: 'a1b2c3d',
        message: 'Initial commit',
        author: 'Developer',
        timestamp: '2시간 전',
        files: ['README.md'],
      },
    ])
    setRemoteCommits([
      {
        id: 'a1b2c3d',
        message: 'Initial commit',
        author: 'Developer',
        timestamp: '2시간 전',
        files: ['README.md'],
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

  const hasUnpushedCommits = localCommits.length > remoteCommits.length

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      {/* Breadcrumb */}
      <div className='mb-8'>
        <Link
          href='/concepts/working-flow'
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
          Working Flow로 돌아가기
        </Link>
      </div>

      {/* Header */}
      <div className='mb-12'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-xl'>
            🚀
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Commit vs Push: 로컬과 원격의 차이
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          로컬 저장소와 원격 저장소 간의 데이터 흐름을 이해해보세요
        </p>
      </div>

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
            className='bg-green-500 h-2 rounded-full transition-all duration-500'
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          ></div>
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {steps[currentStep]}
        </p>
      </div>

      {/* Main Workflow */}
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
            <div className='text-center py-6 text-gray-500 dark:text-gray-400'>
              <div className='text-xl mb-2'>✅</div>
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
            <div className='text-center py-6 text-gray-500 dark:text-gray-400'>
              <div className='text-xl mb-2'>📋</div>
              <p className='text-sm'>스테이징된 파일이 없습니다</p>
            </div>
          )}
        </GitArea>

        {/* Repository */}
        <GitArea
          title='Local Repository'
          description='로컬 저장소'
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

      {/* Local vs Remote Repositories */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Local Repository History */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='w-3 h-3 bg-blue-500 rounded-full mr-3'></div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                🏠 Local Repository
              </h2>
            </div>
            {hasUnpushedCommits && (
              <span className='text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-md'>
                {localCommits.length - remoteCommits.length} 개 커밋 대기 중
              </span>
            )}
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            내 컴퓨터의 Git 저장소
          </p>

          <div className='space-y-3'>
            {localCommits.map((commit) => (
              <div
                key={commit.id}
                className={`p-3 rounded-lg border ${
                  !remoteCommits.some((r) => r.id === commit.id)
                    ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-mono text-xs text-gray-500'>
                    {commit.id}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {commit.timestamp}
                  </span>
                </div>
                <p className='text-sm font-medium text-gray-900 dark:text-white mb-1'>
                  {commit.message}
                </p>
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  by {commit.author} • {commit.files.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {hasUnpushedCommits && (
            <button
              onClick={handlePush}
              className='mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors'
            >
              🚀 git push origin main
            </button>
          )}
        </div>

        {/* Remote Repository */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-3 h-3 bg-green-500 rounded-full mr-3'></div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
              ☁️ Remote Repository (GitHub/GitLab)
            </h2>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            팀과 공유되는 원격 저장소
          </p>

          <div className='space-y-3'>
            {remoteCommits.map((commit) => (
              <div
                key={commit.id}
                className='p-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-mono text-xs text-gray-500'>
                    {commit.id}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {commit.timestamp}
                  </span>
                </div>
                <p className='text-sm font-medium text-gray-900 dark:text-white mb-1'>
                  {commit.message}
                </p>
                <p className='text-xs text-gray-600 dark:text-gray-400'>
                  by {commit.author} • {commit.files.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {remoteCommits.length === 0 && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
              <div className='text-2xl mb-2'>☁️</div>
              <p className='text-sm'>아직 푸시된 커밋이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* File Content Viewer */}
      {selectedFile && (
        <FileViewer
          fileName={selectedFile}
          content={files.find((f) => f.name === selectedFile)?.content || ''}
          onClose={() => setSelectedFile(null)}
        />
      )}

      {/* Concepts Explanation */}
      <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          🎯 핵심 개념 비교
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'>
            <h3 className='text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center'>
              <span className='mr-2'>💾</span>
              git commit
            </h3>
            <div className='space-y-3'>
              <div>
                <h4 className='font-semibold text-blue-700 dark:text-blue-300 mb-2'>
                  목적
                </h4>
                <p className='text-sm text-blue-600 dark:text-blue-400'>
                  스테이징 영역의 변경사항을 로컬 저장소에 영구적으로 저장
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-blue-700 dark:text-blue-300 mb-2'>
                  범위
                </h4>
                <p className='text-sm text-blue-600 dark:text-blue-400'>
                  내 컴퓨터의 Git 저장소에만 영향
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-blue-700 dark:text-blue-300 mb-2'>
                  특징
                </h4>
                <ul className='text-sm text-blue-600 dark:text-blue-400 space-y-1'>
                  <li>• 인터넷 연결 불필요</li>
                  <li>• 빠른 실행 속도</li>
                  <li>• 로컬에서 히스토리 관리</li>
                  <li>• 언제든지 수정/되돌리기 가능</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'>
            <h3 className='text-xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center'>
              <span className='mr-2'>🚀</span>
              git push
            </h3>
            <div className='space-y-3'>
              <div>
                <h4 className='font-semibold text-green-700 dark:text-green-300 mb-2'>
                  목적
                </h4>
                <p className='text-sm text-green-600 dark:text-green-400'>
                  로컬 저장소의 커밋들을 원격 저장소에 업로드하여 팀과 공유
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-green-700 dark:text-green-300 mb-2'>
                  범위
                </h4>
                <p className='text-sm text-green-600 dark:text-green-400'>
                  원격 저장소와 팀 전체에 영향
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-green-700 dark:text-green-300 mb-2'>
                  특징
                </h4>
                <ul className='text-sm text-green-600 dark:text-green-400 space-y-1'>
                  <li>• 인터넷 연결 필수</li>
                  <li>• 네트워크 속도에 따라 다름</li>
                  <li>• 팀과 코드 공유</li>
                  <li>• 백업 및 협업 가능</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Scenarios */}
      <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          📋 실무 워크플로우 시나리오
        </h2>

        <div className='space-y-8'>
          <div className='p-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'>
            <h3 className='text-lg font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center'>
              <span className='mr-2'>🏃‍♂️</span>
              혼자 작업할 때
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl mb-2'>💻</div>
                <p className='text-sm text-amber-700 dark:text-amber-300'>
                  <strong>자주 커밋</strong>
                  <br />
                  작은 단위로 나누어 로컬에 저장
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>🔄</div>
                <p className='text-sm text-amber-700 dark:text-amber-300'>
                  <strong>논리적 단위로 푸시</strong>
                  <br />
                  기능이 완성되면 원격에 업로드
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>☁️</div>
                <p className='text-sm text-amber-700 dark:text-amber-300'>
                  <strong>백업 목적</strong>
                  <br />
                  하루 작업 끝에는 반드시 푸시
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'>
            <h3 className='text-lg font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center'>
              <span className='mr-2'>👥</span>팀 협업할 때
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div className='text-2xl mb-2'>📥</div>
                <p className='text-sm text-blue-700 dark:text-blue-300'>
                  <strong>1. Pull</strong>
                  <br />
                  최신 변경사항 가져오기
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>💾</div>
                <p className='text-sm text-blue-700 dark:text-blue-300'>
                  <strong>2. Commit</strong>
                  <br />내 작업 로컬에 저장
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>🚀</div>
                <p className='text-sm text-blue-700 dark:text-blue-300'>
                  <strong>3. Push</strong>
                  <br />
                  팀과 변경사항 공유
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>🔄</div>
                <p className='text-sm text-blue-700 dark:text-blue-300'>
                  <strong>4. 반복</strong>
                  <br />
                  지속적인 동기화
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Best Practices */}
      <div className='bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-8'>
        <h2 className='text-xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center'>
          <span className='mr-2'>💡</span>
          Commit & Push 베스트 프랙티스
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='font-semibold text-green-700 dark:text-green-300 mb-4'>
              📝 커밋 메시지 작성법
            </h3>
            <div className='space-y-3'>
              <div className='p-3 bg-green-100 dark:bg-green-900/40 rounded-lg'>
                <p className='font-mono text-sm text-green-700 dark:text-green-300'>
                  feat: 사용자 로그인 기능 추가
                </p>
                <p className='text-xs text-green-600 dark:text-green-400 mt-1'>
                  ✅ 명확하고 구체적인 설명
                </p>
              </div>
              <div className='p-3 bg-red-100 dark:bg-red-900/40 rounded-lg'>
                <p className='font-mono text-sm text-red-700 dark:text-red-300'>
                  수정함
                </p>
                <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                  ❌ 모호하고 불분명한 메시지
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='font-semibold text-green-700 dark:text-green-300 mb-4'>
              ⚡ 주요 원칙들
            </h3>
            <ul className='text-sm text-green-600 dark:text-green-400 space-y-2'>
              <li>
                • <strong>커밋은 자주, 푸시는 의미있는 단위로</strong>
              </li>
              <li>
                • <strong>원자적 커밋</strong>: 하나의 논리적 변경사항만 포함
              </li>
              <li>
                • <strong>테스트 통과 후 푸시</strong>: 팀에 영향 최소화
              </li>
              <li>
                • <strong>의미있는 커밋 메시지</strong>: 나중에 히스토리 추적
                용이
              </li>
              <li>
                • <strong>정기적인 푸시</strong>: 백업과 협업을 위해
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
