class CartModel {

    public cart_id: number;
  
    public user_id: number;
    
    public date: string;
  
    public constructor(cartModel: CartModel) {
      this.cart_id = cartModel.cart_id;
      this.user_id = cartModel.user_id;
      this.date = cartModel.date;
    }
  }
  export default CartModel;
  