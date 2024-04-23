// Fetch product data from the API
function fetchProducts() {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      console.log(data);
      // Store the product data globally
      window.productData = data;
      // console.log(productData);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Show products based on the selected category
function showProducts(category) {
  console.log("Selected category:", category);

  // Clear previous product cards
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  // Check if product data exists and has products
  if (window.productData && window.productData.categories) {
    // Filter products based on the selected category
    const products = window.productData.categories.filter(
      (product) =>
        product.category_name.toLowerCase() === category.toLowerCase()
    );

    //   console.log(products);
    // Create product cards for each product in the category

    products.forEach((category) => {
      category.category_products.forEach((product) => {
        const discountPercentage = calculateDiscountPercentage(
          product.price,
          product.compare_at_price
        );

        // Determine which image URL to use (you can add your own logic here)
        const imageURL = product.image ? product.image : product.second_image;
        const badge_Text = product.badge_text ? product.badge_text : "";
        const newtitle = (product.title.length > 15) ? product.title.slice(0,15)+"..." : product.title;
        // Create product card HTML
        const productCardHTML = `
          <div class="product-card">
          
          <span class="badge">${badge_Text}</span>
          <img src= ${imageURL} alt="${product.title}"/>
 
          <div class="product-info">
          <div class="first-line">
            <h4>${newtitle}</h4>
            <p id = "vender">*   ${product.vendor}</p>
          </div>
          <div class="second-line">
          
              <p><strong>Rs. ${product.price}.00</strong></p>
              <p id = "cprice">${product.compare_at_price}.00</p>
              <p id="discount">${discountPercentage}% off</p> 
          
          </div>
          <button class="add-to-cart-btn">Add to Cart</button>

        </div>
        
          </div>
        `;

        // Append product card to the container
        productContainer.insertAdjacentHTML("beforeend", productCardHTML);
      });
    });
  } else {
    console.error("Product data not found.");
  }
}

// Calculate discount percentage
function calculateDiscountPercentage(price, compareAtPrice) {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

// Initial function calls
fetchProducts();
