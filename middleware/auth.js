export default function ({redirect, store}) {
  const user = store.state.login.user
  const isAuthenticated = !!user
  if (!isAuthenticated || user.user_group_id === 1) {
    redirect('/')
    return
  }
}
