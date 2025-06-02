'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileCard } from '@/components/git/file-card'
import { GitArea } from '@/components/git/git-area'
import { FileViewer } from '@/components/git/file-viewer'

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

export default function StashPage() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      name: 'README.md',
      status: 'committed',
      content: '# My Project\n\nThis is a sample project.',
    },
    {
      name: 'index.js',
      status: 'modified',
      content: 'console.log("hello world")\n// 작업 중인 코드',
    },
    {
      name: 'style.css',
      status: 'modified',
      content: 'body {\n  margin: 0;\n  padding: 20px;\n}',
    },
    {
      name: 'package.json',
      status: 'staged',
      content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}',
    },
  ])

  const [stashList, setStashList] = useState<StashItem[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleStash = () => {
    const stashableFiles = files.filter(
      (f) => f.status === 'modified' || f.status === 'staged'
    )
    if (stashableFiles.length === 0) return

    const newStash: StashItem = {
      id: `stash@{${stashList.length}}`,
      message: `WIP on main: 임시 저장된 변경사항 ${stashableFiles.length}개`,
      files: [...stashableFiles],
      timestamp: new Date().toLocaleTimeString('ko-KR'),
    }

    setStashList((prev) => [newStash, ...prev])

    // 스태시된 파일들을 원래 상태로 되돌림
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'modified' || file.status === 'staged'
          ? {
              ...file,
              status: 'committed',
              content: getOriginalContent(file.name),
            }
          : file
      )
    )
  }

  const handleStashPop = (stashId: string) => {
    const stash = stashList.find((s) => s.id === stashId)
    if (!stash) return

    // 스태시된 내용을 복원
    setFiles((prev) =>
      prev.map((file) => {
        const stashedFile = stash.files.find((sf) => sf.name === file.name)
        return stashedFile
          ? {
              ...file,
              status: stashedFile.status,
              content: stashedFile.content,
            }
          : file
      })
    )

    // 스태시 목록에서 제거
    setStashList((prev) => prev.filter((s) => s.id !== stashId))
  }

  const handleStashApply = (stashId: string) => {
    const stash = stashList.find((s) => s.id === stashId)
    if (!stash) return

    // 스태시된 내용을 복원하지만 스태시는 유지
    setFiles((prev) =>
      prev.map((file) => {
        const stashedFile = stash.files.find((sf) => sf.name === file.name)
        return stashedFile
          ? {
              ...file,
              status: stashedFile.status,
              content: stashedFile.content,
            }
          : file
      })
    )
  }

  const getOriginalContent = (fileName: string) => {
    switch (fileName) {
      case 'README.md':
        return '# My Project'
      case 'index.js':
        return 'console.log("hello")'
      case 'style.css':
        return 'body { margin: 0; }'
      case 'package.json':
        return '{\n  "name": "my-project"\n}'
      default:
        return ''
    }
  }

  const resetDemo = () => {
    setFiles([
      {
        name: 'README.md',
        status: 'committed',
        content: '# My Project\n\nThis is a sample project.',
      },
      {
        name: 'index.js',
        status: 'modified',
        content: 'console.log("hello world")\n// 작업 중인 코드',
      },
      {
        name: 'style.css',
        status: 'modified',
        content: 'body {\n  margin: 0;\n  padding: 20px;\n}',
      },
      {
        name: 'package.json',
        status: 'staged',
        content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}',
      },
    ])
    setStashList([])
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
          <div className='w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-xl'>
            📦
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Stash: 임시 변경사항 저장소
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          작업 중인 변경사항을 임시로 저장하고 나중에 복원하는 방법을
          학습해보세요
        </p>
      </div>

      {/* Scenario Description */}
      <div className='mb-8 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 p-6'>
        <h2 className='text-lg font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center'>
          <span className='mr-2'>💼</span>
          실무 시나리오
        </h2>
        <p className='text-amber-700 dark:text-amber-300 text-sm leading-relaxed'>
          현재 새로운 기능을 개발 중인데, 갑자기 긴급한 버그 수정 요청이
          들어왔습니다. 작업 중인 코드는 아직 커밋하기에는 불완전하지만, 다른
          브랜치로 전환해야 합니다. 이럴 때 <strong>Stash</strong>를 사용하여
          현재 작업을 임시 저장할 수 있습니다.
        </p>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8'>
        {/* Working Directory */}
        <GitArea
          title='Working Directory'
          description='현재 작업 중인 파일들'
          color='red'
          extraAction={
            (workingFiles.length > 0 || stagingFiles.length > 0) && (
              <button
                onClick={handleStash}
                className='text-xs px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors'
              >
                📦 git stash
              </button>
            )
          }
        >
          {workingFiles.map((file) => (
            <FileCard
              key={file.name}
              name={file.name}
              status={file.status}
              onSelect={() => setSelectedFile(file.name)}
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

        {/* Stash Area */}
        <GitArea
          title='Stash'
          description='임시 저장된 변경사항들'
          color='purple'
        >
          {stashList.map((stash) => (
            <div
              key={stash.id}
              className='p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20'
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='text-xs font-mono text-purple-700 dark:text-purple-300'>
                  {stash.id}
                </span>
                <span className='text-xs text-gray-500'>{stash.timestamp}</span>
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-300 mb-3'>
                {stash.message}
              </p>
              <div className='space-y-2'>
                <button
                  onClick={() => handleStashPop(stash.id)}
                  className='w-full bg-purple-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors'
                >
                  git stash pop
                </button>
                <button
                  onClick={() => handleStashApply(stash.id)}
                  className='w-full bg-purple-400 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors'
                >
                  git stash apply
                </button>
              </div>
            </div>
          ))}
          {stashList.length === 0 && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
              <div className='text-2xl mb-2'>📦</div>
              <p className='text-sm'>스태시된 변경사항이 없습니다</p>
            </div>
          )}
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

      {/* Commands Reference */}
      <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          📚 Stash 명령어 가이드
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              기본 명령어
            </h3>
            <div className='space-y-4'>
              <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
                <div className='font-mono text-sm text-purple-600 dark:text-purple-400 mb-2'>
                  git stash
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  현재 작업 디렉토리와 스테이징 영역의 변경사항을 임시 저장
                </p>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
                <div className='font-mono text-sm text-purple-600 dark:text-purple-400 mb-2'>
                  git stash pop
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  가장 최근 스태시를 복원하고 스태시 목록에서 제거
                </p>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
                <div className='font-mono text-sm text-purple-600 dark:text-purple-400 mb-2'>
                  git stash apply
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  스태시를 복원하지만 스태시 목록에는 유지 (재사용 가능)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              고급 명령어
            </h3>
            <div className='space-y-4'>
              <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
                <div className='font-mono text-sm text-purple-600 dark:text-purple-400 mb-2'>
                  git stash save "메시지"
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  의미있는 메시지와 함께 스태시 저장
                </p>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
                <div className='font-mono text-sm text-purple-600 dark:text-purple-400 mb-2'>
                  git stash list
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  모든 스태시 목록 조회
                </p>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
                <div className='font-mono text-sm text-purple-600 dark:text-purple-400 mb-2'>
                  git stash drop stash@{'{0}'}
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  특정 스태시를 삭제 (복원하지 않고)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          🎯 실무 활용 사례
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div className='p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'>
              <h3 className='font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center'>
                <span className='mr-2'>🚨</span>
                긴급 버그 수정
              </h3>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                새 기능 개발 중 긴급한 버그 수정 요청이 들어올 때, 현재 작업을
                스태시하고 main 브랜치로 전환하여 핫픽스 작업
              </p>
            </div>

            <div className='p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'>
              <h3 className='font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center'>
                <span className='mr-2'>🧪</span>
                실험적 코드 보관
              </h3>
              <p className='text-sm text-green-700 dark:text-green-300'>
                여러 접근 방식을 시도해볼 때, 각각의 시도를 스태시로 저장하여
                나중에 비교하고 최선의 방법 선택
              </p>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'>
              <h3 className='font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center'>
                <span className='mr-2'>🔄</span>
                브랜치 전환
              </h3>
              <p className='text-sm text-orange-700 dark:text-orange-300'>
                작업 중인 코드가 있지만 다른 브랜치의 코드를 확인해야 할 때,
                clean working directory 상태를 만들기 위해 사용
              </p>
            </div>

            <div className='p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'>
              <h3 className='font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center'>
                <span className='mr-2'>📋</span>
                코드 리뷰 준비
              </h3>
              <p className='text-sm text-purple-700 dark:text-purple-300'>
                커밋하기 전에 코드를 다시 검토하고 싶을 때, 작업을 스태시하고
                fresh perspective로 코드 검토
              </p>
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
          <span className='mr-2'>✅</span>
          Stash 사용 시 주의사항
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-semibold text-green-700 dark:text-green-300 mb-3'>
              👍 좋은 사례
            </h3>
            <ul className='text-sm text-green-600 dark:text-green-400 space-y-2'>
              <li>• 의미있는 메시지와 함께 스태시 저장</li>
              <li>• 정기적으로 스태시 목록 정리</li>
              <li>• 스태시 적용 후 충돌 여부 확인</li>
              <li>• 장기간 보관보다는 임시 저장 용도로 사용</li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-green-700 dark:text-green-300 mb-3'>
              ⚠️ 주의사항
            </h3>
            <ul className='text-sm text-green-600 dark:text-green-400 space-y-2'>
              <li>• Untracked 파일은 기본적으로 스태시되지 않음</li>
              <li>• 스태시는 로컬에만 저장됨 (원격 저장소와 공유 안됨)</li>
              <li>• 너무 많은 스태시는 관리가 어려워짐</li>
              <li>• 바이너리 파일 스태시 시 용량 주의</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
