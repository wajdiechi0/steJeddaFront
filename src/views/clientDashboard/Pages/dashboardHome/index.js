import React from 'react';
import Layout from './../Cart/Layout';

import ProductsGrid from './ProductsGrid';

const Store = () => {
    
    return ( 
        <Layout title="Store" description="This is the Store page" >
            <div >
                <div className="text-center mt-5">
                    <h1>Brouse Templates</h1>
                </div>
                <ProductsGrid/>
            </div>
        </Layout>
     );
}
 
export default Store;