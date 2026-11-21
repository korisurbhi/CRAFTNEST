
const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const noProducts = document.getElementById("noProducts");

// Display Products
function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";

    productList.forEach(function(product) {

        productContainer.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">
                    <p class="product-category">${product.category}</p>

                    <h3>${product.name}</h3>

                    <p class="product-price">₹${product.price}</p>

                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>

            </div>
        `;
    });
}

// Search and Category Filter
function filterProducts() {

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(function(product) {

        const matchesName = product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Add to Cart
function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProduct = products.find(function(product) {
        return product.id === productId;
    });

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}

// Event Listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Initial Display
displayProducts(products);
