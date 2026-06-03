const TrashIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8'>
    <path d='M4 7h16' />
    <path d='M9 7V5h6v2' />
    <path d='M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12' />
    <path d='M10 11v5M14 11v5' />
  </svg>
);

const formatCategory = (category) => (category === 'Foods' ? 'Food' : category);

const productFields = (product) => [
  ['Product type -', formatCategory(product.category)],
  ['Quantity Stock -', product.quantityStock],
  ['MRP-', `Rs ${product.mrp}`],
  ['Selling Price -', `Rs ${product.sellingPrice}`],
  ['Brand Name -', product.brandName],
  ['Total Number of images -', product.images.length],
  ['Exchange Eligibility -', `.${product.exchangeEligible}`],
];

const ProductCard = ({ product, onTogglePublish, onEdit, onDelete }) => {
  return (
    <article className='rounded-[18px] border border-[#dbe1ec] bg-white p-4 shadow-[0_8px_28px_rgba(28,45,78,0.08)]'>
      <div className='rounded-[10px] border border-[#d8dfeb] bg-[#f7f9fd] p-3'>
        <div className='flex h-[180px] items-center justify-center overflow-hidden rounded-[8px] bg-[#f8fafc]'>
          <img
            src={product.images[0]?.url}
            alt={product.title}
            className='h-full max-h-[170px] w-auto object-contain'
          />
        </div>
      </div>

      <div className='mt-[-8px] flex justify-center'>
        <div className='flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.08)]'>
          {product.images.map((image, index) => (
            <span
              key={image.id}
              className={`h-[7px] w-[7px] rounded-full ${
                index === 0 ? 'bg-[#ff7a59]' : 'bg-[#d4d8e2]'
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className='mt-3 text-[17px] font-semibold text-[#1f2a3e]'>{product.title}</h3>

      <div className='mt-3 space-y-2'>
        {productFields(product).map(([label, value]) => (
          <div key={label} className='flex items-center justify-between gap-4 text-[15px]'>
            <span className='text-[#98a4ba]'>{label}</span>
            <span className='text-right text-[#46556f]'>{value}</span>
          </div>
        ))}
      </div>

      <div className='mt-6 flex items-center gap-3'>
        <button
          type='button'
          onClick={onTogglePublish}
          className={`flex-1 rounded-[10px] px-4 py-3 text-[14px] font-medium text-white ${
            product.isPublished ? 'bg-[#4bd000]' : 'bg-[#2d37d6]'
          }`}
        >
          {product.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button
          type='button'
          onClick={onEdit}
          className='flex-1 rounded-[10px] border border-[#cad3e3] px-4 py-3 text-[14px] font-medium text-[#3d4b67]'
        >
          Edit
        </button>
        <button
          type='button'
          onClick={onDelete}
          className='grid h-[46px] w-[46px] place-items-center rounded-[10px] border border-[#cad3e3] text-[#94a0b6]'
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
