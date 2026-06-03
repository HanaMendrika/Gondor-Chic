import api from './api';

const productService = {
  getProducts: async (filters = {}) => {
    const {
      search = '',
      category = '',
      minPrice = '',
      maxPrice = '',
      page = 0,
      size = 12,
      sortBy = 'name',
      sortDir = 'asc'
    } = filters;
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    params.append('page', page);
    params.append('size', size);
    params.append('sortBy', sortBy);
    params.append('sortDir', sortDir);
    
    const queryString = params.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching products from:', endpoint);
    
    const response = await api.get(endpoint, false);
    
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await api.get(`/api/products/${id}`, false);
    return response.data;
  },
  
  addProduct: async (productData) => {
    const response = await api.post('/api/products', productData, true);
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await api.put(`/api/products/${id}`, productData, true);
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await api.delete(`/api/products/${id}`, true);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await productService.getProducts({ size: 100 });
    const categories = new Set();
    response.content?.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories).sort();
  }
};

export default productService;