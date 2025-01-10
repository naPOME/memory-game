

interface Category {
  name: string;
  icon: string;
}

interface ImageCategorySelectorProps {
  onSelectCategory: (categoryName: string) => void;
}

const imageCategories: Category[] = [
  { name: 'Animals', icon: '🐾' },
  { name: 'Nature', icon: '🌿' },
  { name: 'People', icon: '👥' },
  { name: 'Cars', icon: '🚗' },
  { name: 'Other', icon: '✨' },
];

const ImageCategorySelector = ({ onSelectCategory }:ImageCategorySelectorProps) => {
  

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {imageCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="flex flex-col bg-primary border-2 border-accent text-text items-center justify-center px-6 py-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
            style={{
             
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCategorySelector;
