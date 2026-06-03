import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from './shared/ProductCard';
import EmptyState from './shared/EmptyState';
import { emptyStateCopy } from './productMockData';

const tabs = [
  { key: 'published', label: 'Published' },
  { key: 'unpublished', label: 'Unpublished' },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('published');
  const {
    products,
    isLoading,
    openEditModal,
    openDeleteModal,
    togglePublishState,
  } = useOutletContext();

  const filteredProducts = products.filter((product) =>
    activeTab === 'published' ? product.isPublished : !product.isPublished,
  );

  const copy =
    activeTab === 'published'
      ? emptyStateCopy.published
      : emptyStateCopy.unpublished;

  return (
    <section className='-mx-5 md:-mx-8'>
      <div className='border-b border-[#e7eaf2] px-5 md:px-8'>
        <div className='flex gap-8'>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type='button'
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-1 py-5 text-[15px] font-medium transition ${
                activeTab === tab.key
                  ? 'border-[#2f7ff7] text-[#394864]'
                  : 'border-transparent text-[#9aa4b8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className='flex min-h-[calc(100vh-9rem)] items-center justify-center px-5 text-[15px] text-[#7f8aa4] md:px-8'>
          Loading products...
        </div>
      ) : filteredProducts.length ? (
        <div className='grid gap-6 px-5 pt-8 md:px-8 lg:grid-cols-2 xl:grid-cols-3'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => openEditModal(product.id)}
              onDelete={() => openDeleteModal(product)}
              onTogglePublish={() => togglePublishState(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className='flex min-h-[calc(100vh-9rem)] items-center justify-center px-5 md:px-8'>
          <EmptyState title={copy.title} description={copy.description} />
        </div>
      )}
    </section>
  );
};

export default HomePage;
