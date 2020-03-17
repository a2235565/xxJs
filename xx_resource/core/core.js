if(typeof xxJs != "undefined"){
    xxJs.loadingMoule = 0;
    xxJs.loadingTime = 0;
    xxJs.loadCss=function(id,url){
        let _this = xxJs;
        if(_this.$('#'+id).length==0){
            _this.$('head').append(
                '<link id="'+id+'" ' +
                'rel="stylesheet" ' +
                'href="'+url+'"/>'
            );
        }
    };
    xxJs.requseModule = function (modules,callback) {
        xxJs.loadingMoule = 0;
        xxJs.loadingTime = 0;
        let _this = this;
        let conf = _this.conf;
        let path = conf.xx_app_base_path+'/'+conf.xx_module_path+'/';
        function xx_main_load(str,callback) {
            if (_this.conf.xx_app_debug) console.log('loadding for '+str);
            _this.loadJS(path+str+'_conf.js',function () {
                try{
                    _this.conf[str]= eval('xx_'+str+'_conf')
                    if (_this.conf.xx_app_debug) console.log('complete conf for'+str);
                    _this.loadJS(path+str+'.js',function () {
                        try{
                            if (_this.conf.xx_app_debug) console.log('complete js for'+str);
                            //模块主体
                            _this[str] = eval('xx_'+str);
                            //加载模块资源
                            if(typeof _this.conf[str].cssPath != 'undefined'){
                                _this.loadCss(str,_this.conf[str].cssPath)
                                if (_this.conf.xx_app_debug)   console.log('complete css for'+str);
                            }
                            xxJs.loadingMoule++;
                            if (_this.conf.xx_app_debug) console.log('complete for '+str);
                            if(typeof callback == "function"){
                                callback()
                            }
                        }catch (e) {
                            if (_this.conf.xx_app_debug) console.log(e)
                        }
                    })
                }catch (e) {
                    if (_this.conf.xx_app_debug)console.log(e)
                }
            });
        }
        if(typeof modules == 'object'){
            _this.$.each(modules,function (k,v) {
                if(k==modules.length-1){
                    xx_main_load(v)
                    let int = setInterval(function () {
                        xxJs.loadingTime ++
                        if(xxJs.loadingMoule == modules.length){
                            if(typeof callback == "function"){
                                callback()
                                clearInterval(int)
                                xxJs.loadingTime = 0
                            }
                        }
                        if(xxJs.conf.timeOut <  xxJs.loadingTime){
                            clearInterval(int)
                            xxJs.loadingTime = 0
                            console.log('加载失败')
                        }
                    },500)
                }else{
                    xx_main_load(v)
                }
            });

        }else if(typeof modules == 'string'){
            xx_main_load(modules,callback)
        }else{
            if (_this.conf.xx_app_debug) console.log('modules must be string or list')
        }
    }
}