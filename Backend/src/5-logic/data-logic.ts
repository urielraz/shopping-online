import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import fileHendler from "../2-utils/fileHendler";
import { v4 as uuidv4 } from "uuid";

import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import ProductModel from "../4-models/ProductModel";
// import path from "path"

import fs from "fs"
import OrdersModel from "../4-models/OrdersModel";
import UserModel from "../4-models/user-model";
import CartModel from "../4-models/CartModel";
import ItemsOfCartModel from "../4-models/ItemsOfCartModel";
import CategoryModel from "../4-models/CategoryModel";

async function countAllOrders(): Promise<OrdersModel[]> {
    // const sql = `SELECT ORDER_ID FROM orders`;
    const sql = `SELECT COUNT(DISTINCT ORDER_ID) AS "COUNT" FROM orders`;
    const data = await dal.execute( sql )
 
    console.log( data[0].COUNT);
    return data[0].COUNT;
}

async function countAllProducts(): Promise<ProductModel[]> {
    // const sql = `SELECT product_id FROM products`;
    const sql = `SELECT COUNT(DISTINCT product_id) AS "COUNT" FROM products`;
    const data = await dal.execute( sql )
    console.log( data[0].COUNT);
    return data[0].COUNT;
}

async function addNewProduct(product:ProductModel): Promise<ProductModel> {

    const err = product.validation();

    if(err) throw new ValidationErrorModel(err)

    console.log(product)

    if (product.image) {
        product.imageName = await fileHendler.saveFile(product.image);
        delete product.image;
    }

    const sql = `INSERT INTO products VALUES (DEFAULT,'${product.product_name}',${product.product_category},${product.price},'${product.imageName}')`;

    const info:OkPacket =  await dal.execute( sql )
    product.product_id = info.insertId;
    return product;
}

async function updateProduct(product: ProductModel): Promise<ProductModel> {

    console.log(product)

    if (product.image) {
        if (fs.existsSync("./src/1-assets/images/" + product.imageName)) {
           fs.unlinkSync("./src/1-assets/images/" + product.imageName)
       }
        product.imageName = await fileHendler.saveFile(product.image);
        delete product.image;
    }
    const err = product.validation();

    if(err) throw new ValidationErrorModel(err)
   
    const sql = `UPDATE products SET product_name = '${product.product_name}', product_category = ${product.product_category}, price = ${product.price}, imageName = '${product.imageName}' WHERE product_id = ${product.product_id}`
    ;

    const info:OkPacket =  await dal.execute( sql )
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(product.product_id);
    return product;
}

async function addNewCartForUser(user_id:number): Promise<CartModel> {

    // let newCart:CartModel;

    const sql = `INSERT INTO cart VALUES (DEFAULT,'${user_id}', CURRENT_TIMESTAMP())`;
    const data = await dal.execute(sql);
    return data;
}

async function addNewItemToCart(items_of_cart:ItemsOfCartModel): Promise<ItemsOfCartModel> {

    const sql_price_of_product = `SELECT price FROM products WHERE product_id = '${items_of_cart.product_id}'`;

    let price_of_product = await dal.execute( sql_price_of_product )

     // console.log(general_price[0].price)
    
        
    const sqlIfItemExist =`SELECT * FROM items_of_cart WHERE product_id = '${items_of_cart.product_id}' AND cart_id = '${items_of_cart.cart_id}'`;

    const infoIF = await dal.execute( sqlIfItemExist )

    console.log(infoIF[0]?.quantity)

    if (infoIF[0]?.quantity){
        
        const newQuantity = (+infoIF[0].quantity + +items_of_cart.quantity);
        // console.log(newQuantity)
        items_of_cart.quantity = newQuantity;
        // if(newQuantity<0)
        // {
        //     items_of_cart.quantity=0;

        // }
            
        // console.log("מלא")
        // items_of_cart.quantity = infoIF[0]?.quantity + items_of_cart.quantity;
        items_of_cart.general_price = price_of_product[0].price * items_of_cart.quantity;
        // items_of_cart.general_price = general_price;


        const sql = `UPDATE items_of_cart SET quantity= '${items_of_cart.quantity}', general_price = '${items_of_cart.general_price}' WHERE product_id = '${items_of_cart.product_id}' AND cart_id= '${items_of_cart.cart_id}'`;

        
        // const info:OkPacket =  await dal.execute( sql )
          await dal.execute( sql )
        // items_of_cart.item_id = info.insertId;
        // const data = await dal.execute(sql);
        return items_of_cart;
    }
        
    
    
    items_of_cart.general_price = price_of_product[0].price * items_of_cart.quantity;


    // items_of_cart.general_price = general_price;

    const sql = `INSERT INTO items_of_cart VALUES (DEFAULT,'${items_of_cart.product_id}' ,'${items_of_cart.quantity}' ,'${items_of_cart.general_price}' ,'${items_of_cart.cart_id}' )`;

    const info:OkPacket =  await dal.execute( sql )
    items_of_cart.item_id = info.insertId;
    // const data = await dal.execute(sql);
    return items_of_cart;
}

