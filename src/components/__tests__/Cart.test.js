import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";
import { useProductContext } from "../../Context/ProductContext";

jest.mock("../../Context/ProductContext");

describe("Cart Component", () => {
  const mockRemoveFromCart = jest.fn();
  const mockAddToCart = jest.fn();
  const mockDecreaseQuantity = jest.fn();
  const mockGetCartTotal = jest.fn();

  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 100,
    quantity: 2,
    images: ["test-image.jpg"],
  };

  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );

  beforeEach(() => {
    useProductContext.mockReturnValue({
      cart: [mockProduct],
      removeFromCart: mockRemoveFromCart,
      addToCart: mockAddToCart,
      decreaseQuantity: mockDecreaseQuantity,
      getCartTotal: mockGetCartTotal.mockReturnValue(200),
    });
  });

  it("renders cart items correctly", () => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/)).toBeInTheDocument();
    expect(screen.getByText(/Quantity: 2/)).toBeInTheDocument();
  });

  it("calls addToCart when + button is clicked", () => {
    fireEvent.click(screen.getByText("+"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("calls decreaseQuantity when - button is clicked", () => {
    fireEvent.click(screen.getByText("-"));
    expect(mockDecreaseQuantity).toHaveBeenCalledWith(mockProduct);
  });

  it("calls removeFromCart when remove button is clicked", () => {
    fireEvent.click(screen.getByText(/Remove from Cart/i));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("displays total price", () => {
    expect(screen.getByText(/Total: \$200/)).toBeInTheDocument();
  });

  it("has a link to continue shopping", () => {
    expect(
      screen.getByRole("link", { name: /continue shopping/i })
    ).toHaveAttribute("href", "/");
  });
});
