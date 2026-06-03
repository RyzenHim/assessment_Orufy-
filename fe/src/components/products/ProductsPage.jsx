import { useOutletContext } from 'react-router-dom';
import EmptyState from './shared/EmptyState';
import ProductCard from './shared/ProductCard';
import { emptyStateCopy } from './productMockData';

const PlusIcon = () => (
  <svg viewBox='0 0 24 24' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M12 5v14M5 12h14' />
  </svg>
);

const ProductsPage = () => {
  const {
    products,
    isLoading,
    openAddModal,
    openEditModal,
    openDeleteModal,
    togglePublishState,
  } = useOutletContext();

  if (isLoading) {
    return (
      <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center text-[14px] md:text-[15px] text-[#7f8aa4]'>
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center'>
        <EmptyState
          title={emptyStateCopy.products.title}
          description={emptyStateCopy.products.description}
          actionLabel={emptyStateCopy.products.action}
          onAction={openAddModal}
        />
      </div>
    );
  }

  return (
    <section>
      <div className='mb-6 md:mb-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h1 className='text-[20px] md:text-[22px] font-semibold text-[#34415d]'>Products</h1>
        <button
          type='button'
          onClick={openAddModal}
          className='flex items-center gap-2 text-[14px] md:text-[18px] font-medium text-[#4b5873] hover:text-[#3d4b67] transition whitespace-nowrap'
        >
          <PlusIcon />
          <span>Add Products</span>
        </button>
      </div>

      <div className='grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => openEditModal(product.id)}
            onDelete={() => openDeleteModal(product)}
            onTogglePublish={() => togglePublishState(product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
