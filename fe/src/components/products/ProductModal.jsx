import { useId, useRef, useState } from 'react';
import { createEmptyProductDraft, productTypeOptions } from './productMockData';

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

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

const validateProductForm = (form) => {
  const errors = {};
  const quantityStock = Number(form.quantityStock);
  const mrp = Number(form.mrp);
  const sellingPrice = Number(form.sellingPrice);

  if (!form.title.trim()) {
    errors.title = 'Product name is required.';
  }

  if (!productTypeOptions.includes(form.category)) {
    errors.category = 'Choose a valid product type.';
  }

  if (form.quantityStock === '' || Number.isNaN(quantityStock)) {
    errors.quantityStock = 'Quantity stock must be a valid number.';
  } else if (quantityStock < 0) {
    errors.quantityStock = 'Quantity stock cannot be negative.';
  }

  if (form.mrp === '' || Number.isNaN(mrp)) {
    errors.mrp = 'MRP must be a valid number.';
  } else if (mrp < 0) {
    errors.mrp = 'MRP cannot be negative.';
  }

  if (form.sellingPrice === '' || Number.isNaN(sellingPrice)) {
    errors.sellingPrice = 'Selling price must be a valid number.';
  } else if (sellingPrice < 0) {
    errors.sellingPrice = 'Selling price cannot be negative.';
  } else if (!Number.isNaN(mrp) && sellingPrice > mrp) {
    errors.sellingPrice = 'Selling price cannot be greater than MRP.';
  }

  if (!form.brandName.trim()) {
    errors.brandName = 'Brand name is required.';
  }

  if (!form.images.length) {
    errors.images = 'At least one product image is required.';
  }

  return errors;
};

const ProductModal = ({ mode, product, onClose, onSubmit }) => {
  const [form, setForm] = useState(product ?? createEmptyProductDraft());
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputId = useId();
  const fileInputRef = useRef(null);

  const updateField = (field, value) => {
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitError('');
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    try {
      const invalidFile = files.find((file) => !file.type.startsWith('image/'));
      if (invalidFile) {
        throw new Error(`${invalidFile.name} is not a valid image file.`);
      }

      const oversizedFile = files.find((file) => file.size > MAX_IMAGE_SIZE_BYTES);
      if (oversizedFile) {
        const sizeInMb = (oversizedFile.size / (1024 * 1024)).toFixed(2);
        throw new Error(
          `${oversizedFile.name} is ${sizeInMb}MB. Maximum allowed image size is ${MAX_IMAGE_SIZE_MB}MB.`,
        );
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
      setErrors((current) => ({ ...current, images: '' }));
      setSubmitError('');
    } catch (error) {
      setErrors((current) => ({
        ...current,
        images: error.message || 'Unable to read image file.',
      }));
    } finally {
      event.target.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateProductForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSubmitError('Please fix the highlighted fields.');
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      await onSubmit(form);
    } catch (error) {
      setSubmitError(error.message || 'Unable to save product.');
    } finally {
      setIsSubmitting(false);
    }
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
            {submitError ? (
              <div className='rounded-[10px] border border-[#f0c7c7] bg-[#fff5f5] px-4 py-3 text-[13px] text-[#c24646]'>
                {submitError}
              </div>
            ) : null}

            <Field label='Product Name'>
              <Input
                value={form.title}
                onChange={(value) => updateField('title', value)}
                placeholder='Enter product name'
                hasError={!!errors.title}
              />
              <FieldError message={errors.title} />
            </Field>

            <Field label='Product Type'>
              <Select
                value={form.category}
                onChange={(value) => updateField('category', value)}
                hasError={!!errors.category}
              />
              <FieldError message={errors.category} />
            </Field>

            <Field label='Quantity Stock'>
              <Input
                value={form.quantityStock}
                onChange={(value) => updateField('quantityStock', value)}
                placeholder='Total numbers of Stock available'
                hasError={!!errors.quantityStock}
              />
              <FieldError message={errors.quantityStock} />
            </Field>

            <Field label='MRP'>
              <Input
                value={form.mrp}
                onChange={(value) => updateField('mrp', value)}
                placeholder='Total numbers of Stock available'
                hasError={!!errors.mrp}
              />
              <FieldError message={errors.mrp} />
            </Field>

            <Field label='Selling Price'>
              <Input
                value={form.sellingPrice}
                onChange={(value) => updateField('sellingPrice', value)}
                placeholder='Total numbers of Stock available'
                hasError={!!errors.sellingPrice}
              />
              <FieldError message={errors.sellingPrice} />
            </Field>

            <Field label='Brand Name'>
              <Input
                value={form.brandName}
                onChange={(value) => updateField('brandName', value)}
                placeholder='Enter brand name'
                hasError={!!errors.brandName}
              />
              <FieldError message={errors.brandName} />
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
                <div className={`rounded-[10px] border border-dashed p-3 ${errors.images ? 'border-[#e28a8a] bg-[#fffafa]' : 'border-[#d8dfeb]'}`}>
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
                          onClick={() => {
                            setForm((current) => ({
                              ...current,
                              images: removeImageById(current.images, image.id),
                            }));
                            setErrors((current) => ({ ...current, images: '' }));
                          }}
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
                  className={`flex h-[80px] cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed text-center text-[#a1abc0] ${errors.images ? 'border-[#e28a8a] bg-[#fffafa]' : 'border-[#d8dfeb]'}`}
                >
                  <span className='text-[14px]'>Enter Description</span>
                  <span className='text-[18px] font-semibold text-[#3b4863]'>Browse</span>
                </label>
              )}
              <FieldError message={errors.images} />
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
                disabled={isSubmitting}
                className='min-w-[84px] rounded-[10px] bg-[#2d37d6] px-5 py-3 text-[14px] font-medium text-white shadow-[0_10px_20px_rgba(45,55,214,0.22)] transition hover:bg-[#2530c9] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isSubmitting ? 'Saving...' : isAddMode ? 'Create' : 'Update'}
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

const FieldError = ({ message }) =>
  message ? <p className='mt-1.5 text-[12px] text-[#c24646]'>{message}</p> : null;

const Input = ({ value, onChange, placeholder, hasError = false }) => (
  <input
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    className={`h-[40px] w-full rounded-[10px] border px-4 text-[14px] text-[#42506b] outline-none transition focus:border-[#8d96ea] ${hasError ? 'border-[#e28a8a] bg-[#fffafa]' : 'border-[#d4dceb]'}`}
  />
);

const Select = ({ value, onChange, hasError = false }) => (
  <div className='relative'>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`h-[40px] w-full appearance-none rounded-[10px] border px-4 text-[14px] text-[#42506b] outline-none transition focus:border-[#8d96ea] ${hasError ? 'border-[#e28a8a] bg-[#fffafa]' : 'border-[#d4dceb]'}`}
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
