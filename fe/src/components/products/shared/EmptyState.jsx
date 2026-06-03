import noItems from '../../../assets/Group.png';

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className='flex max-w-[420px] flex-col items-center text-center'>
      <img src={noItems} alt='' className='mb-6 h-[82px] w-[82px]' />
      <h2 className='mb-3 text-[20px] font-semibold text-[#394863]'>{title}</h2>
      <p className='mb-8 whitespace-pre-line text-[14px] leading-7 text-[#9ba5bb]'>
        {description.replace(' appear here ', ' appear here\n')}
      </p>
      {actionLabel ? (
        <button
          type='button'
          onClick={onAction}
          className='min-w-[316px] rounded-[10px] bg-[#2d37d6] px-8 py-4 text-[15px] font-medium text-white shadow-[0_16px_34px_rgba(45,55,214,0.18)]'
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
