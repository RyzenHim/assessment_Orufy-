import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchIcon = () => (
  <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='11' cy='11' r='7' />
    <path d='m20 20-3.5-3.5' />
  </svg>
);

const BagIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8'>
    <path d='M8 7V6a4 4 0 1 1 8 0v1' />
    <path d='M6 8.5h12l-1 10a2 2 0 0 1-2 1.5H9A2 2 0 0 1 7 18.5z' />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='m6 9 6 6 6-6' />
  </svg>
);

const getDisplayName = (profile) =>
  [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Demo Seller';

const getInitials = (profile) =>
  getDisplayName(profile)
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

const TopBar = ({ profile, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const titleMap = {
    '/home': 'Home',
    '/products': 'Products',
    '/profile': 'Profile',
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className='fixed left-0 right-0 top-0 z-20 md:left-60'>
      <div className='border-b border-[#e8ebf4] bg-[linear-gradient(90deg,rgba(255,245,244,0.95)_0%,rgba(255,251,210,0.8)_48%,rgba(244,248,255,0.96)_100%)] backdrop-blur'>
        <div className='flex h-16 items-center justify-between gap-4 px-5 md:px-6'>
          <div className='flex items-center gap-3 text-[#394863]'>
            <BagIcon />
            <span className='text-[15px] font-medium'>
              {titleMap[location.pathname] || 'Products'}
            </span>
          </div>

          <div className='flex items-center gap-3'>
            <div className='hidden h-11 w-[340px] items-center gap-3 rounded-md bg-white/80 px-4 text-[#8792a9] ring-1 ring-inset ring-[#eef1f7] md:flex'>
              <SearchIcon />
              <span className='text-[14px]'>Search Services, Products</span>
            </div>

            <div className='relative' ref={menuRef}>
              <button
                type='button'
                onClick={() => setIsMenuOpen((current) => !current)}
                className='flex items-center gap-2 text-[#4c5a74]'
              >
                <div className='grid h-8 w-8 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c1cc,#7e88c7)] text-[10px] font-semibold text-white'>
                  {getInitials(profile)}
                </div>
                <ChevronDown />
              </button>

              {isMenuOpen ? (
                <div className='absolute right-0 top-12 w-[230px] overflow-hidden rounded-[14px] border border-[#dbe1ec] bg-white shadow-[0_16px_40px_rgba(28,45,78,0.12)]'>
                  <div className='border-b border-[#edf0f6] px-4 py-4'>
                    <p className='text-[14px] font-semibold text-[#34415d]'>
                      {getDisplayName(profile)}
                    </p>
                    <p className='mt-1 break-all text-[13px] text-[#8f9ab0]'>
                      {profile?.email || profile?.phone || 'demo@productr.local'}
                    </p>
                  </div>

                  <div className='p-2'>
                    <button
                      type='button'
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/profile');
                      }}
                      className='flex w-full rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium text-[#3d4b67] transition hover:bg-[#f5f7fc]'
                    >
                      Visit Profile
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout();
                      }}
                      className='flex w-full rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium text-[#d14d4d] transition hover:bg-[#fff3f3]'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
