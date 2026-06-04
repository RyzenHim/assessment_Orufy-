import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ProductModal from './ProductModal';
import DeleteProductModal from './DeleteProductModal';
import Toast from './Toast';
import { createEmptyProductDraft } from './productMockData';
import {
  createProductApi,
  deleteProductApi,
  getProductsApi,
  togglePublishProductApi,
  updateProductApi,
} from '../../services/productService';
import { getProfileApi } from '../../services/userService';
import { clearSession, getStoredUser, storeUser } from '../../utils/session';

const ProductsLayout = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [modalState, setModalState] = useState({ mode: null, product: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(getStoredUser());
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductsApi();
        setProducts(productList);
      } catch (error) {
        setToast({
          type: 'error',
          message: error.message || 'Unable to load products',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfileApi();
        setProfile(user);
        storeUser(user);
      } catch {
        const storedUser = getStoredUser();
        if (storedUser) {
          setProfile(storedUser);
        }
      }
    };

    fetchProfile();
  }, []);

  const openAddModal = () => {
    setModalState({ mode: 'add', product: createEmptyProductDraft() });
  };

  const openEditModal = (productId) => {
    const currentProduct = products.find((item) => item.id === productId);

    if (!currentProduct) {
      return;
    }

    setModalState({
      mode: 'edit',
      product: {
        ...currentProduct,
        quantityStock: String(currentProduct.quantityStock),
        mrp: String(currentProduct.mrp),
        sellingPrice: String(currentProduct.sellingPrice),
        exchangeEligible: currentProduct.exchangeEligible === 'YES' ? 'Yes' : 'No',
      },
    });
  };

  const closeModal = () => setModalState({ mode: null, product: null });

  const createProduct = async (draft) => {
    const createdProduct = await createProductApi(draft);
    setProducts((current) => [createdProduct, ...current]);
    setToast({ type: 'success', message: 'Product added Successfully' });
    closeModal();
  };

  const updateProduct = async (draft) => {
    const updatedProduct = await updateProductApi(draft.id, draft);
    setProducts((current) =>
      current.map((item) => (item.id === draft.id ? updatedProduct : item)),
    );
    setToast({ type: 'success', message: 'Product updated Successfully' });
    closeModal();
  };

  const removeProduct = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteProductApi(deleteTarget.id);
      setProducts((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
      setToast({ type: 'success', message: 'Product Deleted Successfully' });
    } catch (error) {
      setToast({
        type: 'error',
        message: error.message || 'Unable to delete product',
      });
    }
  };

  const togglePublishState = async (productId) => {
    try {
      const updatedProduct = await togglePublishProductApi(productId);
      setProducts((current) =>
        current.map((item) => (item.id === productId ? updatedProduct : item)),
      );
    } catch (error) {
      setToast({
        type: 'error',
        message: error.message || 'Unable to update publish status',
      });
    }
  };

  const logout = () => {
    clearSession();
    navigate('/');
  };

  const openMobileSidebar = () => setIsMobileSidebarOpen(true);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  const contextValue = {
    products,
    isLoading,
    profile,
    openAddModal,
    openEditModal,
    openDeleteModal: setDeleteTarget,
    togglePublishState,
  };

  return (
    <div className='min-h-screen bg-[#fbfcff] text-[#3d4b67]'>
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
      <div className='min-h-screen pl-0 md:pl-60'>
        <TopBar
          profile={profile}
          onLogout={logout}
          onMenuToggle={openMobileSidebar}
        />
        <main className='px-5 pb-8 pt-24 md:px-8'>
          <Outlet context={contextValue} />
        </main>
      </div>

      {modalState.mode ? (
        <ProductModal
          key={`${modalState.mode}-${modalState.product?.id ?? 'new'}`}
          mode={modalState.mode}
          product={modalState.product}
          onClose={closeModal}
          onSubmit={modalState.mode === 'add' ? createProduct : updateProduct}
        />
      ) : null}

      {deleteTarget ? (
        <DeleteProductModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={removeProduct}
        />
      ) : null}

      {toast ? <Toast toast={toast} onClose={() => setToast(null)} /> : null}
    </div>
  );
};

export default ProductsLayout;
