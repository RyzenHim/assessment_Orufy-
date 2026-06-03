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
    <section className='mx-auto max-w-4xl'>
      <div className='mb-8'>
        <h1 className='text-[24px] font-semibold text-[#34415d]'>Profile</h1>
        <p className='mt-2 text-[14px] text-[#8f9ab0]'>
          Your account details and contact information.
        </p>
      </div>

      <div className='overflow-hidden rounded-[22px] border border-[#dbe1ec] bg-white shadow-[0_12px_32px_rgba(28,45,78,0.08)]'>
        <div className='bg-[linear-gradient(90deg,rgba(255,245,244,0.95)_0%,rgba(255,251,210,0.8)_48%,rgba(244,248,255,0.96)_100%)] px-6 py-8 md:px-8'>
          <div className='flex flex-col items-start gap-5 md:flex-row md:items-center'>
            <div className='grid h-20 w-20 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c1cc,#7e88c7)] text-[24px] font-semibold text-white'>
              {getInitials(profile)}
            </div>
            <div>
              <h2 className='text-[26px] font-semibold text-[#2e3a55]'>
                {getDisplayName(profile)}
              </h2>
              <p className='mt-1 text-[15px] text-[#66748f]'>
                {profile?.email || profile?.phone || 'No contact information'}
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-5 px-6 py-8 md:grid-cols-2 md:px-8'>
          {profileRows(profile).map(([label, value]) => (
            <div
              key={label}
              className='rounded-[16px] border border-[#e4e8f1] bg-[#fbfcff] px-5 py-4'
            >
              <p className='text-[12px] font-medium uppercase tracking-[0.16em] text-[#9ba5bb]'>
                {label}
              </p>
              <p className='mt-2 break-all text-[16px] font-medium text-[#34415d]'>
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
