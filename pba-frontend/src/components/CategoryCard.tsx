interface CategoryCardProps {
  title: string;
  imagePlaceholder: string;
}

export default function CategoryCard({ title, imagePlaceholder }: CategoryCardProps) {
  return (
    <a href="#" className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all">
      <div className={`absolute inset-0 ${imagePlaceholder} bg-cover bg-center transition-transform duration-500 group-hover:scale-110`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
        <span className="text-blue-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 block">
          View Tours &rarr;
        </span>
      </div>
    </a>
  );
}
