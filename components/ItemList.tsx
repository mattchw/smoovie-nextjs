import ItemCard from '@/components/ItemCard';

interface ItemListProps {
  title: string;
  items: {
    name: string;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
  }[];
}

const ItemList: React.FC<ItemListProps> = ({
  title,
  items,
}) => {
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {items === null ? (
            <div className="animate-pulse bg-zinc-900 col-span relative h-[12vw]">
              <div className="bg-zinc-800 p-2 lg:p-4 rounded-md w-full h-[12vw]" />
            </div>
          ) : items?.map((item) => (
            <ItemCard key={item.name} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItemList