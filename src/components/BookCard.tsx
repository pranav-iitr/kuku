import React from "react";
import { useRouter } from "next/router"; 

interface authorProps {
  id: string;
  name: string;

}

interface BookCardProps {
  imageSrc: string;
  title: string;
  author: string;
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({
  imageSrc,
  title,
  author,
  id,
}) => {
  const router = useRouter();
  return (
    <div onClick={()=>{
      router.push(`/books/${id}`)
    }}  className="transition-transform transform hover:scale-125 z-1 hover:z-[100] flex flex-col w-[95vw] phone:w-[350px] shadow-lg p-4 gap-2 border bg-white">
      <img src={imageSrc} alt={title} className="w-full h-64 object-cover" />
      <div className="flex flex-col gap-2 p-2">
        <div className="h-[2px] bg-black w-full my-2" />
        <h2 className="font-inter font-bold text-xl text-gray-800">{title}</h2>
        <div className="text-gray-600 font-poppins font-semibold">Writer</div>
        <div className="font-inter font-bold text-lg text-gray-800">
          {author}
        </div>
        <button className="text-right font-poppins text-gray-600 font-medium mt-2">
          Buy now
        </button>
        
      </div>
    </div>
  );
};

export default BookCard;
