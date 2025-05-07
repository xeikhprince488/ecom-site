import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { clearCart } from "@/store/shop/cart-slice"; // Import clearCart action
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // Track selected payment method
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Handle Order Placement
  function handlePlaceOrder() {
    if (cartItems?.items?.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (!currentSelectedAddress) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }
    if (!paymentMethod) {
      toast({
        title: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "payOnDelivery" ? "pending" : "processing",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    setIsPaymemntStart(true); // Start Payment Process
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Order placed successfully!",
          variant: "success",
        });
        dispatch(clearCart(user?.id)); // Clear the cart upon successful order
        if (data?.payload?.approvalURL) {
          window.location.href = data.payload.approvalURL; // Redirect for Payment Approval
        }
      } else {
        toast({
          title: "Order placement failed. Please try again.",
          variant: "destructive",
        });
        setIsPaymemntStart(false); // Reset Payment Start
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, index) => (
                <UserCartItemsContent key={index} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mt-4 space-y-2">
            <h3 className="font-bold">Choose Payment Method:</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="payOnDelivery"
                onChange={() => setPaymentMethod("payOnDelivery")}
              />
              Pay on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="paypal"
                onChange={() => setPaymentMethod("paypal")}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="bank"
                onChange={() => setPaymentMethod("bank")}
              />
              Bank Payment
            </label>
          </div>

          {/* Place Order Button */}
          <div className="mt-4 w-full">
            <Button onClick={handlePlaceOrder} className="w-full">
              {isPaymentStart ? "Processing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
