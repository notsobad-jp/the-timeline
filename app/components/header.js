import { useState } from 'react'

export default function Header({title, sourceUrl, canonicalUrl}) {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="bg-black px-4 py-3 text-white flex fixed w-full z-50" style={{zIndex: 10000}}>
      <h1 className="flex-grow truncate">
        <a href={`${process.env.NEXT_PUBLIC_WEB_ROOT}`} target="_blank" rel="noopener">
          <div className="inline-block w-4 h-4 text-teal-500 fill-current mr-3 align-middle">
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></svg>
          </div>
        </a>
        <span className="align-middle">{ title }</span>
      </h1>

      <div className="flex text-right">
        <a href={sourceUrl} target="_blank" rel="noopener" className="hover:opacity-75">
          <div className="inline-block w-4 h-4 mr-2 fill-current align-middle">
            <svg focusable="true" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path></svg>
          </div>
          <span className="hidden md:inline">Sheet</span>
        </a>
        <div className="hover:opacity-75 cursor-pointer" onClick={()=>{setModalOpened(true)}}>
          <div className="inline-block w-4 h-4 mr-2 fill-current ml-4 align-middle hover:opacity-75">
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></svg>
          </div>
          <span className="hidden md:inline">Share</span>
        </div>
      </div>


      <div className={`${modalOpened ? '' : 'opacity-0 pointer-events-none'} transition-opacity duration-200 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50`}>
        <div className="absolute w-full h-full bg-black opacity-50" onClick={()=>{setModalOpened(false)}}></div>
        <div className="bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="relative py-6 text-left px-6">
            <div className="absolute top-0 right-0 cursor-pointer mt-4 mr-4 text-white text-sm z-50" onClick={()=>{setModalOpened(false)}}>
              <svg className="fill-current text-white inline-block pr-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
              Close
            </div>

            <div>
              <h5 className="pb-4 text-lg font-bold">共有URL</h5>
              <div className="flex flex-col md:flex-row mb-10">
                <textarea readOnly="" style={{resize:"none"}} className="text-gray-900 w-full p-1" defaultValue={`${canonicalUrl}`} />
              </div>
            </div>

            <div>
              <h5 className="pb-4 text-lg font-bold">SNSシェア</h5>
              <div className="flex flex-col md:flex-row mb-10">
                <a className="flex items-center mb-3 md:mb-0 md:w-2/4 md:mr-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" href="https://twitter.com/intent/tweet?hashtags=the_timeline&text=%E5%B9%B4%E8%A1%A8%E4%BD%9C%E6%88%90%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%80%8CTHE%20TIMELINE%EF%BC%88%E3%82%B6%E3%83%BB%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%A9%E3%82%A4%E3%83%B3%EF%BC%89%E3%80%8D&url=https%3A%2F%2Fthe-timeline.jp" target="_blank">
                  <svg className="fill-current text-white mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                  </svg>
                  ツイートする
                </a>
                <a className="flex items-center md:w-2/4 md:ml-1 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fthe-timeline.jp" target="_blank">
                  <svg className="fill-current text-white mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path>
                  </svg>
                  シェアする
                </a>
              </div>
            </div>

            <div>
              <h5 className="pb-4 text-lg font-bold">埋め込み用コード</h5>
              <div>
                <textarea readOnly="" style={{resize:"none"}} className="text-gray-900 w-full p-1" defaultValue={`<iframe width="100%" height="500px" seamless frameborder='0' src="${canonicalUrl}"></iframe>`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
