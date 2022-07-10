import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './loading';
import Toast from './toast';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';


const Notify = () => {
  const { notifyReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  return(
    <div>
      {notifyReducer.loading && <Loading />}
      {notifyReducer.success && <Toast msg={{title: 'Success', body: notifyReducer.success}} handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} bgColor='bg-success' />}
      {notifyReducer.error && <Toast msg={{title: 'Error', body: notifyReducer.error}} handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} bgColor='bg-danger' />}
    </div>
  );
}


export default Notify;