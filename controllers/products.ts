import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import  { Product } from '../types.ts';

let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 199.99
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 299.99
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 399.99
    }
];

// @desc   Get all products
// @route  GET /api/v1/products

const getProducts = ({response}: {response: any}) => {
    response.body = {
        success: true,
        products: products
    }
}

// @desc   Get one product by id
// @route  GET /api/v1/product/:id

const getProductById = ({params, response}: {params: {id: string}, response: any}) => {
   const product: Product | undefined =  products.find(product => product.id === params.id);
   
   if(product) {
       response.status = 200;
        response.body = {
            success: true,
            product
        }
    }
    else {
        response.status = 404;
        response.body = {
            success: false,
            message: "Unable to find product by this id:" + params.id
        }
    }
}

// @desc    Add a product
// @route   POST /api/v1/product

const addProduct = async ({request, response}: {request: any, response: any}) => {
    const productBody = await request.body();
  
    if(!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Invalid parameters"
        }
    }
    else {
        const product: Product = productBody.value;

        product.id = v4.generate();
        products.push(product);

        response.status = 200;
        response.body = {
            success:true,
            data: products
        }

    }   
}

// @desc   Update a product
// @route  PUT /api/v1/products/:id

const updateProduct = async ({params, request, response}: {params: { id: string }, request: any, response: any})=> {
    const product: Product | undefined =  products.find(product => product.id === params.id);
   
    if(product) {
      const body = await request.body();

      const updateData: {
          name? : string; 
          description? : string;
          price? : number } = body.value;

          products = products.map(product => product.id === params.id? {...product, ...updateData}: product);

          response.status = 200;
          response.body = {
              success: true,
              data: products
          }
     }
     else {
         response.status = 404;
         response.body = {
             success: false,
             message: "Unable to update product by this id:" + params.id
         }
     }
}

// @desc    Delete a product
// @route   Delete /api/v1/products/:id

const deleteProduct = ({params, response}: {params: { id: string }, response: any}) => {
    const product: Product | undefined = products.find(product => product.id === params.id);

    if(product) {
       products =  products.filter(product => product.id !== params.id) ;

       response.status = 200;
       response.body = {
           success: true,
           data: products
       }
    }
    else {
        response.status = 404;
         response.body = {
             success: false,
             message: "Unable to delete product by this id:" + params.id
         } 
    }
}

export {getProducts, getProductById, addProduct, updateProduct, deleteProduct}