import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

const SearchIcon = () => (
  <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='11' cy='11' r='7' />
    <path d='m20 20-3.5-3.5' />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8'>
    <path d='M4 11.5 12 5l8 6.5' />
    <path d='M6.5 10.5V19h11v-8.5' />
  </svg>
);

const ProductIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8'>
    <path d='M8 4.5h8l3 4v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-10z' />
    <path d='M9 8.5a3 3 0 0 0 6 0' />
  </svg>
);

const sidebarLinks = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/products', label: 'Products', icon: ProductIcon },
];

const Sidebar = () => {
  return (
    <aside className='fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-white/6 bg-[#202632] text-[#95a1ba] md:flex'>
      <div className='px-4 pb-3 pt-5'>
        <img src={logo} alt='Productr' className='h-9 w-auto' />
      </div>

      <div className='px-2 pb-4'>
        <div className='flex h-12 items-center gap-3 rounded-lg bg-white/6 px-4 text-[#7f8aa4] ring-1 ring-inset ring-white/4'>
          <SearchIcon />
          <span className='text-[14px]'>Search</span>
        </div>
      </div>

      <div className='border-t border-white/6 px-2 pt-4'>
        <nav className='space-y-1.5'>
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium transition ${
                  isActive ? 'text-white' : 'hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
