<template>
<uni-shadow-root class="vant-tabs-index"><view :class="'custom-class '+(utils.bem('tabs', [type]))">
  <van-sticky :disabled="(!sticky)" :z-index="zIndex" :offset-top="offsetTop" :container="container" @scroll="onTouchScroll">
    <view :class="(utils.bem('tabs__wrap', { scrollable }))+' '+(type === 'line' && border ? 'van-hairline--top-bottom' : '')">
      <slot name="nav-left"></slot>

      <scroll-view :scroll-x="scrollable" :scroll-with-animation="scrollWithAnimation" :scroll-left="scrollLeft" :class="utils.bem('tabs__scroll', [type])" :style="color ? 'border-color: ' + color : ''">
        <view :class="(utils.bem('tabs__nav', [type, { complete: !ellipsis }]))+' nav-class'" :style="computed.navStyle(color, type)">
          <view v-if="type === 'line'" class="van-tabs__line" :style="computed.lineStyle({ color, lineOffsetLeft, lineHeight, skipTransition, duration, lineWidth })"></view>
          <view v-for="(item,index) in (tabs)" :key="item.index" :data-index="index" :class="(computed.tabClass(index === currentIndex, ellipsis))+' '+(utils.bem('tab', { active: index === currentIndex, disabled: item.disabled, complete: !ellipsis }))" :style="computed.tabStyle({ active: index === currentIndex, ellipsis, color, type, disabled: item.disabled, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable })" @click="onTap">
            <view :class="ellipsis ? 'van-ellipsis' : ''" :style="item.titleStyle">
              {{ item.title }}
              <van-info v-if="item.info !== null || item.dot" :info="item.info" :dot="item.dot" custom-class="van-tab__title__info"></van-info>
            </view>
          </view>
        </view>
      </scroll-view>

      <slot name="nav-right"></slot>
    </view>
  </van-sticky>

  <view class="van-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <view :class="(utils.bem('tabs__track', [{ animated }]))+' van-tabs__track'" :style="computed.trackStyle({ duration, currentIndex, animated })">
      <slot></slot>
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>
import VanInfo from '../info/index.vue'
import VanSticky from '../sticky/index.vue'
global['__wxVueOptions'] = {components:{'van-info': VanInfo,'van-sticky': VanSticky}}

