class ApiFeatures{
    constructor(query,queryString)
    {
        this.query=query;
        this.queryString=queryString;
    }

    //search 

    search(){
        const keyword=this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword, //this is regular express
                $options:"i", // this means the case insensitive ;
            }
        }:{};

        // console.log(keyword);

        this.query=this.query.find({...keyword});
        return this;
    }

    filter()
    {
        const queryCopy={...this.queryString}
        // console.log(queryCopy)
        //removing some fields for cateogry 

        const removeFields=["keyword","page","limit"];

        removeFields.forEach(key=>{
            delete queryCopy[key];

        })
        // console.log(queryCopy)
        // console.log(queryCopy)
        //filter for price and rating 
        console.log(queryCopy);

        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)

        console.log(queryStr);

        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage)
    
    {
        const currentPage=(+this.queryString.page)||1; //50-10
        const skip=resultPerPage*(currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }

    
};

module.exports=ApiFeatures;