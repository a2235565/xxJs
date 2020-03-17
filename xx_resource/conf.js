var xx_conf = {
    xx_app_debug:true,
    timeOut:15,//  秒/10
    xx_app_base_path:'/xxJs',
    xx_conf_path:'/xx_resource',
    xx_module_path:'/xx_resource/module',
    xx_core_path:'/xx_resource/core',
    xx_static_path:'/xx_resource/static_html_resources',
    setConfPath:function (path) {
        this.xx_conf_path = path;
    },
    setModulePath:function (path) {
        this.xx_module_path = path;
    },
    setBasePath:function (path) {
        this.xx_core_path = path
    },
    setCorePath:function (path) {
        this.xx_core_path = path
    },
    /**
     * 尽量传绝对路径
     * @param basePath
     * @param confPath
     * @param modulePath
     * @param corePath
     */
    setConf:function(basePath,confPath,modulePath,corePath){
        this.xx_app_base_path = basePath;
        this.xx_conf_path = confPath;
        this.xx_module_path = modulePath;
        this.xx_core_path = corePath
    }
}