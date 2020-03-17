let xx_msgbox={
    conf:function(){
        return xxJs.conf['msgbox'];
    },
    init:function(opacity,bcolor,fontcolor,size){
        let appendStr='<div id="xx_isbox" style="' +
            'position: fixed;display: none;padding-top: 5%;padding-bottom:5%;font-size:'+size +
            ';background: '+bcolor+';color: '+fontcolor+';text-align: center;' +
            'border-radius: 5px;margin-left: -25%;width: 50%;left: 50%;top: 25%;' +
            'filter: alpha(opacity='+opacity*100+');-moz-opacity: '+opacity+';opacity: '+opacity+';"> </div>';

        let loaddingdiv='<div class=\'buffer\' id=\'loadding\' style="display: none;z-index: 999999;position: absolute;left: 25%;top: 20%;height: 150px;" ><span class=\'buffer_tip\' id=\'buffer_tip\' >  Loadding</span><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div></div>';
        let addInfo=loaddingdiv;
        let body = document.body;
        let temp = document.createElement('div');
        temp.innerHTML = appendStr;
        document.getElementById('xx_isbox')==null&&body.appendChild(temp);
        if(document.getElementById('loadding')==null){
            body.innerHTML+=addInfo;
        }
    },
    show:function (_msg){
        let _box=document.getElementById('xx_isbox');
        let conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('xx_isbox');
        }
        _box.style.display='block';
        _box.style.background=conf['bcolor_success'];
        _box.textContent=_msg;
        _box.innerHTML =_msg;
        setTimeout("document.getElementById('xx_isbox').style.display='none'; ",2000);//延时3秒
    },error:function(_msg){
        let _box=document.getElementById('xx_isbox');
        let conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_errot'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('xx_isbox');
        }
        _box.style.display='block';
        _box.style.background=conf['bcolor_errot'];
        _box.textContent=_msg;
        _box.innerHTML =_msg;
        setTimeout("document.getElementById('xx_isbox').style.display='none'; ",2000);//延时3秒
    },input:function(msg,callback=null){
        let _box=document.getElementById('xx_isbox');
        let conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('xx_isbox');
        }
        xxJs.$('#xx_isbox').html(' ');
        _box=document.getElementById('xx_isbox');
        _box.style.display='block';
        _box.style.background=conf['bcolor_success'];
        let temp = document.createElement('div');
        temp.innerHTML = msg+'<br/><lable for="msgboxinput"><input id="msgboxinput"></lable><a id="msgboxinputsend">提交</a>';
        _box.appendChild(temp);

        xxJs.$('#msgboxinputsend').click(function(){
            console.log(xxJs.$('#msgboxinput').val())
            if(typeof callback =="function"){
                callback(xxJs.$('#msgboxinput').val())
            }

            xxJs.$('#xx_isbox').html(' ');
            xxJs.$('#xx_isbox').hide();
        });
        return {'box':'xx_isbox','input':'msgboxinput','button':'msgboxinputsend'};
    },loaddingshow:function(){
        let _box=document.getElementById('loadding');
        let conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('loadding');
        }
        _box=document.getElementById('loadding');
        _box.style.display='block';
    },loaddinghide:function(){
        let _box=document.getElementById('loadding');
        let conf=this.conf();
        if(_box==null) {
            this.init(conf['opacity'],conf['bcolor_success'],conf['fontcolor'],conf['size']);
            _box=document.getElementById('loadding');
        }
        _box=document.getElementById('loadding');
        _box.style.display='none';
    }
};