async function deleteItemFromCart(cart_id:number, product_id:number): Promise<void> {

    const sqlIfItemExist =`SELECT * FROM items_of_cart WHERE product_id = '${product_id}' AND cart_id = '${cart_id}'`;

    const infoIF = await dal.execute( sqlIfItemExist )
    // console.log(infoIF[0].quantity)


    if (infoIF[0]?.quantity){

        const sql_price_of_product = `SELECT price FROM products WHERE product_id = '${product_id}'`;

        let price_of_product = await dal.execute( sql_price_of_product )

        // console.log(price_of_product)
        
        // let items_of_cart = new ItemsOfCartModel;
        
        
        const quantity = (+infoIF[0].quantity-1);
        // console.log(newQuantity)
        // const quantity = newQuantity;
        if(quantity===0){
                       
            const sql = `DELETE FROM items_of_cart WHERE product_id = '${product_id}' AND cart_id= '${cart_id}'`;
            const info:OkPacket = await dal.execute( sql );
            
            if( info.affectedRows === 0){
                throw new ResourceNotFoundErrorModel( product_id )
            }
            return
        }
        const general_price =  price_of_product[0].price * quantity;;
        // if(newQuantity<0)
        // {
            //     items_of_cart.quantity=0;
            
            // }
            
            // console.log("מלא")
            // items_of_cart.quantity = infoIF[0]?.quantity + items_of_cart.quantity;
            // items_of_cart.general_price = price_of_product[0].price * items_of_cart.quantity;
        // items_of_cart.general_price = general_price;


        const sql = `UPDATE items_of_cart SET quantity= '${quantity}', general_price = '${general_price}' WHERE product_id = '${product_id}' AND cart_id= '${cart_id}'`;

        
        // const info:OkPacket =  await dal.execute( sql )
        const info:OkPacket = await dal.execute( sql )
        if( info.affectedRows === 0){
            throw new ResourceNotFoundErrorModel( product_id )
        }
        // items_of_cart.item_id = info.insertId;
        // const data = await dal.execute(sql);
        // return items_of_cart;
    }


    
    

    console.log(infoIF[0]?.quantity)

      






     
    // const sql = `DELETE FROM items_of_cart WHERE cart_id = ${cart_id} AND product_id = ${product}`;
    // const info:OkPacket = await dal.execute( sql );

    // if( info.affectedRows === 0){
    //     throw new ResourceNotFoundErrorModel( product )
    // }

}

async function deleteCompletelyItemFromCart(cart_id:number, product_id:number): Promise<void> {
    
    const sql = `DELETE FROM items_of_cart WHERE product_id = '${product_id}' AND cart_id= '${cart_id}'`;
    const info:OkPacket = await dal.execute( sql );
    
    if( info.affectedRows === 0){
        throw new ResourceNotFoundErrorModel( product_id )
    }
    return
}

async function deleteALLItemFromCart(cart_id:number): Promise<void> {
     
    const sql = `DELETE FROM items_of_cart WHERE cart_id = ${cart_id}`;
    const info:OkPacket = await dal.execute( sql );

    if( info.affectedRows === 0){
        throw new ResourceNotFoundErrorModel( cart_id )
    }

}

