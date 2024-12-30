const getCardStyles = (level: string) => {
    switch (level) {
      case 'easy':
        return {
          width: 'w-20 h-20 sm:w-20 sm:h-20 md:w-44 md:h-44 lg:w-48 lg:h-48',
          alignment: 'lg:grid-cols-6 grid-cols-3',
          gap: 'gap-4',
        };
      case 'medium':
        return {
          width: 'w-16 h-16 sm:w-24 sm:h-20 md:w-48 md:h-28 lg:w-44 lg:h-28',
          alignment: 'lg:grid-cols-6 grid-cols-4',
          gap: 'gap-4',
        };
      case 'hard':
        return {
          width: 'w-12 h-12 sm:w-20 sm:h-16 md:w-36 md:h-28 lg:w-36 lg:h-28',
          alignment: 'lg:grid-cols-9 grid-col-5 grid-cols-6',
          gap: 'gap-3',
        };
      default:
        return {
          width: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28',
          alignment: 'lg:grid-cols-6 grid-cols-3',
          gap: 'gap-4',
        };
    }
  };
  
  export default getCardStyles;