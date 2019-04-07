/* module.exports = {
    basePath : "http://localhost:8888/shop/backend/",
    secretToken: "tlb5vy2barxkh8pgvlpevxr5b62nwmps" 
} */


/* module.exports = {
    basePath : "http://shubhkit.hypernode.io/",
    secretToken: "99hni9rt40qct5zyvgovjhs14w48itl5" 
} */

var devconfig= {
    basePath : "http://localhost:8888/shop/backend/",
    secretToken: "tlb5vy2barxkh8pgvlpevxr5b62nwmps" 
}
var prodconfig= {
    basePath : "http://shubhkit.hypernode.io/",
    secretToken: "99hni9rt40qct5zyvgovjhs14w48itl5" 
}

module.exports = (function(){
    console.log(process.env.NODE_ENV)
    switch(process.env.NODE_ENV){
        case 'development':
            return devconfig;

        case 'production':
            return prodconfig;

        default:
            return prodconfig;
    }
})();