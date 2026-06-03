const CloseIcon = () => (
  <svg viewBox='0 0 24 24' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M6 6l12 12M18 6 6 18' />
  </svg>
);

const DeleteProductModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-[#6d7b9699] px-4 backdrop-blur-[1px]'>
      <div className='w-full max-w-[400px] rounded-[12px] bg-white px-6 py-5 shadow-[0_28px_65px_rgba(20,37,63,0.18)]'>
        <div className='mb-3 flex items-start justify-between gap-4'>
          <h2 className='text-[18px] font-semibold text-[#2e3a55]'>Delete Product</h2>
          <button type='button' onClick={onClose} className='text-[#394863]'>
            <CloseIcon />
          </button>
        </div>

        <p className='max-w-[280px] text-[14px] leading-7 text-[#4b5873]'>
          Are you sure you really want to delete this Product
          <span className='font-semibold'> "{product.title}" ?</span>
        </p>

        <div className='mt-6 flex justify-end'>
          <button
            type='button'
            onClick={onConfirm}
            className='rounded-[10px] bg-[#2d37d6] px-6 py-3 text-[14px] font-medium text-white'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
