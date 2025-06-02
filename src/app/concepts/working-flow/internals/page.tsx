import Link from 'next/link'

export default function GitInternalsPage() {
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
          <div className='w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-xl'>
            🔧
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Git 내부 구조: 데이터는 어디에 저장될까?
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Git이 파일 시스템에서 어떻게 데이터를 관리하는지 자세히 알아보세요
        </p>
      </div>

      {/* File System Structure */}
      <div className='mb-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          📁 파일 시스템 구조
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              프로젝트 디렉토리 구조
            </h3>
            <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm'>
              <div className='space-y-2'>
                <div className='text-blue-600 dark:text-blue-400 font-bold'>
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
                <div className='ml-4 text-purple-600 dark:text-purple-400 font-bold'>
                  📁 .git/
                </div>
                <div className='ml-8 text-green-600 dark:text-green-400'>
                  📄 index{' '}
                  <span className='text-xs text-gray-500'>
                    (Staging Area 데이터)
                  </span>
                </div>
                <div className='ml-8 text-blue-600 dark:text-blue-400'>
                  📄 HEAD{' '}
                  <span className='text-xs text-gray-500'>
                    (현재 브랜치 포인터)
                  </span>
                </div>
                <div className='ml-8 text-red-600 dark:text-red-400'>
                  📁 objects/{' '}
                  <span className='text-xs text-gray-500'>
                    (Repository 데이터)
                  </span>
                </div>
                <div className='ml-12 text-gray-500 dark:text-gray-400 text-xs'>
                  📁 ab/ (SHA-1 앞 2자리로 분류)
                </div>
                <div className='ml-16 text-gray-500 dark:text-gray-400 text-xs'>
                  📄 cd1234... (blob/tree/commit 객체)
                </div>
                <div className='ml-8 text-orange-600 dark:text-orange-400'>
                  📁 refs/{' '}
                  <span className='text-xs text-gray-500'>
                    (브랜치와 태그 참조)
                  </span>
                </div>
                <div className='ml-12 text-gray-500 dark:text-gray-400 text-xs'>
                  📁 heads/ (브랜치들)
                </div>
                <div className='ml-16 text-gray-500 dark:text-gray-400 text-xs'>
                  📄 main (메인 브랜치)
                </div>
                <div className='ml-8 text-gray-500 dark:text-gray-500'>
                  📄 config <span className='text-xs'>(Git 설정)</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              .git 폴더 상세 구조
            </h3>
            <div className='space-y-4'>
              <div className='p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'>
                <h4 className='font-semibold text-green-800 dark:text-green-200 mb-2'>
                  📄 index (Staging Area)
                </h4>
                <p className='text-sm text-green-700 dark:text-green-300'>
                  바이너리 형태로 저장된 스테이징 정보
                </p>
                <ul className='text-xs text-green-600 dark:text-green-400 mt-2 space-y-1'>
                  <li>• 파일명과 메타데이터</li>
                  <li>• 파일 내용의 SHA-1 해시</li>
                  <li>• 수정 시간, 권한 등</li>
                </ul>
              </div>

              <div className='p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
                <h4 className='font-semibold text-red-800 dark:text-red-200 mb-2'>
                  📁 objects/ (Repository)
                </h4>
                <p className='text-sm text-red-700 dark:text-red-300'>
                  압축된 Git 객체들의 저장소
                </p>
                <ul className='text-xs text-red-600 dark:text-red-400 mt-2 space-y-1'>
                  <li>• blob: 파일 내용</li>
                  <li>• tree: 디렉토리 구조</li>
                  <li>• commit: 커밋 정보</li>
                  <li>• tag: 태그 정보</li>
                </ul>
              </div>

              <div className='p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'>
                <h4 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
                  📄 HEAD
                </h4>
                <p className='text-sm text-blue-700 dark:text-blue-300'>
                  현재 체크아웃된 브랜치의 참조
                </p>
                <div className='text-xs text-blue-600 dark:text-blue-400 mt-2 bg-blue-100 dark:bg-blue-900/40 p-2 rounded font-mono'>
                  ref: refs/heads/main
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Storage Areas */}
      <div className='mb-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          💾 영역별 데이터 저장 방식
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
            <div className='flex items-center mb-4'>
              <div className='w-4 h-4 bg-red-500 rounded-full mr-3'></div>
              <h3 className='text-lg font-bold text-red-800 dark:text-red-200'>
                Working Directory
              </h3>
            </div>
            <div className='space-y-3'>
              <p className='text-sm text-red-700 dark:text-red-300'>
                <strong>저장 위치:</strong> 실제 파일 시스템
              </p>
              <p className='text-sm text-red-700 dark:text-red-300'>
                <strong>데이터 형태:</strong> 일반 파일들
              </p>
              <p className='text-sm text-red-700 dark:text-red-300'>
                <strong>특징:</strong> 직접 편집 가능, Git이 변경사항을 감지
              </p>
            </div>
          </div>

          <div className='p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'>
            <div className='flex items-center mb-4'>
              <div className='w-4 h-4 bg-green-500 rounded-full mr-3'></div>
              <h3 className='text-lg font-bold text-green-800 dark:text-green-200'>
                Staging Area
              </h3>
            </div>
            <div className='space-y-3'>
              <p className='text-sm text-green-700 dark:text-green-300'>
                <strong>저장 위치:</strong> .git/index 파일
              </p>
              <p className='text-sm text-green-700 dark:text-green-300'>
                <strong>데이터 형태:</strong> 바이너리 인덱스
              </p>
              <p className='text-sm text-green-700 dark:text-green-300'>
                <strong>특징:</strong> 다음 커밋의 스냅샷을 미리 준비
              </p>
            </div>
          </div>

          <div className='p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'>
            <div className='flex items-center mb-4'>
              <div className='w-4 h-4 bg-blue-500 rounded-full mr-3'></div>
              <h3 className='text-lg font-bold text-blue-800 dark:text-blue-200'>
                Repository
              </h3>
            </div>
            <div className='space-y-3'>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                <strong>저장 위치:</strong> .git/objects/ 폴더
              </p>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                <strong>데이터 형태:</strong> 압축된 Git 객체
              </p>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                <strong>특징:</strong> 불변성, 중복 제거, 무결성 보장
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Git Objects Deep Dive */}
      <div className='mb-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          🗂️ Git 객체의 종류와 역할
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div className='p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'>
              <h3 className='text-lg font-bold text-purple-800 dark:text-purple-200 mb-3'>
                📄 Blob (Binary Large Object)
              </h3>
              <p className='text-sm text-purple-700 dark:text-purple-300 mb-3'>
                파일의 실제 내용을 저장하는 객체
              </p>
              <div className='bg-purple-100 dark:bg-purple-900/40 p-3 rounded font-mono text-xs'>
                <div className='text-purple-600 dark:text-purple-400'>
                  blob 14
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  hello world
                </div>
              </div>
            </div>

            <div className='p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'>
              <h3 className='text-lg font-bold text-orange-800 dark:text-orange-200 mb-3'>
                🌳 Tree
              </h3>
              <p className='text-sm text-orange-700 dark:text-orange-300 mb-3'>
                디렉토리 구조와 파일명을 저장하는 객체
              </p>
              <div className='bg-orange-100 dark:bg-orange-900/40 p-3 rounded font-mono text-xs'>
                <div className='text-orange-600 dark:text-orange-400'>
                  tree 73
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  100644 blob a906cb... README.md
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  100644 blob 5716ca... index.js
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='p-4 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800'>
              <h3 className='text-lg font-bold text-teal-800 dark:text-teal-200 mb-3'>
                📝 Commit
              </h3>
              <p className='text-sm text-teal-700 dark:text-teal-300 mb-3'>
                커밋 정보와 스냅샷을 저장하는 객체
              </p>
              <div className='bg-teal-100 dark:bg-teal-900/40 p-3 rounded font-mono text-xs'>
                <div className='text-teal-600 dark:text-teal-400'>
                  commit 196
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  tree 92b8b6...
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  parent 8f2a5c...
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  author John &lt;john@email.com&gt;
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  committer John &lt;john@email.com&gt;
                </div>
                <div className='text-gray-600 dark:text-gray-400 mt-2'>
                  Initial commit
                </div>
              </div>
            </div>

            <div className='p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800'>
              <h3 className='text-lg font-bold text-pink-800 dark:text-pink-200 mb-3'>
                🏷️ Tag
              </h3>
              <p className='text-sm text-pink-700 dark:text-pink-300 mb-3'>
                특정 커밋에 대한 주석이 달린 태그
              </p>
              <div className='bg-pink-100 dark:bg-pink-900/40 p-3 rounded font-mono text-xs'>
                <div className='text-pink-600 dark:text-pink-400'>tag 152</div>
                <div className='text-gray-600 dark:text-gray-400'>
                  object 9da581...
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  type commit
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  tag v1.0.0
                </div>
                <div className='text-gray-600 dark:text-gray-400'>
                  tagger John &lt;john@email.com&gt;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Concepts */}
      <div className='mb-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
          🧠 고급 개념들
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              🔗 SHA-1 해싱과 내용 주소 방식
            </h3>
            <div className='space-y-3 text-sm text-gray-600 dark:text-gray-400'>
              <p>
                Git은 모든 객체를 SHA-1 해시로 식별합니다. 같은 내용은 항상 같은
                해시를 가지므로 중복을 자동으로 제거할 수 있습니다.
              </p>
              <div className='bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-xs'>
                <div className='text-blue-600 dark:text-blue-400'>
                  echo "hello world" | git hash-object --stdin
                </div>
                <div className='text-gray-500'>
                  3b18e512dba79e4c8300dd08aeb37f8e728b8dad
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              💾 압축과 성능 최적화
            </h3>
            <div className='space-y-3 text-sm text-gray-600 dark:text-gray-400'>
              <p>
                Git은 델타 압축과 팩 파일을 통해 저장 공간을 최적화합니다.
                유사한 객체들 간의 차이점만 저장하여 효율성을 높입니다.
              </p>
              <div className='bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-xs'>
                <div className='text-green-600 dark:text-green-400'>
                  git gc --aggressive
                </div>
                <div className='text-gray-500'># 저장소 최적화 및 압축</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              🔒 무결성과 보안
            </h3>
            <div className='space-y-3 text-sm text-gray-600 dark:text-gray-400'>
              <p>
                SHA-1 해시는 데이터의 무결성을 보장합니다. 파일이나 커밋
                히스토리가 변조되면 해시가 달라져서 즉시 감지할 수 있습니다.
              </p>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              🌿 브랜치의 가벼움
            </h3>
            <div className='space-y-3 text-sm text-gray-600 dark:text-gray-400'>
              <p>
                Git의 브랜치는 단순히 특정 커밋을 가리키는 포인터입니다. 새
                브랜치 생성은 40바이트 파일 하나를 만드는 것과 같습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 p-8'>
        <h2 className='text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-6 flex items-center'>
          <span className='mr-2'>💡</span>
          실무에서 알아두면 좋은 점들
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <ul className='text-sm text-yellow-700 dark:text-yellow-300 space-y-3'>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>
                <strong>.git/index</strong> 파일이 손상되면{' '}
                <code className='bg-yellow-200 dark:bg-yellow-800 px-1 rounded'>
                  git reset
                </code>
                으로 복구할 수 있습니다
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>
                <strong>objects/</strong> 폴더의 객체는 절대 변경되지 않습니다
                (불변성)
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>
                같은 파일이 여러 커밋에 있어도 실제로는 하나의 blob 객체만
                저장됩니다
              </span>
            </li>
          </ul>

          <ul className='text-sm text-yellow-700 dark:text-yellow-300 space-y-3'>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>
                <code className='bg-yellow-200 dark:bg-yellow-800 px-1 rounded'>
                  git fsck
                </code>{' '}
                명령으로 저장소 무결성을 검사할 수 있습니다
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>
                대용량 파일은 Git LFS를 사용하여 별도로 관리하는 것이 좋습니다
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>
                <strong>HEAD</strong> 파일은 현재 브랜치를 나타내며, detached
                HEAD 상태에서는 커밋 해시를 직접 가리킵니다
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
