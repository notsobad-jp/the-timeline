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
    // Google Analytcs
    const handleRouteChange = (url) => { gtag.pageview(url); }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />
}

export default App
