import { useEffect } from 'react';
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import "vis-timeline/styles/vis-timeline-graph2d.css";
import 'tippy.js/dist/tippy.css'; // optional for styling
import "../styles/tailwind.css";
import "../styles/timeline.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    // Google Analytics
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    // Google Adsense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, []);

  return (
    <>
      <div style={{paddingBottom: '80px'}}>
        <Component {...pageProps} />
      </div>
      <div className="fixed bottom-0 w-full z-50 border-t bg-gray-100 flex flex-col md:flex-row items-center">
        <div className="flex-grow" style={{height: '50px'}}>
          { !pageProps.noAds &&
            <ins className="adsbygoogle"
              style={{display: "inline-block;width:480px;height:50px"}}
              data-ad-client="ca-pub-7840479109197513"
              data-ad-slot="1043481215">
          </ins>
          }
        </div>

        <p className="text-xs mx-2">
          Published by
          <a href={`${process.env.NEXT_PUBLIC_WEB_ROOT}`} target="_blank" rel="noopener" className="px-1 text-blue-600 hover:text-blue-500 hover:underline">
            THE TIMELINE
          </a>
          - 5分ごとに自動更新
        </p>
      </div>
    </>
  );
}

export default App
