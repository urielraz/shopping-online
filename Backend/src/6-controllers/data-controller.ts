import express, {Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/ProductModel";
import dataLogic from "../5-logic/data-logic";
import ProductModel from "../4-models/ProductModel";
import ItemsOfCartModel from "../4-models/ItemsOfCartModel";
import fileHendler from "../2-utils/fileHendler";
import { FileNotFoundErrorModel } from "../4-models/error-models";
import path from "path";
import OrdersModel from "../4-models/OrdersModel";

const router = express.Router() 

router.get('/countAllOrders', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const data = await dataLogic.countAllOrders();
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})
router.get('/countAllProducts', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const data = await dataLogic.countAllProducts();
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.post('/products',verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {

    try {
        
        // Take the image from Files and append it to thh body
        request.body.image = request.files?.image;


        const product = new ProductModel(request.body);
        const newProduct = await dataLogic.addNewProduct(product);
        response.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }

})

router.patch("/products/:product_id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.product_id = +request.params.product_id;
        request.body.image = request.files?.image;

        const product = new ProductModel(request.body);
        const updateProduct = await dataLogic.updateProduct(product);
        response.json(updateProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.post('/addNewCartForUser/:user_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user_id = +request.params.user_id

        const product = new ProductModel(request.body);
        const newProduct = await dataLogic.addNewCartForUser(user_id);
        response.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }

})

router.post('/addNewItemToCart/', async( request: Request, response : Response, next : NextFunction ) => {

    try {

        const item = new ItemsOfCartModel(request.body);
        const newItem = await dataLogic.addNewItemToCart(item);
        response.json(newItem);
        
        // const cart_id = +request.params.cart_id
        // const product = new ProductModel(request.body);
        // const newProduct = await dataLogic.addNewItemToCart(cart_id);
        // response.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }

})

router.delete('/deleteItemFromCart/:cart_id([0-9]+)/:product_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const cart_id = +request.params.cart_id
        const product_id = +request.params.product_id
        await dataLogic.deleteItemFromCart(cart_id, product_id);
        response.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

})

router.delete('/deleteALLItemFromCart/:cart_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const cart_id = +request.params.cart_id
        await dataLogic.deleteALLItemFromCart(cart_id);
        response.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

})

router.get('/GetProductsByCategory/:product_category([0-9]+)',verifyLoggedIn, async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const product_category = +request.params.product_category;
        const data = await dataLogic.GetProductsByCategory(product_category);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/products/images/:imageName',  async (request: Request, response: Response, next: NextFunction) => {
    try {

        // get image name from the Route
        const imageName = request.params.imageName;

        // Check if file exists
        if (!fileHendler.fileExists(imageName)) throw new FileNotFoundErrorModel(imageName)

        // get absolute path of file in os
        const absolutePath = path.join(__dirname, '..', '1-assets', 'images', imageName)

        // responde the file to the front
        response.sendFile(absolutePath);


    } catch (error) {
        next(error)
    }
});

router.get('/GetAllCategories/', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const data = await dataLogic.GetAllCategories();
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/findCartByUser/:user([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user = +request.params.user;
        const data = await dataLogic.findCartByUser(user);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/getAllProductsByCart/:cart_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const cart_id = +request.params.cart_id;
        const data = await dataLogic.getAllProductsByCart(cart_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.post('/addNewOrderForUser/', async( request: Request, response : Response, next : NextFunction ) => {

    try {

        const order = new OrdersModel(request.body);
        const newOrder = await dataLogic.addNewOrderForUser(order);
        response.json(newOrder);
        
        // const cart_id = +request.params.cart_id
        // const product = new ProductModel(request.body);
        // const newProduct = await dataLogic.addNewItemToCart(cart_id);
        // response.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }

})

router.get('/CheckCartStatusByUser/:user_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user_id = +request.params.user_id;
        const data = await dataLogic.CheckCartStatusByUser(user_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})
router.get('/sumOfCart/:cart_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const cart_id = +request.params.cart_id;
        const data = await dataLogic.sumOfCart(cart_id);
        response.json(data)
            
    } catch (error) {
        next(error)
    }

})

router.get('/getImgByProId/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const id = +request.params.id;
        const data = await dataLogic.getImgByProId(id);
        response.json(data)
            
    } catch (error) {
        next(error)
    }

})

router.delete('/deleteCompletelyItemFromCart/:cart_id([0-9]+)/:product_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const cart_id = +request.params.cart_id
        const product_id = +request.params.product_id
        await dataLogic.deleteCompletelyItemFromCart(cart_id, product_id);
        response.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

})

router.get('/ifEmailExist/:email', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const email = request.params.email;
        const data = await dataLogic.ifEmailExist(email);
        response.json(data)
            
    } catch (error) {
        next(error)
    }

})

router.get('/search/:product_name', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const product_name = request.params.product_name;
        const data = await dataLogic.search(product_name);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/getAllProducts/', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const data = await dataLogic.getAllProducts();
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/GetProductsById/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const id = +request.params.id;
        const data = await dataLogic.GetProductsById(id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/Open_new_cart_or_enter__existing_cart/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const id = +request.params.id;
        const data = await dataLogic.Open_new_cart_or_enter__existing_cart(id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})
router.get('/GetLastOrderById/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const id = +request.params.id;
        const data = await dataLogic.GetLastOrderById(id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.get('/checkIfDateTaken/:date', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const date = request.params.date;
        const data = await dataLogic.checkIfDateTaken(date);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})






// router.get('/vacations', async( request: Request, response : Response, next : NextFunction ) => {

//     try {
//         const data = await dataLogic.getAllVacations();
//         response.json(data)
        
//     } catch (error) {
//         next(error)
//     }

// })

// router.post('/vacations',verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {

//     try {
        
//         // Take the image from Files and append it to thh body
//         request.body.image = request.files?.image;


//         const vacation = new VacationModel(request.body);
//         const newVacation = await dataLogic.addNewVacation(vacation);
//         response.status(201).json(newVacation)
//     } catch (error) {
//         next(error)
//     }

// })
export default router;