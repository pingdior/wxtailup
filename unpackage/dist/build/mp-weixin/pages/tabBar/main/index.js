(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/main/index"],{"2bf2":function(e,t,o){"use strict";(function(e){o("a09d");n(o("66fd"));var t=n(o("a4ce"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(t.default)}).call(this,o("543d")["createPage"])},4423:function(e,t,o){"use strict";var n;o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return s})),o.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,o=(e._self._c,!e.isFocusTab&&e.videoRecommendList.length>0?e.__map(e.videoRecommendList,(function(t,o){var n=e.__get_orig(t),i=t&&e.currIndex==o?e.isVerticalShow(t.height,t.width):null;return{$orig:n,m0:i}})):null),n=!e.isFocusTab&&e.videoRecommendList.length>0||!(e.videoFocusList.length>0)?null:e.__map(e.videoFocusList,(function(t,o){var n=e.__get_orig(t),i=t&&e.currIndex==o?e.isVerticalShow(t.height,t.width):null;return{$orig:n,m1:i}}));e.$mp.data=Object.assign({},{$root:{l0:o,l1:n}})},s=[]},"48b4":function(e,t,o){"use strict";o.r(t);var n=o("ec2e"),i=o.n(n);for(var s in n)"default"!==s&&function(e){o.d(t,e,(function(){return n[e]}))}(s);t["default"]=i.a},"606b":function(e,t,o){},a4ce:function(e,t,o){"use strict";o.r(t);var n=o("4423"),i=o("48b4");for(var s in i)"default"!==s&&function(e){o.d(t,e,(function(){return i[e]}))}(s);o("ca7a");var a,r=o("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);t["default"]=c.exports},ca7a:function(e,t,o){"use strict";var n=o("606b"),i=o.n(n);i.a},ec2e:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(o("ac30")),i=a(o("c1aa")),s=o("26cb");function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function c(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){l(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var u=o("2e3e"),d=(requirePlugin("myPlugin"),{computed:c(c({},(0,s.mapState)({isAuthed:function(e){return e.user.hasLogin},appUserInfoFirst:function(e){return e.user.userInfo}})),{},{getAuthed:function(){return this.isAuthed}}),watch:{getAuthed:{handler:function(){this.isAuthed&&(console.log("initOnloadData use!"),this.initData())}}},data:function(){return{isFocusTab:!1,tabs:[{name:"最新",value:!0},{name:"关注",value:!1}],playerid:"video",videoRecommendList:[],videoFocusList:[],videoFocusBackList:[1],currIndex:0,currTimeStr:"00:00",endTimeStr:"00:00",duration:0,sliderValue:0,showPlayBtn:!1,defaultFocusBackPic:["../../../static/images/focusBack.jpeg"],hasFirstLogin:!1,bSwipeDown:!1,isClickSide:!1,loginCode:"",bFromshare:!1,videoID:u.videoDataAppId,shareBaseId:0,shareAnamalId:0}},methods:c(c({},(0,s.mapMutations)("user",["login","setProvider","setUserInfo","setWxUserInfo","setFirstLogin"])),{},{initSingleFlowData:function(){console.log("enter initSingleFlowData!"),this.selectComponent("#tabs").resize();for(var e=0;e<2;e++)this.getRecommendVideo()},initDoubleFlowData:function(){console.log("enter initDoubleFlowData!"),this.selectComponent("#tabs").resize();for(var e=0;e<2;e++)this.getRecommendVideo(),this.getFocusVideo()},initFocusFlowData:function(){console.log("enter initFocusFlowData!"),this.selectComponent("#tabs").resize();try{e.setStorageSync({key:"hasFirstLogin",data:!0}),this.hasFirstLogin=!0}catch(o){console.log("setStorageSync hasFirstLogin exception!")}for(var t=0;t<2;t++)this.getFocusVideo()},isVerticalShow:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=1;return e&&t?(o=e/t,console.log("isVerticalShow hwValue:",o),o>1?(console.log("isVerticalShow hwValue cover hwValue > 1"),"cover"):(console.log("isVerticalShow hwValue contain"),"contain")):(console.log("isVerticalShow hwValue none"),"cover")},hasFirstLoginInit:function(){if(!this.appUserInfoFirst.nickName||this.appUserInfoFirst.nickName.length<1){console.log("appUserInfoFirst not exict!"),this.hasFirstLogin=!0;try{e.setStorageSync({key:"hasFirstLogin",data:!0})}catch(t){console.log("setStorageSync hasFirstLogin exception!")}}},setTabBarStyle:function(){e.setTabBarStyle({color:"#ACB2BA",selectedColor:"#64C8B3",backgroundColor:"#282930",borderStyle:"black"})},onChange:function(t){var o=this;if(this.isFocusTab?(console.log("enter onChange isFocus :",this.isFocusTab),(!this.appUserInfoFirst.nickName||this.appUserInfoFirst.nickName.length<1)&&(console.log("appUserInfoFirst not exict!"),this.initSingleFlowData())):(console.log("enter onChange !isFocus :",this.isFocusTab),(!this.appUserInfoFirst.nickName||this.appUserInfoFirst.nickName.length<1)&&(console.log("appUserInfoFirst not exict!"),this.initFocusFlowData())),this.isFocusTab=!this.isFocusTab,console.log("enter onChange focusTab state:",this.isFocusTab),this.isFocusTab){try{e.setStorageSync("mainPageCommitIndex",this.currIndex)}catch(t){console.log("onChange setStorageSync mainPageCommitIndex fail!")}try{e.getStorageSync({key:"mainPageFocusIndex",success:function(e){console.log("onChange mainFocusIndex异步获取 = "+e.data),o.currIndex=e.data}})}catch(t){console.log("getStorageSync mainPageFocusIndex exception!")}}else{try{e.setStorageSync("mainPageFocusIndex",this.currIndex)}catch(t){console.log("onChange setStorageSync mainPageFocusIndex fail!")}try{e.getStorageSync({key:"mainPageCommitIndex",success:function(e){console.log("onChange mainPageCommitIndex异步获取 = "+e.data),o.currIndex=e.data}})}catch(t){console.log("getStorageSync mainPageCommitIndex exception!")}}this.isFocusTab?this.currIndex>=this.videoFocusList.length-1&&(0==this.videoFocusList.length?this.currIndex=0:this.currIndex=this.videoFocusList.length-1,this.getFocusVideo()):this.currIndex>=this.videoRecommendList.length-1&&(this.currIndex=this.videoRecommendList.length-1,this.getRecommendVideo())},getSMPTEbySeconds:function(e){var t=Math.floor(e),o=Math.floor(t/60);return o%=60,t%=60,t<10&&(t="0"+t),o<10&&(o="0"+o),o+":"+t},bindtimeupdate:function(e){if(console.log(e),this.data.canUpdateSlider){var t=e.detail.detail.duration,o=e.detail.detail.currentTime/t*100,n=this.getSMPTEbySeconds(parseInt(t*(o/100))),i=this.getSMPTEbySeconds(parseInt(t));this.currTimeStr=n,this.endTimeStr=i,this.sliderValue=o,this.duration=duration}},binderror:function(e){console.log("catch video error:"),console.log(e),wx.showToast({title:"视频播放错误",icon:"none"})},bindplay:function(e){var t=this,o=this.hiddenCover;this.playing=!0,!1===o&&setTimeout((function(){t.hiddenCover=!0}),200)},swiperchange:function(e){this.currIndex=e.detail.current,console.log("swiperchange",e),this.isFocusTab?this.currIndex>=this.videoFocusList.length-1&&(0==this.videoFocusList.length?this.currIndex=0:this.currIndex=this.videoFocusList.length-1,this.getFocusVideo()):this.currIndex>=this.videoRecommendList.length-1&&(this.currIndex=this.videoRecommendList.length-1,this.getRecommendVideo())},swiperanimateend:function(e){console.log("anima",e);e.detail.current},getRecommendVideo:function(){var e=this;n.default.getHomeVideo({focus:!1}).then((function(t){console.log("enter getRecommendVideo res:",t),t.result&&e.videoRecommendList.push(t.result)}))},getFocusVideo:function(){var e=this;n.default.getHomeVideo({focus:!0}).then((function(t){console.log("enter getFocusVideo res:",t),t.result&&e.videoFocusList.push(t.result),console.log("enter getFocusVideo videoFocusList's length:",e.videoFocusList)}))},toAnimalDetails:function(t){e.navigateTo({url:"/subPackages/animal/details?id="+t.animalId+"&baseId="+t.baseId})},toBaseDetails:function(t){e.navigateTo({url:"/subPackages/organization/details?id="+t.baseId})},toFocus:function(e){var t=this;i.default.animalFocus({animalId:e.animalId}).then((function(){for(var o in e.focused=!0,t.videoRecommendList)e.animalId===t.videoRecommendList[o].animalId&&(t.videoRecommendList[o].focused=!0)}))},toDefaultFocus:function(){i.default.animalFocus({animalId:5}).then((function(){console.log("enter toDefaultFocus OK!")}))},toDonate:function(t){console.log("enter toDonate item",t),e.navigateTo({url:"/subPackages/animal/donate?animalId="+t.animalId+"&name="+t.animalName})},toLike:function(e){var t=this;this.$set(e,"like",!e.like),this.isClickSide=!0,setTimeout((function(){t.isClickSide=!1}),200)},toShare:function(t){console.log(t),e.navigateTo({url:"/subPackages/animal/share?id="+t.animalId+"&baseId="+t.baseId})},initData:function(){if(!this.appUserInfoFirst.nickName||this.appUserInfoFirst.nickName.length<1){console.log("appUserInfoFirst not exict!"),this.hasFirstLogin=!0;try{e.setStorageSync({key:"hasFirstLogin",data:this.hasFirstLogin})}catch(t){console.log("setStorageSync token exception!",t)}this.initSingleFlowData()}else{this.hasFirstLogin=!1;try{e.setStorageSync({key:"hasFirstLogin",data:this.hasFirstLogin})}catch(t){console.log("setStorageSync token exception!",t)}this.initDoubleFlowData()}},getUserProfile:function(){var t=this;e.getUserProfile({desc:"登陆注册",success:function(o){console.log(o,"wx.getUserProfile res:");var n=e.getStorageSync("wxUserInfo");if(t.wxUserData=o,console.log(n,"uni getStorageSync wxUserInfo"),null==n||n!=t.wxUserData.userInfo){t.setWxUserInfo(t.wxUserData.userInfo);try{e.setStorageSync({key:"wxUserInfo",data:t.wxUserData.userInfo})}catch(i){console.log("setStorageSync wxUserInfo exception!")}}t.updateUserInfo(),t.changeSharePage()},fail:function(e){console.log(e,"getUserProfile信息获取失败原因")}})},changeSharePage:function(){console.log("enter changeSharePage!"),this.isAuthed&&(this.shareAnamalId>0&&this.shareBaseId>0?e.navigateTo({url:"/subPackages/animal/details?id="+this.shareAnamalId+"&baseId="+this.shareBaseId}):this.shareBaseId>0&&e.navigateTo({url:"/subPackages/organization/details?id="+this.shareBaseId}))},updateUserInfo:function(){var t=this;console.log("需要更新用户信息",this.wxUserData),n.default.updateProfile({encryptedData:this.wxUserData.encryptedData,iv:this.wxUserData.iv,rawData:this.wxUserData.rawData,signature:this.wxUserData.signature}).then((function(o){if(200==o.code){t.setUserInfo(o.result);try{e.setStorageSync({key:"hasFirstLogin",data:!1}),t.hasFirstLogin=!1,t.toDefaultFocus(),t.initData()}catch(n){console.log("setStorageSync hasFirstLogin exception!")}}console.log("result updateProfile,hasFirstLogin:",o)}))},getShareId:function(){var t=this;console.log("enter getShareId!"),e.getStorageSync({key:"shareAnamalId",success:function(e){console.log("onChange shareAnamalId异步获取 = "+e.data),t.shareAnamalId=e.data}}),e.getStorageSync({key:"shareBaseId",success:function(e){console.log("onChange shareBaseId异步获取 = "+e.data),t.shareBaseId=e.data}})}}),onLoad:function(){console.log("enter onLoad !")},onShow:function(){console.log("enter onShow videoID!",this.videoID),this.setTabBarStyle(),this.isAuthed&&(this.initData(),this.changeSharePage())}});t.default=d}).call(this,o("543d")["default"])}},[["2bf2","common/runtime","common/vendor"]]]);