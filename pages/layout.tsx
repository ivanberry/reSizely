import Header from '../components/Header'

export default function Layout({ children }: any) {
  return (
    <main className="container bg-white">
      <Header />
      <section className="container bg-slate-100">{children}</section>
    </main>
  )
}
