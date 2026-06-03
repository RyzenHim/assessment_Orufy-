const CheckIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='2.4'>
    <path d='m5 13 4 4L19 7' />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M6 6l12 12M18 6 6 18' />
  </svg>
);

const Toast = ({ toast, onClose }) => {
  return (
    <div className='fixed bottom-10 left-1/2 z-50 -translate-x-1/2'>
      <div className='flex items-center gap-4 rounded-[12px] border border-[#dfe4ee] bg-white px-3 py-2.5 shadow-[0_18px_45px_rgba(18,34,61,0.12)]'>
        <div className='grid h-9 w-9 place-items-center rounded-[10px] bg-[#21a367] text-white'>
          <CheckIcon />
        </div>
        <span className='text-[14px] font-medium text-[#3e4c67]'>{toast.message}</span>
        <button type='button' onClick={onClose} className='text-[#3e4c67]'>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast;
