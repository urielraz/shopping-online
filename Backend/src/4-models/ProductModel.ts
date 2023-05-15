import Joi from "joi";
import { UploadedFile } from "express-fileupload";


class ProductModel{
    
    public product_id :number;

    public product_name:string;

    public product_category :number;
    
    public price:number;

    public image: UploadedFile;
    public imageName: string;


    public constructor(product:ProductModel){
        this.product_id  = product.product_id ;
        this.product_name = product.product_name;
        this.product_category  = product.product_category ;

        this.price = product.price;

        this.image = product.image;
        this.imageName = product.imageName;
    }
    public static validationSchema = Joi.object({
        product_id : Joi.number().integer().positive(),

        product_name: Joi.string().min(2).max(25).required(),

        product_category : Joi.number().required(),
        
        price: Joi.number().min(0).required(),

        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
  
    })

    public validation(){
        const result = ProductModel.validationSchema.validate(this)
        return result.error?.message;
    }


}
export default ProductModel