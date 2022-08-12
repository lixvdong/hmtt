import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 到指定时间需要的插件
import 'dayjs/locale/zh' // 集成中文

const dateForm = value => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  return dayjs(value).fromNow()
}

export default dateForm
