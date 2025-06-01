import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  ProductProvider,
  useProductContext,
} from "../../Context/ProductContext";

// ✅ Preserve ProductProvider while mocking useProductContext
jest.mock("../../Context/ProductContext", () => {
  const actual = jest.requireActual("../../Context/ProductContext");
  return {
    ...actual,
    useProductContext: jest.fn(),
  };
});

describe("Navbar Component", () => {
  const mockHandleTheme = jest.fn();

  beforeEach(() => {
    // ✅ Mock the context return value
    useProductContext.mockReturnValue({
      handleTheme: mockHandleTheme,
    });

    // ✅ Render the component inside beforeEach
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <ProductProvider>
          <Navbar />
        </ProductProvider>
      </BrowserRouter>
    );
  });

  it("renders all navigation links", () => {
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("calls handleTheme when toggle button is clicked", () => {
    const toggleButton = screen.getByRole("button", { name: /toggle/i });
    fireEvent.click(toggleButton);
    expect(mockHandleTheme).toHaveBeenCalledTimes(1);
  });
});