global['__wxRoute'] = 'vant/tabs/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var touch_1 = require('../mixins/touch');
var utils_1 = require('../common/utils');
var validator_1 = require('../common/validator');
var relation_1 = require('../common/relation');
component_1.VantComponent({
  mixins: [touch_1.touch],
  classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
  relation: relation_1.useChildren('tab', function () {
    this.updateTabs();
  }),
  props: {
    sticky: Boolean,
    border: Boolean,
    swipeable: Boolean,
    titleActiveColor: String,
    titleInactiveColor: String,
    color: String,
    animated: {
      type: Boolean,
      observer: function () {
        var _this = this;
        this.children.forEach(function (child, index) {
          return child.updateRender(index === _this.data.currentIndex, _this);
        });
      },
    },
    lineWidth: {
      type: null,
      value: 40,
      observer: 'resize',
    },
    lineHeight: {
      type: null,
      value: -1,
    },
    active: {
      type: null,
      value: 0,
      observer: function (name) {
        if (!this.skipInit) {
          this.skipInit = true;
        }
        if (name !== this.getCurrentName()) {
          this.setCurrentIndexByName(name);
        }
      },
    },
    type: {
      type: String,
      value: 'line',
    },
    ellipsis: {
      type: Boolean,
      value: true,
    },
    duration: {
      type: Number,
      value: 0.3,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    swipeThreshold: {
      type: Number,
      value: 5,
      observer: function (value) {
        this.setData({
          scrollable: this.children.length > value || !this.data.ellipsis,
        });
      },
    },
    offsetTop: {
      type: Number,
      value: 0,
    },
    lazyRender: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    tabs: [],
    scrollLeft: 0,
    scrollable: false,
    currentIndex: 0,
    container: null,
    skipTransition: true,
    scrollWithAnimation: false,
    lineOffsetLeft: 0,
  },
  mounted: function () {
    var _this = this;
    utils_1.requestAnimationFrame(function () {
      _this.setData({
        container: function () {
          return _this.createSelectorQuery().select('.van-tabs');
        },
      });
      if (!_this.skipInit) {
        _this.resize();
        _this.scrollIntoView();
      }
    });
  },
  methods: {
    updateTabs: function () {
      var _a = this,
        _b = _a.children,
        children = _b === void 0 ? [] : _b,
        data = _a.data;
      this.setData({
        tabs: children.map(function (child) {
          return child.data;
        }),
        scrollable:
          this.children.length > data.swipeThreshold || !data.ellipsis,
      });
      this.setCurrentIndexByName(data.active || this.getCurrentName());
    },
    trigger: function (eventName, child) {
      var currentIndex = this.data.currentIndex;
      var currentChild = child || this.children[currentIndex];
      if (!validator_1.isDef(currentChild)) {
        return;
      }
      this.$emit(eventName, {
        index: currentChild.index,
        name: currentChild.getComputedName(),
        title: currentChild.data.title,
      });
    },
    onTap: function (event) {
      var _this = this;
      var index = event.currentTarget.dataset.index;
      var child = this.children[index];
      if (child.data.disabled) {
        this.trigger('disabled', child);
      } else {
        this.setCurrentIndex(index);
        utils_1.nextTick(function () {
          _this.trigger('click');
        });
      }
    },
    // correct the index of active tab
    setCurrentIndexByName: function (name) {
      var _a = this.children,
        children = _a === void 0 ? [] : _a;
      var matched = children.filter(function (child) {
        return child.getComputedName() === name;
      });
      if (matched.length) {
        this.setCurrentIndex(matched[0].index);
      }
    },
    setCurrentIndex: function (currentIndex) {
      var _this = this;
      var _a = this,
        data = _a.data,
        _b = _a.children,
        children = _b === void 0 ? [] : _b;
      if (
        !validator_1.isDef(currentIndex) ||
        currentIndex >= children.length ||
        currentIndex < 0
      ) {
        return;
      }
      utils_1.groupSetData(this, function () {
        children.forEach(function (item, index) {
          var active = index === currentIndex;
          if (active !== item.data.active || !item.inited) {
            item.updateRender(active, _this);
          }
        });
      });
      if (currentIndex === data.currentIndex) {
        return;
      }
      var shouldEmitChange = data.currentIndex !== null;
      this.setData({ currentIndex: currentIndex });
      utils_1.requestAnimationFrame(function () {
        _this.resize();
        _this.scrollIntoView();
      });
      utils_1.nextTick(function () {
        _this.trigger('input');
        if (shouldEmitChange) {
          _this.trigger('change');
        }
      });
    },
    getCurrentName: function () {
      var activeTab = this.children[this.data.currentIndex];
      if (activeTab) {
        return activeTab.getComputedName();
      }
    },
    resize: function () {
      var _this = this;
      if (this.data.type !== 'line') {
        return;
      }
      var _a = this.data,
        currentIndex = _a.currentIndex,
        ellipsis = _a.ellipsis,
        skipTransition = _a.skipTransition;
      Promise.all([
        utils_1.getAllRect(this, '.van-tab'),
        utils_1.getRect(this, '.van-tabs__line'),
      ]).then(function (_a) {
        var _b = _a[0],
          rects = _b === void 0 ? [] : _b,
          lineRect = _a[1];
        var rect = rects[currentIndex];
        if (rect == null) {
          return;
        }
        var lineOffsetLeft = rects
          .slice(0, currentIndex)
          .reduce(function (prev, curr) {
            return prev + curr.width;
          }, 0);
        lineOffsetLeft +=
          (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8);
        _this.setData({ lineOffsetLeft: lineOffsetLeft });
        if (skipTransition) {
          utils_1.nextTick(function () {
            _this.setData({ skipTransition: false });
          });
        }
      });
    },
    // scroll active tab into view
    scrollIntoView: function () {
      var _this = this;
      var _a = this.data,
        currentIndex = _a.currentIndex,
        scrollable = _a.scrollable,
        scrollWithAnimation = _a.scrollWithAnimation;
      if (!scrollable) {
        return;
      }
      Promise.all([
        utils_1.getAllRect(this, '.van-tab'),
        utils_1.getRect(this, '.van-tabs__nav'),
      ]).then(function (_a) {
        var tabRects = _a[0],
          navRect = _a[1];
        var tabRect = tabRects[currentIndex];
        var offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce(function (prev, curr) {
            return prev + curr.width;
          }, 0);
        _this.setData({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
        });
        if (!scrollWithAnimation) {
          utils_1.nextTick(function () {
            _this.setData({ scrollWithAnimation: true });
          });
        }
      });
    },
    onTouchScroll: function (event) {
      this.$emit('scroll', event.detail);
    },
    onTouchStart: function (event) {
      if (!this.data.swipeable) return;
      this.touchStart(event);
    },
    onTouchMove: function (event) {
      if (!this.data.swipeable) return;
      this.touchMove(event);
    },
    // watch swipe touch end
    onTouchEnd: function () {
      if (!this.data.swipeable) return;
      var _a = this,
        direction = _a.direction,
        deltaX = _a.deltaX,
        offsetX = _a.offsetX;
      var minSwipeDistance = 50;
      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        var index = this.getAvaiableTab(deltaX);
        if (index !== -1) {
          this.setCurrentIndex(index);
        }
      }
    },
    getAvaiableTab: function (direction) {
      var _a = this.data,
        tabs = _a.tabs,
        currentIndex = _a.currentIndex;
      var step = direction > 0 ? -1 : 1;
      for (
        var i = step;
        currentIndex + i < tabs.length && currentIndex + i >= 0;
        i += step
      ) {
        var index = currentIndex + i;
        if (
          index >= 0 &&
          index < tabs.length &&
          tabs[index] &&
          !tabs[index].disabled
        ) {
          return index;
        }
      }
      return -1;
    },
  },
});
export default global['__wxComponents']['vant/tabs/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tabs{position:relative;-webkit-tap-highlight-color:transparent}.van-tabs__wrap{display:-webkit-flex;display:flex;overflow:hidden}.van-tabs__wrap--scrollable .van-tab{-webkit-flex:0 0 22%;flex:0 0 22%}.van-tabs__wrap--scrollable .van-tab--complete{-webkit-flex:1 0 auto!important;flex:1 0 auto!important;padding:0 12px}.van-tabs__wrap--scrollable .van-tabs__nav--complete{padding-right:8px;padding-left:8px}.van-tabs__scroll{background-color:#fff;background-color:var(--tabs-nav-background-color,#fff)}.van-tabs__scroll--line{box-sizing:initial;height:calc(100% + 15px)}.van-tabs__scroll--card{margin:0 16px;margin:0 var(--padding-md,16px)}.van-tabs__scroll::-webkit-scrollbar{display:none}.van-tabs__nav{position:relative;display:-webkit-flex;display:flex;-webkit-user-select:none;user-select:none}.van-tabs__nav--card{box-sizing:border-box;height:30px;height:var(--tabs-card-height,30px);border:1px solid #ee0a24;border:var(--border-width-base,1px) solid var(--tabs-default-color,#ee0a24);border-radius:2px;border-radius:var(--border-radius-sm,2px)}.van-tabs__nav--card .van-tab{color:#ee0a24;color:var(--tabs-default-color,#ee0a24);line-height:28px;line-height:calc(var(--tabs-card-height, 30px) - var(--border-width-base, 1px)*2);border-right:1px solid #ee0a24;border-right:var(--border-width-base,1px) solid var(--tabs-default-color,#ee0a24)}.van-tabs__nav--card .van-tab:last-child{border-right:none}.van-tabs__nav--card .van-tab.van-tab--active{color:#fff;color:var(--white,#fff);background-color:#ee0a24;background-color:var(--tabs-default-color,#ee0a24)}.van-tabs__nav--card .van-tab--disabled{color:#c8c9cc;color:var(--tab-disabled-text-color,#c8c9cc)}.van-tabs__line{position:absolute;bottom:0;left:0;z-index:1;height:3px;height:var(--tabs-bottom-bar-height,3px);border-radius:3px;border-radius:var(--tabs-bottom-bar-height,3px);background-color:#ee0a24;background-color:var(--tabs-bottom-bar-color,#ee0a24)}.van-tabs__track{position:relative;width:100%;height:100%}.van-tabs__track--animated{display:-webkit-flex;display:flex;transition-property:left}.van-tabs__content{overflow:hidden}.van-tabs--line .van-tabs__wrap{height:44px;height:var(--tabs-line-height,44px)}.van-tabs--card .van-tabs__wrap{height:30px;height:var(--tabs-card-height,30px)}.van-tab{position:relative;-webkit-flex:1;flex:1;box-sizing:border-box;min-width:0;padding:0 5px;text-align:center;cursor:pointer;color:#646566;color:var(--tab-text-color,#646566);font-size:14px;font-size:var(--tab-font-size,14px);line-height:44px;line-height:var(--tabs-line-height,44px)}.van-tab--active{font-weight:500;font-weight:var(--font-weight-bold,500);color:#323233;color:var(--tab-active-text-color,#323233)}.van-tab--disabled{color:#c8c9cc;color:var(--tab-disabled-text-color,#c8c9cc)}.van-tab__title__info{position:relative!important;top:-1px!important;display:inline-block;-webkit-transform:translateX(0)!important;transform:translateX(0)!important}
</style>