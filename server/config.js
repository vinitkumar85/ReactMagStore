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
    basePath : "http://www.shubhkit.com:8080/",
    secretToken: "se1mjyfrr86hhriaan4r0dh23v7p5kdd" //3- Access Token - not secret
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