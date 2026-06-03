import { useOutletContext } from 'react-router-dom';

const getDisplayName = (user) => {
  if (!user) {
    return 'Guest User';
  }

  return [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Guest User';
};

const getInitials = (user) => {
  const name = getDisplayName(user).split(' ');
  return name
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
};

const profileRows = (user) => [
  ['First Name', user?.firstName || '-'],
  ['Last Name', user?.lastName || '-'],
  ['Email', user?.email || '-'],
  ['Phone', user?.phone || '-'],
  ['User Id', user?._id || user?.id || '-'],
];

const ProfilePage = () => {
  const { profile } = useOutletContext();

  return (
    <section className='mx-auto w-full max-w-4xl px-0'>
      <div className='mb-6 md:mb-8'>
        <h1 className='text-[20px] md:text-[24px] font-semibold text-[#34415d]'>Profile</h1>
        <p className='mt-2 text-[13px] md:text-[14px] text-[#8f9ab0]'>
          Your account details and contact information.
        </p>
      </div>

      <div className='overflow-hidden rounded-[16px] md:rounded-[22px] border border-[#dbe1ec] bg-white shadow-[0_12px_32px_rgba(28,45,78,0.08)]'>
        <div className='bg-[linear-gradient(90deg,rgba(255,245,244,0.95)_0%,rgba(255,251,210,0.8)_48%,rgba(244,248,255,0.96)_100%)] px-5 py-6 md:px-8 md:py-8'>
          <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-5'>
            <div className='grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c1cc,#7e88c7)] text-[18px] md:text-[24px] font-semibold text-white flex-shrink-0'>
              {getInitials(profile)}
            </div>
            <div className='min-w-0'>
              <h2 className='text-[20px] md:text-[26px] font-semibold text-[#2e3a55] break-words'>
                {getDisplayName(profile)}
              </h2>
              <p className='mt-1 text-[13px] md:text-[15px] text-[#66748f] break-all'>
                {profile?.email || profile?.phone || 'No contact information'}
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-4 md:gap-5 px-5 py-6 md:px-8 md:py-8 grid-cols-1 md:grid-cols-2'>
          {profileRows(profile).map(([label, value]) => (
            <div
              key={label}
              className='rounded-[12px] md:rounded-[16px] border border-[#e4e8f1] bg-[#fbfcff] px-4 md:px-5 py-3 md:py-4'
            >
              <p className='text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] text-[#9ba5bb]'>
                {label}
              </p>
              <p className='mt-2 break-all text-[14px] md:text-[16px] font-medium text-[#34415d]'>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
