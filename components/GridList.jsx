export default function GridList({ children, variant = 'cards' }) {
  const gridClasses = {
    cards: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    compact: 'grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    list: 'divide-y divide-gray-200',
  };

  const containerClasses = {
    cards: 'overflow-hidden bg-white shadow sm:rounded-md',
    compact: 'overflow-hidden bg-white shadow sm:rounded-md',
    list: 'overflow-hidden bg-white shadow sm:rounded-md',
  };

  if (variant === 'list') {
    return (
      <div className={containerClasses[variant]}>
        <ul role="list" className={gridClasses[variant]}>
          {children}
        </ul>
      </div>
    );
  }

  return (
    <div className={gridClasses[variant]}>
      {children}
    </div>
  );
}