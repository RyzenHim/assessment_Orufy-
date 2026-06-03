import { useId, useRef, useState } from 'react';
import { createEmptyProductDraft, productTypeOptions } from './productMockData';

const CloseIcon = () => (
  <svg viewBox='0 0 24 24' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M6 6l12 12M18 6 6 18' />
  </svg>
);

const SmallCloseIcon = () => (
  <svg viewBox='0 0 24 24' className='h-3 w-3' fill='none' stroke='currentColor' strokeWidth='2.4'>
    <path d='M6 6l12 12M18 6 6 18' />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='m6 9 6 6 6-6' />
  </svg>
);

const removeImageById = (images, imageId) =>
  images.filter((image) => image.id !== imageId);

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ProductModal = ({ mode, product, onClose, onSubmit }) => {
  const [form, setForm] = useState(product ?? createEmptyProductDraft());
  const fileInputId = useId();
  const fileInputRef = useRef(null);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    const nextImages = await Promise.all(
      files.map(async (file) => ({
        id: `${file.name}-${crypto.randomUUID()}`,
        name: file.name,
        public_id: file.name,
        url: await readFileAsDataUrl(file),
      })),
    );

    setForm((current) => ({
      ...current,
      images: [...current.images, ...nextImages],
    }));

    event.target.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const isAddMode = mode === 'add';

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-[#6d7b9699] px-4 py-6 backdrop-blur-[1px]'>
      <div className='max-h-[92vh] w-full max-w-[472px] overflow-hidden rounded-[12px] bg-white shadow-[0_28px_65px_rgba(20,37,63,0.18)]'>
        <div className='flex items-center justify-between border-b border-[#edf0f6] px-6 py-5'>
          <h2 className='text-[18px] font-medium text-[#3b4863]'>
            {isAddMode ? 'Add Product' : 'Edit Product'}
          </h2>
          <button type='button' onClick={onClose} className='text-[#394863]'>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='max-h-[72vh] space-y-4 overflow-y-auto px-6 py-5'>
            <Field label='Product Name'>
              <Input
                value={form.title}
                onChange={(value) => updateField('title', value)}
                placeholder='Enter product name'
              />
            </Field>

            <Field label='Product Type'>
              <Select
                value={form.category}
                onChange={(value) => updateField('category', value)}
              />
            </Field>

            <Field label='Quantity Stock'>
              <Input
                value={form.quantityStock}
                onChange={(value) => updateField('quantityStock', value)}
                placeholder='Total numbers of Stock available'
              />
            </Field>

            <Field label='MRP'>
              <Input
                value={form.mrp}
                onChange={(value) => updateField('mrp', value)}
                placeholder='Total numbers of Stock available'
              />
            </Field>

            <Field label='Selling Price'>
              <Input
                value={form.sellingPrice}
                onChange={(value) => updateField('sellingPrice', value)}
                placeholder='Total numbers of Stock available'
              />
            </Field>

            <Field label='Brand Name'>
              <Input
                value={form.brandName}
                onChange={(value) => updateField('brandName', value)}
                placeholder='Enter brand name'
              />
            </Field>

            <div>
              <div className='mb-2 flex items-center justify-between text-[14px] font-medium text-[#34415d]'>
                <span>Upload Product Images</span>
                {form.images.length ? (
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='text-[13px] font-medium text-[#3b4863]'
                  >
                    Add More Photos
                  </button>
                ) : null}
              </div>

              <input
                ref={fileInputRef}
                id={fileInputId}
                type='file'
                accept='image/*'
                multiple
                className='hidden'
                onChange={handleFileChange}
              />

              {form.images.length ? (
                <div className='rounded-[10px] border border-dashed border-[#d8dfeb] p-3'>
                  <div className='flex flex-wrap gap-3'>
                    {form.images.map((image) => (
                      <div
                        key={image.id}
                        className='relative h-[56px] w-[56px] rounded-[10px] border border-[#d8dfeb] bg-white p-1'
                      >
                        <img
                          src={image.url}
                          alt={image.name}
                          className='h-full w-full rounded-md object-cover'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              images: removeImageById(current.images, image.id),
                            }))
                          }
                          className='absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full border border-[#d8dfeb] bg-white text-[#4f5d78]'
                        >
                          <SmallCloseIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <label
                  htmlFor={fileInputId}
                  className='flex h-[80px] cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed border-[#d8dfeb] text-center text-[#a1abc0]'
                >
                  <span className='text-[14px]'>Enter Description</span>
                  <span className='text-[18px] font-semibold text-[#3b4863]'>Browse</span>
                </label>
              )}
            </div>

            <Field label='Exchange or return eligibility'>
              <select
                value={form.exchangeEligible}
                onChange={(event) => updateField('exchangeEligible', event.target.value)}
                className='h-[42px] w-full appearance-none rounded-[10px] border border-[#d4dceb] px-4 text-[14px] text-[#42506b] outline-none ring-0'
              >
                <option>Yes</option>
                <option>No</option>
              </select>
              <div className='pointer-events-none -mt-8 flex justify-end pr-4 text-[#43516c]'>
                <ChevronDown />
              </div>
            </Field>
          </div>

          <div className='border-t border-[#edf0f6] px-6 py-4'>
            <div className='flex justify-end'>
              <button
                type='submit'
                className='min-w-[84px] rounded-[10px] bg-[#2d37d6] px-5 py-3 text-[14px] font-medium text-white shadow-[0_10px_20px_rgba(45,55,214,0.22)] transition hover:bg-[#2530c9]'
              >
                {isAddMode ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className='block'>
    <span className='mb-1.5 block text-[14px] font-medium text-[#34415d]'>{label}</span>
    {children}
  </label>
);

const Input = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    className='h-[40px] w-full rounded-[10px] border border-[#d4dceb] px-4 text-[14px] text-[#42506b] outline-none transition focus:border-[#8d96ea]'
  />
);

const Select = ({ value, onChange }) => (
  <div className='relative'>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className='h-[40px] w-full appearance-none rounded-[10px] border border-[#d4dceb] px-4 text-[14px] text-[#42506b] outline-none transition focus:border-[#8d96ea]'
    >
      {productTypeOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <div className='pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#43516c]'>
      <ChevronDown />
    </div>
  </div>
);

export default ProductModal;
