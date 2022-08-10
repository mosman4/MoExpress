import category from "../models/category";
import feed from "../models/feed";
import products from "../models/products";

export const CATEGORIES = [
    new category("c1","Men"),
    new category("c2","Women"),
    new category("c3","Shoes"),
    new category("c4","Accessories"),
    new category("c5","Perfumes"),
    new category("c6","Electrics"),
    new category("c0","feed"),
    new category("c00","news"),
];

export const FEED = [
    new feed("f1","The latest version of MacBook pro is Here !","With the newest mac, you can manage many tasks simultaneously. Perfect for producers, designers and programmers. Order yours now !","https://www.xda-developers.com/files/2022/06/MacBook-Air-2022-Midnight-overhead-view-with-lid-open.jpg",3200,40),
    new feed("f2","Ipad 2 the latest version is Here !","With the newest mac, you can manage many tasks simultaneously. Perfect for producers, designers and programmers. Order yours now !","https://images.macrumors.com/t/Op-ArH_mbIDx1Bdw7scj744cuzM=/800x0/smart/article-new/2019/03/ipad-air-2022-roundup-header.png?lossy"),
    new feed("f3","Iphone 15  the latest version of MacBook pro is Here !","With the newest mac, you can manage many tasks simultaneously. Perfect for producers, designers and programmers. Order yours now !","https://technextgroup.com/wp-content/uploads/2022/03/Tech-Next-Store-iPhone-13-Pro-Starlight1-1.jpg",null,20),
]

export const PRODUCTS = [
    new products("p1","Black Summer","c1","https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/1280x1280/products/13904/137983/Dudalina-Men-Shirt-2018-Long-Sleeve-Shirt-100-Cotton-Male-Casual-Embroidery-Formal-Business-Man-Shirt__19901.1544098303.jpg?c=2?imbypass=on","Beautiful shirt that will make u elegant and Beautiful shirt that will make u elegant and Beautiful shirt that will make u elegant and Beautiful shirt that will make u elegant",32,3,["L","XL","XXL"],null,null),
    new products("p2","Air Jordan 1","c3","https://www.shoozersworld.com/wp-content/uploads/2020/11/Nike-air-jordan-1-x-off-white-600x600.jpg","New kicks to match your style",120,4,[45,46,47,48],null,null),
    new products("p3","Apple watch","c4","https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/42-alu-silver-sport-white-nc-s3-grid?wid=540&hei=550&fmt=jpeg&qlt=90&.v=1594259786000","New series of apple watch and New series of apple watch and New series of apple watch",500,5,null,null,null),
    new products("p4","Light short - sleeves","c2","https://images.lululemon.com/is/image/lululemon/LW3DFNS_056050_1","Prefect for summer and Prefect for summer and Prefect for summer and Prefect for summer",42,2,["S","M","L","XL","XXL"],"",45),
    new products("p5","Long sleeves","c2","https://assets.ajio.com/medias/sys_master/root/20210914/XnfS/613fb12ff997ddce89c4cbb9/-473Wx593H-441122143-maroon-MODEL.jpg","elegant and modern shirt and elegant and modern shirt and elegant and modern shirt",40,5,null,null,null),
    new products("p6","Original Rayban","c4","https://m.media-amazon.com/images/I/411L3Qb+QSL._UX569_.jpg","You will never find more original one and ou will never find more original one",90,3,null,null,null),
    new products("p7","Tom Ford Noir","c5","https://m.media-amazon.com/images/I/717NqshSY3L.jpg","What men should smell like and What men should smell like and What men should smell like and What men should smell like",32,4,null,null,null),
    new products("p8","Paco Rabbane Black XS ","c5","https://cdn.shopify.com/s/files/1/0549/0999/3217/products/e4213e243da9497baffb3e0db8a3f167_202105219945_97704d1b-d06b-41c8-9d9c-c740dc7a7bbd.jpg?v=1633849555","OG for the real smellers and OG for the real smellers and OG for the real smellers and OG for the real smellers",20,5,null,null,null),
    new products("p9","Tommy Hilfiger","c3","https://st-tommy.mncdn.com/mnpadding/1000/1335/FFFFFF/Content/media/ProductImg/original/fm0fm03997dw5-corporate-deri-sneaker-637910571613887200.jpg","Most stylish look of the century and Most stylish look of the century and Most stylish look of the century and Most stylish look of the century",90,3,null,null,null),
    new products("p10","Tommatech 5kW inverter","c6","https://cdn.dsmcdn.com/ty121/product/media/html-images/20210528/20/88360754/38ddd609-1cf1-463d-b8ac-b66f4d22a352.jpg","Say goodbye to electricity shortages and Say goodbye to electricity shortages and Say goodbye to electricity shortages and Say goodbye to electricity shortages",570,4,null,null,null),
    new products("p11","CNC Plasma Torch","c6","https://vallder-rs.com/images/stories/virtuemart/product/plasma-torch-p80-4.jpg","Cuts metal but also cuts itself and Cuts metal but also cuts itself and Cuts metal but also cuts itself and Cuts metal but also cuts itself",20,1,null,null,null),
    new products("p12","Rolex watch","c4","https://cdn.shopify.com/s/files/1/1117/3536/products/Rolex_1ct_blue_1_2_b970451f-0987-44fb-aeab-341b4f6dd40b_1024x1024.jpg?v=1559890466","It is original, trust me and It is original, trust me and It is original, trust me and It is original, trust me",900,3,null,null,null),
    new products("p13","Men Levis jeans","c1","https://www.bolf.eu/eng_pl_Mens-Jeans-Skinny-Fit-Navy-Blue-Bolf-KX555-84571_13.jpg","Jeans that will make you look less of a man and Jeans that will make you look less of a man and Jeans that will make you look less of a man and Jeans that will make you look less of a man",100,4,null,null,null),
    new products("p14","MacBook Air M2",["c00","c0"],"https://www.xda-developers.com/files/2022/06/MacBook-Air-2022-Midnight-overhead-view-with-lid-open.jpg","With the newest mac, you can manage many tasks simultaneously. Perfect for producers, designers and programmers. Order yours now !",null,4,null,"The latest version of MacBook pro is Here !",null),
    new products("p16","Iphone 15",["c0","c6"],"https://technextgroup.com/wp-content/uploads/2022/03/Tech-Next-Store-iPhone-13-Pro-Starlight1-1.jpg","With the newest mac, you can manage many tasks simultaneously. Perfect for producers, designers and programmers. Order yours now !",2000,5,null,"Iphone 15 is the latest version of MacBook pro is Here !",20),
];