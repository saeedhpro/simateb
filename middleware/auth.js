export default function({ redirect, store }) {
    const isAuthenticated = !!store.state.login.user
    if (!isAuthenticated) {
      redirect('/')
    }
}
