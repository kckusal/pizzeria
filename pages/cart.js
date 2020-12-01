import dynamic from "next/dynamic";

const CartPageWithNoSSR = dynamic(() => import("components/CartPage"), {
  ssr: false
});

export default CartPageWithNoSSR;
