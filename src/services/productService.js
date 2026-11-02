const BASE_URL = 'https://dummyjson.com/products';

// Fetch a single product by ID
export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
  return await response.json();
}

// Fetch all products
export async function fetchAllProducts(limit = 100) {
  const response = await fetch(`${BASE_URL}?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.products;
}

// Fetch product categories
export async function fetchAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json();
}