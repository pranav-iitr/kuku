import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fafafa] border-t border-[#e6e6e6] pt-10 px-[5vw] phone:px-20 pb-8">
      <div className="flex justify-between flex-wrap">
        {/* Bookstore Info */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1a1a1a] p-2 rounded-full">
              <span className="text-white font-bold">B</span>
            </div>
            <Image src="/assets/bookstore-2.svg" alt="Bookstore" width={150.51} height={17.93} />
          </div>
          <div className="text-[#4d4d4d] text-base">
            The largest, most complete and trusted online bookstore in the world. With us, you can shop online & help save your high street at the same time.
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-8 py-3 border border-[#1a1a1a] rounded-md">
              <Image src="/assets/apple.svg" alt="Apple" width={20} height={20} />
              <span className="text-[#1a1a1a] font-semibold uppercase">Play Store</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-3 bg-[#1a1a1a] text-white rounded-md">
              <Image src="/assets/google.svg" alt="Google" width={20} height={20} />
              <span className="font-semibold uppercase">Google Play</span>
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex space-x-20">
          <div className="flex flex-col space-y-4">
            <h3 className="text-[#1a1a1a] text-lg font-bold">About Bookstore</h3>
            <a href="#" className="text-[#1a1a1a] text-base font-semibold">Explore</a>
           
            <a href="#" className="text-[#1a1a1a] text-base font-semibold">About Us</a>
            <a href="#" className="text-[#1a1a1a] text-base font-semibold">Contact Us</a>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-[#1a1a1a] text-lg font-bold">Others</h3>
            <a href="#" className="text-[#1a1a1a] text-base font-semibold">Terms and Conditions</a>
            <a href="#" className="text-[#1a1a1a] text-base font-semibold">Privacy Policy</a>
            <a href="#" className="text-[#1a1a1a] text-base font-semibold">Help Center</a>
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap items-center border-t border-[#e6e6e6] pt-8 mt-8">
        <div className="flex space-x-6">
          <Image src="/assets/twitter.svg" alt="Twitter" width={24} height={24} />
          <Image src="/assets/facebook-1.svg" alt="Facebook" width={24} height={24} />
          <Image src="/assets/linkedin-fill.svg" alt="LinkedIn" width={24} height={24} />
          <Image src="/assets/instagram-1.svg" alt="Instagram" width={24} height={24} />
        </div>
        <div className="text-[#999999] text-base">
          Copyright © 2022 Bookstore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
