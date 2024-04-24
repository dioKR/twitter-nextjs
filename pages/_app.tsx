import { SWRConfig } from "swr";
import "../global.css";

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="bg-tw-black text-white">
        <div className="w-full max-w-2xl mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </SWRConfig>
  );
}
