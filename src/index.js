import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import QuickView from "./components/QuickView";
import "./scss/style.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 0,
      quickViewProduct: {},
      modalActive: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  // Fetch Initial Set of Products from external API
  getProducts() {
      this.setState({
        products: [
          {
            "id": 1,
            "name": "Picanha",
            "price": 25,
            "category": "Lanches"
          },
          {
            "id": 2,
            "name": "Double Picanha",
            "price": 30,
            "category": "Lanches"
          },
          {
            "id": 3,
            "name": "Costela",
            "price": 25,
            "category": "Lanches"
          },
          {
            "id": 4,
            "name": "Double Costela",
            "price": 30,
            "category": "Lanches"
          },
          {
            "id": 5,
            "name": "Linguiça",
            "price": 25,
            "category": "Lanches"
          },
          {
            "id": 15,
            "name": "Lanche no prato",
            "price": 25,
            "category": "Lanches"
          },
          {
            "id": 25,
            "name": "Kids",
            "price": 25,
            "category": "Lanches"
          },
          {
            "id": 6,
            "name": "Batata",
            "price": 25,
            "category": "Porção"
          },
          {
            "id": 7,
            "name": "Batata Turbinada",
            "price": 30,
            "category": "Porção"
          },
          {
            "id": 17,
            "name": "1/2 Batata",
            "price": 17,
            "category": "Porção"
          },
          {
            "id": 8,
            "name": "Heineken",
            "price": 8,
            "category": "Bebidas"
          },
          {
            "id": 9,
            "name": "Budweiser",
            "price": 8,
            "category": "Bebidas"
          },
          {
            "id": 10,
            "name": "Einsebahn",
            "price": 8,
            "category": "Bebidas"
          },
          {
            "id": 11,
            "name": "Coca-Cola",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 21,
            "name": "Coca-Cola Zero",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 31,
            "name": "Guaraná",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 41,
            "name": "Guaraná Zero",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 91,
            "name": "Agua Tônica",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 51,
            "name": "Tubaína",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 61,
            "name": "Fanta",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 71,
            "name": "Sprite",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 12,
            "name": "Suco Del Vale Maracuja",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 22,
            "name": "Suco Del Vale Uva",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 32,
            "name": "Suco Del Vale Pêssego",
            "price": 5,
            "category": "Bebidas"
          },
          {
            "id": 14,
            "name": "H2OH Limonetto",
            "price": 6,
            "category": "Bebidas"
          },
          {
            "id": 24,
            "name": "H2OH Citrus",
            "price": 6,
            "category": "Bebidas"
          },
          {
            "id": 34,
            "name": "H2OH Maçã",
            "price": 6,
            "category": "Bebidas"
          },
          {
            "id": 13,
            "name": "Água",
            "price": 4,
            "category": "Bebidas"
          }
        ]
      });
  }
  componentWillMount() {
    this.getProducts();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  render() {
    return (
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
        />
        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />
        <Footer />
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
