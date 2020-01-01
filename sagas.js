import { takeEvery,takeLatest,take,delay,put} from 'redux-saga/effects'

export function* onIncrement(){
  yield console.log('I am incremented');
  yield delay(5000)
  yield put({type:'INCREMENT_FROM_SAGA'})
}


export function* incrementSaga(){
  // while(true){
  //   yield take('INCREMENT');
  //   console.log('I am incremented')
  //   yield delay(5000);
  // }

   //counter


// yield takeEvery('INCREMENT',onIncrement)

// displays output data after 5sec without any delay

yield takeLatest('INCREMENT',onIncrement)
// executes only after 5sec and ignores all actions till 5s

}
