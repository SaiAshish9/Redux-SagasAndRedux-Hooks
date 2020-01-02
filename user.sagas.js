import {takeLatest,put,all,call} from 'redux-saga/effects'


import UserActionTypes from './user-types'

import {
  // googleSignInFailure,
  // googleSignInSuccess,
  // emailSignInSuccess,
  // emailSignInFailure
  signInFailure,
  signInSuccess
} from './user-actions'

import {auth,googleProvider,createUserProfileDocument} from '../../firebase/firebase'

export function* getSnapshotFromAuth(user){
  try{
  const userRef=yield call(createUserProfileDocument,user)
  const userSnapshot=yield userRef.get()
  yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
  // put() puts back into redux flow
}catch(e){
yield put(signInFailure(e))
}
}


export function* signInWithGoogle(){
try{
  const {user}=yield auth.signInWithPopup(googleProvider)
yield getSnapshotFromAuth(user)

}catch(e){
yield put(signInFailure(e))
}
}


export function* onGoogleSignInStart(){
yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)

}

export function* signInWithEmail({payload:{email,password}}){
  try{
  const {user}=yield auth.signInWithEmailAndPassword(email,password)
  yield getSnapshotFromAuth(user)
  }
  catch(e){
  yield  put(signInFailure(e))
  }
}

export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* userSagas(){
yield all([call(onGoogleSignInStart),call(onEmailSignInStart)])
}
