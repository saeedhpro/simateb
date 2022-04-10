export default function({ redirect, store }) {
  setTimeout(() => {
    const isAuthenticated = !!store.state.login.user
    if (isAuthenticated) {
      redirect('/organization')
    }
  }, 1)
}
