class ItemsOfCartModel {

    public item_id: number;
  
    public product_id: number;
    
    public quantity: number;
    
    public general_price: number;
    
    public cart_id : number;

  
    public constructor(itemsOfCartModel: ItemsOfCartModel) {

      this.item_id = itemsOfCartModel.item_id;
      this.product_id = itemsOfCartModel.product_id;
      this.quantity = itemsOfCartModel.quantity;
      this.general_price = itemsOfCartModel.general_price;
      this.cart_id  = itemsOfCartModel.cart_id ;

    }
  }
  export default ItemsOfCartModel;
  