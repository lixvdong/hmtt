<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="back" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title"> 点击{{ show ? '删除' : '进入' }}频道 </span>
        </span>
        <span @click="redact">{{ show ? '完成' : '编辑' }}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col
          span="6"
          v-for="(item, index) in userChannList"
          :key="item.id"
          @click="reMove(item, index)"
        >
          <div class="channel-item van-hairline--surround">
            {{ item.name }}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-if="show && item.id !== 0">
              <template #content>
                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in unChannList" :key="item.id" @click="addMove(item)">
          <div class="channel-item van-hairline--surround">{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllChannListAPI, changeChannAPI } from '@/api/channels'
export default {
  props: {
    userChannList: Array // 用户的频道列表
  },
  data() {
    return {
      show: false, // 判断状态
      allChannList: [] // 所有频道列表
    }
  },
  created() {
    this.getAllChannList()
  },
  computed: {
    unChannList() {
      const unChannList = this.allChannList.filter(item => {
        const index = this.userChannList.findIndex(obj => obj.id === item.id)
        if (index === -1) return true
        return false
      })
      return unChannList
    }
  },
  methods: {
    // 修改状态,修改频道
    async redact() {
      this.show = !this.show
      if (!this.show) {
        const channels = this.userChannList.map((item, index) => {
          return { id: item.id, seq: index }
        })
        const { data: res } = await changeChannAPI({ channels })
        console.log(res)
      }
    },
    // 获取所有频道列表
    async getAllChannList() {
      const { data: res } = await getAllChannListAPI()
      this.allChannList = res.data.channels
    },
    // 返回首页
    back() {
      this.$emit('input', false)
      this.show = false
      this.$emit('reset')
    },
    // 添加频道
    addMove(item) {
      if (this.show) {
        const arr = [...this.userChannList]
        arr.push(item)
        this.$emit('update:userChannList', arr)
      }
    },
    // 删除频道
    reMove(obj, index) {
      if (this.show && obj.id !== 0) {
        const arr = this.userChannList.filter(item => item.id !== obj.id)
        this.$emit('update:userChannList', arr)
      } else {
        // 跳转频道
        this.$emit('input', false)
        this.$emit('goChann', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
