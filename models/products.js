export default class products {
    constructor(id,title,categoryIds,imageUrl,description,price,stars,size,header,discount){
        this.id =id;
        this.title=title;
        this.categoryIds=categoryIds;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
        this.stars=stars;
        this.size=size;
        this.header=header;
        this.discount=discount;
    }
}
