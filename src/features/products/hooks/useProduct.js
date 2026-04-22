import { useDispatch } from "react-redux";
import { createProduct,getSellerProducts,getProducts, getProductById } from "../services/api.service";
import { setSellerProducts,setProducts } from "../state/product.slice";



export const useProduct = ()=>{

    const dispatch = useDispatch();

    async function handleCreateProduct(formData){
        const data = await createProduct(formData);
        return data.product;
    }

    async function handleGetSellerProducts(){
        const data = await getSellerProducts();
        dispatch(setSellerProducts(data.product));
        return data.product;
    }

    async function handleGetAllProducts(){
        const data = await getProducts();
        dispatch(setProducts(data.products));
        return data.products;
    }

    async function handleGetProductById(id){
        const data = await getProductById(id);
        return data.product;
    }

    return {handleCreateProduct,handleGetSellerProducts,handleGetAllProducts,handleGetProductById}    
} 