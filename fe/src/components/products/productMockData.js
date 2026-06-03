export const productTypeOptions = [
  'Foods',
  'Electronics',
  'Clothes',
  'Beauty Products',
  'Others',
];

export const createEmptyProductDraft = () => ({
  title: '',
  category: 'Foods',
  quantityStock: '',
  mrp: '',
  sellingPrice: '',
  brandName: '',
  description: '',
  exchangeEligible: 'Yes',
  images: [],
});

export const emptyStateCopy = {
  products: {
    title: 'Feels a little empty over here...',
    description:
      'You can create products without connecting store you can add products to store anytime',
    action: 'Add your Products',
  },
  published: {
    title: 'No Published Products',
    description:
      'Your Published Products will appear here Create your first product to publish',
  },
  unpublished: {
    title: 'No Unpublished Products',
    description:
      'Your Unpublished Products will appear here Create your first product to publish',
  },
};
