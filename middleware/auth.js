export default function ({ store, redirect }) {
  if (process.client && !store.getters['isAuthorized']) return redirect('/login')
}
