(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subPackages/animal/animalEdit/VideoUpload"],{2199:function(e,t,o){"use strict";o.r(t);var n=o("4b34"),i=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=i.a},2255:function(e,t,o){"use strict";o.r(t);var n=o("e67f"),i=o("2199");for(var a in i)"default"!==a&&function(e){o.d(t,e,(function(){return i[e]}))}(a);o("2abe");var r,s=o("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=c.exports},"2abe":function(e,t,o){"use strict";var n=o("d5b8"),i=o.n(n);i.a},"4b34":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o("26cb");function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var s=o("c1aa"),c=o("8d4b"),l=o("5a1f"),u={data:function(){return{thumbTempFile:"",title:"",animalName:"",health:"",indexHealth:0,duration:0,sourceType:["album"],defaultVideoblumPath:["../../../static/images/base.png"],progress:0}},computed:a({},(0,n.mapState)({animalSuccorTypes:function(e){return e.tags.succorTag}})),methods:{init:function(){for(this.indexHealth in this.animalSuccorTypes)if(this.animalSuccorTypes[this.indexHealth]==this.health){console.log("enter init break indexHeath:",this.indexHealth);break}this.title=this.animalName+c.formatTime()+"的活动",console.log("enter init title:",this.title)},bindPickerChange:function(e){console.log("picker发送选择改变，携带值为",e.target.value),this.indexHealth=e.target.value},onKeyInput:function(e){this.title=e.target.value},backUpPage:function(){e.navigateBack({delta:1})},chooseFi:function(){var t=this;e.chooseMedia({count:1,mediaType:["video"],sourceType:this.sourceType,success:function(o){console.log("enter chooseMedia res:",o);var n=o.tempFiles[0],i=n.size;if(i>377487360)return e.showToast({title:"上传的视频大小不超过360M",icon:"none",duration:2e3,mask:!0}),void e.navigateBack({delta:1});var a=n.tempFilePath.slice(-3).toLowerCase(),r=["mp4"];if(!r.includes(a))return e.showToast({title:"视频必须是mp4类型",icon:"none",duration:2e3,mask:!0}),void e.navigateBack({delta:1});t.thumbTempFile=n.thumbTempFilePath,t.duration=Math.round(n.duration),t.videoFile=n}}),console.log("just leaving chooseMedia title:",this.title)},chooseVi:function(){var t=this;e.chooseVideo({sourceType:["camera"],compressed:!0,maxDuration:60,success:function(e){console.log("enter chooseVideo res:",e);var o=e;t.thumbTempFile=t.defaultVideoblumPath,t.duration=Math.round(o.duration),t.videoFile=o},fail:function(e){console.log("picture video fail!:",e)}})},uploadMedia:function(){var t=this,o=this;if(""!=o.thumbTempFile)if(""!=o.title){var n=l.start({getSignature:o.getSignature,mediaName:o.title,coverFile:o.coverFile,mediaFile:o.videoFile,progress:function(t){console.log("enter progress result:",t),o.progress=100*t.percent,console.log("enter self.progress :",o.progress),e.showLoading({title:"上传视频 "+o.progress+"%",mask:!0})},finish:function(n){console.log("enter upload finish：",n,o),s.postFinishUpload({animalId:o.animalId,baseId:o.baseId,fileId:n.fileId,name:o.title,succorStatus:t.animalSuccorTypes[t.indexHealth],duration:o.duration}).then((function(e){return console.log("postFinishUpload res",e)})),100===o.progress&&e.hideLoading();var i=getCurrentPages(),a=i[i.length-2];e.navigateBack({delta:1,success:function(){try{a.$vm.orderMediasPage=0,console.log("enter navigateBack success!")}catch(e){console.log("enter navigateBack fail!"),console.log(e)}}})},error:function(t){console.log("error"),console.log(t),e.showModal({title:"上传失败",content:JSON.stringify(t),showCancel:!1})}});o.uploader=n}else e.showToast({title:"请填写上传视频的标题",icon:"none",duration:2e3,mask:!0});else e.showToast({title:"请选择上传视频",icon:"none",duration:2e3,mask:!0})},getSignature:function(e){s.getSignature().then((function(t){200==t.code&&(console.log("get getSignature result:",t.result),e(t.result))}))}},onLoad:function(e){console.log("enter upload video",e),e.id&&(this.animalId=e.id),e.baseId&&(this.baseId=e.baseId),e.animalName&&(this.animalName=e.animalName),this.health=e.status,this.init(),"0"===e.videoTypeflag?(this.sourceType=["camera"],this.chooseVi()):this.chooseFi(),console.log("this.sourceType",this.sourceType)}};t.default=u}).call(this,o("543d")["default"])},d5b8:function(e,t,o){},e2d4:function(e,t,o){"use strict";(function(e){o("a09d");n(o("66fd"));var t=n(o("2255"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(t.default)}).call(this,o("543d")["createPage"])},e67f:function(e,t,o){"use strict";var n;o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement;e._self._c},a=[]}},[["e2d4","common/runtime","common/vendor"]]]);