var xxJs = {
    $:null,
    conf:null,
    init:function (callback) {
        let _this = this;
        function loadCore() {
            let conf = _this.conf;
            let path = conf.xx_app_base_path+''+conf.xx_core_path;
            if(typeof $ != "undefined"){
                _this.$ = xx_$;
                _this.loadJS(path+'/core.js',function () {
                    if(typeof callback == "function"){
                        callback();
                    }
                })
            }else{
                _this.loadJS(path+'/jq.js',function () {
                    _this.$ = xx_$;xx_$ = undefined;xx_jQuery = undefined;
                    _this.loadJS(path+'/core.js',function () {
                        if(typeof callback == "function"){
                            callback();
                        }
                    })
                })
            }
        }
        if(typeof xx_conf == 'undefined'){
            _this.loadJS('./xx_resource/conf.js',function () {
                _this.conf = xx_conf;
                xx_conf = undefined;
                loadCore()
            })
        }else{
            _this.conf = xx_conf;
            loadCore()
        }
    },loadJS: function ( url, callback ){
        try{
            let script = document.createElement('script'),
            fn = callback || function(){};
            script.type = 'text/javascript';
            if(script.readyState){
                script.onreadystatechange = function(){
                    if( script.readyState == 'loaded' || script.readyState == 'complete' ){
                        script.onreadystatechange = null;
                        fn();
                    }
                };
            }else{
                script.onload = function(){
                    fn();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);

        }catch (e) {
            console.log(e);
        }
    }
}