import { createPortal } from 'react-dom'
import {useImperativeHandle,useState} from 'react'
import PropTypes from 'prop-types'
import './index.scss'
export default function Confirm(props) {
  useImperativeHandle(props.childRef,()=>{
    return {
      show: show
    }
  })
  const [visible, setVisible] = useState(false)
  const confirm = () => {
    props.onConfirm()
  }
  const cancel = () => {
    hide()
  }
  const show = () =>{
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  return (
    <>
      {createPortal(
        visible ? (
          <div className="confirm">
            <div className="confirm-wrapper">
              <div className="confirm-content">
                <p className="text">{ props.text }</p>
                <div className="operate">
                  <div className="operate-btn left" onClick={confirm}>
                    { props.confirmBtnText }
                  </div>
                  <div className="operate-btn" onClick={cancel}>
                    { props.cancelBtnText }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        ),
        document.body // 渲染到body
      )}
    </>
  )
}
Confirm.defineProps = {
  text: '',
  confirmBtnText: '确定',
  cancelBtnText: '取消',
  onConfirm: () => {},
}

Confirm.propTypes = {
  text: PropTypes.string,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  onConfirm: PropTypes.func
}