async function GetProductsByCategory(product_category:number): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products WHERE product_category = ${product_category}`;
    const data = await dal.execute( sql )
    return data;
}
async function GetAllCategories(): Promise<CategoryModel[]> {
    const sql = `SELECT * FROM categories `;
    const data = await dal.execute( sql )
    return data;
}

async function getAllProductsByCart(cart_id:number): Promise<ItemsOfCartModel[]> {
    const sql = `SELECT * FROM items_of_cart WHERE cart_id = ${cart_id}`;
    const data = await dal.execute( sql )
    return data;
}

async function addNewOrderForUser(order:OrdersModel): Promise<OrdersModel> {
    const sql = `INSERT INTO orders VALUES (DEFAULT, ${order.user_id}, ${order.cart_id}, ${order.final_price}, '${order.city}', '${order.street}', '${order.date_delivery}', CURRENT_TIMESTAMP(), ${order.credit_card} )`;
    const data = await dal.execute(sql);
    return data;
}

async function findCartByUser(user:number): Promise<number> {
    const sql = `SELECT cart_id FROM cart WHERE id = ${user} ORDER BY cart.cart_id DESC`;
    // const sql = `SELECT cart.cart_id FROM cart LEFT JOIN orders
    // ON cart.cart_id != orders.cart_id
    // WHERE id=${user} AND user_id=${user};
    // `;
    const data = await dal.execute( sql )
    return data[0].cart_id;
}


async function CheckCartStatusByUser(user:number): Promise<number> {

    const sql = `SELECT * FROM cart WHERE id = ${user}`;
    const data = await dal.execute( sql )
    if (data[0]?.cart_id){
        const sql2 = `SELECT cart.cart_id FROM cart LEFT JOIN orders
        ON cart.cart_id != orders.cart_id
        WHERE id=${user} AND user_id=${user};
        `;
        const data2 = await dal.execute( sql2 )
        if (data2[0].cart_id){
            return data2;
        }
        return data;
    }
        return 5
    
}

async function sumOfCart(cart_id:number): Promise<number> {
    const sql = `SELECT SUM(general_price) AS SUM
    FROM items_of_cart
    WHERE cart_id=${cart_id}`;
    // const sql = `SELECT cart.cart_id FROM cart LEFT JOIN orders
    // ON cart.cart_id != orders.cart_id
    // WHERE id=${user} AND user_id=${user};
    // `;
    const data = await dal.execute( sql )
    return data[0].SUM;
}

async function getImgByProId(id:number):Promise<string> {
    const sql = `SELECT imageName FROM products WHERE product_id = ${id}`;
    const data = await dal.execute( sql )
    return data[0].imageName;
}

async function ifEmailExist(email:string):Promise<any> {
    const sql = `SELECT username FROM users WHERE username = ${email}`;
    const data = await dal.execute( sql )
    if(data[0].username){
        return false
    }
    // return true
}

async function search(search_name:string): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products WHERE product_name  LIKE "%${search_name}%"`;
    const data = await dal.execute( sql )
    return data;
}
async function getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products`;
    const data = await dal.execute( sql )
    return data;
}

async function GetProductsById(id:number): Promise<ProductModel> {
    const sql = `SELECT * FROM products WHERE product_id = ${id}`;
    const data = await dal.execute( sql )
    return data;
}

async function Open_new_cart_or_enter__existing_cart(id:number):Promise<Number> {

    const sql = `SELECT CASE WHEN EXISTS (SELECT cart.cart_id FROM cart WHERE id = ${id}) THEN TRUE ELSE FALSE END as a`;
    const data = await dal.execute( sql )
    if(data[0].a === 0) return 0 // מחזיר 0 אם אין ולא היתה עגלה

    const sql2 = `SELECT c.cart_id, o.order_id FROM cart c left join orders o ON c.cart_id = o.cart_id WHERE o.order_id is null AND c.id = ${id}`
    const data2 = await dal.execute(sql2);
    // if (data2[0].order_id = null)
    if (data2.length===0) return -1 // מחזיר מינוס 1 אם כל העגלות סגורות וצריך לפתוח חדשה
    return data2[0].cart_id // מחזיר את מספר העגלה אם היא פתוחה
    
    


}

async function GetLastOrderById(id:number): Promise<OrdersModel> {
    const sql = `SELECT * FROM orders WHERE user_id = ${id} ORDER BY orders.order_id DESC`;
    const data = await dal.execute( sql )
    return data[0];
}


async function checkIfDateTaken(date:string): Promise<boolean> {
    const sql = `SELECT date_delivery, COUNT(date_delivery)
    FROM Orders
    WHERE date_delivery = "${date}"
    GROUP BY date_delivery
    HAVING COUNT(date_delivery) > 2;`;
    const data = await dal.execute( sql )
    if(data.length === 0)return true
    return false;
}


// async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

//     console.log(vacation)

//     if (vacation.image) {
//         // Delete file
//         if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {
//            fs.unlinkSync("./src/1-assets/images/" + vacation.imageName)
//        }
//         vacation.imageName = await fileHendler.saveFile(vacation.image);
//         delete vacation.image;


//     }



//     const err = vacation.validation();

