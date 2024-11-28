export default function({ redirect, store }) {
  const user = store.state.login.user
  const isAuthenticated = !!user
  if (!isAuthenticated) {
    redirect('/')
    return
  } else if (user.user_group_id !== 2) {
    redirect('/organization')
    return
  }
}
