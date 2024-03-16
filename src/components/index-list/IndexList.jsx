import { useState, useRef, useEffect, useMemo } from 'react'
import Scroll from '@/components/base/scroll/Scroll'
import './index.scss'
import useFixed from './use-fixed.js'
import useShortcut from './use-shortcut.js'
function IndexList(props) {
  const {
    onListenerScroll,
    groupRef,
    fixedStyle,
    fixedTitle,
    currentIndex,
  } = useFixed(props)
  const {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchEnd,
    onShortcutTouchMove,
    getScrollRef
  } = useShortcut(props, groupRef)
  return (
    <Scroll
      className="index-list"
      options={{
        probeType: 3,
      }}
      onScroll={onListenerScroll}
      getScroll = {getScrollRef}
    >
      <ul ref={groupRef}>
        {props.data.map((group) => (
          <li key={group.title} className="group">
            <h2 className="title">{group.title}</h2>
            <ul>
              {group.list.map((item) => (
                <li key={item.id} className="item">
                  <img className="avatar" src={item.pic} />
                  <span className="name">{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {fixedTitle && (
        <div
          className="fixed"
          style={{
            ...fixedStyle,
          }}
        >
          <div className="fixed-title">{fixedTitle}</div>
        </div>
      )}

      <div
        className="shortcut"
        onTouchStart={onShortcutTouchStart}
        onTouchMove={onShortcutTouchMove}
        onTouchEnd={onShortcutTouchEnd}
      >
        <ul>
          {shortcutList.map((item, index) => (
            <li
              key={item}
              data-index={index}
              className={currentIndex === index ? 'current' : '' + ' item'}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Scroll>
  )
}

export default IndexList
