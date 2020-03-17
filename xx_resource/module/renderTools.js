var xx_renderTools = {
    init:function () {
        xxJs.$('.tplClass').hide();
    },
    setKeywords:function(value){
        this.setMeta('keywords',value);
    },
    setDescription:function(value){
        this.setMeta('description',value);
    },
    setMeta:function(key,value){
        xxJs.$('head').append('<meta name="'+key+'"content="'+value+'">');
    },
    setTitle:function(titleStr){
        xxJs.$('title').html(titleStr);
    },
    renderInfo:function(data){
        xxJs.$('.needRenderClass').each(function (v) {
            var _this = xxJs.$(this);
            var str = _this.html();
            var list = str.split('${{data');
            var returnStr = '';
            xxJs.$.each(list,function (k,v) {
                var temp = v.split('}}');
                if(temp.length>1){
                    var tempData = temp[0].split('.');
                    if(tempData.length>1){
                        var last = temp[1].split('${{data');
                        if(typeof data[tempData[1]] != "undefined"){
                            returnStr += data[tempData[1]]+last[0];
                        }else{
                            returnStr += 'undefined'+last[0];
                        }
                    }else{
                        returnStr += data+temp[1];
                    }
                }else{
                    returnStr+=v;
                }
            });
            _this.html(returnStr);
        });
    },
    renderList:function (tplId,lists,showDiv) {
        xxJs.$('.tplClass').each(function (v) {
            var _this = xxJs.$(this);
            if(_this.attr('tplId')!=tplId){
                return true;
            }
            var data = lists;
            var dataValueKey = _this.attr('attr-value');
            var str = _this.html();
            var list = str.split('${{'+dataValueKey);
            var returnStr = '';
            xxJs.$.each(data,function (k1,v1) {
                var row = '';
                xxJs.$.each(list,function (k,v) {
                    var temp = v.split('}}');
                    if(temp.length>1){
                        var tempData = temp[0].split('.');
                        if(tempData.length>1){
                            var last = temp[1].split('${{'+dataValueKey);
                            if(typeof v1[tempData[1]] != "undefined"){
                                row += v1[tempData[1]]+last[0];
                            }else{
                                row += 'undefined'+last[0];
                            }
                        }else{
                            row += v1+temp[1];
                        }
                    }else{
                        row+=v;
                    }
                });


                returnStr += row;

            });
            xxJs.$('#'+showDiv).html(returnStr);
            _this.remove();
        });
    }
};