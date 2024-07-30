import { request,getUrl,addQueryParams } from "../utils/network";

export const listProductAction =  (filter) => {
   if( filter!==null && filter!==undefined){
     return request("get", addQueryParams(getUrl("/api/products/audiobooks/"),filter),null,false);
   }
   return request("get",getUrl("/api/products/audiobooks/"),null,false);
 
}
export const getProductAction =  (id) => {
  return request("get",getUrl(`/api/products/audiobooks/${id}/`),null,false);
}
export const addReviewAction =  (data) => {
  return request("post",getUrl(`/api/products/audiobooks/${data.id}/reviews/`),data.review,false);
}