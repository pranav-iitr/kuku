import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Image from "next/image";
import { useEffect,useState } from "react";
import { NextSeo } from 'next-seo';
function useWindowSize() {

  const [windowSize, setWindowSize] = useState({
    width:0,
    height:0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


export default function App({ Component, pageProps }: AppProps) {
  const width = useWindowSize().width;
  return (
    <>
    <NextSeo
      title="Kuku FM assignment"
      description="Kuku FM assignment"
      />
    <header className="bg-[#fafafa] border-b border-[#e6e6e6]">
        <div className="flex justify-between items-center py-5 px-10">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#1a1a1a] p-2 rounded-full">
              <span className="text-white font-bold">B</span>
            </div>
            { width>450 && <Image
              src="/assets/bookstore.svg"
              alt="Bookstore"
              width={150.51}
              height={17.93}
            />}
          </div>

          {/* Search Bar */}{
            width>768 &&
          <div className="flex items-center  w-2/3 bg-white border border-[#e6e6e6] rounded-md px-4 py-2">
            <Image
              src="/assets/search.svg"
              alt="Search"
              width={24}
              height={24}
            />
            <input
              type="text"
              className="w-full bg-transparent outline-none pl-4 text-gray-600"
              placeholder="What book are you looking for?"
            />
          </div>}

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Image
              src="/assets/notification.svg"
              alt="Notifications"
              width={24}
              height={24}
            />
            <Image src="/assets/cart.svg" alt="Cart" width={24} height={24} />
            <Image
              src="/assets/profile-pic.svg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>

        
      </header>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
