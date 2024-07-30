
import BookCard from "@/components/BookCard";
import { listProductAction } from "@/hooks/product";
import { useState, useEffect } from "react";
import Select from "react-select";

const ratingOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export default function Home() {
  const [products, setProducts] = useState<any>([]);
  const [Genre, setGenre] = useState<any>([]);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [author, setAuthor] = useState<any>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [rating, setRating] = useState<any>(null);

  useEffect(() => {
    listProductAction().then((res) => {
      setProducts(res?.data?.results);
      console.log(res.data);
      const genre = res?.data?.genres.map((item: any) => {
        return { value: item.name, label: item.name };
      });
      setGenre(genre);
      const Author = res?.data?.authors.map((item: any) => {
        return { value: item.name, label: item.name };
      }

      );
      setAuthor(Author);
    });
  }, []);
  useEffect(() => {
    const filter = new Object();
    if(selectedGenre ){
      filter['genre'] = selectedGenre.value;

    }
    if(selectedAuthor){
      filter['author'] = selectedAuthor.value;
    }
    if(rating){
      filter['rating'] = rating.value;
    }
    listProductAction(filter).then((res) => {
      setProducts(res?.data?.results);
    });
  }, [selectedGenre, selectedAuthor, rating]);
  

  return (
    <main className={`flex min-h-screen flex-col w-full bg-white`}>
      <div className="flex ">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center py-5 px-10 bg-white">
            {/* Items Count */}
            

            {/* Sort Dropdown */}
            <div className="flex flex-col phone:flex-row items-center space-x-4">
              <span className="text-gray-600 text-lg">Sort by</span>
              <div className="flex flex-col phone:flex-row items-center gap-5 bg-white  rounded-md px-4 py-2">
                <Select
                  options={ratingOptions}
                  onChange={(selectedOption) => setRating(selectedOption)}
                  placeholder="Rating"
                />
                <Select
                  options={Genre}
                  onChange={(selectedOption) => setSelectedGenre(selectedOption)}
                  placeholder="Genre"
                />
                <Select
                  options={author}
                  onChange={(selectedOption) => setSelectedAuthor(selectedOption)}
                  placeholder="Author"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-5 items-end">
            <div className="flex flex-wrap w-full justify-evenly gap-12">
              {products.length > 0 &&
                products.map((book, index) => (
                  <BookCard
                    key={book.id}
                    imageSrc={book.cover_image}
                    title={book.title}
                    author={book.author.name}
                    id={book.id}
                  />
                ))}
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
