import { MessageType } from '@/types/common';
import Taro from '@tarojs/taro';
import { getOfficialMsgList, getCommentMsgList, getInteractionMsgList, getUserFansList } from '@/api/index.js';
import { getLocalStorage } from '@/utils/utils'
import { localStorageKey } from '@/const'
import { request } from '@/api/request';

const cursor = 0
export const count = 20
export const msgInterval = 5000 // 消息轮询间隔
const mapMsgTypeToKey: Map<MessageType, string>  = new Map(
  [
    [MessageType.Official, localStorageKey.officialMsg],
    [MessageType.Comment, localStorageKey.commentMsg],
    [MessageType.Fans, localStorageKey.fansMsg],
    [MessageType.Interaction, localStorageKey.interactionMsg]
  ]
)
// 判断是否有新消息
export const checkHasNewMsgs = async (store: any): Promise<boolean> => {
  const tasks = [fetchOfficialMsgs(), fetchCommentMsgs(), fetchUserFanss(), fetchInteractionMsgs()]
  return Promise.all(tasks).then(async ([officialRes, commentRes, fanRes, interactionRes]) => {
    const hasNewOfficialMsg = await checkHasNewMsgsByRes(officialRes, MessageType.Official)
    const hasNewCommentMsg = await checkHasNewMsgsByRes(commentRes, MessageType.Comment)
    const hasNewFansMsg = await checkHasNewMsgsByRes(fanRes, MessageType.Fans)
    const hasNewInteractionMsg = await checkHasNewMsgsByRes(interactionRes, MessageType.Interaction)

    store.commit('changeHasNewOfficialMsg', hasNewOfficialMsg)
    store.commit('changeHasNewCommentMsg', hasNewCommentMsg)
    store.commit('changeHasNewFansMsg', hasNewFansMsg)
    store.commit('changeHasNewInteractionMsg', hasNewInteractionMsg)
    
    const hasNewMsgs = hasNewOfficialMsg || hasNewCommentMsg || hasNewFansMsg || hasNewInteractionMsg
    return hasNewMsgs
  }).catch(err => {
    console.log('checkHasNewMsgs err',err)
    return false
  })
}

// 缓存消息到本地，把vuex store设置为无新消息
export const storeMsgToLocal = async (store: any, res: any, type: MessageType) => {
  // 1. 缓存消息到本地
  const newMsgIds = getNewMsgIds(res, type)
  setLocalMsgIds(newMsgIds, type)

  // 2. 把vuex store设置为无新消息
  switch (type) {
    case MessageType.Official:
      store.commit('changeHasNewOfficialMsg', false)
      break
    case MessageType.Comment:
      store.commit('changeHasNewCommentMsg', false)
      break
    case MessageType.Fans:
      store.commit('changeHasNewFansMsg', false)
      break
    case MessageType.Interaction:
      store.commit('changeHasNewInteractionMsg', false)
      break
  }
}

const checkHasNewMsgsByRes = async (res: any, type: MessageType) => {
  const newMsgIds = getNewMsgIds(res, type)
  const oldMsgIds = await getLocalMsgIds(type)
  console.log('type', type, 'res', res.data.data.list, 'newMsgId', newMsgIds, 'oldMsgIds', oldMsgIds)
  return checkHasNewMsgId(newMsgIds, oldMsgIds)
}

const getNewMsgIds = (res: any, type: MessageType) => {
  let newMsgIds: number[] = []
  if (type == MessageType.Fans) {
    newMsgIds = res.data.data?.list.map(i => i.uid) || []
  } else {
    newMsgIds = res.data.data?.list.map(i => i.id) || []
  }
  return newMsgIds
}

const checkHasNewMsgId = (newMsgIds: number[], oldMsgIds: number[]) => {
  if (newMsgIds.length !== oldMsgIds.length) return true
  // 最多比较前10个
  const newIds = newMsgIds.length > 10 ? newMsgIds.slice(0, 11) : newMsgIds
  const oldIds = oldMsgIds.length > 10 ? oldMsgIds.slice(0, 11) : oldMsgIds
  let res = false
  for (let i = 0; i < newMsgIds.length; i++) {
    if (newIds[i] !== oldIds[i]) {
      res = true
      break;
    }
  }
  return res
}
// 获取本地缓存的消息id列表
const getLocalMsgIds = async (type: MessageType): Promise<number[]> => {
  const key = mapMsgTypeToKey.get(type)
  return await getLocalStorage(key as string).catch(() => {}) || [] // 忽略报错
}
// 设置本地缓存的消息id列表
const setLocalMsgIds = async (ids: number[], type: MessageType) => {
  const key = mapMsgTypeToKey.get(type)
  console.log('setLocalMsgIds, key:',key,' ids: ', ids)
  return Taro.setStorage({
    key: key as string,
    data: ids
  })
}

const fetchOfficialMsgs = async () => {
  return request({
    url: getOfficialMsgList,
    data: { cursor, count }
  })
}

const fetchCommentMsgs = async () => {
  return request({
    url: getCommentMsgList,
    data: { cursor, count }
  })
}

const fetchUserFanss = async () => {
  return request({
    url: getUserFansList,
    data: { cursor, count }
  })
}

const fetchInteractionMsgs = async () => {
  return request({
    url: getInteractionMsgList,
    data: { cursor, count }
  })
}