import React from 'react';

const Popup = (props) => {
  return (
    <div className='popup'>
      <div className='popup_inner'>
        <div>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title">{props.title}</h3>
                <button type="button" class="close" onClick={props.closePopup} data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                {props.children}
              </div>
             { /*<div class="modal-footer">
                <button type="button" onClick={props.closePopup} class="btn btn-danger" data-dismiss="modal">Close</button>
  </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup;