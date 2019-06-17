/* module.exports = {
    basePath : "http://localhost:8888/shop/backend/",
    secretToken: "tlb5vy2barxkh8pgvlpevxr5b62nwmps" 
} */


/* module.exports = {
    basePath : "http://shubhkit.hypernode.io/",
    secretToken: "99hni9rt40qct5zyvgovjhs14w48itl5" 
} */

var devconfig= {
    basePath : "http://localhost:8888/localshop/",
    secretToken: "xs1dhwllwenug9xvykyurgpwqq052ck4" 
}
var prodconfig= {
    basePath : "http://magento:8010/",
    secretToken: "zmd70ah06kdfz1kn1kna6mw1ygjv2jg8" //3- Access Token - not secret
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