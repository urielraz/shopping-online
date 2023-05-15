class OrdersModel {

    public order_id: number;
  
    public user_id: number;
    
    public cart_id: number;
    
    public final_price: number;
    
    public city: string;
    
    public street: string;
    
    public date_delivery: string;
    
    public date_order: string;
    
    public credit_card: number;

  
    public constructor(ordersModel: OrdersModel) {
      this.order_id = ordersModel.order_id;
      this.user_id = ordersModel.user_id;
      this.cart_id = ordersModel.cart_id;
      this.final_price = ordersModel.final_price;
      this.city = ordersModel.city;
      this.street = ordersModel.street;
      this.date_delivery = ordersModel.date_delivery;
      this.date_order = ordersModel.date_order;
      this.credit_card = ordersModel.credit_card;
    }
  }
  export default OrdersModel;
  