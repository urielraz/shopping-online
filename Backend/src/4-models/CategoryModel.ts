class CategoryModel {

    public category_id: number;
  
    public category_name: string;
  
    public constructor(categoryModel: CategoryModel) {
      this.category_id = categoryModel.category_id;
      this.category_name = categoryModel.category_name;
    }
  }
  export default CategoryModel;
  