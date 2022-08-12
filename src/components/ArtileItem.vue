<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ obj.title }}</span>
          <!-- 单图 -->
          <img class="thumb" :src="obj.cover.images[0]" v-if="obj.cover.type === 1" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="obj.cover.type === 3">
          <img class="thumb" :src="item" v-for="(item, index) in obj.cover.images" :key="index" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ obj.aut_name }}</span>
            <span>{{ obj.comm_count }}评论</span>
            <span>{{ dateFrom(obj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <!--反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      get-container="body"
      :cancel-text="cancelText"
      @cancel="onCancel"
      @select="selectFn"
    />
  </div>
</template>

<script>
import dateFrom from '@/utils/dateFormat'
import { firstActions, secondActions } from '@/utils/sheetData'
export default {
  props: {
    obj: Object // 文章对象
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      cancelText: '取消'
    }
  },
  methods: {
    // 格式化时间
    dateFrom: dateFrom,
    // 关闭反馈面板
    onCancel() {
      if (this.cancelText === '返回') {
        this.cancelText = '取消'
        this.actions = firstActions
        this.show = true
      }
    },
    // 选择反馈选项
    selectFn(action) {
      console.log(action)
      if (action.name === '不感兴趣') {
        this.show = false
      } else if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.cancelText = '返回'
      } else {
        this.show = false
        this.actions = firstActions
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