//     if(err) throw new ValidationErrorModel(err)


    
//     const sql = `UPDATE vacations SET description = '${vacation.description}', destination = '${vacation.destination}', imageName = '${vacation.imageName}', dateStart = '${vacation.dateStart}', dateEnd = '${vacation.dateEnd}', price = ${vacation.price} WHERE vacation_id = ${vacation.vacation_id}`
//     ;


//     const info:OkPacket =  await dal.execute( sql )
//     if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacation_id);
//     return vacation;
// }





// async function getOpenCartByUser(user_id:number): Promise<CartModel> {
//     const sql = `SELECT * FROM items_of_cart WHERE cart_id = ${cart_id}`;
//     const data = await dal.execute( sql )
//     return data;
// }

// async function getImageByProduct(product_id:number): Promise<any> {
//     // const sql = `SELECT ORDER_ID FROM orders`;
//     const sql = `SELECT imageName FROM products WHERE product_id = ${product_id}`;
//     const data = await dal.execute( sql )
 
//     return data;
// }





// async function getAllVacations(): Promise<VacationModel[]> {
//     const sql = `SELECT * FROM vacations`;
//     const data = await dal.execute( sql )
//     return data;
// }

// async function getOneVacation(vacation_id: number): Promise<VacationModel> {
//     const sql = `SELECT * FROM vacations WHERE vacation_id = ${vacation_id}`;
//     const vacations = await dal.execute(sql);
//     if (vacations.length === 0) throw new ResourceNotFoundErrorModel(vacation_id);
//     const vacation = vacations[0];
//     return vacation;
// }

// async function addNewVacation(vacation:VacationModel): Promise<VacationModel> {

//     const err = vacation.validation();

//     if(err) throw new ValidationErrorModel(err)

//     console.log(vacation)

//     if (vacation.image) {
//         vacation.imageName = await fileHendler.saveFile(vacation.image);
//         delete vacation.image;
//     }

//     const sql = `INSERT INTO vacations VALUES (DEFAULT,'${vacation.description}','${vacation.destination}','${vacation.imageName}','${vacation.dateStart}','${vacation.dateEnd}',${vacation.price})`;

//     const info:OkPacket =  await dal.execute( sql )
//     vacation.vacation_id = info.insertId;
//     return vacation;
// }

// async function GetAllVacationsByUser(user_id:number): Promise<VacationModel[]> {
//     const sql = `SELECT * FROM vacations WHERE user_id = ${user_id}`;
//     const data = await dal.execute( sql )
//     return data;
// }


// async function deleteVacation(id:number): Promise<void> {
     
//     const sql = `DELETE FROM vacations WHERE vacation_id = ${id}`;
//     const info:OkPacket = await dal.execute( sql );

//     if( info.affectedRows === 0){
//         throw new ResourceNotFoundErrorModel( id )
//     }

// }

// async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

//     console.log(vacation)

//     if (vacation.image) {
//         // Delete file
//         if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {
//            fs.unlinkSync("./src/1-assets/images/" + vacation.imageName)
//        }
//         vacation.imageName = await fileHendler.saveFile(vacation.image);
//         delete vacation.image;


//     }



//     const err = vacation.validation();

//     if(err) throw new ValidationErrorModel(err)


    
//     const sql = `UPDATE vacations SET description = '${vacation.description}', destination = '${vacation.destination}', imageName = '${vacation.imageName}', dateStart = '${vacation.dateStart}', dateEnd = '${vacation.dateEnd}', price = ${vacation.price} WHERE vacation_id = ${vacation.vacation_id}`
//     ;


//     const info:OkPacket =  await dal.execute( sql )
//     if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacation_id);
//     return vacation;
// }



export default {
    countAllOrders,
    countAllProducts,
    addNewProduct,
    updateProduct,
    addNewCartForUser,
    addNewItemToCart,
    deleteItemFromCart,
    deleteALLItemFromCart,
    GetProductsByCategory,
    GetAllCategories,
    findCartByUser,
    getAllProductsByCart,
    addNewOrderForUser,
    CheckCartStatusByUser,
    sumOfCart,
    getImgByProId,
    deleteCompletelyItemFromCart,
    ifEmailExist,
    search,
    getAllProducts,
    GetProductsById,
    Open_new_cart_or_enter__existing_cart,
    GetLastOrderById,
    checkIfDateTaken
    // getAllVacations,
    // addNewVacation,
    // GetAllVacationsByUser,
    // deleteVacation,
    // updateVacation,
    // getOneVacation

}