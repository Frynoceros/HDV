import Link from 'next/link';

export default function Card({ title, description, href, image, imageAlt }) {
  const CardContent = () => (
    <>
      <div className="flex-shrink-0">
        {image ? (
          <img
            className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg"
            src={image}
            alt={imageAlt || title}
          />
        ) : (
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-xs">No image</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 px-4">
        <p className="text-sm font-medium text-gray-900 truncate">
          {title}
        </p>
        {description && (
          <p className="text-sm text-gray-500 truncate">{description}</p>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group relative flex items-center px-4 py-4 sm:px-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
      >
        <CardContent />
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-gray-400 group-hover:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative flex items-center px-4 py-4 sm:px-6">
      <CardContent />
    </div>
  );
}